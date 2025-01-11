import React from 'react'
import '../css/changePassword.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {

    const [data, setData] = useState({ currentPassword: '', newPassword: '' })


    const navigate = useNavigate()

    async function handle_change_password(e) {

        e.preventDefault()

        const email = localStorage.getItem("email");

        const { currentPassword, newPassword } = data

    

        try {

            const { data } = await axios.put(`https://prodigy-fs-02-backend.vercel.app/changePassword`, { currentPassword, newPassword, email })

            if (data.success) {
                toast.success(data.message)
                setData({ currentPassword: '', newPassword: '' })
                localStorage.clear()
                navigate("/login")
            }

            else {
                toast.error(data.error)
            }


        } catch (error) {
            console.log(error);
        }

    }


    return (

        <>

            <div className='change-password-container'>

                <form onSubmit={handle_change_password}>

                    <div className='chage-password-inner'>

                        <h2 style={{ textAlign: 'center', marginBottom: '.5rem' }}>Reset Password</h2>
                        <p style={{ textAlign: 'center', color: '#333', fontWeight: '300', marginBottom: '2.5rem' }}>Please enter your current and new password</p>

                        <span>Current password</span>
                        <input type="password" name='password' style={{ width: '100%' }} placeholder='Enter current password' onChange={(e) => setData({...data, currentPassword: e.target.value})} />
                        <span>New password</span>
                        <input type="password" name='password' style={{ width: '100%' }} placeholder='Enter new password' onChange={(e) => setData({...data, newPassword: e.target.value})} />
                        <button type='submit'>Update password</button>

                    </div>

                </form>


            </div>

        </>

    )
}

export default ChangePassword
