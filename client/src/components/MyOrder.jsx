import React, { useEffect, useState } from 'react'
import '../css/myOrder.css'
import imgDessert from '../assets/dessert2.png'
import axios from 'axios';
import { useUserContext } from '../context/userContext.jsx'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import '../css/myOrders.css'
import { FaRegSmile, FaBox, FaShippingFast, FaTimes } from 'react-icons/fa'
import { useCartContext } from '../context/cartContext.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import Footer from './Footer.jsx';

function MyOrder() {

    const { user } = useUserContext()
    const [orders, setOrders] = useState([])
    const userId = user?.user?._id
    const [showTrack, setShowTrack] = useState(false)
    const [id, setId] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [shipment, setShipment] = useState("")
    const [items, setItems] = useState([])
    const [address_name, setAddress_name] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [shippingStatus, setShippingStatus] = useState("")
    const [deliveryTimeFrame, setDeliveryTimeFrame] = useState("")
    const [shippingDate, setShippingDate] = useState("")
    const [deliveryDate, setDeliveryDate] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [suburb, setSuburb] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [userName, setUserName] = useState("")
    const [showShipmentInfo, setShowShipmentInfo] = useState(false)
    const [status, setStatus] = useState("")
    const [cancel, setCancel] = useState("")



    let total = 0
    let taxPrice
    let finalAmount

    const navigate = useNavigate()

    async function getOrderByUser() {

        try {

            const res = await axios.get(`http://localhost:8002/getOrderByUser`, {
                params: { userId }
            })

            if (res.data.success) {
                setOrders(res.data.data.order)

            }


        } catch (error) {
            console.log(error);

        }

    }



    useEffect(() => {

        getOrderByUser()

    }, [userId])



    console.log(orders[0]?.items[0]?.food.foodImage);

    function handle_click(id, paymentStatus, shipmentStatus, items, address_name, createdAt, shippingStatus, deliveryTimeframe, shippingDate, deliveredDate, totalAmount, suburb, city, postalCode, userName, status) {

        setId(id)
        setPaymentStatus(paymentStatus)
        setShipment(shipmentStatus)
        setItems(items)
        setAddress_name(address_name)
        setCreatedAt(createdAt)
        setShippingStatus(shippingStatus)
        setDeliveryTimeFrame(deliveryTimeframe)
        setShippingDate(shippingDate)
        setDeliveryDate(deliveredDate)
        setTotalAmount(totalAmount)
        setSuburb(suburb)
        setCity(city)
        setPostalCode(postalCode)
        setUserName(userName)
        setStatus(status)

        navigate(`/tracking-order/${id}`)

    }

    return (

        <>

            <div className='Our-Promise-Banner'>

                <h2>ORDER DETAILS</h2>

            </div>



            <div className='order-co sec'>

                <span>Order Details</span>

            </div>

            <div className='header-container'>

                <ScrollMenu>

                    <div className='order-sub'>

                        <span>VIEW DETAILS</span>
                        <span>TRACK STATUS</span>

                    </div>

                </ScrollMenu>

                <div className='order-innerss'>

                    {orders.length === 0 ? <div className='not-found'><p>No Orders Found For This User!</p></div> :

                        orders.map((item) => (
                            <div className='map-container'>


                                <div className='food-con'>

                                    {item?.items?.map((food) => (
                                        <>


                                        </>

                                    ))}

                                    <NavLink style={{ textDecoration: 'none' }} to={`/order-details/${item._id}`}>View details</NavLink>

                                </div>

                                {item.status === "canceled" ? (<span style={{ color: 'red' }}>Order Canceled</span>) : (

                                    <>
                                        <a style={{ color: 'blue' }} onClick={() => handle_click(item._id, item.status, item.shippingStatus, item.items, item.address_id.address, item.createdAt, item.shippingStatus, item.deliveryTimeframe, item.shippingDate, item.deliveredDate, item.totalAmount, item.address_id.suburb, item.address_id.city, item.address_id.postalCode, item.user.name, item.status)} >Track Status</a>

                                    </>
                                )}
                            </div>

                        ))}

                </div>

            </div>


            <Footer />


        </>

    )
}

export default MyOrder

//Admin must add delivery status
// an admin must choose delivery status between Shipped, In Transit, At Postnet, Delivered