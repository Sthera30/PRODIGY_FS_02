import React from 'react'
import Hero from '../components/Hero.jsx'
import Recommend from '../components/Recommend.jsx'
import About from '../components/About.jsx'
import NewFood from '../components/NewFood.jsx'
import Services from '../components/Services.jsx'
import SpecialFood from '../components/SpecialFood.jsx'
import Footer from '../components/Footer.jsx'

function HomePage() {
  return (
    <div>

        <Hero />
        <Recommend />
        <About />
        <NewFood />
        <Services />
        <SpecialFood />
        <Footer />
      
    </div>
  )
}


export default HomePage
