import React, { useEffect, useState } from 'react'
import '../css/editEmployees.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditEmployee() {


  const [data, setData] = useState({ name: '', email: '', dob: '', gender: '', department: '', position: '', maritalStatus: '', salary: '' })

  const { id } = useParams()

  const navigate = useNavigate()

  async function handle_fetch_employees_by_id(id) {

    try {

      const res = await axios.get(`https://prodigy-fs-02-ems-backend-app.onrender.com/getEmployeeById?id=${id}`)

      if (res.data.success) {
        setData(res.data.data.employee)
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

    const { name, email, dob, gender, department, position, maritalStatus, salary } = data

    try {


      const res = await axios.put("https://prodigy-fs-02-ems-backend-app.onrender.com/updateEmployee", { id, name, email, dob, gender, department, position, maritalStatus, salary })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/manage-employees")
      }

      else {
        toast.error(res.data.error)
      }


    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {

    handle_fetch_employees_by_id(id)

  }, [id])

  return (
    <>

      <div className='edit-employee-container'>

        <h1>Edit Employees</h1>

        <div className='edit-employee-inner'>

          <form onSubmit={handle_submit}>

            <label>Name</label>
            <input type="text" value={data.name} placeholder='Enter your name' onChange={(e) => setData({ ...data, name: e.target.value })} />

            <label>Email</label>
            <input type="email" value={data.email} placeholder='Enter your email' onChange={(e) => setData({ ...data, email: e.target.value })} />

            <label>DOB</label>
            <input type="date" placeholder='Enter your DOB' onChange={(e) => setData({ ...data, dob: e.target.value })} />

            <label>Gender</label>

            <select value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })}>

              <option>Male</option>
              <option>Female</option>
              <option>Other</option>

            </select>

            <label>Department</label>

            <select value={data.department} onChange={(e) => setData({ ...data, department: e.target.value })}>

              <option>HR</option>
              <option>IT</option>
              <option>Finance</option>

            </select>

            <label>Position</label>
            <input type="text" value={data.position} placeholder='Enter employee position' onChange={(e) => setData({ ...data, position: e.target.value })} />


            <label>Marital Status</label>

            <select value={data.maritalStatus} onChange={(e) => setData({ ...data, maritalStatus: e.target.value })}>

              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>


            </select>


            <label>Salary</label>
            <input type="number" value={data.salary} placeholder='Enter employee salary' onChange={(e) => setData({ ...data, salary: e.target.value })} />

            <button type='submit'>Update Employee</button>

          </form>

        </div>

      </div>

    </>
  )
}

export default EditEmployee
