import React, { useState } from 'react'
import logoImage from '../assets/logo.png'
import '../css/addFood.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {FaPizzaSlice} from 'react-icons/fa'

function AddFood() {

    const [data, setData] = useState({ name: '', description: '', price: '', category: '', weight: '', foodImage: '', specificationName: '' })
    const [image, setImage] = useState({})
    const [upload, setUpload] = useState(false)


    async function handle_onchange(e) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)

        setUpload(true)

        try {


            const response = await axios.post('https://mern-food-ordering-app-10.onrender.com/upload', formData)

            setUpload(false)

            setImage({

                url: response.data.url,
                public_id: response.data.public_id
            })


            setData(prevData => ({ ...prevData, foodImage: response.data.url }))


        } catch (error) {
            console.log(error);

        }

    }


    async function handle_submit(e) {

        e.preventDefault()

        const updatedData = {
            ...data, foodImage: image?.url
        }


        const { name, description, price, category, weight, foodImage, specificationName } = data


        if(upload){
            toast.error("Please wait for the image to finish uploading!")
        }

        try {

            const { data } = await axios.post("https://mern-food-ordering-app-10.onrender.com/add", { name, description, price, category, weight, foodImage, specificationName },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }

            )


            if (data.error) {
                toast.error(data.error)
            }

            else {
                setData({})
                toast.success("data added successfully!")
            }


        } catch (error) {
            console.log(error);

        }

    }


    return (

        <div className='add-food-conatiner'>

            <div className='add-food sec'>

                <div className='sub-heading'>

                    <FaPizzaSlice style={{ color: 'orange', fontSize: '1.7rem', marginBottom:'1rem' }} />

                    <span>Taste Hub</span>

                </div>

                <form onSubmit={handle_submit}>

                    <div className='input-container'>

                        <div className='left-fields'>

                            <input type="text" placeholder='enter food name' onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <input type="number" placeholder='enter food price' onChange={(e) => setData({ ...data, price: e.target.value })} />
                            <input type="number" placeholder='enter food weight' onChange={(e) => setData({ ...data, weight: e.target.value })} />

                        </div>

                        <div className='right-fields'>

                            <div className='file'>
                                <label htmlFor="upload">
                                </label>
                                <input type="file" id="upload" accept='image/*' onChange={handle_onchange} />
                            </div>
                            <select onChange={(e) => setData({ ...data, category: e.target.value })}>

                                <option>Seafood</option>
                                <option>Dessert</option>
                                <option>Drinks</option>
                                <option>Protein Foods</option>
                                <option>Chicken</option>
                                <option>Beverages</option>

                            </select>

                            <input type="text" placeholder='Enter specification' onChange={(e) => setData({ ...data, specificationName: e.target.value })} />

                        </div>

                    </div>

                    <div className='desc'>

                        <input type="text" placeholder='enter food description' onChange={(e) => setData({ ...data, description: e.target.value })} />

                    </div>

                    <button type='submit'>Add food</button>

                </form>

            </div>


        </div>

    )
}

export default AddFood
