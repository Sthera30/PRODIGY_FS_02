import React, { useEffect, useState } from 'react'
import '../css/newFood.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/cartContext'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useUserContext } from '../context/userContext'


function NewFood() {

    const [newFood, setNewFood] = useState([])
    const { addToCart } = useCartContext()

    const { user } = useUserContext()


    async function getNewFood() {

        try {

            const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/getNewFood`)

            if (res.data.success) {
                setNewFood(res.data.data.newFood)
            }

        } catch (error) {
            console.log(error);

        }

    }

    async function handle_remove(id) {

        try {

            const res = await axios.delete(`https://mern-food-ordering-app-10.onrender.com/delete_food?id=${id}`)

            if (res.data.success) {
                toast.success(res.data.message)
                getNewFood();
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        getNewFood()

    }, [])


    return (

        <>

            <div className='newFood' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '6rem', marginTop: '1rem' }}>

                <span className='flavors'>Latest <span className='latest'>Flavors</span></span>

            </div>

            <div className='NewFood-box-container sec'>

                {newFood.map((item) => (

                    <div className='NewFood-box'>

                        <NavLink to={`/details/${item._id}`}>

                            <img src={item?.foodImage} alt="" className='centered' />

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

export default NewFood
