import React from 'react'
import '../css/changePassword.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {


    const [data, setData] = useState({ Is_verified: localStorage.getItem("Is_verified"), email: localStorage.getItem("email"), password: '', confirmPassword: '' })

    const navigate = useNavigate()

    async function handle_updatePassword(e) {

        e.preventDefault()

        const { Is_verified, email, password, confirmPassword } = data


        try {

            const { data } = await axios.post('https://mern-food-ordering-app-7.onrender.com/changePassword', { Is_verified, email, password, confirmPassword })

            if (data.success) {
                toast.success(data.message)
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

                <form onSubmit={handle_updatePassword}>

                    <div className='chage-password-inner'>

                        <h2 style={{textAlign: 'center', marginBottom:'.5rem'}}>Change Password</h2>
                        <p style={{textAlign: 'center', color: '#333', fontWeight: '300', marginBottom: '2.5rem'}}>Please enter your current and new password</p>

                        <span>Current password</span>
                        <input type="password" name='password' style={{width: '100%'}} placeholder='Enter current password' onChange={(e) => setData({ ...data, password: e.target.value })} />
                        <span>New password</span>
                        <input type="password" name='password'  style={{width: '100%'}} placeholder='Enter new password' onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
                        <button type='submit'>Update password</button>

                    </div>

                </form>


            </div>

        </>

    )
}

export default ChangePassword
