import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ManageAboutUs() {

    const [isDeleted, setIsDeleted] = useState(false)

    const [data, setData] = useState({
        aboutUsHeading: '', aboutUsDescription: '', aboutUsImage: ''
    })
    const [mission, setMission] = useState({ missionHeading: '', missionDescription: '' })
    const [vision, setVision] = useState({ visionHeading: '', visionDescription: '' })
    const [values, setValues] = useState({ valuesHeading: '', valuesDescription: '' })
    const [uploading, setUploading] = useState(false)
    const [image, setImage] = useState({})

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        if (data.aboutUsHeading && data.aboutUsDescription && data.aboutUsImage) {
            await handle_add_about_us()
        }

        if (mission.missionHeading && mission.missionDescription) {
            await handle_add_mision()
        }

        if (vision.visionHeading && vision.visionDescription) {
            await handle_add_vision()

        }

        if (values.valuesHeading && values.valuesDescription) {
            await handle_add_values()

        }


    }

    async function handle_add_about_us() {

        if (uploading) {
            toast.error("Please wait for the image to finish uploading!")
            return null
        }

        const { aboutUsHeading, aboutUsDescription, aboutUsImage } = data

        try {

            const res = await axios.post(`http://localhost:8002/add_about_us`, { aboutUsHeading, aboutUsDescription, aboutUsImage })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about-us")
                setData({ aboutUsHeading: '', aboutUsDescription: '', aboutUsImage: '' })
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }


    }

    async function handle_add_mision() {



        const { missionHeading, missionDescription } = mission

        try {

            const res = await axios.post(`http://localhost:8002/add_mission`, { missionHeading, missionDescription })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about-us")
                setMission({ missionHeading: '', missionDescription: '' })

            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }


    }

    async function handle_add_vision() {



        const { visionHeading, visionDescription } = vision

        try {

            const res = await axios.post(`http://localhost:8002/add_vision`, { visionHeading, visionDescription })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about-us")
                setVision({ visionHeading: '', visionDescription: '' })
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }


    }

    async function handle_add_values() {



        const { valuesHeading, valuesDescription } = values

        try {

            const res = await axios.post(`http://localhost:8002/add_values`, { valuesHeading, valuesDescription })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about-us")
                setValues({ valuesHeading: '', valuesDescription: '' })
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }


    }



    async function handle_upload(e) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {

            const { data } = await axios.post(`http://localhost:8002/upload`, formData)

            setImage({
                url: data.url,
                public_id: data.public_id

            })
            setUploading(false)
            setData(prevData => ({ ...prevData, aboutUsImage: data.url }))

        } catch (error) {
            console.log(error);

        }


    }


    return (

        <>

            <div className='Our-Promise-Banner'>

                <h2>MANAGE ABOUT US</h2>

            </div>

            <div className='manage_promise_container'>


                <div className='manage_promise_inner sec' style={{ marginTop: '-6rem' }}>

                    <form onSubmit={handle_submit}>

                        <h3 style={{ marginBottom: '2rem' }}>Manage About Us</h3>

                        <h4 style={{ marginBottom: '2rem' }}>About Us</h4>

                        <div className='form-container'>

                            <label>About Us Heading</label>
                            <input type='text' placeholder='Enter a about us heading' onChange={(e) => setData({ ...data, aboutUsHeading: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label>About Us Description</label>
                            <textarea rows={3} cols={5} placeholder='Enter about us description' onChange={(e) => setData({ ...data, aboutUsDescription: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label htmlFor='upload'>Upload Image</label>
                            <input type='file' accept='image/*' id='upload' onChange={handle_upload} />

                        </div>

                        <div className='form-container'>

                            <label>Mission</label>
                            <input type='text' placeholder='Enter mission heading' onChange={(e) => setMission({ ...mission, missionHeading: e.target.value })} />
                            <textarea rows={3} cols={5} placeholder='Enter your mission statement' onChange={(e) => setMission({ ...mission, missionDescription: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label>Vision</label>
                            <input type='text' placeholder='Enter vision heading' onChange={(e) => setVision({ ...vision, visionHeading: e.target.value })} />
                            <textarea name="" id="" placeholder='Enter your vision statement' rows={3} cols={5} onChange={(e) => setVision({ ...vision, visionDescription: e.target.value })}></textarea>

                        </div>


                        <h4 style={{ margin: '1.2rem 0rem' }}>Core Values</h4>

                        <div className='form-container'>

                            <label>Heading</label>
                            <input type='text' placeholder='Enter a core value heading' onChange={(e) => setValues({ ...values, valuesHeading: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label>Description</label>
                            <textarea name="" id="" placeholder='Enter a core value description' rows={3} cols={5} onChange={(e) => setValues({ ...values, valuesDescription: e.target.value })}></textarea>

                        </div>

                        <button type='submit'>Save</button>

                    </form>

                </div>

            </div>
        </>
    )
}

export default ManageAboutUs
