import React, { useEffect } from 'react'
import '../css/leave.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast'

function Leave() {

    const [leaves, setLeaves] = useState([])

    async function handle_fetch() {

        try {
            const res = await axios.get("https://prodigy-fs-02-ems-backend-app.onrender.com/getAllLeaves")

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

    useEffect(() => {

        handle_fetch()

    }, [])


    return (
        <>

            <div className='leave-heading'>

                <h2>Manage Leaves</h2>

            </div>


            <div className='leaves-container' style={{marginBottom: '5rem'}}>


                <div className='leave-left'>


                </div>


                <div className='leave-right'>

                    <NavLink to={"/add-leave"} style={{ textDecoration: 'none' }} className='btnAdd'>+ Add Leave</NavLink>

                </div>

            </div>


            <div className='sick-leave-container' style={{ marginTop: '2rem' }}>

                <table className='table table-bordered' style={{width: '80rem'}}>

                    <thead>

                        <tr>

                            <th className='text-center'>LEAVE TYPE</th>
                            <th className='text-center'>FROM</th>
                            <th className='text-center'>TO</th>
                            <th className='text-center'>DESCRIPTION</th>
                            <th className='text-center'>APPLIED DATE</th>
                            <th className='text-center'>STATUS</th>

                        </tr>


                    </thead>

                    <tbody>


                        {leaves.map((leave) => (


                            <tr>

                                <td className='text-center'>{leave?.leaveType}</td>
                                <td className='text-center'>{new Date(leave?.fromDate).toLocaleDateString('en-CA')}</td>
                                <td className='text-center'>{new Date(leave?.ToDate).toLocaleDateString('en-CA')}</td>
                                <td className='text-center'>{leave?.description}</td>
                                <td className='text-center'>{new Date(leave?.appliedDate).toLocaleDateString('en-CA')}</td>
                                <td className='text-center'>

                                    {leave?.status}

                                </td>

                            </tr>

                        ))}

                    </tbody>


                </table>

            </div>

        </>
    )
}

export default Leave
