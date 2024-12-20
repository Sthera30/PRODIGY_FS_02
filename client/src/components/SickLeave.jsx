import React, { useEffect, useState } from 'react'
import '../css/sickLeave.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

function SickLeave() {


  const [leaves, setLeaves] = useState([])


  async function handle_fetch() {

    try {
      const res = await axios.get("http://localhost:8082/getAllLeaves")

      if (res.data.success) {
        setLeaves(res.data.data.leave)
      }

      else {
        toast.error(res.data.error)
      }

    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {

    handle_fetch()

  }, [])

  console.log(leaves);
  

  return (

    <>

      <div className='sickLeave-heading'>

        <h2>Manage Leaves</h2>

      </div>

      <div className='search-filter-container'>

        <div className='search-filter-left'>


        </div>

        <div className='search-filter-right'>

        

        </div>

      </div>

      <div className='sick-leave-container'>


        <table className='table table-bordered'>

          <thead>

            <tr>

              <th className='text-center'>Name</th>
              <th className='text-center'>Leave Type</th>
              <th className='text-center'>Days</th>
              <th className='text-center'>Status</th>
              <th className='text-center'>Action</th>

            </tr>


          </thead>


          <tbody>


            {leaves.map((leave) => (

              <tr>

                <td className='text-center'>{leave.employeeId.name}</td>
                <td className='text-center'>{leave?.leaveType}</td>
                <td className='text-center'>{(new Date(leave.ToDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)}&nbsp;Days</td>
                <td className='text-center'>{leave?.status}</td>
                <td className='text-center'>

                  <NavLink to={`/leave-details/${leave._id}`} className='btnView'>View</NavLink>

                </td>

              </tr>


            ))}


          </tbody>






        </table>


      </div>

    </>

  )
}

export default SickLeave
