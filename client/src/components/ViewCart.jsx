import React from 'react'
import '../css/viewCart.css'
import imageDes from '../assets/dessert6.png'
import { useCartContext } from '../context/cartContext.jsx'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function ViewCart() {

    const { cartItems, addToCart, removeFromCart } = useCartContext()

    const cartItemsValues = Object.values(cartItems)
    const totalPrice = cartItemsValues.reduce((a, c) => a + c.price * c.qty, 0)
    const taxPrice = totalPrice * 0.14
    const shippingFee = totalPrice === 0 ? 0 : 100
    const grandTotal = totalPrice + taxPrice + shippingFee


    return (

        <>

            <div className='Our-Promise-Banner'>


                <h2>MY CART</h2>

            </div>

            <div className='view-cart-container sec'>

                <p>My food cart</p>
                <p>{cartItems.length}</p>

            </div>

            <div className='table-responsive sec'>

                <table className='table table-bordered text-center'>

                    <thead>

                        <tr>

                            <th>FOOD DETAILS</th>
                            <th>CATEGORY</th>
                            <th>PRICE</th>
                            <th>TOTAL PRICE</th>

                        </tr>


                    </thead>

                    <tbody>

                        {cartItems.map((item) => (
                            <>

                                <tr>
                                    <td className='text-center align-middle'>
                                        <div className='con'>

                                            <div>

                                                <span><img src={item?.foodImage} alt="" /></span>

                                            </div>
                                            <div className='content'>

                                                <span style={{ fontSize: '1.3rem', fontWeight: '300' }}>{item?.name}</span>

                                                <div className='button-container'>

                                                    <button className='btnDecre' onClick={() => removeFromCart(item)}>-</button>
                                                    <button className='btnQty'>{item?.qty}</button>
                                                    <button className='btnIncre' onClick={() => addToCart(item)}>+</button>
                                                </div>

                                            </div>

                                        </div>

                                    </td>

                                    <td className='text-center align-middle'>{item?.category}</td>
                                    <td className='text-center align-middle'>{`R${item?.price}`}</td>
                                    <td className='text-center align-middle'>{`R${item?.price * item?.qty}`}</td>

                                </tr>

                            </>

                        ))}



                    </tbody>


                </table>

            </div>





            {totalPrice === 0 ? "" : <div className='content-price-total sec'>

                <div className='check-container'>

                    <Link to={"/checkout"}>

                        <button className='checkout' type='submit'>Check out</button>


                    </Link>
                </div>

                <div className='grand-tot'>

                    <span>Shipping fee: {`R${shippingFee}`}</span>
                    <span>Total Price: {`R${grandTotal}`}</span>

                </div>
            </div>}


        </>
    )
}

export default ViewCart
