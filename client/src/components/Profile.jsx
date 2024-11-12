import React, { useState } from 'react'
import '../css/profile.css'
import imgAvator from '../assets/avator.png'
import { useUserContext } from '../context/userContext.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Profile() {

    const { user, setUser } = useUserContext()
    const [data, setData] = useState({ name: '', email: '', country: '', state: '', city: '', zipCode: '', profileImage: '' })
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()

    async function handle_change(e) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {

            const { data } = await axios.post("http://localhost:8002/upload", formData)

            setImage({

                url: data.url,
                public_id: data.public_id

            })

            setUploading(false)

            setData(prevData => ({ ...prevData, profileImage: data.url }))


        } catch (error) {
            console.log(error);

        }

    }

    async function handle_submit(e) {

        console.log(data);


        e.preventDefault()

        const updated = {

            ...data, profileImage: image?.url
        }

        const { name, email, country, state, city, zipCode, profileImage } = data



        try {

            const { data } = await axios.put('http://localhost:8002/updateProfile', { name, email, country, state, city, zipCode, profileImage, userId: user?.user?._id }, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            })

            if (data.success) {
                toast.success("successfully updated!")
                setData({name: '', email: '', country: '', state: '', city: '', zipCode: '', profileImage: ''})
                navigate("/")
            }


            else {
                toast.error(data.error)

            }


        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='profile-container'>

            <form onSubmit={handle_submit}>

                <div className='profile-inner'>

                    <label htmlFor="upload">

                        <img src={imgAvator || user?.user?.profileImage} alt="" />
                        <p>Profile Picture</p>

                    </label>

                    <input type="file" accept='image/*' hidden id='upload' onChange={handle_change} />

                    <div className='input-container'>

                        <div className='input-left'>

                            <input type="text" placeholder={user?.user.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <input type="text" placeholder={user?.user.country} onChange={(e) => setData({ ...data, country: e.target.value })} />
                            <input type="text" placeholder={user?.user.city} onChange={(e) => setData({ ...data, city: e.target.value })} />

                        </div>

                        <div className='input-right'>

                            <input type="email" placeholder={user?.user?.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                            <input type="text" placeholder={user?.user?.state} onChange={(e) => setData({ ...data, state: e.target.value })} />
                            <input type="number" placeholder={user?.user?.zipCode} onChange={(e) => setData({ ...data, zipCode: e.target.value })} />

                        </div>

                    </div>

                    <button type='submit'>Update Profile</button>

                </div>

            </form>

        </div>
    )
}

export default Profile
