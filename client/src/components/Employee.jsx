import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import '../css/employee.css'


function Employee() {


    const [data, setData] = useState({ name: '', email: '', gender: '', dob: '', maritalStatus: '', department: '', position: '', password: '', confirmPassword: '' })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const { name, email, gender, dob, maritalStatus, department, position, password, confirmPassword } = data

        try {


            const res = await axios.post(`https://prodigy-fs-02-ems-backend-app.onrender.com/createEmployee`, { name, email, gender, dob, maritalStatus, department, position, password, confirmPassword }, {withCredentials: true})

            if (res.data.success) {
                toast.success(res.data.message)
                setData({ name: '', email: '', gender: '', dob: '', maritalStatus: '', department: '', position: '', password: '', confirmPassword: '' })
                navigate("/manage-employees")
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>

            <div className='employee-container'>

                <div className='employee-inner-container'>

                    <h2>Add Employee</h2>

                    <form onSubmit={handle_submit}>

                        <div className='employee-sub'>


                            <div className='employee-left'>

                                <label>Employee Name</label>
                                <input type="text" placeholder='Enter employee name' onChange={(e) => setData({ ...data, name: e.target.value })} />

                                <label>Employee Email</label>
                                <input type="email" placeholder='Enter employee email' onChange={(e) => setData({ ...data, email: e.target.value })} />


                                <label>Gender</label>

                                <select onChange={(e) => setData({ ...data, gender: e.target.value })}>

                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>

                                </select>

                                <label>Password</label>
                                <input type="password" placeholder='Enter employee password' onChange={(e) => setData({ ...data, password: e.target.value })} />


                            </div>

                            <div className='employee-right'>

                                <label>Date of Birth</label>
                                <input type="date" placeholder='Enter employee DOB' onChange={(e) => setData({ ...data, dob: e.target.value })} />

                                <label>Marital Status</label>

                                <select onChange={(e) => setData({ ...data, maritalStatus: e.target.value })}>

                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>

                                </select>

                                <label>Department</label>

                                <select onChange={(e) => setData({ ...data, department: e.target.value })}>

                                    <option>HR</option>
                                    <option>IT</option>
                                    <option>Finance</option>

                                </select>

                                <label>Position</label>

                                <select onChange={(e) => setData({ ...data, position: e.target.value })}>

                                    <option>Manager</option>
                                    <option>Software Engineer</option>
                                    <option>Accountant</option>

                                </select>

                            </div>


                        </div>


                        <div className='confirmPassword'>

                            <input type="password" placeholder='Confirm employee password' onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />


                        </div>


                        <button className='btnAddEmployee' type='submit'>Add employee</button>

                    </form>

                </div>


            </div>

        </>
    )
}

export default Employee
