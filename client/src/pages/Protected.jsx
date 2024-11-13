import { useUserContext } from "../context/userContext.jsx";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from "react";

function Protected({ children }) {


    const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    const getUser = async () => {

        try {

            const res = await axios.post("https://mern-food-ordering-app-7.onrender.com/getUser", {
                token: localStorage.getItem("token")
            },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }

            )

            if (res.data.success) {
                setUser(res.data.data)
                
            }

            else {
                localStorage.clear()
                return navigate("/login")
            }



        } catch (error) {
            console.log(error);
            localStorage.clear()

        }

    }

    useEffect(() => {

        if (!user) {
            getUser()
        }

    }, [user])


    if (localStorage.getItem("token")) {
        return children
    }

    else {
        localStorage.clear()
        return navigate("/login")
    }


}

export default Protected