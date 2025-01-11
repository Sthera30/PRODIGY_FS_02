import React, { useEffect, useState } from 'react'
import '../css/leaveDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function LeaveDetails() {

    const [data, setData] = useState({ status: '' })

    const [leaves, setLeaves] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()


    async function get_leave_by_id(id) {

        try {

            const res = await axios.get(`https://prodigy-fs-02-backend.vercel.app/getLeaveById?id=${id}`)

            if (res.data.success) {
                setLeaves(res.data.data.leave)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }


    }

    async function handle_submit(e) {

        e.preventDefault()

        const { status } = data

        try {

            const res = await axios.put(`https://prodigy-fs-02-backend.vercel.app/updateLeaves`, { id, status })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/manage-leave")
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        get_leave_by_id(id)

    }, [id])

    return (

        <>

            <div className='leave-details-container'>

                <div className='leave-details-heading'>

                    <h2>Leave Details</h2>


                    <form onSubmit={handle_submit}>


                        <div className='leave-content'>

                            <p>Name:&nbsp;&nbsp; <span>{leaves?.employeeId?.name}</span></p>
                            <p>Lave Type: &nbsp;&nbsp;<span>{leaves?.leaveType}</span></p>
                            <p>Reason: &nbsp;&nbsp;<span>{leaves?.description}</span></p>
                            <p>Department: &nbsp;&nbsp;<span>{leaves?.employeeId?.department}</span></p>
                            <p>Start Date: &nbsp;&nbsp;<span>{new Date(leaves?.fromDate).toLocaleDateString('en-CA')}</span></p>
                            <p>End Date: &nbsp;&nbsp;<span>{new Date(leaves?.ToDate).toLocaleDateString('en-CA')}</span></p>

                            <div className='status-container'>

                                <label>Status</label>

                                <select onChange={(e) => setData({...data, status: e.target.value})}>

                                    <option>Accepted</option>
                                    <option>Rejected</option>

                                </select>

                            </div>

                            <button type='submit'>Update status</button>

                        </div>

                    </form>


                </div>

            </div>

        </>
    )
}

export default LeaveDetails
