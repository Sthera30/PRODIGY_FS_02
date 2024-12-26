import React, { useState } from 'react'
import '../css/employeeSickLeave.css'
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext.jsx';

function EmployeeSickLeave() {

    const {user} = useUserContext()

    const [data, setData] = useState({leaveType: '', fromDate: '', ToDate: '', description: ''})

    const employeeId = user?._id

    const navigate = useNavigate()

    async function handle_submit(e) {
        
        e.preventDefault()

        const {leaveType,  fromDate, ToDate, description} = data

        try {

            const res = await axios.post(`https://prodigy-fs-02-ems-backend-app.onrender.com/addLeave`, {leaveType, employeeId,  fromDate, ToDate, description})

            if(res.data.success){
                toast.success(res.data.message)
                navigate(`/my-leave/${user?._id}`)
            }

            else{
                toast.error(res.data.error)
            }

            
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <>

            <div className='employeeSickLeave-container'>


                <div className='employeeSickLeave-inner'>

                    <h2>Request for leave</h2>

                    <form onSubmit={handle_submit}>

                        <label>Leave Type</label>
                        <select onChange={(e) => setData({...data, leaveType: e.target.value})}>

                            <option>Sick Leave</option>
                            <option>Casual Leave</option>

                        </select>

                        <label>From Date</label>
                        <input onChange={(e) => setData({...data, fromDate: e.target.value})} type="date" />

                        <label>To Date</label>
                        <input onChange={(e) => setData({...data, ToDate: e.target.value})} type="date" />

                        <label>Description</label>
                        <input onChange={(e) => setData({...data, description: e.target.value})} type="text" placeholder='Enter your reason' />

                        <button type='submit'>Add Leave</button>

                    </form>

                </div>


            </div>


        </>
    )
}

export default EmployeeSickLeave
