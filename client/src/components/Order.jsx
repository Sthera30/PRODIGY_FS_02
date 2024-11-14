import React, { useState } from 'react'
import '../css/order.css'
import imageLogo from '../assets/logo.png'
import { useCartContext } from '../context/cartContext.jsx'
import { useUserContext } from '../context/userContext.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, NavLink } from 'react-router-dom'
import PayFast from '../assets/Payfast-CMYK-300dpi-1024x276.jpg'
import { FaCreditCard, FaArrowLeft } from 'react-icons/fa'

function Order() {

    const { cartItems, addToCart, removeFromCart } = useCartContext()
    const { user } = useUserContext()
    const [data, setData] = useState({ name: '', suburb: '', phone: '', address: '', buildingAddress: '', province: '', city: '', postalCode: '' })
    const navigate = useNavigate()

    const cartItemsValues = Object.values(cartItems)
    const itemPrice = cartItemsValues.reduce((a, c) => a + c.price * c.qty, 0)
    const taxPrice = itemPrice * 0.14
    const tax = taxPrice.toFixed(2)
    const shippingFee = itemPrice === 0 ? 0 : 100
    const grandtotal = itemPrice + taxPrice + shippingFee

    async function handleFinish() {


        const { name, suburb, phone, address, buildingAddress, province, city, postalCode } = data


        try {

            const orderItems = cartItems.map(item => ({

                food: item._id,
                qty: item.qty

            }))

            const { data } = await axios.post(`https://mern-food-ordering-app-10.onrender.com/order`, {
                user: {
                    _id: user?.user?._id,
                    name: user?.user?.name,
                    email: user?.user?.email
                },
                items: orderItems,
                totalAmount: grandtotal,
                name,
                suburb,
                phone,
                address,
                buildingAddress,
                province,
                city,
                postalCode

            },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }

            )


            if (data.paymentUrl) {
                // Redirect to PayFast payment page
                window.location.href = data.paymentUrl;

            } else {
                toast.error('Failed to initiate payment. Fill all fields!');
            }

        } catch (error) {

            console.log(error);
            toast.error("something went wrong!")

        }

    }


    return (

        <>

            <div className='Our-Promise-Banner'>


                <FaCreditCard style={{ fontSize: '3rem', color: '#fff', marginBottom: '-9rem' }} />
                <h2 style={{ marginBottom: '-5rem', fontSize: '2rem' }}>FAST & SECURE PAYMENT</h2>

            </div>


            <div className='order-container'>

                <div className='shipping-container'>

                    <div className='shipping-method'>

                        <span>Shipping Information</span>
                        <p>Choose a shipping method</p>
                        <div className='standard-s'>

                            <span style={{ fontStyle: 'italic', fontWeight: '800' }}>Standard</span>

                        </div>

                    </div>

                    <div className='user-info'>

                        <div className='left-u'>

                            <input type="text" name='name' placeholder='Enter your name' onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <input type="tel" name='number' placeholder='Enter phone number' onChange={(e) => setData({ ...data, phone: e.target.value })} />
                            <input type="text" name='building' placeholder='Complex / Building (Optional)' onChange={(e) => setData({ ...data, buildingAddress: e.target.value })} />
                            <input type="text" name='city' placeholder='Enter city' onChange={(e) => setData({ ...data, city: e.target.value })} />

                        </div>

                        <div className='right-u'>

                            <input type='text' name='suburb' placeholder='Enter suburb' onChange={(e) => setData({ ...data, suburb: e.target.value })} />
                            <input type="text" name='address' placeholder='Enter street address' onChange={(e) => setData({ ...data, address: e.target.value })} />
                            <input type="text" name='province' placeholder='Enter province' onChange={(e) => setData({ ...data, province: e.target.value })} />
                            <input type="number" name='postal code' placeholder='Enter postal code' onChange={(e) => setData({ ...data, postalCode: e.target.value })} />

                        </div>

                    </div>

                </div>

                <div className='order-inner'>

                    <span>Transaction</span>
                    <div className='pay-container'>
                        <img src={PayFast} style={{ width: '10rem', height: '10rem', objectFit: 'contain' }} alt="" />
                    </div>

                    <div className='payment-method'>

                        <div className='payment-left'>

                            <p>Itmes Price: </p>
                            <p>Tax Price:</p>
                            <p>shipping Fee:</p>
                            <p>Total Price: </p>

                        </div>

                        <div className='payment-right'>

                            <p>{`R${itemPrice}`}</p>
                            <p>{`R${tax}`}</p>
                            <p>{`R${shippingFee}`}</p>
                            <p>{`R${grandtotal}`}</p>

                        </div>

                    </div>


                    <button className='btnPay' onClick={handleFinish}>pay {`R${grandtotal}`}</button>

                </div>

            </div>

        </>
    )
}

// 

export default Order
