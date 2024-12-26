import React, { useState } from 'react'
import '../css/register.css'
import imgAvator from '../assets/avator.png'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Register() {


    const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '' })

    const navigate = useNavigate()

    async function handle_registration(e) {

        e.preventDefault()

        const { name, email, password, confirmPassword } = data

        try {

            const { data } = await axios.post(`https://prodigy-fs-02-ems-backend-app.onrender.com/register`, { name, email, password, confirmPassword }, {withCredentials: true})

            if (data.success) {
                toast.success(data.message)
                setData({name:'', email: '', password: '', confirmPassword: ''})
                localStorage.setItem('email', email)
                navigate("/login")
            }

            else {
                toast.error(data.error)
                localStorage.clear()
            }

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='register-container'>

            <div className='register-co'>



                <form onSubmit={handle_registration}>

                    <h2>Registration Page</h2>

                    <label>Name</label>
                    <input type="text" name='name' placeholder='Enter your name' onChange={(e) => setData({ ...data, name: e.target.value })} />

                    <label>Email</label>
                    <input type="email" name='email' placeholder='Enter your email' onChange={(e) => setData({ ...data, email: e.target.value })} />

                    <div className='passContainer'>

                        <div className='pass'>

                            <label>Password</label>
                            <input type="password" placeholder='Enter your password' onChange={(e) => setData({ ...data, password: e.target.value })} />

                        </div>

                        <div className='confirm'>

                            <label>Confirm Password</label>
                            <input type="password" placeholder='Confirm your password' onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />

                        </div>

                    </div>

                    <button type='submit' className='btnRegister'>Register</button>


                    <NavLink to={"/login"} className="ancLogin" style={{ color: '#333' }}>Already have an account?&nbsp;<span className='sign-in'>SIGN IN</span></NavLink>


                </form>

            </div>

        </div>
    )
}

export default Register
