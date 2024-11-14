import React, { useState } from 'react'
import '../css/verifyOtp.css'
import { useUserContext } from '../context/userContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


function VerifyOtp() {

    const { user } = useUserContext()

    const [data, setData] = useState({ otp: '', email: `${user?.user?.email}` })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const {otp, email} = data

        try {

            const { data } = await axios.post("https://mern-food-ordering-app-8.onrender.com/verify", { otp, email })

            if (data.error) {
                toast.error(data.error)
            }

            else {
                toast.success("otp verified!")
                navigate("/")
                location.reload()

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
                        <input type='hidden' placeholder='Enter your email' value={user?.user?.email} />
                        <button type='submit'>Verify Account</button>
                    </div>

                </form>

            </div>


        </div>
    )
}

export default VerifyOtp
