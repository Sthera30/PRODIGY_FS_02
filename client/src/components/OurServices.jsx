import React, { useEffect, useState } from 'react'
import img4 from '../assets/side-view-woman-paying-with-card.png'
import '../css/ourServices.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { useUserContext } from '../context/userContext'

function OurServices() {

    const [services, setServices] = useState([])

    const { user } = useUserContext()

    async function fetch_our_services() {

        try {

            const res = await axios.get('https://mern-food-ordering-app-10.onrender.com/getOurServices')

            if (res.data.success) {
                setServices(res.data.data.our_services)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }
    }

    async function handle_delete(id) {

        try {

            const { data } = await axios.delete(`https://mern-food-ordering-app-10.onrender.com/removeOurServices?id=${id}`)

            if (data.success) {
                toast.success(data.message)
                fetch_our_services()

            }

            else {
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {

        fetch_our_services()

    }, [])


    return (

        <>

            <div className='Our-Promise-Banner'>

                <h2>OUR SERVICES</h2>

            </div>

            <div className='our-services-container sec'>


                {services.map((service) => (



                    <div className='our-services-box'>


                        <h3>{service.ourServiceHeading}</h3>


                        <p>

                            {service.ourServiceDescription}

                        </p>

                        <div className='img-containers'>

                            <img src={service.ourServiceImage} alt="" />

                        </div>

                        <div className='btn-container'>

                            {user?.user?.role === "admin" ? (
                                <NavLink to={`/edit-our-promises/${service._id}`} className='btn_edit'>Edit</NavLink>

                            ) : ""}

                            {user?.user?.role === "admin" ? (
                                <button onClick={() => handle_delete(service._id)} className='btn_delete'>Delete</button>

                            ) : ""}
                        </div>

                    </div>


                ))}


            </div>

        </>

    )
}

export default OurServices
