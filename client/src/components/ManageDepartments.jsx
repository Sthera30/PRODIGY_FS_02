import React, { useEffect, useState } from 'react'
import {NavLink}from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import '../css/manageDepartments.css'


function ManageDepartments() {



    const [departments, setDepartments] = useState([])


    async function handle_fetch_departments() {


        try {

            const res = await axios.get(`https://prodigy-fs-02-ems-backend-app.onrender.com/getAllDepartment`)

            if (res.data.success) {
                setDepartments(res.data.data.department)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }


    }

    async function handle_remove_departments(id) {

        try {

            const res = await axios.delete(`https://prodigy-fs-02-ems-backend-app.onrender.com/removeDepartment?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                handle_fetch_departments();
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {

        handle_fetch_departments();
        window.scrollTo(0, 0)

    }, [])


    return (
        <>

            <div className='heading-container' style={{marginLeft: '5rem'}}>

                <h2>Manage Departments</h2>

            </div>

            <div className='manage-department-container-' style={{margin: '2rem'}}>

                <div className='manage-department-left'>


                </div>

                <div className='manage-depart-right'>

                    <NavLink style={{ textDecoration: 'none' }} to={"/department"} className='btnAdd'> + &nbsp; Add Department</NavLink>

                </div>

            </div>

            <div className='table-container'>

                <table className='table table-bordered'>

                    <thead>

                        <tr>

                            <th className='text-center'>Department</th>
                            <th className='text-center'>Action</th>

                        </tr>


                    </thead>

                    <tbody>

                        {departments.map((department) => (

                            <tr>

                                <td className='text-center'>{department.departmentName}</td>
                                <td className='text-center'>

                                    <NavLink style={{ textDecoration: 'none' }} to={`/edit-department/${department._id}`} className='btnEdit'>Edit</NavLink>
                                    <button onClick={() => handle_remove_departments(department._id)}>Delete</button>

                                </td>

                            </tr>

                        ))}



                    </tbody>

                </table>

            </div>

        </>
    )
}

export default ManageDepartments
