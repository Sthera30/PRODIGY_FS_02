import React, { useEffect, useState } from 'react'
import { FaSearch, FaUtensils } from 'react-icons/fa'
import '../css/exploreMore.css'
import Img1 from '../assets/medium-shot-man-cooking.png'
import Img2 from '../assets/dessert2.png'
import Img3 from '../assets/dessert3.png'
import Img4 from '../assets/dessert4.png'
import Img5 from '../assets/dessert5.png'
import Img6 from '../assets/dessert6.png'
import Img7 from '../assets/dessert7.png'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useCartContext } from '../context/cartContext.jsx'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useUserContext } from '../context/userContext.jsx'

function ExploreMore() {


    const [food, setFood] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const { user } = useUserContext()

    const { addToCart } = useCartContext()

    async function handle_food_fetch() {

        try {

            const res = await axios.get("https://mern-food-ordering-app-10.onrender.com/allFood")

            if (res.data.success) {
                setFood(res.data.data.all_food)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        handle_food_fetch()

    }, [])


    async function handle_search(e) {

        e.preventDefault()

        try {

            if (searchTerm.trim == '') {
                await handle_food_fetch()
                return
            }

            const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/foodSearch?term=${searchTerm}`)

            if (res.data.success) {
                setFood(res.data.data.food)
            }

            else {
                toast.error(res.data.error)
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
                handle_food_fetch()
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <>

            <div className='explore_more_Banner'>


                <div className='burner_con'>

                    <div className='left-burner'>

                        <FaUtensils className='food_icon' />

                        <h4>Taste Hub</h4>
                        <p>Smart cooking Solutions</p>

                    </div>

                    <div className='right-burner'>

                        <img src={Img1} alt="" />

                    </div>

                </div>

            </div>

            {food.length === 0 ? (<p style={{ marginLeft: '2rem', color: 'red' }}>No Results Found!</p>) : (


                <div className='explore_more_coontainer sec'>

                    {food.map((items) => (


                        <div className='explore_more_box' key={items._id}>

                            <NavLink to={`/details/${items._id}`}>

                                <img src={items.foodImage} alt="" />

                            </NavLink>

                            <div className='price'>

                                <span>{`R${items.price}`}</span>

                            </div>

                            {user?.user?.role === "admin" ? (<div className='update_container'>


                                <div className='update_inner'>

                                    <NavLink to={`/edit-food/${items._id}`}>
                                        <FaEdit className='edit' />
                                    </NavLink>
                                    <FaTrash onClick={() => handle_remove(items._id)} className='delete' />

                                </div>

                            </div>
                            ) : ("")}

                            <div className='content' style={{ marginTop: '-8rem' }}>

                                <p>{items.name}</p>

                                <button onClick={() => addToCart(items)} style={{ textDecoration: 'none' }} className='btnOrder'>Add To Cart</button>

                            </div>

                        </div>


                    ))}


                </div>

            )}

            <form onSubmit={handle_search}>


                <div className='search-container'>

                    <FaSearch />
                    <input type='search' placeholder='Search food here...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className='searc'>

                        <button type='submit' style={{ background: 'none', color: '#fff' }}>

                            <FaSearch />

                        </button>

                    </div>
                </div>

            </form>



        </>
    )
}

export default ExploreMore
