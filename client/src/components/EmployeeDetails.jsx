import React, { useEffect, useState } from 'react'
import '../css/EmployeeDetails.css'
import {useParams} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'

function EmployeeDetails() {

const [employeeDetails, setEmployeeDetails] = useState("")

const {id} = useParams()

async function handle_fetch_employee(id) {


    try {

        const res = await axios.get(`https://prodigy-fs-02-backend.vercel.app/getEmployeeByid?id=${id}`)

        if(res.data.success){
            setEmployeeDetails(res.data.data.employee)
        }

        else{
            toast.error(res.data.error)
        }
        
    } catch (error) {
        console.log(error);
        
    }
    
}


useEffect(() => {

    handle_fetch_employee(id)
    window.scrollTo(0, 0)

},[id])

    return (

        <>

            <div className='employeeDetails-container'>

                <div className='employeeDetails-inner-container'>

                    <h2>Employee Details</h2>

                    <div className='emp-details-container'>

                        <div className='emp-left'>

                            <span>Name:</span>
                            <span>Gender:</span>
                            <span>Department:</span>
                            <span>Position:</span>
                            <span>Marital Status:</span>

                        </div>


                        <div className='emp-right'>

                            <span>{employeeDetails.name}</span>
                            <span>{employeeDetails.gender}</span>
                            <span>{employeeDetails.department}</span>
                            <span>{employeeDetails.position}</span>
                            <span>{employeeDetails.maritalStatus}</span>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default EmployeeDetails
