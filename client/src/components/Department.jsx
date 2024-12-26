import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import '../css/department.css'

function Department() {

    const [data, setData] = useState({ departmentName: '' })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const { departmentName } = data

        try {


            const res = await axios.post(`https://prodigy-fs-02-ems-backend-app.onrender.com/createDepartment`, {departmentName})

            if(res.data.success){
                toast.success(res.data.message)
                setData({departmentName:''})
                navigate("/manage-departments")
            }

            else{
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div className='department-containers'>

    <div className='department-inner-containers'>

        <h2>Add Department</h2>

        <form onSubmit={handle_submit}>

                <div className='department-lefts'>

                    <label>Department Name</label>
                    <input type="text" placeholder='Enter department name' onChange={(e) => setData({...data, departmentName: e.target.value})} />
            
                </div>
                
            <button type='submit'>Add department</button>

        </form>

    </div>


</div>
  )
}

export default Department
