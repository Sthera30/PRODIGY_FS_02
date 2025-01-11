import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/salary.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Salary() {


    const [salaries, setSalaries] = useState([])

    async function handle_fetch_salaries() {

        try {

            const res = await axios.get('https://prodigy-fs-02-backend.vercel.app/getAllSalaries')

            if (res.data.success) {
                setSalaries(res.data.data.salaries)
                console.log(res.data.data.salaries);

            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }



    async function handle_remove(id) {

        try {

            const res = await axios.delete(`https://prodigy-fs-02-backend.vercel.app/removeSalaries?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                handle_fetch_salaries()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {

        handle_fetch_salaries()

    }, [])

    return (
        <>

            <div className='salary-heading'>

                <h2>Manage Salaries</h2>

            </div>

            <div className='salary-container'>

                <div className='salary-left'>


                </div>


                <div className='salary-right'>

                    <NavLink to={"/add-salary"} className='btnAddSalary'>+ Add Salary</NavLink>

                </div>

            </div>

            <div className='table-container'>

                <table className='table table-bordered'>

                    <thead>

                        <tr>

                            <th className='text-center'>Department</th>
                            <th className='text-center'>Employee</th>
                            <th className='text-center'>Salary</th>
                            <th className='text-center'>Allowance</th>
                            <th className='text-center'>Action</th>

                        </tr>

                    </thead>

                    <tbody>



                        {salaries.map((salary) => (


                            <tr>

                                <td className='text-center'>{salary?.departmentId?.departmentName}</td>
                                <td className='text-center'>{salary?.employeeId?.name}</td>
                                <td className='text-center'>{`R${salary.salary}`}</td>
                                <td className='text-center'>{`R${salary.allowance}`}</td>

                                <td className='text-center'>

                                    <div className='button-container'>

                                        <NavLink style={{ textDecoration: 'none' }} to={`/edit-salary/${salary._id}`} className='btnEdit'>Edit</NavLink>
                                        <button onClick={() => handle_remove(salary._id)} className='btnDelete'>Delete</button>

                                    </div>

                                </td>

                            </tr>

                        ))}


                    </tbody>

                </table>

            </div>

        </>
    )
}

export default Salary
