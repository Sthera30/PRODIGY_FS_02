import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import genOTP from 'otp-generator'
import dotenv from 'dotenv'
import { userModel } from '../model/user.js'
import { hashPassword, hasConfrimPassword, hashOtp, compareOtp, comparePassword } from '../security/security.js'
import { otpModel } from '../model/otp.js'
import { employeeModel } from '../model/employee.js'
import { departmentModel } from '../model/Department.js'
import { salaryModel } from '../model/salary.js'
import { leaveModel } from '../model/leave.js'
dotenv.config()


export const register = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body

    try {

        if (!name) {
            return res.status(200).json({ error: 'Name is required!', success: false })
        }

        if (!email) {
            return res.status(200).json({ error: 'email is required!', success: false })
        }

        if (!password || password.length < 6) {
            return res.status(200).json({ error: 'password is required and must be atleast 6 characters!', success: false })
        }

        if (!confirmPassword || confirmPassword.length < 6) {
            return res.status(200).json({ error: 'confirm password is required and must be atleast 6 characters!', success: false })
        }

        const match = await userModel.findOne({ email })

        if (match) {
            return res.status(200).json({ error: 'Email already exists!', success: false })
        }

        if (password === confirmPassword) {


            //Increase security
            const hashPass = await hashPassword(password)
            const hashConfirmPass = await hasConfrimPassword(confirmPassword)

            const user = await userModel.create({ name: name, email: email, password: hashPass, confirmPassword: hashConfirmPass })


            //JWT stores user information

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {

                expiresIn: '1d'

            })


            //lets store the token in a cookie

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
            })


            return res.status(200).json({
                message: 'Successfully registered!', success: true, data: {
                    user: user,
                    token

                }
            })

        }

        else {
            return res.status(200).json({ error: 'Passwords do not match!', success: false })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to register', success: false })
    }

}


