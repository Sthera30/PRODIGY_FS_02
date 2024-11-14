import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { FaBox, FaRegSmile, FaArrowLeft, FaClock } from 'react-icons/fa'

function TrackOrder() {


  const [orders, setOrders] = useState([])

  const { id } = useParams()



  async function handle_orders() {

    try {

      const res = await axios.get("https://mern-food-ordering-app-8.onrender.com/GetOrderById", {
        params: { id }
      })

      if (res.data.success) {
        setOrders(res.data.data.order)
      }

      else {
        toast.error(res.data.error)
      }

    } catch (error) {
      console.log(error);

    }

  }

  //console.log(orders.items.length);



  useEffect(() => {

    handle_orders()

  }, [id])

  const item_count = orders?.items?.length || 0

  console.log(item_count);


  return (
    <>


      <div className='Our-Promise-Banner'>

        <h2 className='clock'> <FaClock style={{ fontSize: '3rem', color: '#fff' }} /></h2>
        <h2>Track Your Order</h2>

      </div>


      <div className='arrow-left'>

        <NavLink to={"/my-order"}>

          <FaArrowLeft style={{ color: '#fff', width: '2.2rem', height: '2.2rem', lineHeight: '2', background: 'purple', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer', padding: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 'rem' }} />


        </NavLink>

      </div>

      <div className={`addresss-inner`}>

        <div className={`add-co ${orders.shippingStatus === "Not Yet Shipped" ? "decrease_height" : ""}`}>

            <h2 style={{ marginLeft: '-21rem' }}>Tracking</h2>
            <span className='order-num'>Order &nbsp;#{id}</span>
            <span className='delivery_' style={{ marginLeft: '-21rem', marginBottom: '.6rem' }}>Delivery: {orders.deliveryTimeframe}</span>
            <span className={`delivered ${orders.shippingStatus === "Not Yet Shipped" ? "hideShipped" : orders.shippingStatus === "Shipped" ? "hideShipped" : "showShipped"}`}>Delivered {new Date(orders.deliveredDate).toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}</span>
            <div className='shipment'>
              {orders.shippingStatus === "Not Yet Shipped" ? (<span className='ship' style={{ marginLeft: '-22rem', background: 'hsla(0, 11%, 93%, 0.763)' }}>{orders.shippingStatus}</span>) : orders.shippingStatus === "Shipped" ? (<span className='ship' style={{ marginLeft: '-22rem', background: 'hsl(120, 97%, 38%)', color: '#fff' }}>{orders.shippingStatus}</span>) : (<span className='ship' style={{ marginLeft: '-22rem', background: 'hsl(120, 97%, 38%)', color: '#fff' }}>{orders.shippingStatus}</span>)}
            </div>



          <div className='track'>


            <div className={`order-paid ${orders.shippingStatus === "Not Yet Shipped" ? "hideShipped" : "showShipped"}`}>

              <span style={{ color: '#fff' }}> {new Date(orders.createdAt).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>

            </div>

            <div className={`paid ${orders.shippingStatus === "Not Yet Shipped" ? "hideShipped" : "showShipped"}`}>

              <span style={{ color: '#fff' }}>Order {orders.status}</span>

            </div>


            <div className={`addresss-left ${orders.shippingStatus === "Not Yet Shipped" ? "address-left-changed hideShipped" : "address-left-changed-green"}`}>

            </div>


            <div className={`addresss-right ${orders.shippingStatus === "Not Yet Shipped" ? "address-left-changed hideShipped" : "address-left-changed-green"}`}>

              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>

            </div>

            <div className={`shipped-date ${orders.shippingStatus === 'Not Yet Shipped' ? "hideDate" : "showShippedDate"}`}>

              <span style={{ color: '#fff' }}>{new Date(orders.shippingDate).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>

            </div>

            <div className='shipped'>

              <span style={{ color: '#fff' }} className={`${orders.shippingStatus === "Not Yet Shipped" ? "hideShipped" : "showShipped"}`}>{orders.shippingStatus}</span>

              <div className={`parcel_num ${orders.shippingStatus === "Not Yet Shipped" ? "hideShipped" : orders.shippingStatus === "Shipped" ? "showShippedDate" : "showShippedDate"}`}>

                <FaBox style={{ color: '#fff', marginRight: '.8rem' }} />

                <span style={{ color: '#fff' }}>{item_count} {item_count > 1 ? <span>Parcels</span> : <span>Parcel</span>} </span>

              </div>

            </div>


            <div className={`middle ${orders.shippingStatus === "Not Yet Shipped" ? ("address-left-changed hideShipped") : orders.shippingStatus === "Delivered" ? ("address-left-changed-green") : "address-left-changed"}`}>
            </div>

            <div className={`last  ${orders.shippingStatus === "Not Yet Shipped" ? "address-left-changed hideShipped" : orders.shippingStatus === "Delivered" ? ("address-left-changed-green") : "address-left-changed"}`}>
            </div>

            <div className='icon-smile'>

              <FaRegSmile className={`face ${orders.shippingStatus === "Not Yet Shipped" ? "address-left-changed hideShipped" : orders.shippingStatus === "Delivered" ? ("address-left-changed-green") : "address-left-changed"}`} />

            </div>

            <div className={`deliver-date ${orders.shippingStatus === "Not Yet Shipped" ? "hideDeliveryDate" : orders.shippingStatus === "Shipped" ? "hideDeliveryDate" : "showDeliveryDate"}`}>

              <span style={{ color: '#fff' }}>{new Date(orders.deliveredDate).toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>

            </div>

            <div className={`final_destination ${orders.shippingStatus === "Not Yet Shipped" ? "hideDeliveryDate" : orders.shippingStatus === "Shipped" ? "hideDeliveryDate" : "showDeliveryDate"}`} style={{ marginRight: '-17rem', marginTop: '-1rem' }}>
              <span style={{ color: '#fff' }}>{orders.shippingStatus === "Delivered" ? "DELIVERED" : ""} {new Date(orders.deliveredDate).toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}</span>
            </div>

            <div className={`address ${orders.shippingStatus === "Not Yet Shipped" ? "hideDeliveryAddress" : orders.shippingStatus === "Shipped" ? "hideDeliveryAddress" : "showDeliveryAddress"}`} style={{ color: '#fff', marginRight: '-10rem', marginTop: '.4rem' }}>
              <span>{orders?.address_id?.address}</span>
            </div>

          </div>


          <div className={`Order-summary ${orders.shippingStatus === "Not Yet Shipped" ? "decrease-margin" : ""}`}>

            <span>ORDER SUMMARY</span>

            <div className='item-price'>

              <span>{item_count > 1 ? `${item_count} Items` : `${item_count} Item`}</span>
              <span>{`R${orders.totalAmount}`}</span>

            </div>


            <div className='delivery-'>

              <span>Delivery</span>
              <span>{orders.totalAmount === 0 ? "R0" : "R100"}</span>

            </div>

            <div className='order-amount'>

              <span>Order Total</span>
              <span>{`R${orders.totalAmount}`}</span>

            </div>

          </div>


          <div className='address-info'>

            <span>SHIPPING ADDRESS</span>
            <p>{orders?.user?.name}</p>
            <p>{orders?.address_id?.address}</p>
            <p>{orders?.address_id?.suburb}</p>
            <p>{orders?.address_id?.city}</p>
            <p>{orders?.address_id?.postalCode}</p>
          </div>

          <div className='payment-methods'>

            <span>PAYMENT METHOD</span>
            <p>PayFast</p>

          </div>

          <div className='delivery-methods'>

            <span>DELIVERY METHOD</span>
            <p style={{ color: '#fff', fontWeight: '300' }}>Standard</p>

          </div>

          <div className={'tracking-details'}>

            <p>PLEASE NOTE: Detailed tracking will become available once your parcel has shipped from our warehouse</p>

          </div>


        </div>

      </div>

    </>

  )
}

export default TrackOrder
