import React from 'react'
import aboutImages from '../assets/aboutImage.png'
import '../css/about.css'
import { NavLink } from 'react-router-dom'

function About() {
    return (
        <div className='about-container sec'>

            <div className='about-left'>

                <img src={aboutImages} alt="" />

            </div>

            <div className='about-right'>

                <h1><span className='about'>About</span> Us</h1>
                <span>Discover A World Of Flavors At Taste Hub</span>
                <p>At the heart of Taste Hub lies a deep appreciation for the art of food. We believe that every ingredient has a story, every recipe a rich history, and every bite a chance to uncover new depths of flavor. That's why we've dedicated ourselves to curating the finest, most unique food products from artisanal producers and small-batch purveyors around the globe.</p>
                <NavLink style={{textDecoration:'none'}} to={"/about-us"} className='btnAbout'>Read more</NavLink>

            </div>


        </div> 
    )
}

export default About