export const authUser = async (req, res) => {

    try {

        /*  const email = 'tinisthera@gmail.com'
  
          console.log(email);
          */

        const user = await employeeModel.findOne({ email: req.user.email })

        if (!user) {
            return res.status(200).json({ error: 'User not found!', success: false })

        }

        return res.status(200).json({
            message: 'User Found!', success: true, data: {
                user: user
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(200).json({ error: 'Failed Authenticating User!', success: false })
    }


}


export const create_otp = async (req, res) => {

    const { email } = req.body

    try {

        const otpGen = genOTP.generate(6, {

            digits: true,
            lowerCase: false,
            upperCase: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        })

        const hashedOtp = await hashOtp(otpGen)

        await otpModel.create({ otp: hashedOtp, userEmail: email })

        const transporter = nodemailer.createTransport({

            service: 'Gmail',
            auth: {

                user: 'tinisthera@gmail.com',
                pass: 'evhrsmudgmuasuxk'

            }

        })

        const mailOptions = {

            from: 'Food Eats Team',
            to: email,
            subject: 'OTP Verification Code',
            text: `${otpGen} is your verification code`

        }

        transporter.sendMail(mailOptions, (err, info) => {

            if (err) {
                return res.status(200).json({ error: 'Failed sending an email....', success: false })
            }

            return res.status(200).json({ message: 'Email sent...!', success: true })
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}


export const verifyOtp = async (req, res) => {

    const { otp, email } = req.body

    if (!otp) {
        return res.status(200).json({ error: 'OTP is required!', success: false })
    }

    if (otp.length != 6) {
        return res.status(200).json({ error: 'OTP must be 6 digits!', success: false })
    }

    try {

        const otp_ = await otpModel.findOne({ userEmail: email })

        const user = await userModel.findOne({ email: email })

        user.isVerified = true

        await user.save()

        // console.log(`Hello ${otp_}`);


        const isMatch = await compareOtp(otp, otp_.otp)


        if (!isMatch) {
            return res.status(200).json({ error: 'OTP Do Not Match!', success: false })
        }

        await otpModel.deleteOne({ otp: otp_.otp })

        return res.status(200).json({
            message: 'OTP Verified!', success: true, data: {
                otp_: otp_
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}


export const verifyEmail = async (req, res) => {

    const { email } = req.body

    if (!email) {
        return res.status(200).json({ error: 'Email is required!', success: false })
    }

    try {


        const otpGen = genOTP.generate(6, {

            digits: true,
            upperCase: false,
            lowerCase: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false

        })

        const hashedOtp = await hashOtp(otpGen)


        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'tinisthera@gmail.com',
                pass: 'evhrsmudgmuasuxk'
            }
        })

        const mailOptions = {
            from: 'Food Eats Team',
            to: email,
            subject: 'OTP Verification Code',
            text: `${otpGen} is your verification code`
        }

        transporter.sendMail(mailOptions, (err, info) => {

            if (err) {
                return res.status(200).json({ error: 'Failed sending an email...', success: false })
            }

            return res.status(200).json({ message: 'OTP sent successfully!', success: true })

        })


        const user_email = await userModel.findOne({ email })

        if (!user_email) {
            return res.status(200).json({ error: 'Please first register email address!', success: false })
        }

        await otpModel.create({ otp: hashedOtp, userEmail: email })


        return res.status(200).json({
            message: 'OTP sent to your email address!', success: true, data: {
                user_email: user_email
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }


}


export const change_password = async (req, res) => {

    const { currentPassword, newPassword, email } = req.body


    if (!currentPassword || !currentPassword.length > 6) {
        return res.status(200).json({ error: 'Current password is required and must be atleast 6 characters long!', success: false })
    }

    if (!newPassword || !newPassword.length > 6) {
        return res.status(200).json({ error: 'New password is required and must be atleast 6 characters long!!', success: false })
    }


    try {

        const user = await userModel.findOne({ email: email })

        if (user.isVerified) {

            if (currentPassword === newPassword) {

                const hashCurrentPassword = await hashPassword(currentPassword)
                const hashNewPassword = await hasConfrimPassword(newPassword)

                user.password = hashCurrentPassword || user.password
                user.confirmPassword = hashNewPassword || user.confirmPassword

                await user.save()

                return res.status(200).json({ message: 'Password changed successfully!', success: true })
            }

            else {
                return res.status(200).json({ error: 'Passwords Do Not Match!', success: false })
            }

        }

        else {
            return res.status(200).json({ error: 'Please verify your OTP sent to your email!', success: false })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }


}

export const loginUser = async (req, res) => {

    const { password, email } = req.body

    try {

        if (!email) {
            return res.status(200).json({ error: 'Email is required!', success: false })
        }

        if (!password) {
            return res.status(200).json({ error: 'Password is required!', success: false })
        }

        const user = await employeeModel.findOne({ email: email })



        if (!user) {
            return res.status(200).json({ error: 'invalid login details!', success: false })
        }

        //Used to store user info
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        //Store token in cookie

        res.cookie('token', token, {

            httpOnly: true,
            secure: false  //  since in local dev u are running ur app in http

        })

        //compare passwords

        const isMatch = await comparePassword(password, user.password)

        if (!isMatch) {
            return res.status(200).json({ error: 'Wrong Password!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                user: user,
                token
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }


}

export const logout = async (req, res) => {

    try {

        res.clearCookie('token', {

            httpOnly: true,
            secure: false  //use false in local dev since uare running ur code in http
        })

        return res.status(200).json({ message: 'Logged out successfully!', success: true })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Logout error!' })


    }


}

export const createEmployee = async (req, res) => {


    const { name, email, gender, dob, maritalStatus, department, position, password, confirmPassword } = req.body

    

    try {

        if (!name) {
            return res.status(200).json({ error: 'Name is required!', success: false })
        }

        if (!email) {
            return res.status(200).json({ error: 'email is required!', success: false })
        }

        if(!gender){
            return res.status(200).json({ error: 'gender is required!', success: false })
        }

        if (!dob) {
            return res.status(200).json({ error: 'dob is required!', success: false })
        }

        if (!maritalStatus) {
            return res.status(200).json({ error: 'marital status is required!', success: false })
        }

        if (!department) {
            return res.status(200).json({ error: 'department is required!', success: false })
        }

        if (!position) {
            return res.status(200).json({ error: 'position is required!', success: false })
        }

        if (!password || password.length < 6) {
            return res.status(200).json({ error: 'password is required and must be atleast 6 characters!', success: false })
        }

        if (!confirmPassword || confirmPassword.length < 6) {
            return res.status(200).json({ error: 'confirm password is required and must be atleast 6 characters!', success: false })
        }

        const match = await userModel.findOne({ email })

        if (match) {
            return res.status(200).json({ error: 'Email already exists!', success: false })
        }

        if (password === confirmPassword) {


            //Increase security
            const hashPass = await hashPassword(password)
            const hashConfirmPass = await hasConfrimPassword(confirmPassword)

            const user = await employeeModel.create({ name: name, email: email, gender:gender, DOB:dob, maritalStatus:maritalStatus, department: department, position:position, password: hashPass, confirmPassword: hashConfirmPass })


            //JWT stores user information

            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {

                expiresIn: '1d'

            })


            //lets store the token in a cookie

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
            })


            return res.status(200).json({
                message: 'Employee registered successfully!', success: true, data: {
                    user: user,
                    token

                }
            })

        }

        else {
            return res.status(200).json({ error: 'Passwords do not match!', success: false })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to register employee!', success: false })
    }

      

     /*   const employee_ = await employeeModel.create({ name: name, email: email, gender: gender, DOB:dob, maritalStatus:maritalStatus, department: department, position: position })

        return res.status(200).json({
            message: 'employee added successfully!', success: true, data: {
                employee_: employee_
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }
        */

}

export const get_all_employee = async (req, res) => {

    try {

        const employee = await employeeModel.find({})

        if (!employee) {
            return res.status(200).json({ error: 'No information found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                employee: employee
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}


export const get_employee_by_id = async (req, res) => {

    const { id } = req.query

    console.log(id);

    try {

        const employee = await employeeModel.findById(id)

        

        if (!employee) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                employee: employee
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }

// Register a user by yourself since u are ann admin
}

export const update_employee = async (req, res) => {

    const { id, name, email, department, position } = req.body

    try {


        if (!name) {
            return res.status(200).json({ error: 'Name is required!', success: false })
        }

        if (!email) {
            return res.status(200).json({ error: 'email is required!', success: false })
        }

        if (!department) {
            return res.status(200).json({ error: 'department is required!', success: false })
        }

        if (!position) {
            return res.status(200).json({ error: 'position is required!', success: false })
        }


        const employee = await employeeModel.findById(id)

        if (!employee) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        employee.name = name || employee.name
        employee.email = email || employee.email
        employee.department = department || employee.department
        employee.position = position || employee.position


        await employee.save()

        return res.status(200).json({
            message: 'Updated successfully!', success: true, data: {
                employee: employee
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const remove_employee = async (req, res) => {

    const {id} = req.query

    try {

        const employee = await employeeModel.findByIdAndDelete(id)

        if(!employee){
            return res.status(200).json({error: 'No data in the database found!', success: false})
        }

        return res.status(200).json({message: 'Deleted successfully!', success: true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal server error!'})
    }

}

//

export const createDepartment = async (req, res) => {


    const {departmentName } = req.body


    try {

        if (!departmentName) {
            return res.status(200).json({ error: 'Department name is required!', success: false })
        }


        const department = await departmentModel.create({departmentName: departmentName})

        return res.status(200).json({
            message: 'department added successfully!', success: true, data: {
                department: department
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })

    }

}

export const get_all_department = async (req, res) => {

    try {

        const department = await departmentModel.find({})

        if (!department) {
            return res.status(200).json({ error: 'No information found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                department: department
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}


export const get_department_by_id = async (req, res) => {

    const { id } = req.query

    try {

        const department = await departmentModel.findById(id)

        if (!department) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                department: department
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}

export const update_department = async (req, res) => {

    const { id, departmentName } = req.body

    try {


        if (!departmentName) {
            return res.status(200).json({ error: 'Department name is required!', success: false })
        }


        const department = await departmentModel.findById(id)

        if (!department) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        department.departmentName = departmentName || department.departmentName


        await department.save()

        return res.status(200).json({
            message: 'Updated successfully!', success: true, data: {
                department: department
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const remove_department = async (req, res) => {

    const {id} = req.query

    try {

        const department = await departmentModel.findByIdAndDelete(id)

        if(!department){
            return res.status(200).json({error: 'No data in the database found!', success: false})
        }

        return res.status(200).json({message: 'Deleted successfully!', success: true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal server error!'})
    }

}

export const add_salary = async (req, res) => {

    const {departmentId, employeeId, salary, allowance, deduction, paymentDate} = req.body

    try {

        if(!departmentId){
            return res.status(200).json({error: 'department is required!', success: false})
        }
        
        if(!employeeId){
            return res.status(200).json({error: 'employee is required!', success: false})
        }

        if(!salary){
            return res.status(200).json({error: 'salary is required!', success: false})
        }

        if(!allowance){
            return res.status(200).json({error: 'allowance is required!', success: false})
        }

        if(!deduction){
            return res.status(200).json({error: 'deduction is required!', success: false})
        }

        if(!paymentDate){
            return res.status(200).json({error: 'payment date is required!', success: false})
        }

        
        const salaries = await salaryModel.create({departmentId: departmentId, employeeId: employeeId, salary: salary, allowance: allowance, deduction: deduction, paymentDate: paymentDate})

        return res.status(200).json({message: 'Added successfully!', success: true, data: {
            salaries: salaries
        }})

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error!', success: false})
    }

}


export const get_all_salaries = async (req, res) => {

    try {

        const salaries = await salaryModel.find({}).populate('departmentId').populate("employeeId")

        if (!salaries) {
            return res.status(200).json({ error: 'No information found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                salaries: salaries
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}


export const get_salaries_by_id = async (req, res) => {

    const { id } = req.query

    try {

        const salaries = await salaryModel.findById(id)

        if (!salaries) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                salaries: salaries
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}


export const update_salaries = async (req, res) => {

    const { id, departmentId, employeeId, salary, allowance, deduction, paymentDate } = req.body

    try {

        if(!departmentId){
            return res.status(200).json({error: 'department is required!', success: false})
        }
        
        if(!employeeId){
            return res.status(200).json({error: 'employee is required!', success: false})
        }

        if(!salary){
            return res.status(200).json({error: 'salary is required!', success: false})
        }

        if(!allowance){
            return res.status(200).json({error: 'allowance is required!', success: false})
        }

        if(!deduction){
            return res.status(200).json({error: 'deduction is required!', success: false})
        }

        if(!paymentDate){
            return res.status(200).json({error: 'payment date is required!', success: false})
        }

        const salaries = await salaryModel.findById(id)

        if (!salaries) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        salaries.departmentId = departmentId || salaries.departmentId
        salaries.employeeId = employeeId || salaries.employeeId
        salaries.salary = salary || salaries.salary
        salaries.allowance = allowance || salaries.allowance
        salaries.deduction = deduction || salaries.deduction
        salaries.paymentDate = paymentDate || salaries.paymentDate

        await salaries.save()

        return res.status(200).json({
            message: 'Updated successfully!', success: true, data: {
                salaries: salaries
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const remove_salaries = async (req, res) => {

    const {id} = req.query

    try {

        const salaries = await salaryModel.findByIdAndDelete(id)

        if(!salaries){
            return res.status(200).json({error: 'No data in the database found!', success: false})
        }

        return res.status(200).json({message: 'Deleted successfully!', success: true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal server error!'})
    }

}

//

export const add_leave = async (req, res) => {

    const {leaveType, employeeId, fromDate, ToDate, description} = req.body

    try {

        if(!leaveType){
            return res.status(200).json({error: 'leave type is required!', success: false})
        }

        if(!employeeId){
            return res.status(200).json({error: 'employeeId is required!', success: false})
        }

        
        if(!fromDate){
            return res.status(200).json({error: 'from date is required!', success: false})
        }

        if(!ToDate){
            return res.status(200).json({error: 'To date is required!', success: false})
        }

        if(!description){
            return res.status(200).json({error: 'leave description is required!', success: false})
        }

        
        const leave = await leaveModel.create({leaveType: leaveType, employeeId: employeeId, fromDate: fromDate, ToDate: ToDate, description: description})

        return res.status(200).json({message: 'Added successfully!', success: true, data: {
            leave: leave
        }})

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal Server Error!', success: false})
    }

}


export const get_all_leave = async (req, res) => {

    try {

        const leave = await leaveModel.find({}).populate("employeeId")

        if (!leave) {
            return res.status(200).json({ error: 'No information found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                leave: leave
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}


export const get_leave_by_id = async (req, res) => {

    const { id } = req.query

    try {

        const leave = await leaveModel.findById(id).populate("employeeId")

        if (!leave) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        return res.status(200).json({
            message: '', success: true, data: {
                leave: leave
            }
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' })
    }


}


export const update_leaves = async (req, res) => {

    const { id, status } = req.body

    try {

        if(!status){
            return res.status(200).json({error: 'leave status is required!', success: false})
        }
        

        const leave = await leaveModel.findById(id)

        if (!leave) {
            return res.status(200).json({ error: 'No data found in the database!', success: false })
        }

        leave.status = status || leave.status

        await leave.save()

        return res.status(200).json({
            message: 'Updated successfully!', success: true, data: {
                leave: leave
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error!' })
    }

}

export const remove_leaves = async (req, res) => {

    const {id} = req.query

    try {

        const leave = await leaveModel.findByIdAndDelete(id)

        if(!leave){
            return res.status(200).json({error: 'No data in the database found!', success: false})
        }

        return res.status(200).json({message: 'Deleted successfully!', success: true})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internal server error!'})
    }

}