import React, { Children, useEffect, useState } from 'react'
import { useUserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Protected() {

    const { user, setUser } = useUserContext()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    async function handle_get_user() {

        try {
                                                                             //Send cookies
            const res = await axios.get(`https://prodigy-fs-02-ems-backend-app.onrender.com/getUser`, { withCredentials: true })

            if (res.data.success) {
                setUser(res.data.data.user)
            }

            else {
                setUser(null)
            }

        } catch (error) {
            setUser(null)
            console.log(error);
        } finally {
            setIsLoading(false)
        }

    }


    useEffect(() => {

        handle_get_user()

    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!user) {
        navigate("/login", { replace: true })
        return null
    }

    return (
        <div>


        </div>
    )
}

export default Protected
