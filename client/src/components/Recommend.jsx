import React, { useEffect, useState } from 'react'
import ImageDesert from '../assets/download.png'
import { FaHeart, FaStar } from 'react-icons/fa'
import "../css/recommend.css"
import { useFoodContext } from '../context/foodContext'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useUserContext } from '../context/userContext'

function Recommend() {


    const [recommend, setRecommend] = useState([])
    const { food, setFood } = useFoodContext()
    const { addToCart } = useCartContext()

    const { user } = useUserContext()

    async function getTopRated() {

        try {

            const res = await axios.get(`https://mern-food-ordering-app-7.onrender.com/getTopRated`)

            if (res.data.success) {
                setRecommend(res.data.data.food)
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function handle_remove(id) {

        try {

            const res = await axios.delete(`https://mern-food-ordering-app-7.onrender.com/delete_food?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                getTopRated()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        getTopRated()

    }, [])

    return (
        <>

            <div className='recommend-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5rem 0rem' }}>

                <span style={{ fontSize: '2rem' }}>Recommended <span className='food'>Food</span></span>

            </div>

            <div className='box-container sec'>

                {recommend.map((item) => (


                    <div className='box' style={{ background: 'none', height: '25rem' }}>

                        <NavLink to={`/details/${item._id}`}>

                            <img src={item?.foodImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

                        </NavLink>

                        <div className='price'>

                            <span>{`R${item?.price}`}</span>

                        </div>

                        {user?.user?.role === "admin" ? (<div className='update_container'>


                            <div className='update_inner'>

                                <NavLink to={`/edit-food/${item._id}`}>
                                    <FaEdit className='edit' />
                                </NavLink>
                                <FaTrash onClick={() => handle_remove(item._id)} className='delete' />

                            </div>

                        </div>) : ("")}

                        <div className='content' style={{ marginTop: '-8rem' }}>

                            <p>{item?.name}</p>

                            <NavLink style={{ textDecoration: 'none' }} to={`/details/${item._id}`} onClick={() => addToCart(item)} className='btnOrder'>Add To Cart</NavLink>

                        </div>

                    </div>

                ))}

            </div>

        </>

    )
}

export default Recommend
