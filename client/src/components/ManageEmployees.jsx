import React, { useEffect, useState } from 'react'
import '../css/manageEmployees.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function ManageEmployees() {


    const [employees, setEmployees] = useState([])


    async function handle_fetch_employees() {


        try {

            const res = await axios.get(`https://prodigy-fs-02-backend.vercel.app/getAllEmployee`)

            if (res.data.success) {
                setEmployees(res.data.data.employee)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }


    }

    async function handle_remove_employee(id) {

        try {

            const res = await axios.delete(`https://prodigy-fs-02-backend.vercel.app/removeEmployee?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                handle_fetch_employees()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {

        handle_fetch_employees()
        window.scrollTo(0, 0)

    }, [])


    return (
        <>

            <div className='heading-container' style={{marginLeft: '-3rem'}}>

                <h2>Manage Employees</h2>

            </div>

            <div className='manage-employee-container-'>

                <div className='manage-employee-left'>


                </div>

                <div className='manage-employee-right' style={{marginTop: '8rem', marginBottom: '5rem'}}>

                    <NavLink style={{ textDecoration: 'none' }} to={"/employee"} className='btnAdd'> + &nbsp; Add Employee</NavLink>

                </div>

            </div>

            <div className='table-container'>

                <table className='table table-bordered'>

                    <thead>

                        <tr>

                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Gender</th>
                            <th className='text-center'>Action</th>

                        </tr>


                    </thead>

                    <tbody>

                        {employees.map((employee) => (

                            <tr>

                                <td className='text-center'>{employee.name}</td>
                                <td className='text-center'>{employee.email}</td>
                                <td className='text-center'>{employee.gender}</td>
                                <td className='text-center'>

                                    <NavLink to={`employee-details/${employee._id}`} style={{ textDecoration: 'none' }} className="button">View</NavLink>
                                    <NavLink style={{ textDecoration: 'none' }} to={`/edit-employee/${employee._id}`} className='btnEdit'>Edit</NavLink>
                                    <button onClick={() => handle_remove_employee(employee._id)}>Delete</button>

                                </td>

                            </tr>

                        ))}



                    </tbody>

                </table>

            </div>

        </>
    )
}

export default ManageEmployees
