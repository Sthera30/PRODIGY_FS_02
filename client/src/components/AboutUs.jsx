import React, { useEffect, useState } from 'react'
import Img1 from '../assets/professional-chef-preparing-food-kitchen.png'
import '../css/aboutUs.css'
import '../css/Number.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../context/userContext.jsx'


const styles = {
    statsSection: {
        width: '100%',
        padding: '48px 0',
        backgroundColor: '#f9fafb'
    },
    statsContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    },
    statsGrid: {
     display: 'flex',
     gap: '3rem',
     flexWrap: 'wrap',
     alignItems: 'center',
     justifyContent: 'center'
    },
    statItem: {
        flex: '1 1 20rem',
        textAlign: 'center',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)'
        }
    },
    counterNumber: {
        fontSize: '3.5rem',
        fontWeight: '700',
        color: 'purple',
        marginBottom: '8px',
        display: 'block',
        fontFamily: '"Inter", sans-serif'
    },
    statDescription: {
        fontSize: '1.1rem',
        color: '#4b5563',
        margin: '0',
        fontWeight: '500'
    },
    '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
    }
};
const NumberCounter = ({ endValue, duration = 9000, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startValue = 0;
        const increment = endValue / (duration / 50);
        const intervalId = setInterval(() => {
            startValue += increment;
            if (startValue >= endValue) {
                clearInterval(intervalId);
                setCount(endValue);
            } else {
                setCount(Math.floor(startValue));
            }
        }, 300);

        return () => clearInterval(intervalId);
    }, [endValue, duration]);

    return (
        <span style={{ fontSize: '3.5rem', fontWeight: '700', color: 'purple' }}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

const StatsSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('stats-section');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section id="stats-section" style={styles.statsSection}>
            <div style={styles.statsContainer}>
                <div style={styles.statsGrid}>
                    <div style={styles.statItem}>
                        {isVisible && (
                            <div>
                                <NumberCounter endValue={50} duration={2000} suffix="+" />
                                <p style={styles.statDescription}>Global Partners</p>
                            </div>
                        )}
                    </div>
                    <div style={styles.statItem}>
                        {isVisible && (
                            <div>
                                <NumberCounter endValue={200} duration={2500} suffix="+" />
                                <p style={styles.statDescription}>Artisanal Products</p>
                            </div>
                        )}
                    </div>
                    <div style={styles.statItem}>
                        {isVisible && (
                            <div>
                                <NumberCounter endValue={1000} duration={2000} suffix="+" />
                                <p style={styles.statDescription}>Happy Customers</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};



function AboutUs() {


    const [aboutUs, setAboutUs] = useState("")
    const [mission, setMission] = useState("")
    const [vision, setVision] = useState("")
    const [coreValues, setCoreValues] = useState([])
    const [isDeletedMission, setIsDeletedMission] = useState(false)
    const [isDeletedVision, setIsDeletedVision] = useState(false)
    const [isDeletedAboutUs, setIsDeletedAboutUs] = useState(false)
    const { user } = useUserContext()

    async function handle_fetch_about() {

        try {

            const res = await axios.get("https://mern-food-ordering-app-8.onrender.com/getAboutUs")

            if (res.data.success) {
                setAboutUs(res.data.data.about_us)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_fetch_mission() {

        try {

            const res = await axios.get("https://mern-food-ordering-app-8.onrender.com/getMission")

            if (res.data.success) {
                setMission(res.data.data.mission)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_fetch_vision() {

        try {

            const res = await axios.get("https://mern-food-ordering-app-8.onrender.com/getVision")

            if (res.data.success) {
                setVision(res.data.data.vision)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_fetch_core_values() {

        try {

            const res = await axios.get("https://mern-food-ordering-app-8.onrender.com/getValues")

            if (res.data.success) {
                setCoreValues(res.data.data.values)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }



    async function handle_remove_about_us(id) {

        try {

            const res = await axios.delete(`https://mern-food-ordering-app-8.onrender.com/remove_about_us?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                setIsDeletedAboutUs(true)
                handle_fetch_about()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_remove_mission(id) {

        try {

            const res = await axios.delete(`https://mern-food-ordering-app-8.onrender.com/remove_mission?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                setIsDeletedMission(true)
                handle_fetch_mission()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_remove_vision(id) {

        try {

            const res = await axios.delete(`https://mern-food-ordering-app-8.onrender.com/remove_vision?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                setIsDeletedVision(true)
                handle_fetch_vision()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_remove_values(id) {

        try {

            const res = await axios.delete(`https://mern-food-ordering-app-8.onrender.com/remove_values?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                handle_fetch_core_values()()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }





    useEffect(() => {

        handle_fetch_about()
        handle_fetch_mission()
        handle_fetch_vision()
        handle_fetch_core_values()

    }, [])



    return (

        <>


            <div className='Our-Promise-Banner'>

                <h2>ABOUT US</h2>

            </div>

            <div className='about_us_container sec'>

                <div className='about_use_left'>


                    <h1><span className='about'>About</span> Us</h1>
                    <span>{aboutUs[0]?.aboutUsHeading}</span>
                    <p>{aboutUs[0]?.aboutUsDescription}</p>

                    {user?.user?.role === "admin" ? (

                        <div className={`button-container ${isDeletedAboutUs ? "hide_" : ""}`}>

                            {isDeletedAboutUs ? ("") : (
                                <>
                                    <NavLink to={`/edit_about_us/${aboutUs[0]?._id}`} className='btnEdit' style={{ color: '#fff', background: 'orange', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Edit</NavLink>
                                    <button onClick={() => handle_remove_about_us(aboutUs[0]?._id)} className='btnDelete' style={{ color: '#fff', background: 'red', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Delete</button>

                                </>
                            )}

                        </div>

                    ) : ("")}

                </div>

                <div className='about_us_right'>

                    <img src={aboutUs[0]?.aboutUsImage} alt="" />

                </div>


            </div>

            <div className='vision_container sec'>

                <div className={`vision_box ${isDeletedVision ? ("hide_") : ""}`}>

                    <h3>{vision[0]?.visionHeading}</h3>
                    <p>{vision[0]?.visionDescription}</p>

                    {user?.user?.role === "admin" ? (

                        <div className='button-container'>

                            {isDeletedVision ? ("") : (
                                <>
                                    <NavLink to={`/edit_about_us/${vision[0]?._id}`} className='btnEdit' style={{ color: '#fff', background: 'orange', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Edit</NavLink>
                                    <button onClick={() => handle_remove_vision(vision[0]?._id)} className='btnDelete' style={{ color: '#fff', background: 'red', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Delete</button>

                                </>
                            )}

                        </div>


                    ) : ("")}

                </div>

                <div className={`vision_box ${isDeletedMission ? ("hide_") : ("")}`}>

                    <h3>{mission[0]?.missionHeading}</h3>
                    <p>{mission[0]?.missionDescription}</p>

                    {user?.user?.role === "admin" ? (

                        <div className='button-container'>


                            {isDeletedMission ? ("") : (
                                <>
                                    <NavLink to={`/edit_about_us/${mission[0]?._id}`} className='btnEdit' style={{ color: '#fff', background: 'orange', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Edit</NavLink>
                                    <button onClick={() => handle_remove_mission(mission[0]?._id)} className='btnDelete' style={{ color: '#fff', background: 'red', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Delete</button>

                                </>
                            )}
                        </div>

                    ) : ("")}

                </div>


            </div>

            <StatsSection />


            <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Our Core Values</h2>


            <div className='our_values_container sec'>


                {coreValues.map((coreValue) => (

                    <div className='our_values_box' key={coreValue._id}>

                        <h3>{coreValue.valuesHeading}</h3>
                        <p>{coreValue.valuesDescription}</p>

                        {user?.user?.role === "admin" ? (

                            <div className='button-container'>

                                <NavLink to={`/edit_about_us/${coreValue._id}`} className='btnEdit' style={{ color: '#fff', background: 'orange', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Edit</NavLink>
                                <button onClick={() => handle_remove_values(coreValue._id)} className='btnDelete' style={{ color: '#fff', background: 'red', padding: '.8rem 2.5rem', borderRadius: '3rem', cursor: 'pointer', textDecoration: 'none', marginRight: '1rem' }}>Delete</button>

                            </div>
                        ) : ("")}

                    </div>


                ))}

            </div >

        </>


    )
}


export default AboutUs
