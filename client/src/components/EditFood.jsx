import React, { useEffect, useState } from 'react'
import logoImage from '../assets/logo.png'
import '../css/addFood.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FaPizzaSlice } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

function EditFood() {

    const { id } = useParams()

    const [data, setData] = useState({ name: '', description: '', price: '', category: '', weight: '', foodImage: '', specificationName: '' })

    const [upload, setUpload] = useState(false)
    const [image, setImage] = useState({})

    const naviage = useNavigate()

    async function handle_get_food_by_id(id) {

        try {

            const res = await axios.get(`http://localhost:8002/getFoodById?id=${id}`)

            if (res.data.success) {
                setData(res.data.data.get_food)
            }

            else {
                toast.error(res.data.error)
            }

        } catch (error) {
            console.log(error);
        }

    }

    async function handle_edit_food(e) {

        e.preventDefault()

        if (upload) {
            toast.error("Please wait for the image to finish uploading...")
        }


        const { name, description, price, category, weight, foodImage, specificationName } = data

        try {

            const res = await axios.put(`http://localhost:8002/edit_food`, { id, name, description, price, category, weight, foodImage, specificationName })

            if (res.data.success) {
                toast.success(res.data.message)
                naviage("/")
                setData({ name: '', description: '', price: '', category: '', weight: '', foodImage: '', specificationName: '' })
            }

            else {
                toast.error(res.data.error)
            }


        } catch (error) {
            console.log(error);

        }

    }

    async function handle_change(e) {

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)

        setUpload(true)

        try {

            const { data } = await axios.post(`http://localhost:8002/upload`, formData)

            setImage({
                url: data.url,
                public_id: data.public_id
            })

            setData(prev => ({ ...prev, foodImage: data.url }))
            setUpload(false)

        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {

        handle_get_food_by_id(id)

    }, [id])

    return (
        <div className='add-food-conatiner'>

            <div className='add-food sec'>

                <div className='sub-heading'>

                    <FaPizzaSlice style={{ color: 'orange', fontSize: '1.7rem', marginBottom: '1rem' }} />

                    <span>Taste Hub</span>

                </div>

                <form onSubmit={handle_edit_food}>

                    <div className='input-container'>

                        <div className='left-fields'>

                            <input type="text" placeholder='enter food name' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            <input type="number" placeholder='enter food price' value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} />
                            <input type="number" placeholder='enter food weight' value={data.weight} onChange={(e) => setData({ ...data, weight: e.target.value })} />

                        </div>

                        <div className='right-fields'>

                            <div className='file'>
                                <label htmlFor="upload">
                                </label>
                                <input type="file" id="upload" accept='image/*' onChange={handle_change} />
                            </div>
                            <select value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })}>

                                <option>Seafood</option>
                                <option>Dessert</option>
                                <option>Drinks</option>
                                <option>Protein Foods</option>
                                <option>Chicken</option>
                                <option>Beverages</option>

                            </select>

                            <input type="text" placeholder='Enter specification' value={data.specificationName} onChange={(e) => setData({ ...data, specificationName: e.target.value })} />

                        </div>

                    </div>

                    <div className='desc'>

                        <input type="text" placeholder='enter food description' value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />

                    </div>

                    <button type='submit'>Update food</button>

                </form>

            </div>


        </div>
    )
}

export default EditFood
