import React, { useEffect, useState } from 'react'
import '../css/myProfile.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUserContext } from '../context/userContext.jsx';
import { useParams } from 'react-router-dom';

function MyProfile() {

    const [employee, setEmployee] = useState("")


    const { id } = useParams()

    const { user } = useUserContext()


    async function handle_fetch_by_id(id) {

        try {

            const res = await axios.get(`http://localhost:8082/getEmployeeById?id=${id}`)

            if (res.data.success) {
                setEmployee(res.data.data.employee)
            }
            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        handle_fetch_by_id(id)

    }, [id])


    return (
        <>

            {user?.role === "admin" ? (

                <div className='profile-container'>

                    <div className='profile-inner-container'>

                        <h2>Admin Details</h2>
                        <div className='profile-details'>

                            <p>Name: &nbsp; <span>{employee?.name}</span></p>
                            <p>Date of birth: &nbsp; <span>{new Date(employee?.DOB).toLocaleDateString('en-CA')}</span></p>
                            <p>Gender: &nbsp; <span>{employee?.gender}</span></p>
                            <p>Department: &nbsp; <span>{employee?.department}</span></p>
                            <p>Marital Status: &nbsp; <span>{employee?.maritalStatus}</span></p>

                        </div>

                    </div>

                </div>

            ) : (<div className='profile-container'>

                <div className='profile-inner-container'>

                    <h2>Employee Details</h2>
                    <div className='profile-details'>

                        <p>Name: &nbsp; <span>{employee?.name}</span></p>
                        <p>Date of birth: &nbsp; <span>{new Date(employee?.DOB).toLocaleDateString('en-CA')}</span></p>
                        <p>Gender: &nbsp; <span>{employee?.gender}</span></p>
                        <p>Department: &nbsp; <span>{employee?.department}</span></p>
                        <p>Marital Status: &nbsp; <span>{employee?.maritalStatus}</span></p>

                    </div>

                </div>

            </div>)}

        </>
    )
}

export default MyProfile
