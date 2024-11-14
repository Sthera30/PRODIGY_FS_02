import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function EditAboutUs() {


    const [aboutUs, setAboutUs] = useState({ aboutUsHeading: '', aboutUsDescription: '', aboutUsImage: '' })
    const [mission, setMission] = useState({ missionHeading: '', missionDescription: '' })
    const [vision, setVision] = useState({ visionHeading: '', visionDescription: '' })
    const [coreValues, setCoreValues] = useState({ valuesHeading: '', valuesDescription: '' })

    const { id } = useParams()

    const navigate = useNavigate()

    async function handle_fetch_about_us_by_id(id) {

        try {

            const { data } = await axios.get(`https://mern-food-ordering-app-10.onrender.com/get_about_us_by_id?id=${id}`)

            if (data.success) {
                setAboutUs(data.data.about_us)
            }

            else {
                // toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    async function handle_fetch_core_values_by_id(id) {

        try {

            const { data } = await axios.get(`https://mern-food-ordering-app-10.onrender.com/getCoreValuesById?id=${id}`)

            if (data.success) {
                setCoreValues(data.data.core_values)
            }

            else {
                // toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_fetch_vision_by_id(id) {

        try {

            const { data } = await axios.get(`https://mern-food-ordering-app-10.onrender.com/getVisionById?id=${id}`)

            if (data.success) {
                setVision(data.data.vision)
            }

            else {
                // toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_fetch_mission_by_id(id) {

        try {

            const { data } = await axios.get(`https://mern-food-ordering-app-10.onrender.com/getMissionById?id=${id}`)

            if (data.success) {
                setMission(data.data.mission)
            }

            else {
                //toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_edit_about_us(id) {

        const { aboutUsHeading, aboutUsDescription } = aboutUs

        try {

            const res = await axios.put(`https://mern-food-ordering-app-10.onrender.com/edit_about_us`, { id, aboutUsHeading, aboutUsDescription })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about_us")
                setAboutUs({ aboutUsHeading: '', aboutUsDescription: '' })
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_edit_mision(id) {

        const { missionHeading, missionDescription } = mission

        try {

            const res = await axios.put(`https://mern-food-ordering-app-10.onrender.com/edit_mission`, { id, missionHeading, missionDescription })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about_us")
                setMission({ missionHeading: '', missionDescription: '' })
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_edit_vision(id) {

        const { visionHeading, visionDescription } = vision

        try {

            const res = await axios.put(`https://mern-food-ordering-app-10.onrender.com/edit_vision`, { id, visionHeading, visionDescription })

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


    async function handle_edit_values(id) {

        const { valuesHeading, valuesDescription } = coreValues

        try {

            const res = await axios.put(`https://mern-food-ordering-app-10.onrender.com/edit_values`, { id, valuesHeading, valuesDescription })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/about_us")
                setCoreValues({ valuesHeading: '', valuesDescription: '' })
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }




    useEffect(() => {


        handle_fetch_about_us_by_id(id)
        handle_fetch_mission_by_id(id)
        handle_fetch_vision_by_id(id)
        handle_fetch_core_values_by_id(id)

    }, [id])

    async function handle_submit(e) {

        e.preventDefault()

        if (aboutUs.aboutUsHeading || aboutUs.aboutUsDescription) {
            handle_edit_about_us(id)
        }

        if (mission.missionHeading || mission.missionDescription) {
            handle_edit_mision(id)
        }

        if (vision.visionHeading || vision.visionDescription) {
            handle_edit_vision(id)
        }

        if (coreValues.valuesHeading || coreValues.valuesDescription) {
            handle_edit_values(id)
        }


    }


    return (
        <>

            <div className='Our-Promise-Banner'>

                <h2>EDIT ABOUT US</h2>

            </div>

            <div className='manage_promise_container'>


                <div className='manage_promise_inner sec' style={{ marginTop: '-6rem' }}>

                    <form>

                        <h3 style={{ marginBottom: '2rem' }}>Manage About Us</h3>

                        <h4 style={{ marginBottom: '2rem' }}>About Us</h4>

                        <div className='form-container'>

                            <label>About Us Heading</label>
                            <input type='text' placeholder='Enter a about us heading' value={aboutUs.aboutUsHeading} onChange={(e) => setAboutUs({ ...aboutUs, aboutUsHeading: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label>About Us Description</label>
                            <textarea rows={3} cols={5} placeholder='Enter about us description' value={aboutUs.aboutUsDescription} onChange={(e) => setAboutUs({ ...aboutUs, aboutUsDescription: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label htmlFor='upload'>Upload Image</label>
                            <input type='file' accept='image/*' id='upload' />

                        </div>

                        <div className='form-container'>

                            <label>Mission</label>
                            <input type='text' placeholder='Enter mission heading' value={mission.missionHeading} onChange={(e) => setMission({ ...mission, missionHeading: e.target.value })} />
                            <textarea rows={3} cols={5} placeholder='Enter your mission statement' value={mission.missionDescription} onChange={(e) => setMission({ ...mission, missionDescription: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label>Vision</label>
                            <input type='text' placeholder='Enter vision heading' value={vision.visionHeading} onChange={(e) => setVision({ ...vision, visionHeading: e.target.value })} />
                            <textarea name="" id="" placeholder='Enter your vision statement' value={vision.visionDescription} rows={3} cols={5} onChange={(e) => setVision({ ...vision, visionDescription: e.target.value })}></textarea>

                        </div>


                        <h4 style={{ margin: '1.2rem 0rem' }}>Core Values</h4>

                        <div className='form-container'>

                            <label>Heading</label>
                            <input type='text' placeholder='Enter a core value heading' value={coreValues.valuesHeading} onChange={(e) => setCoreValues({ ...coreValues, valuesHeading: e.target.value })} />

                        </div>

                        <div className='form-container'>

                            <label>Description</label>
                            <textarea name="" id="" placeholder='Enter a core value description' value={coreValues.valuesDescription} rows={3} cols={5} onChange={(e) => setData({ ...coreValues, valuesDescription: e.target.value })}></textarea>

                        </div>

                        <button type='submit' onClick={handle_submit}>Update</button>

                    </form>

                </div>

            </div>
        </>
    )
}

export default EditAboutUs
