import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import '../css/EditDepartment.css'

function EditDepartment() {

  const [data, setData] = useState({ departmentName: '' })

  const { id } = useParams()

  const navigate = useNavigate()


  async function handle_fetch_department_by_id(id) {

    try {

      const res = await axios.get(`https://prodigy-fs-02-ems-backend-app.onrender.com/getDepartmentById?id=${id}`)

      if (res.data.success) {
        setData(res.data.data.department)
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

    const { departmentName } = data

    try {


      const res = await axios.put("https://prodigy-fs-02-ems-backend-app.onrender.com/updateDepartment", { id, departmentName })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/manage-departments')
      }

      else {
        toast.error(res.data.error)
      }


    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {

    handle_fetch_department_by_id(id)

  }, [id])



  return (
    <div className='edit-department-container'>

      <h1>Edit Department</h1>

      <div className='edit-department-inner'>

        <form onSubmit={handle_submit}>

          <div className='edit-department-left'>

            <label>Department Name</label>
            <input type="text" value={data.departmentName} placeholder='Enter your name' onChange={(e) => setData({ ...data, departmentName: e.target.value })} />

          </div>

          <button type='submit'>Update Department</button>

        </form>

      </div>

    </div>

  )
}

export default EditDepartment
