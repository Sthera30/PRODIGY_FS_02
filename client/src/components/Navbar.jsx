import React, { useState } from 'react'
import { FaUserTie, FaBars, FaTachometerAlt, FaBuilding, FaRegCalendarCheck, FaMoneyBillWave, FaCog } from 'react-icons/fa'
import { MdPerson } from 'react-icons/md'
import '../css/navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/userContext.jsx'
import axios from 'axios'
import { toast } from 'react-hot-toast'



function Navbar() {


    const navigate = useNavigate()

    const { user, setUser } = useUserContext()

    const [isClicked, setIsClicked] = useState(false)


    async function handle_logout() {

        try {

            const { data } = await axios.post('http://localhost:8082/logout', {}, { withCredentials: true })

            if (data.success) {
                setUser(null)
                toast.success(data.message)
                navigate("/login", { replace: true })
            }

            else {
                toast.error(data.error)
                navigate('/login', { replace: true })

            }

        } catch (error) {
            console.log(error);
        }

    }

    return (

        <>

            <div className='header'>

                <div className='nav-container'>


                    <div className='food-icon-container'>

                        <div className='left-container'>

                            <NavLink to={"/"}>

                                <FaUserTie style={{ color: '#fff', cursor: 'pointer', fontSize: '1.4rem' }} />

                            </NavLink>

                        </div>

                        <div className='right-container'>

                            <span style={{ fontSize: '1.2rem', color: '#fff' }}>Employee Management System</span>

                        </div>


                    </div>


                </div>

                <div className={`nav ${isClicked ? ("show") : ("hide")}`}>



                </div>

                <div className='login-containe'>

                    {user ? (
                        <button onClick={handle_logout} className='btnLogin'>Logout</button>
                    ) : (

                        <NavLink to={"/login"} className='btnLogin'>Login</NavLink>


                    )}

                {user?.role === "admin"? (
                        <div className='bars-icon'>

                        <a><FaBars onClick={() => setIsClicked(prev => !prev)} className='bars' style={{ cursor: 'pointer' }} /></a>

                    </div>
                ): user?.role === "user"? (
                    <div className='bars-icon'>

                    <a><FaBars onClick={() => setIsClicked(prev => !prev)} className='bars' style={{ cursor: 'pointer' }} /></a>

                </div>
                ): ("")}


                </div>


            </div >

            {user?.role === "admin" ? (
                <div className={`side-bar-container showSide ${isClicked ? ("hideSideBar") : ("showSideBar")}`}>

                    <div className='side-bar-inner'>

                        <p><FaTachometerAlt />

                            <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/my-dashboard"}>


                                &nbsp;&nbsp; Dashboard

                            </NavLink>


                        </p>



                        {user?.role === "admin" ? (

                            <p><FaUserTie />

                                <NavLink style={{ cursor: 'pointer', color: '#fff', textDecoration: 'none' }} to={"/manage-employees"}>

                                    &nbsp;&nbsp; Employees

                                </NavLink>

                            </p>




                        ) : ("")}

                        <p><MdPerson />

                            <NavLink style={{ cursor: 'pointer', color: '#fff', textDecoration: 'none' }} to={`/my-profile/${user?._id}`}>

                                &nbsp;&nbsp; My Profile

                            </NavLink>


                        </p>





                        {user?.role === "admin" ? (

                            <p><FaBuilding />



                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/manage-departments"}>

                                    &nbsp;&nbsp; Departments

                                </NavLink>


                            </p>

                        ) : ("")}

                        {user?.role === "admin" ? (


                            <p><FaRegCalendarCheck />


                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/manage-leave"}>

                                    &nbsp;&nbsp; Leaves


                                </NavLink>

                            </p>



                        ) : (


                            <p><FaRegCalendarCheck />



                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={`/my-leave/${user?._id}`}>


                                    &nbsp;&nbsp; Leaves


                                </NavLink>

                            </p>




                        )}

                        {user?.role === "admin" ? (

                            <p><FaMoneyBillWave />



                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/manage-salary"}>

                                    &nbsp;&nbsp; Salary


                                </NavLink>

                            </p>



                        ) : (

                            <p><FaMoneyBillWave />




                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={`/emp-salary/${user?._id}`}>

                                    &nbsp;&nbsp; Salary

                                </NavLink>

                            </p>


                        )}

                        <p><FaCog /> &nbsp;&nbsp; Setting</p>

                    </div>

                </div>

            ) : user?.role === "user" ? (
                <div className={`side-bar-container showSide ${isClicked ? ("hideSideBar") : ("showSideBar")}`}>


                    <div className='side-bar-inner'>

                        <p><FaTachometerAlt /> &nbsp;&nbsp; Dashboard</p>

                        {user?.role === "admin" ? (

                            <p><FaUserTie />

                                <NavLink style={{ cursor: 'pointer', color: '#fff', textDecoration: 'none' }} to={"/manage-employees"}>

                                    &nbsp;&nbsp; Employees

                                </NavLink>

                            </p>




                        ) : ("")}


                        <p><MdPerson />

                            <NavLink style={{ cursor: 'pointer', color: '#fff', textDecoration: 'none' }} to={`/my-profile/${user?._id}`}>

                                &nbsp;&nbsp; My Profile

                            </NavLink>
                        </p>




                        {user?.role === "admin" ? (

                            <p><FaBuilding />



                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/manage-departments"}>

                                    &nbsp;&nbsp; Departments

                                </NavLink>

                            </p>



                        ) : ("")}

                        {user?.role === "admin" ? (

                            <p><FaRegCalendarCheck />

                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/manage-leave"}>


                                    &nbsp;&nbsp; Leaves

                                </NavLink>

                            </p>


                        ) : (

                            <p><FaRegCalendarCheck />

                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={`/my-leave/${user?._id}`}>

                                    &nbsp;&nbsp; Leaves

                                </NavLink>

                            </p>




                        )}

                        {user?.role === "admin" ? (

                            <p><FaMoneyBillWave />



                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={"/manage-salary"}>

                                    &nbsp;&nbsp; Salary

                                </NavLink>


                            </p>



                        ) : (

                            <p><FaMoneyBillWave />


                                <NavLink style={{ color: '#fff', textDecoration: 'none' }} to={`/emp-salary/${user?._id}`}>

                                    &nbsp;&nbsp; Salary

                                </NavLink>



                            </p>



                        )}

                        <p><FaCog /> &nbsp;&nbsp; Setting</p>

                    </div>

                </div>

            ) : ("")}

        </>

    )
}

export default Navbar
