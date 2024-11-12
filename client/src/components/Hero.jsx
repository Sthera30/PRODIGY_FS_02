import React, { useEffect, useState } from 'react'
import HeroImg from '../assets/hero.png'
import '../css/hero.css'
import { FaSearch } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

function Hero() {



    const [bounce, setBounce] = useState(false);
    const text = "To Your Doorstep!";

    useEffect(() => {
        const interval = setInterval(() => {
            setBounce(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className='container'>

            <div className='left-container'>

                <h2>Bringing Foodie Joy <span className='serious'></span>

                    <div style={{ display: "flex", gap: "0" }}>
                        {text.split('').map((char, i) => (
                            <span
                                key={i}
                                className="bounce-stretch food"
                                style={{
                                    animationDelay: `${i * 0.2}s`, // Adjust delay to control staggered effect
                                    display: "inline-block",
                                    marginRight: char === " " ? "0.25rem" : "0",
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </h2>
                <p>Experience Taste Hub, where every dish tells a story. Discover insights and dining options that elevate your love for great food.</p>
               
                <div className='explore'>

                    <NavLink to={"/our-food"} style={{textDecoration: 'none'}} className='btnExplore'>Explore Now</NavLink>

                </div>
            </div>

            <div className='right-container'>

                <img src={HeroImg} alt="" />

            </div>

        </div>

    )
}

export default Hero
