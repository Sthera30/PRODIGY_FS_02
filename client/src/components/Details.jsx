import React, { useEffect, useState } from 'react'
import imgPancake from '../assets/dessert3.png'
import { FaArrowLeft } from 'react-icons/fa'
import '../css/details.css'
import { NavLink, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useCartContext} from '../context/cartContext'

function Details() {

    const [details, setDetails] = useState({})
    const [specification, setSpecification] = useState("")

    const {addToCart} = useCartContext()
    const { id } = useParams()

    const foodId = id


    async function getFoodById() {

        try {
            const res = await axios.get(`https://mern-food-ordering-app-7.onrender.com/getFoodById/${id}`)

            if (res.data.success) {
                setDetails(res.data.data.food)
            }


        } catch (error) {
            console.log(error);

        }

    }

    async function getSpecificationByProductId() {

        try {
            const res = await axios.get(`https://mern-food-ordering-app-7.onrender.com/getSpecificationByProductId`, {
                params: { foodId }
            })

            if (res.data.success) {

                // console.log(res.data.data);
                setSpecification(res.data.data.specification)

            }

        } catch (error) {
            console.log(error);

        }

    }

    async function getAllOrders() {

        try {

            const res = await axios.get("https://mern-food-ordering-app-7.onrender.com/getAllOrders")

            if (res.data.success) {
                setDeliveryTimeFrame(res.data.orders.deliveryTimeframe)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {

        getFoodById()
        getSpecificationByProductId()
        getAllOrders()
        window.scrollTo(0, 0)

    }, [])


    return (

        <>


            <div className='Our-Promise-Banner'>

                <h2>ITEM DETAILS</h2>

            </div>

            <div className='arrow-left'>

                <NavLink to={"/menu"}>

                    <FaArrowLeft style={{ color: '#fff', width: '2.2rem', height: '2.2rem', lineHeight: '2', background: 'purple', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer', padding: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '6rem', marginTop: '-2rem' }} />

                </NavLink>

            </div>

            <div className='details-con'>

                <div className='left-con'>

                    <img src={details?.foodImage} alt="" />

                </div>

                <div className='right-con'>

                    <span style={{fontSize: '1.5rem', fontWeight: '300'}}>Item Name: <span className='item_name'>{details?.name}</span></span>
                    <h3 style={{ color: '#333', fontWeight: '300', fontSize: '1.7rem', margin:'1rem 0rem' }}>Price: <span className='item_name'>{`R${details?.price}`}</span></h3>

                    <div className='item_description'>

                        <h2 style={{fontSize: '1.7rem'}}>Description</h2>
                        <p>{details?.description}</p>

                    </div>

                    <div className='details'>

                        <h2 style={{fontSize: '1.7rem'}}>Specifications</h2>
                        <p>{details?.specificationName}</p>
                        <h2 style={{fontSize: '1.7rem'}}>Delivery</h2>
                        <p>Shipping fee R100</p>
                        <h2 style={{fontSize: '1.7rem'}}>Terms of purchase</h2>
                        <p>Exchanges & returns  accepted see <NavLink to={"/conditions"}>Conditions</NavLink>. No cancellations after 2 days of placing an order. <NavLink to={"/contact"}><a href='#'>Contact us</a></NavLink> if you have problems with your order.</p>

                    </div>

                    <div className='bottom-con'>

                        <button onClick={() => addToCart(details)} className='btnCart'>Add to cart</button>

                    </div>


                </div>

            </div>


        </>

    )
}


export default Details