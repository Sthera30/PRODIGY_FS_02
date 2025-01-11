import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import toast from 'react-hot-toast'

function EmpSalary() {


    const [salaries, setSalaries] = useState([])

    async function handle_fetch_salaries() {

        try {

            const res = await axios.get('https://prodigy-fs-02-backend.vercel.app/getAllSalaries')

            if (res.data.success) {
                setSalaries(res.data.data.salaries)
                // console.log(res.data.data.salaries);

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

                <h2>Salary History</h2>

            </div>



            <div className='table-container' >

                <table className='table table-bordered'>

                    <thead>

                        <tr>

                            <th className='text-center'>Employee</th>
                            <th className='text-center'>Salary</th>
                            <th className='text-center'>Allowance</th>
                            <th className='text-center'>Deduction</th>
                            <th className='text-center'>Total</th>
                            <th className='text-center'>PayDate</th>

                        </tr>

                    </thead>

                    <tbody>



                        {salaries.map((salary) => (


                            <tr>

                                <td className='text-center'>{salary.employeeId.name}</td>
                                <td className='text-center'>{`R${salary.salary}`}</td>
                                <td className='text-center'>{`R${salary.allowance}`}</td>
                                <td className='text-center'>{`R${salary.deduction}`}</td>
                                <td className='text-center'>{`R${(salary.salary + salary.allowance) - (salary.deduction)}`}</td>
                                <td className='text-center'>{`${new Date(salary.paymentDate).toLocaleDateString('en-CA')}`}</td>


                            </tr>

                        ))}


                    </tbody>

                </table>

            </div>

        </>
    )
}

export default EmpSalary



