import React, { useState } from 'react'
import { useUserContext } from '../context/userContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../css/verifyOtp.css'


function VerifyOtp() {

    const [ data, setData ] = useState({ otp: ''})


    const navigate = useNavigate()

    async function handle_compare(e) {

        e.preventDefault()

        const email = localStorage.getItem("email")

        const { otp } = data

        try {

            const { data } = await axios.put(`https://prodigy-fs-02-ems-backend-app.onrender.com/verifyOtp`, { otp, email })

            if (data.success) {
                toast.success(data.message)
                navigate("/change-password")
            }

            else {
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='verify-container'>


            <div className='verification'>

                <span>OTP Verification</span>
                <p>We have sent a code to your email address</p>

                <form onSubmit={handle_compare}>

                    <div className='button-co'>
                        <input type="number" placeholder='Enter Your Code' onChange={(e) => setData({...data, otp: e.target.value})} />
                        <button type='submit'>Verify Code</button>
                    </div>

                </form>

            </div>


        </div>
    )
}

export default VerifyOtp
