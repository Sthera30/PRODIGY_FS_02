import React from 'react'
import Navbar from "../components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function Layouts() {
    return (
        <div>

            <Navbar />
            <Toaster containerStyle={{marginTop: '5rem'}} position='top-center' />
            <Outlet />

        </div>
    )
}

export default Layouts
