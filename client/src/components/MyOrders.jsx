import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/myOrder.css'
import { toast } from 'react-hot-toast'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import Footer from '../components/Footer.jsx'
import { FaFilter, FaBars } from 'react-icons/fa'
import { Menu, XIcon } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'

function MyOrders() {

  const [orders, setOrders] = useState([])
  const [showAddress, setShowAddress] = useState(false)
  const [status, setStatus] = useState("")
  const [price, setPrice] = useState("")
  const [isPending, setIsPending] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [id, setId] = useState("")
  const [showBar, setShowBar] = useState(false)

  async function handle_click(id) {

    setId(id)
    console.log(`Is ${id}`);

    try {

      const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/getAddressByOrder`, { params: { id } })

      if (res.data.success) {
        setAddressDetails(res.data.data.address)
        // console.log(res.data.data.address.address_id.name);
      }


    } catch (error) {

      console.log(error);


    }


  }

  function handle_toggle(e) {
    e.preventDefault()
  }


  async function handle_filte_status() {

    try {

      const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/filterStatus?status=${status}`)

      if (res.data.success) {
        setOrders(res.data.data.paymentStatus)
      }

      else {
        toast.error(res.data.error)
      }

    } catch (error) {
      console.log(error);

    }

  }

  async function handle_price_filter() {

    try {


      const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/filterPrice?priceRange=${price}`)

      if (res.data.success) {
        setOrders(res.data.data.priceFilter)

      }

      else {
        toast.error(res.data.error)
      }


    } catch (error) {
      console.log(error);

    }

  }

  async function handle_filter() {

    try {

      const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/filterDate?startDate=${startDate}&endDate=${endDate}`)

      if (res.data.success) {
        setOrders(res.data.data.dateFilter)
      }

      else {
        toast.error(res.data.error)
      }

    } catch (error) {
      console.log(error);

    }

  }


  {
    console.log(`Hello ${id}`);
  }




  function handle_change(e) {

    e.stopPropagation();
    setStatus(e.target.value)
    console.log(e.target.value);


  }

  function handle_price(e) {

    setPrice(e.target.value)

  }




  useEffect(() => {

    console.log(price);

    handle_price_filter()

  }, [price])


  useEffect(() => {

    handle_filte_status()

  }, [status])

  useEffect(() => {

    console.log(startDate);


  }, [startDate])

  return (

    <>


      <div className='Our-Promise-Banner'>


        <h2>ORDER MANAGEMENT</h2>

      </div>

      <div className='orders-container_'>

        {showBar ? (
          <XIcon onClick={() => { setShowBar(prev => !prev); handle_toggle() }} className='payment-bars' style={{ marginLeft: '4rem', cursor: 'pointer' }} />) : (
            <Menu onClick={() => { setShowBar(prev => !prev); handle_toggle() }} className='payment-bars' style={{ marginLeft: '4rem', cursor: 'pointer' }} />)}

        <div className={`payment-status`}>

          <div className={`payment-status-inner ${showBar ? "show_payment_status" : "2"}`}>


            <span style={{ fontWeight: '800', marginBottom: '1.3rem' }}><FaFilter style={{ color: 'none' }} />&nbsp;Filters</span>

            <span>Payment Status</span>


            <div className='radio-container'>

              <input type="radio" name='tapping' id='paid' value={"paid"} onChange={handle_change} />

              <span>

                <label htmlFor="paid">Paid</label>

              </span>

            </div>


            <div className='radio-container'>


              <input type="radio" name='tapping' value={"pending"} id='pending' onChange={handle_change} />


              <label htmlFor="pending">

                <span>Pending</span>

              </label>

            </div>


            <span className='price_Filter'>Price</span>

            <div className='radio-container'>

              <input type="radio" name='pricing' value={"All"} id='price' onChange={handle_price} />

              <label htmlFor="price">All</label>

            </div>

            <div className='radio-container'>

              <input type="radio" name='pricing' value={"0-50"} id='price' onChange={handle_price} />

              <label htmlFor="price">R0 - R50</label>

            </div>

            <div className='radio-container'>

              <input type="radio" name='pricing' value={"50-100"} id='price' onChange={handle_price} />

              <label htmlFor="price">R50 - R100</label>

            </div>

            <div className='radio-container'>

              <input type="radio" name='pricing' value={"100-150"} id='price' onChange={handle_price} />

              <label htmlFor="price">R100 - R150</label>

            </div>

            <div className='radio-container'>

              <input type="radio" name='pricing' value={"over150"} id='price' onChange={handle_price} />

              <label htmlFor="price">Over R150</label>

            </div>

            <span className='date_filter'>Date</span>

            <div className='date-container'>

              <input type="date" name='date_filter' value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            </div>


            <div className='date-container'>

              <input type="date" name='date_filter' value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            </div>

            <div className='date-container'>

              <button onClick={handle_filter}>Filter Orders</button>

            </div>


          </div>

        </div>


        <div className='order-table'>


          <div className='order-co sec' >


          </div>

          <div className='header-container- sec'>

            <div className='table-responsive'>

              <table className='table table-bordered text-center table-center-1'>

                <thead className='thead-light'>

                  <tr>

                    <th>ORDER NUM</th>
                    <th>VIEW ORDER DETAILS</th>

                  </tr>

                </thead>

                <tbody>

                  {orders.length === 0 ? "" :

                    orders.map((item) => (
                      <>

                        <tr>

                          <td>{item._id} </td>
                          <td>
                            <NavLink style={{ textDecoration: 'none' }} to={`/manage-orders/${item._id}`} className={"anch-color"}>View Details</NavLink>
                          </td>

                        </tr>


                      </>

                    ))}


                </tbody>


              </table>

            </div>

          </div>


        </div>


      </div>

      <Footer />


    </>

  )

  //create another table bro, khupa address yabo babhatalileyo
  // khupha address yabantu who paid



}

export default MyOrders
