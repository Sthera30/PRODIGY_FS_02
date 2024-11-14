import React, { useState } from 'react'
import imgLogo from '../assets/logo.png'
import '../css/login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {FaPizzaSlice} from 'react-icons/fa'

function Login() {

    const [data, setData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    async function handle_login(e) {

        e.preventDefault()

        const { email, password } = data

        try {

            const { data } = await axios.post("https://mern-food-ordering-app-7.onrender.com/login", { email, password }, {withCredentials: true})

            if (data.error) {
                toast.error(data.error)
            }

            else {
                setData({})
                localStorage.setItem("token", data.data.token)
                navigate("/")
            }


        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='login-container'>

            <div className='login'>

                <div className='logo-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

                <FaPizzaSlice style={{ color: 'orange', fontSize: '2.6rem', marginBottom: '1rem' }} />
                <span style={{fontSize:'2rem', maxWidth: '15rem', margin:'1.2rem 0rem', textAlign:'center'}}>Welcome to Taste Hub</span>
                <p style={{color: '#333', fontWeight: '300', fontSize: '1rem'}}>Where food lovers unite </p>

                </div>

                <form onSubmit={handle_login}>

                    <label>Email</label>
                    <input type="text" name='email' placeholder='Enter your email' onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <label>Password</label>
                    <input type="password" name='password' placeholder='Enter your password' onChange={(e) => setData({ ...data, password: e.target.value })} />


                    <div className='pass-con'>

                        <div className='pass-left'>


                        </div>

                        <div className='pass-right'>

                            <NavLink style={{textDecoration: 'none'}} to={"/reset-password"}>

                                <a href='#' style={{ marginBottom: '1rem', textDecoration: 'none', color: 'hsl(39, 93%, 47%)' }}>Forgot password ?</a>


                            </NavLink>

                        </div>

                    </div>

                    <button type='submit' className='btnSignIn'>Sign In</button>

                    <NavLink to={"/register"} style={{color: '#333', textDecoration: 'none'}}>Need an account? &nbsp; <span className='sign-up'>SIGN UP</span></NavLink>

                </form>

            </div>

        </div>
    )
}

export default Login
