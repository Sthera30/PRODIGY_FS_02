import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UserOrderDetails() {


    const [data, setData] = useState({ shippingStatus: '' })
    const [orderDetails, setOrderDetails] = useState("")
    const { id } = useParams()

    async function fetch_orders(id) {

        try {

            const res = await axios.get(`https://mern-food-ordering-app-8.onrender.com/GetOrderById?id=${id}`)

            if (res.data.success) {
                setOrderDetails(res.data.data.order)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }


    async function handle_update_shipping() {


        const { shippingStatus } = data


        try {

            const res = await axios.post(`https://mern-food-ordering-app-8.onrender.com/updateShippingStatus`, { id, shippingStatus })

            if (res.data.success) {
                toast.success(res.data.message)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }



    useEffect(() => {

        fetch_orders(id)

    }, [id])




    return (
        <>

            <div className='Our-Promise-Banner'>


                <h2>USER ORDER INFORMATION</h2>

            </div>

            <div className={`address-results`}>

                <div className={`address-inner`}>


                    <div className='address-left'>

                        <span>ORDER NUM</span>
                        <span>NAME</span>
                        <span>ADDRESS</span>
                        <span>BUILDING ADDRESS</span>
                        <span>SUBURB</span>
                        <span>PROVINCE</span>
                        <span>CITY</span>
                        <span>PHONE</span>
                        <span>POSTAL CODE</span>

                    </div>


                    <div className='address-right'>

                        <span>{orderDetails._id}</span>
                        <span>{orderDetails?.address_id?.name}</span>
                        <span>{orderDetails?.address_id?.address}</span>
                        <span>{orderDetails?.address_id?.buildingAddress}</span>
                        <span>{orderDetails?.address_id?.suburb}</span>
                        <span>{orderDetails?.address_id?.province}</span>
                        <span>{orderDetails?.address_id?.city}</span>
                        <span>{orderDetails?.address_id?.phone}</span>
                        <span>{orderDetails?.address_id?.postalCode}</span>

                    </div>

                </div>

                <div className='details_container'>

                    <div className='order_left'>

                        <span>PAYMENT STATUS</span>
                        <span>ORDERED</span>
                        <span>TOTAL AMOUNT</span>


                    </div>
                    <div className='order_right'>

                        <span>{orderDetails.status}</span>
                        <span> {new Date(orderDetails.createdAt).toLocaleDateString('en-GB', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                        })}</span>
                        <span>{`R${orderDetails.totalAmount}`}</span>

                    </div>


                </div>

                <span style={{margin:'1rem 0rem'}}>ITEMS</span>

                {orderDetails?.items?.map((item) => (

                    <div className='img-con'>
                        <span><img src={item.food.foodImage} alt="" /></span>
                    </div>

                ))}



                <h2 className='shipp_status'>UPDATE SHIPPING STATUS</h2>


                <div className='shipping-options'>

                    <select onChange={(e) => setData({ ...data, shippingStatus: e.target.value })}>

                        <option>Shipped</option>
                        <option>Delivered</option>

                    </select>

                    <button className='btnSaveStatus' onClick={handle_update_shipping}>Update Status</button>

                </div>


            </div>

        </>

    )

}

export default UserOrderDetails

