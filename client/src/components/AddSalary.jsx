import React, { useEffect, useState } from 'react'
import '../css/addSalary.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



function AddSalary() {


    const [data, setData] = useState({ departmentId: '', employeeId: '', salary: '', allowance: '', deduction: '', paymentDate: '' })

    const [department, setDepartment] = useState([])
    const [employee, setEmployee] = useState([])

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const { departmentId, employeeId, salary, allowance, deduction, paymentDate } = data

        try {

            const res = await axios.post('https://prodigy-fs-02-backend.vercel.app/addSalary', { departmentId, employeeId, salary, allowance, deduction, paymentDate })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/manage-salary")
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }

    }

    async function handle_fetch_department() {

        try {

            const res = await axios.get('https://prodigy-fs-02-backend.vercel.app/getAllDepartment')

            if (res.data.success) {
                setDepartment(res.data.data.department)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function handle_fetch_employee() {

        try {

            const res = await axios.get('https://prodigy-fs-02-backend.vercel.app/getAllEmployee')

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

    console.log(department);


    useEffect(() => {

        handle_fetch_department()
        handle_fetch_employee()

    }, [])

    return (
        <>

            <div className='add-salary-container'>

                <h2>Add New Salary</h2>

                <form onSubmit={handle_submit}>

                    <div className='salary-container-'>

                        <div className='salary-left-'>

                            <label>Department</label>
                            <select onChange={(e) => setData({ ...data, departmentId: e.target.value })}>

                                {department.map((departments) => (

                                    <option key={departments._id} value={departments._id}>{departments.departmentName}</option>

                                ))}

                            </select>

                            <label>Basic Salary</label>
                            <input type="number" placeholder='Enter basic salary' onChange={(e) => setData({ ...data, salary: e.target.value })} />

                            <label>Deductions</label>
                            <input type="number" placeholder='Enter monthly deduction' onChange={(e) => setData({ ...data, deduction: e.target.value })} />


                        </div>

                        <div className='salary-right-'>

                            <label>Employee</label>

                            <select onChange={(e) => setData({ ...data, employeeId: e.target.value })}>

                                {employee.map((employees) => (

                                    <option key={employees._id} value={employees._id}>{employees.name}</option>

                                ))}

                            </select>

                            <label>Allowances</label>
                            <input type="number" placeholder='Enter monthly allowances' onChange={(e) => setData({ ...data, allowance: e.target.value })} />

                            <label>Pay Date</label>
                            <input type="date" onChange={(e) => setData({ ...data, paymentDate: e.target.value })} />

                        </div>

                    </div>

                    <button>Add salary</button>

                </form>

            </div>

        </>
    )
}

export default AddSalary
