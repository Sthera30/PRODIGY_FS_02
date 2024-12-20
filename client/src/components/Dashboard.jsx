import React from 'react'
import { useUserContext } from '../context/userContext.jsx'
import {MdPerson} from 'react-icons/md'

function Dashboard() {


    const {user} = useUserContext()

  return (

    <>

    {user?.role === "admin" ? (

        <div className='welcome-burner-container'>


            <div className='welcome-back-burner-container'>

                <span style={{ fontSize: '1.4rem' }}> <MdPerson style={{ color: 'blue', fontSize: '5rem' }} />Welcome back Sirtembekile Tini</span>

            </div>

        </div>


    ) : user?.role === "user" ? (

        <div className='welcome-burner-container'>


            <div className='welcome-back-burner-container'>

                <span style={{ fontSize: '1.4rem' }}> <MdPerson style={{ color: 'blue', fontSize: '5rem' }} />Welcome back {user?.name}</span>

            </div>

        </div>


    ) : ("")}

    </>
  )
}

export default Dashboard
