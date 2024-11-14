import React, { useState } from 'react'
import '../css/register.css'
import imgAvator from '../assets/avator.png'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Register() {

    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const [data, setData] = useState({ name: '', email: '', password: '', confirmPassword: '', profileImage: '' })

    const navigate = useNavigate()

    async function handle_change(e) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)

        setUploading(true)

        try {

            const { data } = await axios.post("https://mern-food-ordering-app-8.onrender.com/upload", formData)

            setUploading(false)

            setImage({
                url: data.url,
                public_id: data.public_id
            })

            setData(prevData => ({ ...prevData, profileImage: data.url }))

        } catch (error) {
            console.log(error);

        }

    }

    async function handle_submit(e) {

        e.preventDefault()

        const updatedData = {
            ...data, profileImage: image?.url
        }


        const { name, email, password, confirmPassword, profileImage } = data

        try {

            const { data } = await axios.post("https://mern-food-ordering-app-8.onrender.com/register", { name, email, password, confirmPassword, profileImage })

            if (data.error) {
                toast.error(data.error)
            }

            else {
                setData({})
                toast.success("Successfully registered!")
                localStorage.setItem("token", data.data.token)
                navigate("/login")
            }

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='register-container'>

            <div className='register-co'>

                <div className='profile-co'>

                    <label htmlFor="image-upload">

                        <img src={image?.url || imgAvator} alt="" style={{ width: '5rem', height: '5rem', objectFit: 'contain', cursor: 'pointer', borderRadius: '50%' }} />

                    </label>

                    <span>Your Profile</span>
                    <input type="file" accept='image/*' id='image-upload' style={{ display: 'none' }} onChange={handle_change} />

                </div>

                <form onSubmit={handle_submit}>

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


                    <NavLink to={"/login"} className="ancLogin" style={{color:'#333'}}>Already have an account?&nbsp;<span className='sign-in'>SIGN IN</span></NavLink>


                </form>

            </div>

        </div>
    )
}

export default Register
