import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import axios from 'axios'
import {FaArrowLeft} from 'react-icons/fa'

function OrderDetails() {

    const { id } = useParams()
    const [orderId, setOrderid] = useState("")
    const [orderDetails, setOrderDetails] = useState([])


    async function getOrderById(id) {

        try {

            const res = await axios.get(`https://mern-food-ordering-app-7.onrender.com/GetOrderById?id=${id}`)

            if (res.data.success) {

                setOrderDetails(res.data.data.order);
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {

        getOrderById(id)

    }, [id])


    return (
        <>

            <div className='Our-Promise-Banner'>

                <h2>ORDERED ITEMS</h2>

            </div>

            <div className='arrow-left'>

                <NavLink to={"/my-order"}>

                    <FaArrowLeft style={{ color: '#fff', width: '2.2rem', height: '2.2rem', lineHeight: '2', background: 'purple', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer', padding: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: '-2rem' }} />


                </NavLink>

            </div>


            <div className='view-details'>

                <div className='view-details-inner'>

                    <h2 style={{ marginBottom: '1.4rem' }}>Ordered Items</h2>
                    <p><span>ORDER NUM: {orderDetails._id}</span></p>
                    <p><span>PAYMENT STATUS: {orderDetails.status}</span></p>
                    <p><span>ORDERED: {new Date(orderDetails.createdAt).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}</span></p>
                    <p className='item_'><span>ITEM IMAGE</span></p>

                    {orderDetails?.items?.map((item) => (

                        <div className='img-con'>
                            <span><img src={item.food.foodImage} alt="" /></span>
                        </div>

                    ))}

                    <div className='hub'>

                        <div className='hub-left'>

                            <p>Thank you for choosing Taste Hub!</p>

                        </div>

                        <div className='hub-right'>

                            <NavLink to={"/explore-more"} className='btnExploreHub'>Explore More Dishes</NavLink>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

export default OrderDetails
