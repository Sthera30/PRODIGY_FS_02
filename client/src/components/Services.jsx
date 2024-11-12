import React from 'react'
import '../css/services.css'
import chefImage from '../assets/chef.png'
import { NavLink } from 'react-router-dom'

function Services() {
    return (
        <div className='service-container sec'>


            <div className='service-right'>

                <span>Not Just Service, But A Passion For Taste </span>
                <p>Our commitment to flavor and quality goes beyond what's expected. We're not just here to serve; we're here to inspire, surprise, and delight. From farm fresh ingredients to innovative recipes, Taste Hub is driven by a passion for the very best in taste.</p>
                <NavLink style={{textDecoration: 'none'}} to={"/our-services"} className='btnAbout'>Our Services</NavLink>

            </div>

            <div className='service-left'>

                <img src={chefImage} alt="" />

            </div>


        </div>
    )
}

export default Services
