import React from 'react'
import Navbar from '../components/Navbar.jsx'
import {Toaster} from 'react-hot-toast'
import {Outlet} from 'react-router-dom'

function Layout() {
  return (
    <div>

        <Navbar />
        <Toaster position='top-center' />
        <Outlet />
      
    </div>
  )
}

export default Layout
