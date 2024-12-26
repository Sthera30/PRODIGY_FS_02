import React, { useEffect } from 'react'
import '../css/hero.css'
import { NavLink } from 'react-router-dom'

function Hero() {

    useEffect(() => {

        window.scrollTo(0, 0)

    },[])


    return (
        <>


            <div className='hero-container'>


                <div className='hero-content'>

                    <p>Welcome To Employee Management System</p>
                    <NavLink to={"/login"} style={{textDecoration: 'none'}} className='btnGetStarted'>GET STARTED</NavLink>

                </div>


            </div>


        </>
    )
}

export default Hero
