import React from 'react'
import { Link } from 'react-router-dom'
import '../css/cancel.css'

function Cancel() {
  return (
    <div className='cancel-container'>

      <div className='cancel-inner'>

        <h1>404</h1>

        <p>Payment unsuccessfull</p>
        <p>Thank you for using our online secure payment.</p>

        <span>Have a great day!</span>

        <Link to={"/"}>

          <button className='btnGo'>Go Back</button>

        </Link>

      </div>

    </div>
  )
}

export default Cancel