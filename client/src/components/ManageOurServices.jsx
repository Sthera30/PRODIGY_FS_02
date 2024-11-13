import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaLeaf, FaArrowLeft } from 'react-icons/fa'
import { useNavigate, NavLink } from 'react-router-dom'

function ManageOurServices() {

    const [data, setData] = useState({ iconName: '', ourServiceHeading: '', ourServiceDescription: '', ourServiceImage: '' })
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState({})


    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        if (uploading) {
            toast.error("Please wait for the image to finish uploading!")
        }

        const { ourServiceHeading, ourServiceDescription, ourServiceImage } = data

        try {

            const { data } = await axios.post('https://mern-food-ordering-app-7.onrender.com/addOurServices', { ourServiceHeading, ourServiceDescription, ourServiceImage })

            if (data.success) {
                toast.success(data.message)
                navigate("/our-services")
                setData({ ourServiceHeading: '', ourServiceDescription: '', ourServiceImage: '' })
            }

            else {
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_change(e) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {

            const { data } = await axios.post('https://mern-food-ordering-app-7.onrender.com/upload', formData)

            setImage({

                url: data.url,
                public_id: data.public_id
            })

            setUploading(false)
            setData(prevData => ({ ...prevData, ourServiceImage: data.url }))

        } catch (error) {
            console.log(error);

        }

    }


    return (

        <>

            <div className='Our-Promise-Banner'>

                <h2>MANAGE OUR SERVICES</h2>

            </div>

            <div className='arrow-left' style={{ marginBottom: '-13rem' }}>

                <NavLink to={"/"}>

                    <FaArrowLeft style={{ color: '#fff', width: '2.2rem', height: '2.2rem', lineHeight: '2', background: 'purple', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer', padding: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} />


                </NavLink>

            </div>


            <div className='manage_promise_container'>


                <div className='manage_promise_inner sec'>

                    <form onSubmit={handle_submit}>

                        <h3 style={{ marginBottom: '3rem' }}>Manage Our Services</h3>


                        <div className='form-container'>

                            <label>Our Service Heading</label>
                            <input type='text' placeholder='Enter our service heading' onChange={(e) => setData({ ...data, ourServiceHeading: e.target.value })} />

                        </div>


                        <div className='form-container'>

                            <label>Our Service Description</label>
                            <textarea name="" id="" placeholder='Enter description' rows={6} cols={10} onChange={(e) => setData({ ...data, ourServiceDescription: e.target.value })}></textarea>

                        </div>

                        <div className='form-container'>

                            <label htmlFor="upload">Upload Image</label>
                            <input type='file' accept='image/*' id='upload' onChange={handle_change} />

                        </div>

                        <button type='submit'>Save</button>

                    </form>

                </div>

            </div>

        </>

    )

}

export default ManageOurServices
