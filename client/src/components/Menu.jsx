import React, { useEffect, useState } from 'react'
import { useFoodContext } from "../context/foodContext.jsx";
import '../css/menu.css'
import axios from 'axios';
import img1 from '../assets/dessert6.png'
import { FaHeart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/cartContext.jsx';

function Menu() {

  const { food, setFood } = useFoodContext()

  const [active, setActive] = useState(0)
  const [value, setValue] = useState("All")


  const category = [

    {
      id: 0,
      name: "All",
      value: "All"
    },

    {
      id: 1,
      name: "Rice",
      value: "Rice"
    },

    {
      id: 2,
      name: "Dessert",
      value: "Dessert"
    },

    {
      id: 3,
      name: "Drinks",
      value: "Drinks"
    },

    {
      id: 4,
      name: "Fruits",
      value: "Fruits"
    },

    {
      id: 5,
      name: "Chicken",
      value: "Chicken"
    },

    {
      id: 6,
      name: "Fish",
      value: "Fish"
    }

  ]

  async function getItem() {

    try {

      const res = await axios.get(`http://localhost:8002/getAll?category=${value}`)

      if (res.data.success) {

        setFood(res.data.data.food)

      }


    } catch (error) {
      console.log(error);

    }

  }


  function handle_click(item) {

    setActive(item.id)
    setValue(item.value)

  }

  useEffect(() => {

    getItem()

  }, [value])


  const { addToCart } = useCartContext()


  return (

    <>

      <div className='Our-Promise-Banner'>

        <h2>OUR MENU</h2>

      </div>

      <div className="menu-container">

        <div className="menu-inner">

          {category.map((item) => (

            <a className={`${active === item.id ? "menushOW" : "menuHide"}`} onClick={() => handle_click(item)}>{item.name}</a>

          ))}

        </div>

      </div>

      <div className='food-container sec'>

        {food?.map((foods) => (

          <div className='food-box'>

            <div className='heart-icon'>

              <FaHeart className='heartIcon' style={{ color: 'white', background: "hsl(39, 92%, 46%)", borderRadius: '50%' }} />

            </div>

            <Link to={`/details/${foods._id}`}>

              <img src={foods.foodImage} alt="" />

            </Link>
            <div className='price-'>

              <span>{`R${foods.price}`}</span>


            </div>

            <div className='content'>

              <span>{foods.name}</span>

              <span>

                <FaStar style={{ color: 'goldenrod' }} /> &nbsp;
                <span>({foods.reviews.length})</span>

              </span>


              <button onClick={() => addToCart(foods)} className='order'>Add to cart</button>

            </div>

          </div>


        ))}

      </div>

    </>

  )
}

export default Menu
