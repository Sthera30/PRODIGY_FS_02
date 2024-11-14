import React, { useEffect, useState } from 'react'
import '../css/ourPromise.css'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft, FaLeaf, FaUtensils, FaSmile, FaRocket, FaShieldAlt, FaSeedling } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useUserContext } from '../context/userContext.jsx'

function OurPromise() {

    const [promises, setPromises] = useState([])

    const { user } = useUserContext()


    async function fetch_promise() {

        try {

            const res = await axios.get(`https://mern-food-ordering-app-8.onrender.com/getPromise`)

            if (res.data.success) {
                setPromises(res.data.data.our_promise);
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }

    }

    async function remove_promise(id) {

        try {

            const { data } = await axios.delete(`https://mern-food-ordering-app-8.onrender.com/removePromise?id=${id}`)

            if (data.success) {
                toast.success(data.message)
                fetch_promise()
            }

            else {
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        fetch_promise()

    }, [])


    return (
        <>

            <div className='Our-Promise-Banner'>

                <h2>OUR PROMISE</h2>

            </div>

            <div className='arrow-left'>

                <NavLink to={"/"}>

                    <FaArrowLeft style={{ color: '#fff', width: '2.2rem', height: '2.2rem', lineHeight: '2', background: 'purple', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer', padding: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} />


                </NavLink>

            </div>



            <div className='our-promise-container sec'>


                {promises.map((promise) => (


                    <div className='our-promise-inner'>

                        <h3>{promise.title}</h3>
                        <p>{promise.description}</p>

                        <div className='date-container'>

                            <div className='cont-ainer'>


                            <div className='left-date'>

                                {user?.user?.role === "admin" ? (
                                    <NavLink className={"left-dat"} to={`/edit-promise/${promise._id}`} style={{ color: "#fff", textDecoration: 'none' }}>Edit</NavLink>
                                ) : ("")}

                            </div>

                            <div className='right-button'>

                            {user?.user?.role === "admin" ? (
                                <button className='btnDelete' onClick={() => remove_promise(promise._id)}>Delete</button>
                                ) : ("")}

                            </div>

                            </div>

                            <div className='right-date'>
                                <p>{new Date(promise.createdAt).toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}</p>
                            </div>

                        </div>

                    </div>


                ))}


            </div>

        </>
    )
}

export default OurPromise

