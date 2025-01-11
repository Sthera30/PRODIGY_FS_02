import React, { useEffect, useState } from 'react'
import '../css/editSalary.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditSalary() {


    const [data, setData] = useState({ departmentId: '', employeeId: '', salary: '', allowance: '', deduction: '', paymentDate: '' })

    const [department, setDepartment] = useState([])
    const [employee, setEmployee] = useState([])

    const navigate = useNavigate()

    const { id } = useParams()


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

    async function handle_fetch_salaries_by_id(id) {

        try {

            const res = await axios.get(`https://prodigy-fs-02-backend.vercel.app/getSalaryById?id=${id}`)

            if (res.data.success) {
                setData(res.data.data.salaries)
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

        const { departmentId, employeeId, salary, allowance, deduction, paymentDate } = data

        try {

            const res = await axios.put('https://prodigy-fs-02-backend.vercel.app/updateSalaries', { id, departmentId, employeeId, salary, allowance, deduction, paymentDate })

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



    useEffect(() => {

        handle_fetch_department()
        handle_fetch_employee()

    }, [])

    useEffect(() => {

        handle_fetch_salaries_by_id(id)

    }, [id])

    return (
        <div className='add-salary-container'>

            <h2>Edit New Salary</h2>

            <form onSubmit={handle_submit}>

                <div className='salary-container-'>

                    <div className='salary-left-'>

                        <label>Department</label>
                        <select value={data.departmentId.departmentName} onChange={(e) => setData({ ...data, departmentId: e.target.value })}>

                            {department.map((departments) => (

                                <option key={departments._id} value={departments._id}>{departments.departmentName}</option>

                            ))}

                        </select>

                        <label>Basic Salary</label>
                        <input type="number" placeholder='Enter basic salary' value={data.salary} onChange={(e) => setData({ ...data, salary: e.target.value })} />

                        <label>Deductions</label>
                        <input type="number" placeholder='Enter monthly deduction' value={data.deduction} onChange={(e) => setData({ ...data, deduction: e.target.value })} />


                    </div>

                    <div className='salary-right-'>

                        <label>Employee</label>

                        <select value={data.employeeId.name} onChange={(e) => setData({ ...data, employeeId: e.target.value })}>

                            {employee.map((employees) => (

                                <option key={employees._id} value={employees._id}>{employees.name}</option>

                            ))}

                        </select>

                        <label>Allowances</label>
                        <input type="number" placeholder='Enter monthly allowances' value={data.allowance} onChange={(e) => setData({ ...data, allowance: e.target.value })} />

                        <label>Pay Date</label>
                        <input type="date" value={data.paymentDate} onChange={(e) => setData({ ...data, paymentDate: e.target.value })} />

                    </div>

                </div>

                <button type='submit'>Update salary</button>

            </form>

        </div>
    )
}

export default EditSalary
