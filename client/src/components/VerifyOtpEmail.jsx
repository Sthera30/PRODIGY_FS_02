import React, { useState } from 'react'
import '../css/verifyOtp.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function VerifyOtpEmail() {

    const [data, setData] = useState({ otp: '' })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const {otp} = data
        const email = localStorage.getItem("email")

        try {

            const { data } = await axios.post("http://localhost:8002/compareOtp", { otp, email })

            if (data.error) {
                toast.error(data.error)
            }

            else {
                toast.success("otp verified!")
                console.log(data.data.otpInfo.Is_verified);
                localStorage.setItem("Is_verified", data.data.otpInfo.Is_verified)
                navigate("/change-password")
            } 



        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='verify-container'>


            <div className='verification'>

                <span>Email Verification</span>
                <p>We have sent a code to your email address</p>

                <form onSubmit={handle_submit}>

                    <div className='button-co'>
                        <input type="number" placeholder='Enter Your Code' onChange={(e) => setData({ ...data, otp: e.target.value })} />
                        <button type='submit'>Verify Account</button>
                    </div>

                </form>

            </div>


        </div>
    )
}

export default VerifyOtpEmail
