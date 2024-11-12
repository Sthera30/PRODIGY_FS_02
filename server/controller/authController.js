import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import genOtp from 'otp-generator'
import nodeMail from 'nodemailer'
import userModel from '../model/user.js'
import { comparePassword, hashconfirmPassword, hashingOtp, hashOtp, hashPassword } from '../helpers/auth.js'
import { foodModel } from '../model/food.js'
import crypto from 'crypto'
import { orderModel } from '../model/order.js'
import { specificationModel } from '../model/specification.js'
import { otpModel } from '../model/Otp.js'
import { addressModel } from '../model/address.js'
import { promiseModel } from '../model/service.js'
import { our_servicesModel } from '../model/our_services.js'
import { aboutUsModel } from '../model/aboutUs.js'
import { missionModel } from '../model/mission.js'
import { visionModel } from '../model/vision.js'
import { valuesModel } from '../model/values.js'
import { error, log } from 'console'

export const registerUser = async (req, res) => {

    const { name, email, password, confirmPassword, profileImage } = req.body

    try {

        if (!name) {
            return res.json({ error: "name is required!" })
        }

        if (!email) {
            return res.json({ error: "email is required!" })
        }

        if (!password) {
            return res.json({ error: "password is required!" })
        }

        if (password.length < 6) {
            return res.json({ error: "password must be atleast 6 characters!" })
        }

        if (confirmPassword.length < 6) {
            return res.json({ error: "confirm password must be atleast 6 characters!" })
        }

        if (!confirmPassword) {
            return res.json({ error: "confirm password is required!" })
        }

        //check if email exists, before a user registers

        const exists = await userModel.findOne({ email })

        if (exists) {
            return res.json({ error: "email already exist!" })
        }

        //generate otp

        const otp = genOtp.generate(6, {

            digits: true,
            uppCase: false,
            lowerCase: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false

        })

        //check if the passwords match

        if (password === confirmPassword) {

            const hashedPass = await hashPassword(password)

            const hashedConfirmPass = await hashconfirmPassword(confirmPassword)

            const hashedOtp = await hashOtp(otp)

            const newUser = await userModel.create({ name, email, password: hashedPass, confirmPassword: hashedConfirmPass, otp: hashedOtp, profileImage })


            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })

            const transporter = nodeMail.createTransport({

                service: "Gmail",
                auth: {
                    user: "tinisthera@gmail.com",
                    pass: "evhrsmudgmuasuxk"
                }

            })

            const mailOptions = {

                from: "Auth Client Web Dev",
                to: email,
                subject: "OTP Verification Code",
                text: `${otp} is your verification code`
            }

            transporter.sendMail(mailOptions, (error, info) => {

                if (error) {
                    console.log(error);
                    return res.status(500).json({ error: "Failed sending an email!" })
                }

                return res.status(200).json("Otp sent to your email...")

            })

            return res.status(200).json({
                message: "Successfully registered!", data: {

                    user: newUser,
                    token
                }
            })

        }

        else {
            return res.json({ error: "Passwords do not match!" })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Registration failed!" })


    }

}

export const authController = async (req, res) => {

    try {

        const user = await userModel.findOne({ _id: req.body.userId })

        if (!user) {
            return res.status(200).json({ error: "user not found!" })
        }

        else {
            return res.status(200).json({
                message: "user found", data: {
                    user
                },
                success: true
            })
        }


    } catch (error) {
        console.log(error);
        return this.status(500).res({ error: "Auth error!" })

    }

}


