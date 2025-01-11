import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext()

export function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)

    async function handle_fetch_user_info() {

        try {

            const res = await axios.get('https://prodigy-fs-02-backend.vercel.app/getUser', { withCredentials: true })

            if (res.data.success) {
                setUser(res.data.data.user)
            }

            else {
                setUser(null)
            }

        } catch (error) {
            console.log(error);
            setUser(null)
        }

    }

    useEffect(() => {

        handle_fetch_user_info()

    }, [])

    return (

        <UserContext.Provider value={{ user, setUser }}>

            {children}

        </UserContext.Provider>
    )
}


export function useUserContext() {
    return useContext(UserContext)
}