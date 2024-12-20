import React, { useState } from 'react'
import '../css/verifyEmail.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function VerifyEmail() {

    const [data, setData] = useState({email: ''})

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const {email} = data

        try {

            const {data} = await axios.post(`http://localhost:8082/verifyEmail`, {email})

            if(data.success){
                navigate("/verify-otp")
                toast.success(data.message)
                setData({email: ''})
            }

            else{
                toast.error(data.error)
            }
            
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='verify-email-container'>

            <div className='verify-email'>

                <h2>Email Verification</h2>

                <form onSubmit={handle_submit}>

                    <input type='email' placeholder='Enter your email' name='email' onChange={(e) => setData({...data, email: e.target.value})} />

                    <button type='submit'>Submit</button>

                </form>

            </div>


        </div>
    )
}

export default VerifyEmail