export const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email) {
            return res.status(200).json({ error: "email is required!" })
        }

        if (!password) {
            return res.status(200).json({ error: "password is required!" })
        }

        if (password.length < 6) {
            return res.status(200).json({ error: "password must be atleast 6 characters long!" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(200).json({ error: "invalid login details!" })
        }

        const match = await comparePassword(password, user.password)

        if (!match) {
            return res.status(200).json({ error: "invalid login attempt!" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {

            expiresIn: "1d"
        })

        return res.status(200).json({
            message: "logged in successfully", data: {
                user: user,
                token
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Auth error!" })

    }

}

export const verifyOtp = async (req, res) => {

    const { otp, email } = req.body

    try {

        if (!otp) {
            return res.status(200).json({ error: "otp is required!" })
        }

        console.log(otp.length);
        console.log(`Your otp is ${otp}`);

        console.log(`Your email is ${email}`);


        if (otp.length != 6) {
            return res.status(200).json({ error: "otp must be 6 digits!" })

        }

        const user = await userModel.findOne({ email })


        if (user.otp === Number(otp)) {
            user.isVerified = true
            await user.save()
            return res.status(200).json({ message: "otp verified!", success: true })
        }

        else {

            return res.status(200).json({ error: "invalid otp!", success: false })
        }

        //156056



    } catch (error) {

        console.log(error);
        return res.status(500).json({ error: "otp failed!" })


    }


}


export const createFood = async (req, res) => {

    const { name, description, price, category, weight, foodImage, specificationName } = req.body


    try {

        if (!name) {
            return res.json({ error: "name is required!" })
        }

        if (!description) {
            return res.json({ error: "description is required!" })
        }

        if (!price) {
            return res.json({ error: "price is required!" })
        }

        if (!category) {
            return res.json({ error: "category is required!" })
        }

        if (!weight) {
            return res.json({ error: "weight is required!" })
        }

        if (!specificationName) {
            return res.status(200).json({ error: "specification is required!" })
        }

        const saveFood = await foodModel.create({ name, description, price, category, weight, foodImage, specificationName })


        return res.status(200).json({
            message: "successfully added!", success: true, data: {
                food: saveFood
            }
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Invalid!", success: false })

    }

}

export const getAllFood = async (req, res) => {

    try {

        const { category } = req.query
        console.log(category);

        if (category === "All") {
            const food = await foodModel.find()
            return res.status(200).json({
                message: "successfully added!", success: true, data: {
                    food: food
                }
            })

        }

        else {
            const food = await foodModel.find({ category: category })
            return res.status(200).json({
                message: "successfully added!", success: true, data: {
                    food: food
                }
            })

        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!", success: false })

    }

}

export const get_food = async (req, res) => {

    try {

        const all_food = await foodModel.find({})

        if (!all_food) {
            return res.status(200).json({ error: 'No info Found On The Database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                all_food: all_food
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })
    }

}

export const getFoodById = async (req, res) => {

    const { id } = req.params

    try {

        const food = await foodModel.findById(id)

        return res.status(200).json({
            message: "Successfully found food!", success: true, data: {
                food: food
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const getNewFood = async (req, res) => {

    try {

        const newFood = await foodModel.find({}).limit(12)

        return res.status(200).json({
            message: "Food Fetched Successfully!", success: true, data: {
                newFood: newFood
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error!" })

    }

}

//fetches the first 4 unique documents (Array List)

export const getProductsFromDistinctCategory = async (req, res) => {

    try {

        const distinctCategory = await foodModel.distinct("category")

        const distinctFood = await Promise.all(

            distinctCategory.slice(0, 4).map(async (category) => {

                const food = await foodModel.findOne({ category })

                return food

            })

        )

        return res.status(200).json({
            message: 'successfully fetched!', success: true, data: {
                food: distinctFood
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

//Get top rated products
export const getTopRatedProducts = async (req, res) => {

    try {

        const topRated = await foodModel.find().sort({ 'reviews.rating': -1 }).limit(4)

        return res.status(200).json({
            message: 'successfully', success: true, data: {

                food: topRated

            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const getProfile = async (req, res) => {

    const { name, email, country, state, city, zipCode, profileImage, userId } = req.body

    try {


        if (!name) {
            return res.status(200).json({ error: 'name is required!' })
        }

        if (!email) {
            return res.status(200).json({ error: 'email is required!' })
        }

        if (!country) {
            return res.status(200).json({ error: 'country is required!' })
        }

        if (!state) {
            return res.status(200).json({ error: 'state is required!' })
        }

        if (!city) {
            return res.status(200).json({ error: 'city is required!' })
        }

        if (!zipCode) {
            return res.status(200).json({ error: 'zipcode is required!' })
        }

        if (!profileImage) {
            return res.status(200).json({ error: 'profile picture is required!' })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(200).json({ error: 'User not found!' })
        }

        user.name = name || user.name
        user.email = email || user.email
        user.country = country || user.country
        user.state = state || user.state
        user.city = city || user.city
        user.zipCode = zipCode || user.zipCode
        user.profileImage = profileImage || user.profileImage

        await user.save()

        return res.status(200).json({
            message: "successfully uploaded profile", success: true, data: {
                user
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

//payment

// PayFast sandbox details from .env
const merchantId = process.env.PAYFAST_MERCHANT_ID;
const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
const paymentUrl = process.env.PAYFAST_PAYMENT_URL;

// Create Order and redirect to PayFast sandbox
export const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, name, suburb, phone, address, buildingAddress, province, city, postalCode } = req.body; // Get order details from the frontend

        //  console.log("Request Body:", req.body);
        // console.log(`Phone is ${phone}`);

        //step 1 Save the address of the user in the database


        const userAddressInfo = new addressModel({

            user: user._id,
            name: name,
            suburb: suburb,
            phone: phone,
            address: address,
            buildingAddress: buildingAddress,
            province: province,
            city: city,
            postalCode: postalCode

        })

        const savedAddress = await userAddressInfo.save()


        // Step 2: Save the order to the database
        const newOrder = new orderModel({
            user: user._id,
            address_id: savedAddress._id,
            items: items,
            totalAmount: totalAmount,
            payment: false,
            status: 'canceled' // Default status is pending
        });


        const savedOrder = await newOrder.save();

        // Step 2: Prepare PayFast payment data
        const paymentData = {
            merchant_id: merchantId,
            merchant_key: merchantKey,
            amount: totalAmount.toFixed(2), // Ensure amount is formatted as a decimal
            item_name: `Order for ${user.name}`, // Order description
            name_first: user.name,
            email_address: user.email,
            custom_str1: savedOrder._id.toString(), // Pass the order ID to PayFast as reference
            notify_url: 'https://8351-102-214-117-92.ngrok-free.app/payfast-itn',  // This is your ngrok URL for ITN
            return_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
            payment_method: 'dc',
            currency: 'ZAR'
        };

        // Step 3: Generate PayFast signature
        const signature = generateSignature(paymentData);
        paymentData['signature'] = signature;


        // Step 4: Send the user to the PayFast payment URL
        res.json({
            paymentUrl: `${paymentUrl}?${new URLSearchParams(paymentData).toString()}`
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Failed to create order');
    }
};

// Function to generate PayFast signature

function generateSignature(data) {
    // Sort parameters alphabetically and build the query string
    const sortedKeys = Object.keys(data).sort();
    const paramString = sortedKeys
        .map(key => `${key}=${encodeURIComponent((data[key] || '').trim()).replace(/%20/g, "+")}`)
        .join("&");

    // Log paramString for debugging
    console.log('Signature String:', paramString);

    // Generate and return the MD5 hash signature
    return crypto.createHash('md5').update(paramString).digest('hex');
}

//Function to verify PayFast signature
function verifyPayFastSignature(data) {
    const pfParamString = Object.keys(data)
        .filter(key => key !== 'signature') // Exclude the signature itself
        .map(key => `${key}=${encodeURIComponent((data[key] || '').trim()).replace(/%20/g, "+")}`)
        .join("&");

    const generatedSignature = crypto.createHash('md5').update(pfParamString).digest('hex');
    return generatedSignature === data.signature;
}

// Webhook route to handle payment confirmation from PayFast
export const handlePayFastITN = async (req, res) => {

    console.log('ITN received:', new Date().toISOString());
    console.log('ITN body:', req.body);

    try {
        // Step 1: Extract the payment data sent by PayFast
        const paymentData = req.body;
        const orderId = paymentData.custom_str1; // The order ID passed to PayFast

        // Step 2: Verify PayFast signature
        const isValidSignature = verifyPayFastSignature(paymentData);

        if (!isValidSignature) {
            return res.status(400).send('Invalid signature');
        }

        // Step 3: Update the order's payment status to true
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { payment: true, status: 'paid' }, // Update payment and status
            { new: true }
        ).populate("user");

        if (!updatedOrder) {
            return res.status(404).send('Order not found');
        }




        //Send email after payment

        const transporter = nodeMail.createTransport({

            service: "Gmail",
            auth: {
                user: "tinisthera@gmail.com",
                pass: "evhrsmudgmuasuxk"
            }
        })

        const mailOptions = {

            from: 'Trade Clothing',
            to: updatedOrder.user.email,
            subject: 'Payment Confirmation',
            html: `
             <body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">
                <div style="background-color: #ffffff; padding: 20px; max-width: 600px; margin: 0 auto; border-radius: 10px; text-align: center;">
                    <p style="font-size: 18px; font-weight: bold; margin: 0; padding: 10px 0;">
                       Tasty Eats | Payment Confirmation | ${orderId}
                    </p>
                    <p style="font-size: 16px; margin: 20px 0;">
                        Hi <strong>${updatedOrder.user.name}</strong>,
                    </p>
                    <p style="font-size: 16px; margin: 20px 0;">
                        Thank you, we've received your payment for order <strong>#${orderId}</strong>.
                    </p>
                    <p style="font-size: 16px; margin: 20px 0;">
                     Your order is being processed and your estimated delivery is ${updatedOrder.deliveryTimeframe}.
                    </p>
                    <p style="font-size: 16px; margin: 20px 0;">
                        This email serves as proof of your payment. You can show it to the admin as needed.
                    </p>
                    <p style="font-size: 16px; margin: 40px 0;">
                        <a href="https://yourwebsite.com/order/${orderId}" style="display:inline-block; background-color:#4CAF50; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">
                            View Your Order
                        </a>
                    </p>
                     <p style="font-size: 16px; margin: 20px 0;">
                     Regards,
                    </p>
                     <p>
                     The Tasty Eats Team
                    </p>

                </div>
            </body>`
        }

        await transporter.sendMail(mailOptions)
        console.log('Email sent successfully!');


        //After a successful payment redirect to the success page
        return res.redirect('http://localhost:5173/success')

        // Step 4: Send acknowledgment to PayFast
    } catch (error) {
        console.error('Error processing PayFast IPN:', error);
        res.status(500).send('Failed to process payment');
    }
};


//Track order by user id

export const getOrderByUser = async (req, res) => {

    try {

        const { userId } = req.query

        //console.log(userId);

        const user = await orderModel.find({ user: userId }).populate("user").populate("items.food").populate("address_id")


        if (!user) {
            return res.status(200).json({ error: 'user not found!' })
        }

        return res.status(200).json({
            message: 'user found!', success: true, data: {
                order: user
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error!" })

    }
}

export const getAllOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({}).populate("user").populate('items.food').populate("address_id")

        if (!orders) {
            return res.status(200).json({ error: "no orders found!" })
        }

        return res.status(200).json({
            message: "Orders found!", success: true, data: {
                orders: orders
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" })

    }

}

export const getAddressByOrderId = async (req, res) => {

    const { id } = req.query


    try {

        const address = await orderModel.findById({ _id: id }).populate("address_id")

        if (!address) {
            return res.status(200).json({ error: 'address not found!', success: true })
        }

        return res.status(200).json({
            message: 'address found!', success: true, data: {
                address: address
            }
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const getSpecificationByProductId = async (req, res) => {

    try {

        const { foodId } = req.query

        const spec = await specificationModel.find({ food: foodId })

        if (!spec) {
            return res.status(200).json({ error: 'food not found!' })
        }

        return res.status(200).json({
            message: 'food found!', success: true, data: {

                specification: spec

            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })

    }

}

function hashOTP(otp, secret) {

    return crypto.createHmac('sha256', secret).update(otp).digest('hex')
}


export const getGenOtp = async (req, res) => {

    const { email } = req.body
    const secret = process.env.OTP_SECRET

    try {

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(200).json({ error: 'User not found!', success: false })
        }

        // check if there is an existing otp


        if (!email) {
            return res.status(200).json({ error: 'email is required!' })
        }



        const otp = genOtp.generate(6, {

            digits: true,
            lowerCase: false,
            uppCase: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false

        })

        const transporter = nodeMail.createTransport({

            service: "Gmail",
            auth: {

                user: "tinisthera@gmail.com",
                pass: "evhrsmudgmuasuxk"
            }
        })

        const mailOptions = {

            from: 'Auth Client Web Dev',
            to: email,
            subject: 'OTP Verification Code',
            text: `Your Verification Code Is ${otp}`
        }

        transporter.sendMail(mailOptions, (err, info) => {

            if (err) {
                return res.status(200).json({ error: 'Failed sending an email!' })
            }

            return res.status(200).json({ message: 'Email sent successfully' })

        })

        const expiration = new Date(Date.now() + 5 * 60 * 1000)
        const hashedOTP = hashOTP(otp, secret)

        const updatedOtp = await otpModel.findOneAndUpdate({ email: user.email }, { otp: hashedOTP, expiration }, { upsert: true, new: true })

        return res.status(200).json({
            message: 'OTP sent!', success: true, data: {

                userOtp: updatedOtp

            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const compareOtp = async (req, res) => {

    const { otp, email } = req.body
    const secret = process.env.OTP_SECRET


    // console.log(hashedcompOtp);


    try {

        const user = await otpModel.findOne({ email })

        if (!otp) {
            return res.status(200).json({ error: 'otp is required!' })
        }

        if (otp.length != 6) {
            return res.status(200).json({ error: 'OTP must be 6 digits!' })
        }

        const hashedcompOtp = hashOTP(otp, secret)
        // console.log(otp);


        if (hashedcompOtp == user.otp) {

            user.Is_verified = true
            await user.save()

            console.log("Hello");

            return res.status(200).json({
                message: 'otp verified!', success: true, data: {

                    otpInfo: user

                }
            })

        }

        if (hashedcompOtp != user.otp) {
            return res.status(200).json({ error: 'Invalid otp!' })

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server error!' })

    }

}

export const changePassword = async (req, res) => {

    try {

        const { Is_verified, email, password, confirmPassword } = req.body


        if (!password) {
            return res.status(200).json({ error: 'password is required!' })
        }

        if (!confirmPassword) {
            return res.status(200).json({ error: 'confirm password is required!' })
        }

        if (password.length < 6) {
            return res.status(200).json({ error: 'password must be 6 characters long!' })
        }

        if (confirmPassword.length < 6) {
            return res.status(200).json({ error: 'confirm password must be 6 characters long!' })
        }

        const user = await otpModel.findOne({ email })

        if (Is_verified) {

            if (password === confirmPassword) {


                const change_pass = await userModel.findOne({ email })

                const hashedChangedPass = await hashPassword(password)
                const hashedChangedConfirmPass = await hashconfirmPassword(confirmPassword)

                change_pass.password = hashedChangedPass || change_pass.password
                change_pass.confirmPassword = hashedChangedConfirmPass || change_pass.confirmPassword

                await change_pass.save()

                return res.status(200).json({ message: 'Password changed successfully!', success: true })

            }

            else {
                return res.status(200).json({ error: 'Passwords do not match!', success: false })
            }

        }

        else {
            return res.status(200).json({ error: 'User not verified!', success: false })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

// filtering

export const filterStatus = async (req, res) => {

    const { status } = req.query

    //  console.log(status);

    try {

        if (status == "") {
            const paymentStatus = await orderModel.find({}).populate("user").populate("address_id").populate("items.food")
            return res.status(200).json({
                message: '', success: true, data: {
                    paymentStatus: paymentStatus
                }
            })
        }


        const paymentStatus = await orderModel.find({ status: status }).populate("items.food")

        if (!paymentStatus) {
            return res.status(200).json({ error: 'payment status not found', success: false })
        }

        return res.status(200).json({
            message: 'payment status filtered!', success: true, data: {
                paymentStatus: paymentStatus
            }
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const filterPrice = async (req, res) => {

    const { priceRange } = req.query

    let totalAmount = {}


    try {

        if (priceRange == "All") {
            const priceFilter = await orderModel.find({}).populate("items.food")

            return res.status(200).json({
                message: '', success: true, data: {
                    priceFilter: priceFilter
                }
            })
        }

        else if (priceRange == "0-50") {

            totalAmount = { $gte: 0, $lte: 50 }

            const priceFilter = await orderModel.find({ totalAmount: totalAmount }).populate("items.food")
            return res.status(200).json({
                message: '', success: true, data: {
                    priceFilter: priceFilter
                }
            })

        }

        else if (priceRange == "50-100") {

            totalAmount = { $gte: 50, $lte: 100 }

            const priceFilter = await orderModel.find({ totalAmount: totalAmount }).populate("items.food")

            return res.status(200).json({
                message: '', success: true, data: {
                    priceFilter: priceFilter
                }
            })

        }


        else if (priceRange == "100-150") {
            totalAmount = { $gte: 100, $lte: 150 }

            const priceFilter = await orderModel.find({ totalAmount: totalAmount }).populate("items.food")

            return res.status(200).json({
                message: '', success: true, data: {
                    priceFilter: priceFilter
                }
            })
        }

        else if (priceRange == "over150") {

            totalAmount = { $gt: 150 }

            const priceFilter = await orderModel.find({ totalAmount: totalAmount }).populate("items.food")

            return res.status(200).json({
                message: '', success: true, data: {
                    priceFilter: priceFilter
                }
            })

        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const filterByDate = async (req, res) => {

    const { startDate, endDate } = req.query
    let createdAt = {}

    try {

        if (startDate && endDate) {

            const start = new Date(startDate)
            const end = new Date(endDate)

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(200).json({ error: 'invalid date format!', success: false })
            }

            // console.log(startDate);
            // console.log(endDate);

            start.setHours(0, 0, 0, 0)
            end.setUTCHours(23, 59, 59, 999)

            createdAt = { $gte: start, $lte: end }

            console.log(createdAt);

            //GET THE LATEST DATE
            const dateFilter = await orderModel.find({ createdAt: createdAt }).sort({ createdAt: -1 }).populate("items.food")

            /*
            console.log("Number of orders found:", dateFilter.length);
            console.log("Query:", JSON.stringify({ createdAt: createdAt }));

            */

            return res.status(200).json({
                message: '', success: true, data: {
                    dateFilter: dateFilter
                }
            })
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

//UPDATE SHIPPING STATUS

export const updateShippingStatus = async (req, res) => {

    const { id, shippingStatus } = req.body

    try {

        const shipping_update = await orderModel.findById(id)

        if (shipping_update) {

            shipping_update.shippingStatus = shippingStatus || shipping_update.shippingStatus

            if (shippingStatus == "Shipped") {
                shipping_update.shippingDate = new Date()
            }
            else {
                shipping_update.deliveredDate = new Date()
            }

            await shipping_update.save()
            return res.status(200).json({
                message: 'updated successfully', success: true, data: {
                    shipping_update: shipping_update
                }
            })
        }

        else {
            return res.status(200).json({ error: 'Failed to update', success: false })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const getOrderById = async (req, res) => {

    const { id } = req.query

    try {

        const order = await orderModel.findById(id).populate("user").populate("address_id").populate("items.food")

        if (!order) {
            return res.status(200).json({ error: 'Order not found!', success: false })
        }

        return res.status(200).json({
            message: 'Order found!', success: true, data: {
                order: order
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error' })
    }

}

export const add_our_promise = async (req, res) => {

    try {

        const { title, description } = req.body

        if (!title) {
            return res.status(200).json({ error: 'Title is required!' })
        }

        if (!description) {
            return res.status(200).json({ error: 'description is required!' })
        }

        const promise = await promiseModel.create({ title, description })

        return res.status(200).json({
            message: 'Added successfully!', success: true, data: {
                promise: promise
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const get_our_promise = async (req, res) => {

    try {

        const our_promise = await promiseModel.find({})

        if (!our_promise) {
            return res.status(200).json({ error: 'No information found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                our_promise: our_promise
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const get_our_promise_by_id = async (req, res) => {

    const { id } = req.query

    try {

        const our_promise = await promiseModel.findById(id)


        return res.status(200).json({
            message: '', success: true, data: {
                our_promise: our_promise
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}


export const get_our_mission_by_id = async (req, res) => {

    const { id } = req.query

    try {
        const mission = await missionModel.findById(id)

        if (!mission) {
            return res.status(200).json({ error: 'No data found!' })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                mission: mission
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}


export const get_our_vision_by_id = async (req, res) => {

    const { id } = req.query

    try {
        const vision = await visionModel.findById(id)

        if (!vision) {
            return res.status(200).json({ error: 'No data found!' })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                vision: vision
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const get_our_core_values_by_id = async (req, res) => {

    const { id } = req.query

    try {
        const core_values = await valuesModel.findById(id)

        if (!core_values) {
            return res.status(200).json({ error: 'No data found!' })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                core_values: core_values
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}

export const update_our_promise = async (req, res) => {

    try {

        const { id, title, description } = req.body

        const our_promise = await promiseModel.findById(id)


        if (!our_promise) {
            return res.status(200).json({ error: 'No values found!', success: false })
        }

        our_promise.title = title || our_promise.title
        our_promise.description = description || our_promise.description

        await our_promise.save()

        return res.status(200).json({
            message: 'updated successfully!', success: true, data: {
                our_promise: our_promise
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const remove_our_promise = async (req, res) => {

    const { id } = req.query

    console.log(id);


    try {

        const our_promise = await promiseModel.findByIdAndDelete(id)

        if (!our_promise) {
            return res.status(200).json({ error: 'Our promise content is not found!', success: false })
        }

        return res.status(200).json({ message: 'Removed Successfully!', success: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const add_our_services = async (req, res) => {

    const { ourServiceHeading, ourServiceDescription, ourServiceImage } = req.body


    try {

        if (!ourServiceHeading) {
            return res.status(200).json({ error: 'Our service heading is required!', success: false })
        }

        if (!ourServiceDescription) {
            return res.status(200).json({ error: 'Our service description is required!', success: false })
        }


        const services = await our_servicesModel.create({ ourServiceHeading, ourServiceDescription, ourServiceImage })

        return res.status(200).json({
            message: 'Our Services Added!', success: true, data: {
                services: services
            }
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const get_our_services = async (req, res) => {

    try {

        const our_services = await our_servicesModel.find({})

        if (!our_services) {
            return res.status(200).json({ error: 'No information found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                our_services: our_services
            }
        })


    } catch (error) {

        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })
    }

}

export const get_our_services_by_id = async (req, res) => {


    const { id } = req.query


    try {

        const our_services = await our_servicesModel.findById(id)

        if (!our_services) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                our_services: our_services
            }
        })

    } catch (error) {
        console.log(error);

    }


}


export const edit_our_services = async (req, res) => {

    const { id, ourServiceHeading, ourServiceDescription, ourServiceImage } = req.body

    console.log(id);


    try {

        if (!ourServiceHeading) {
            return res.status(200).json({ error: 'Our service heading is required!', success: false })
        }

        if (!ourServiceDescription) {
            return res.status(200).json({ error: 'Our service description is required!', success: false })
        }


        const our_services = await our_servicesModel.findById(id)

        if (!our_services) {
            return res.status(200).json({ error: 'No Information found!', success: false })
        }

        our_services.ourServiceHeading = ourServiceHeading || our_services.ourServiceHeading
        our_services.ourServiceDescription = ourServiceDescription || our_services.ourServiceDescription
        our_services.ourServiceImage = ourServiceImage || our_services.ourServiceImage

        await our_services.save()

        return res.status(200).json({
            message: 'Successfully Updated!', success: true, data: {
                our_services: our_services
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const remove_our_services = async (req, res) => {

    const { id } = req.query

    try {

        const our_services = await our_servicesModel.findByIdAndDelete(id)

        if (!our_services) {
            return res.status(200).json({ error: 'No information Found!', success: false })
        }

        return res.status(200).json({ message: 'Deleted Successfully!', success: true })


    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}


export const add_about_us = async (req, res) => {


    const { aboutUsHeading, aboutUsDescription, aboutUsImage } = req.body

    try {

        if (!aboutUsHeading) {
            return res.status(200).json({ error: 'About us heading is required!', success: false })
        }

        if (!aboutUsDescription) {
            return res.status(200).json({ error: 'About us description is required!', success: false })
        }

        const about_us = await aboutUsModel.create({ aboutUsHeading, aboutUsDescription, aboutUsImage })

        return res.status(200).json({
            message: 'Added successfully!', success: true, data: {
                about_us: about_us
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const add_mission = async (req, res) => {

    const { missionHeading, missionDescription } = req.body


    try {

        if (!missionHeading) {
            return res.status(200).json({ error: 'Mission heading is required!', success: false })
        }

        if (!missionDescription) {
            return res.status(200).json({ error: 'Mission description is required!', success: false })
        }

        const mission = await missionModel.create({ missionHeading, missionDescription })

        return res.status(200).json({
            message: 'Added Successfully!', success: true, data: {
                mission: mission
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const add_vision = async (req, res) => {

    const { visionHeading, visionDescription } = req.body


    try {

        if (!visionHeading) {
            return res.status(200).json({ error: 'Vision heading is required!', success: false })
        }

        if (!visionDescription) {
            return res.status(200).json({ error: 'Vision description is required!', success: false })
        }

        const vision = await visionModel.create({ visionHeading, visionDescription })

        return res.status(200).json({
            message: 'Added successfully!', success: true, data: {
                vision: vision
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}


export const add_values = async (req, res) => {

    const { valuesHeading, valuesDescription } = req.body


    try {

        if (!valuesHeading) {
            return res.status(200).json({ error: 'Values heading is required!', success: false })
        }

        if (!valuesDescription) {
            return res.status(200).json({ error: 'Values description is required!', success: false })
        }

        const values = await valuesModel.create({ valuesHeading, valuesDescription })

        return res.status(200).json({
            message: 'Added successfully!', success: true, data: {
                values: values
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}


export const get_about_us = async (req, res) => {

    try {

        const about_us = await aboutUsModel.find({})

        if (!about_us) {
            return res.status(200).json({ error: 'No Data Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                about_us: about_us
            }
        })



    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}


export const get_mission = async (req, res) => {

    try {

        const mission = await missionModel.find({})

        if (!mission) {
            return res.status(200).json({ error: 'No Data Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                mission: mission
            }
        })



    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}


export const get_vision = async (req, res) => {

    try {

        const vision = await visionModel.find({})

        if (!vision) {
            return res.status(200).json({ error: 'No Data Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                vision: vision
            }
        })



    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const get_values = async (req, res) => {

    try {

        const values = await valuesModel.find({})

        if (!values) {
            return res.status(200).json({ error: 'No Data Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                values: values
            }
        })



    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}

export const edit_about_us = async (req, res) => {

    const { id, aboutUsHeading, aboutUsDescription, aboutUsImage } = req.body



    try {

        if (!aboutUsHeading) {
            return res.status(200).json({ error: 'About us heading is required!', success: false })
        }

        if (!aboutUsDescription) {
            return res.status(200).json({ error: 'About us description is required!', success: false })
        }


        const edit_about_us = await aboutUsModel.findById(id)

        if (!edit_about_us) {
            return res.status(200).json({ error: 'No Informatiion Found!', success: false })
        }

        edit_about_us.aboutUsHeading = aboutUsHeading || edit_about_us.aboutUsHeading
        edit_about_us.aboutUsDescription = aboutUsDescription || edit_about_us.aboutUsDescription
        edit_about_us.aboutUsImage = aboutUsImage || edit_about_us.aboutUsImage

        await edit_about_us.save()

        return res.status(200).json({
            message: 'Successfully Updated!', success: true, data: {
                edit_about_us: edit_about_us
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }


}


export const edit_mission = async (req, res) => {

    const { id, missionUsHeading, missionDescription } = req.body


    try {

        if (!missionUsHeading) {
            return res.status(200).json({ error: 'Our mission heading is required!', success: false })
        }

        if (!missionDescription) {
            return res.status(200).json({ error: 'Mission description is required!', success: false })
        }


        const mission = await missionModel.findById(id)

        if (!mission) {
            return res.status(200).json({ error: 'No Informatiion Found!', success: false })
        }

        mission.missionHeading = missionHeading || mission.missionHeading
        mission.missionDescription = missionDescription || mission.missionDescription

        await mission.save()

        return res.status(200).json({
            message: 'Successfully Updated!', success: true, data: {
                mission: mission
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }


}


export const edit_vision = async (req, res) => {

    const { id, visionHeading, visionDescription } = req.body


    try {

        if (!visionHeading) {
            return res.status(200).json({ error: 'Our vision heading is required!', success: false })
        }

        if (!visionDescription) {
            return res.status(200).json({ error: 'Vision description is required!', success: false })
        }


        const vision = await visionModel.findById(id)

        if (!vision) {
            return res.status(200).json({ error: 'No Informatiion Found!', success: false })
        }

        vision.visionHeading = visionHeading || vision.visionHeading
        vision.visionDescription = visionDescription || vision.visionDescription

        await vision.save()

        return res.status(200).json({
            message: 'Successfully Updated!', success: true, data: {
                vision: vision
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }


}



export const edit_core_values = async (req, res) => {

    const { id, valuesHeading, valuesDescription } = req.body


    try {

        if (!valuesHeading) {
            return res.status(200).json({ error: 'Our values heading is required!', success: false })
        }

        if (!valuesDescription) {
            return res.status(200).json({ error: 'Our values description is required!', success: false })
        }


        const values = await valuesModel.findById(id)

        if (!values) {
            return res.status(200).json({ error: 'No Informatiion Found!', success: false })
        }

        values.valuesHeading = valuesHeading || values.valuesHeading
        values.valuesDescription = valuesDescription || values.valuesDescription

        await values.save()

        return res.status(200).json({
            message: 'Successfully Updated!', success: true, data: {
                values: values
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }


}


export const remove_about_us = async (req, res) => {

    const { id } = req.query

    try {

        const about_us = await aboutUsModel.findByIdAndDelete(id)

        if (!about_us) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: 'Deleted Successfully!', success: true, data: {
                about_us: about_us
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}


export const remove_mission = async (req, res) => {

    const { id } = req.query

    try {

        const mission = await missionModel.findByIdAndDelete(id)

        if (!mission) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: 'Deleted Successfully!', success: true, data: {
                mission: mission
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const remove_vission = async (req, res) => {

    const { id } = req.query

    try {

        const vision = await visionModel.findByIdAndDelete(id)

        if (!vision) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: 'Deleted Successfully!', success: true, data: {
                vision: vision
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const remove_values = async (req, res) => {

    const { id } = req.query

    try {

        const values = await valuesModel.findByIdAndDelete(id)

        if (!values) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: 'Deleted Successfully!', success: true, data: {
                values: values
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const get_about_us_by_id = async (req, res) => {

    const { id } = req.query

    console.log(`ID IS ${id}`);


    try {

        const about_us = await aboutUsModel.findById(id)

        if (!about_us) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                about_us: about_us
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}

export const edit_food = async (req, res) => {

    const { id, name, description, price, category, weight, foodImage, specificationName } = req.body

    console.log(id);
    

    try {

        if (!name) {
            return res.json({ error: "name is required!", success: false })
        }

        if (!description) {
            return res.json({ error: "description is required!", success: false })
        }

        if (!price) {
            return res.json({ error: "price is required!", success: false })
        }

        if (!category) {
            return res.json({ error: "category is required!", success: false })
        }

        if (!weight) {
            return res.json({ error: "weight is required!", success: false })
        }

        if (!specificationName) {
            return res.status(200).json({ error: "specification is required!", success: false })
        }

        const food = await foodModel.findById(id)

        if (!food) {
            return res.json({ error: "No Data Found", success: false })
        }

        food.name = name || food.name
        food.description = description || food.description
        food.price = price || food.price
        food.category = category || food.category
        food.weight = weight || food.weight
        food.foodImage = foodImage || food.foodImage
        food.specificationName = specificationName || food.specificationName

        await food.save()

        return res.status(200).json({
            message: 'Updated successfully!', success: true, data: {
                food: food
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const remove_food = async (req, res) => {

    const { id } = req.query

    try {

        const food = await foodModel.findByIdAndDelete(id)

        if (!food) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: 'Deleted Successfully!', success: true, data: {
                food: food
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })

    }

}



export const search_food = async (req, res) => {

    const { term } = req.query


    try {


        const food_search = await foodModel.find({ name: { $regex: term, $options: 'i' } })

        return res.status(200).json({
            message: '', success: true, data: {
                food: food_search
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error Searching...!' })

    }


}


export const get_food_by_id = async (req, res) => {

    const { id } = req.query

    try {

        const get_food = await foodModel.findById(id)

        if (!get_food) {
            return res.status(200).json({ error: 'No Information Found!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                get_food: get_food
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Internal Server Error!' })
    }

}


/*

Discover A World Of Flavors At Taste Hub
At the heart of Taste Hub lies a deep appreciation for the art of food. We believe that every ingredient has a story, every recipe a rich history, and every bite a chance to uncover new depths of flavor. That's why we've dedicated ourselves to curating the finest, most unique food products from artisanal producers and small-batch purveyors around the globe. Each selection in our collection reflects our commitment to quality, authenticity, and the joy of discovery.


Our Vision
To be the world's most trusted curator of exceptional food products, making global culinary treasures accessible to food enthusiasts everywhere while supporting sustainable practices and artisanal producers.


Our Mission
To connect food lovers with extraordinary flavors and stories from around the world, while supporting small-batch producers and promoting sustainable food practices that benefit both people and planet.


Sustainability
We prioritize eco-friendly practices and support farms that share our commitment to environmental stewardship.

Global Heritage
Every product we source celebrates the unique culinary traditions and cultural heritage of its origin.

Quality Excellence
We maintain rigorous standards in selecting only the finest ingredients and products for our customers.

*/