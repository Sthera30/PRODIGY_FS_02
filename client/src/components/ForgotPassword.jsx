import React, { useState } from 'react'
import '../css/forgotPassword.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {

    const [data, setData ] = useState({ email: '' })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const { email } = data


        try {


            const res = await axios.post(`https://mern-food-ordering-app-7.onrender.com/getOtp`, { email })


            if (res.data.error) {

                toast.error(res.data.error)

            }

            else{
                toast.success(res.data.message)
                localStorage.setItem('email', email)
                navigate("/verify-code")
            }



        } catch (error) {

            localStorage.clear()
            console.log(error);

        }
    }

    return (

        <>

            <div className='reset-container'>

                <div className='reset-inner'>

                    <h2>Forgot Password</h2>

                    <form onSubmit={handle_submit}>

                        <input type="email" name='email' placeholder='Enter your email' onChange={(e) => setData({ ...data, email: e.target.value })} />
                        <button type='submit'>Send OTP</button>

                    </form>

                </div>


            </div>

        </>


    )
}

export default ForgotPassword
