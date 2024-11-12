import React, { useEffect, useState } from 'react'
import ImgLogo from '../assets/logo.png'
import '../css/navbar.css'
import BarsIcon from './BarsIcon.jsx'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import imgProfile from '../assets/avator.png'
import { useUserContext } from '../context/userContext.jsx'
import { FaCartPlus, FaPizzaSlice } from 'react-icons/fa'
import { useCartContext } from '../context/cartContext.jsx'
import { XIcon } from 'lucide-react'

function Navbar() {

    const [showNav, setShowNav] = useState(true)
    const [showProfile, setShowProfile] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const { user, setUser } = useUserContext()
    const [active, setActive] = useState("Home")

    const navigate = useNavigate()

    const { cartItems } = useCartContext()

    const [bounce, setBounce] = useState(false);
    const text = "Taste Hub";

    useEffect(() => {
        const interval = setInterval(() => {
            setBounce(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    return (

        <>
            <div className='header'>

                <div className='left-bar'>

                    <NavLink to={"/"}>

                        <FaPizzaSlice style={{ color: 'orange', fontSize: '1.7rem' }} />

                    </NavLink>
                    {text.replace(/\s/g, '').split('').map((char, i) => (
                        <span
                            key={i}
                            className="bounce"
                            style={{ animationDelay: `${i * 0.1}s`, display: "inline-block" }}
                        >
                            {char}
                        </span>
                    ))}



                </div>


                <div className={`right-bar default ${showNav ? "hide" : "show"}`}>

                    <NavLink onClick={(e) => setActive(e.target.textContent)} className={`navbar-tags ${active === 'Home'? "activeBackground" : ""}`} style={{ textDecoration: 'none' }} to={""}>Home</NavLink>
                    <NavLink onClick={(e) => setActive(e.target.textContent)} className={`navbar-tags ${active === 'Our Promise'? "activeBackground" : ""}`} style={{ textDecoration: 'none' }} to={"/our-promise"}>Our Promise</NavLink>
                    <NavLink onClick={(e) => setActive(e.target.textContent)} className={`navbar-tags ${active === "Our Service"? "activeBackground" : ""}`} style={{ textDecoration: 'none' }} to={"/our-services"}>Our Service</NavLink>
                    <NavLink onClick={(e) => setActive(e.target.textContent)} className={`navbar-tags ${active === "Our Food"? "activeBackground" : ""}`} style={{ textDecoration: 'none' }} to={"/our-food"}>Our Food</NavLink>

                    {user?.user?.role === "admin" ? <NavLink onClick={(e) => setActive(e.target.textContent)} className={`navbar-tags ${active === "Our food"? "activeBackground" : ""}`} style={{ textDecoration: 'none' }} to={"/add-food"}>Add food</NavLink> : ""}

                    <NavLink onClick={(e) => setActive(e.target.textContent)} className={`navbar-tags ${active === "Contact"? "activeBackground" : ""}`} style={{ textDecoration: 'none' }} to={"/contact"}>Contact</NavLink>


                </div>


                <div className='right_'>

                    <div className='cart'>

                        <a onClick={() => setShowCart(prevCart => !prevCart)}>

                            <FaCartPlus style={{ fontSize: '1.5rem' }} />

                        </a>

                        <div className={`${user?.user?.role == "admin"? "count-cart": user?.user?.role === "user"? "count-cart" : "cart_position"}`}>

                            <span>{cartItems.length}</span>

                        </div>


                        <div className={`cart-box ${showCart ? "showCart" : "hideCart"}`}>

                            <span>{cartItems.length} items</span>

                            <NavLink style={{ textDecoration: 'none' }} to={"/view-cart"}>

                                <button style={{ width: '10rem' }} className='btnViewCart'>View cart</button>

                            </NavLink>

                        </div>


                    </div>


                    {user ? (
                        <a href="#" className='profile'>

                            <img src={user?.user?.profileImage || imgProfile} style={{ width: '2rem', height: '2rem', objectFit: 'cover', borderRadius: '50%', marginLeft: '.8rem' }} alt="" onClick={() => setShowProfile(prev => !prev)} />

                            <div className={`profile_container showProfile ${showProfile ? "showProfile" : "hideProfile"}`}>

                                <div className='new'>

                                    <NavLink style={{ textDecoration: 'none' }} to={'/profile'}>Profile</NavLink>
                                    <span className='new'>new</span>

                                </div>

                                <NavLink style={{ textDecoration: 'none' }} to={"/my-order"}>My Order</NavLink>
                                {user?.user?.role === "admin" ?

                                    <NavLink style={{ textDecoration: 'none' }} to={"/my-orders"}>All Orders</NavLink> : ""

                                }

                                {user?.user?.role === "admin" ? (<NavLink style={{ textDecoration: 'none' }} to={"/manage-promise"}>Manage Our Promise</NavLink>) : ""}
                                {user?.user?.role === "admin" ? (<NavLink style={{ textDecoration: 'none' }} to={"/manage-our-services"}>Manage Our Services</NavLink>) : ""}
                                {user?.user?.role === "admin" ? (<NavLink style={{ textDecoration: 'none' }} to={"/manage-about-us"}>Manage About Us</NavLink>) : ""}

                                <NavLink style={{ textDecoration: 'none' }}>Settings</NavLink>
                                <a onClick={() => {
                                    localStorage.clear()
                                    navigate("/login")
                                    location.reload()

                                }}>Logout</a>

                            </div>

                        </a>
                    ) : (

                        <NavLink style={{ textDecoration: 'none' }} to={"/login"} className='btnLogin'>Login</NavLink>

                    )}

                </div>

                <div className='right-co'>

                    <div className='right'>

                        {showNav ? (
                            <i className='bars' onClick={() => setShowNav(prev => !prev)}><BarsIcon /></i>

                        ) : (
                            <i className='bars' onClick={() => setShowNav(prev => !prev)}><XIcon /></i>

                        )}
                    </div>


                </div>

            </div>


        </>
    )
}

export default Navbar


//admin must filter orders