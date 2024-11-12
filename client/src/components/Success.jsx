import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import '../css/success.css'
import { Link } from 'react-router-dom'

function Success() {
    return (
        <div className='success-container'>

            <div className='success-inner'>

                <FaCheckCircle style={{ color: "green", background: "#fff", fontSize: "3rem", borderRadius: "50%" }} />
                <span>Payment Done!</span>
                <p>Thank you for completing your secure online payment.</p>

                <h5>Have a great day!</h5>

                <Link to={"/"}>

                    <button className='btnGo'>Done</button>

                </Link>

            </div>

        </div>
    )
}

export default Success
