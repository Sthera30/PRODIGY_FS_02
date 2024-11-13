import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import ImageDesert from '../assets/dessert3.png'
import { useFoodContext } from '../context/foodContext'
import axios from 'axios'
import { useEffect } from 'react'
import '../css/specialFood.css'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useUserContext } from '../context/userContext'


function SpecialFood() {

    const { food, setFood } = useFoodContext([])
    const [specialFood, setSpecialFoof] = useState()

    const { user } = useUserContext()


    const { addToCart } = useCartContext()

    async function getDistinctProducts() {

        try {

            const res = await axios.get(`https://mern-food-ordering-app-7.onrender.com/getProductsFromDistinctCategory`)

            if (res.data.success) {

                setSpecialFoof(res.data.data.food)
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
                getDistinctProducts();
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        getDistinctProducts()

    }, [])


    return (
        <>

            <div className='recommend-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5rem 0rem' }}>

                <span style={{ fontSize: '2rem' }}>Special <span className='food'>Food</span></span>

            </div>

            <div className='special-Food-Container sec'>

                {specialFood?.map((item) => (

                    <div className='special-food-box'>

                        <NavLink to={`/details/${item._id}`}>

                            <img src={item?.foodImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

                        </NavLink>

                        <div className='price'>

                            <span>{`R${item?.price}`}</span>

                        </div>

                        {user?.user?.role === "admin" ? (
                            <div className='update_container'>


                                <div className='update_inner'>

                                    <NavLink to={`/edit-food/${item._id}`}>
                                        <FaEdit className='edit' />
                                    </NavLink>
                                    <FaTrash onClick={() => handle_remove(item._id)} className='delete' />

                                </div>

                            </div>

                        ) : ("")}

                        <div className='content'>

                            <p>{item?.name}</p>

                            <NavLink to={`/details/${item._id}`}>

                                <button onClick={() => addToCart(item)} className='btnOrder'>Add To Cart</button>


                            </NavLink>
                        </div>

                    </div>


                ))}

            </div>

        </>
    )
}

export default SpecialFood
