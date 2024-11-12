import React, { useEffect } from 'react'
import imgLogo from '../assets/logo.png'
import '../css/footer.css'
import { NavLink } from 'react-router-dom'
import { FaPizzaSlice, FaWhatsapp, FaTiktok, FaInstagram } from 'react-icons/fa'


function Footer() {


    useEffect(() => {

        window.scrollTo(0, 0)

    }, [])

    return (

        <div className='footer-co'>

            <div className='footer-container sec' style={{ background: ' hsl(350, 52%, 91%)' }}>

                <div className='footer-box'>

                    <NavLink style={{ textDecoration: 'none' }} to={"/"}>

                        <FaPizzaSlice style={{ color: 'orange', fontSize: '1.7rem' }} />

                    </NavLink>

                    <span style={{ fontStyle: 'italic', color: '#333', fontSize: '1.5rem' }}>Taste Hub</span>

                </div>

                <div className='footer-box'>

                    <h3 style={{ fontSize: '1.3rem' }}>SOCIALS</h3>

                    <a style={{ textDecoration: 'none' }} href="https://wa.me/0624192299" target='_blank' rel='noopener noreferrer'><FaWhatsapp style={{color: '#fff', background: 'lime', borderRadius: '.5rem', width: '2rem', height: '2rem', lineHeight: '2', padding: '.4rem'}} />&nbsp;Whatsapp</a>
                    <a style={{ textDecoration: 'none' }} href="https://www.tiktok.com/@stheratini?_t=8r7U5fW7Gis&_r=1" target='_blank' rel='noopener noreferrer'><FaTiktok style={{color: '#fff', background: '#333', borderRadius: '.5rem', width: '2rem', height: '2rem', lineHeight: '2', padding: '.4rem'}} />&nbsp;TikTok</a>
                    <a style={{ textDecoration: 'none' }} href="https://www.instagram.com/trap_pkq/profilecard/?igsh=b3hoZml2NzJnczFO" target='_blank' rel='noopener noreferrer'><FaInstagram style={{color: '#fff', background: 'linear-gradient(65deg, hsl(300, 93%, 40%), orange)',borderRadius: '.5rem', width: '2rem', height: '2rem', lineHeight: '2', padding: '.4rem'}} />&nbsp;Instagram</a>

                </div>

                <div className='footer-box'>

                    <h3 style={{ fontSize: '1.3rem' }}>COMPANY</h3>
                    <NavLink style={{ textDecoration: 'none' }}>About Us</NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to={"/contact"}>Contact</NavLink>

                </div>

                <div className='footer-box'>

                    <h3 style={{ fontSize: '1.3rem' }}>LEGAL</h3>
                    <NavLink style={{ textDecoration: 'none' }} to={"/conditions"}>Terms of use</NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to={"/conditions"}>Privacy policy</NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to={"/policy"}>
                        Cookie policy
                    </NavLink>

                </div>

            </div>

            <div className='footer-bottom'>

                <div className='footer-left'>

                    <span style={{ fontSize: '1.2rem' }}>
                        &copy;Copyright By Taste Hub 2024
                    </span>

                </div>

                <div className='footer-right'>

                    <span style={{ fontSize: '1.2rem' }}>Website Built By <span className='ST'>Sirtembekile.dev</span></span>

                </div>


            </div>

        </div>

    )
}

export default Footer
