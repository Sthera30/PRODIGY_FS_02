import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function EditPromise() {

    const { id } = useParams()

    const [data, setData] = useState({ title: '', description: '' })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const { title, description } = data

        try {

            const { data } = await axios.put(`https://mern-food-ordering-app-8.onrender.com/editPromise`, { id, title, description })

            if (data.success) {
                toast.success(data.message)
                navigate("/our-promise")
            }

            else {
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    async function handle_fetch() {

        try {

            const { data } = await axios.get(`https://mern-food-ordering-app-8.onrender.com/getPromiseById`, { params: {
                id
            } })

            if (data.success) {
                setData(data.data.our_promise)
            }

            else {
                toast.error(data.error)
            }


        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {

        handle_fetch()

    }, [id])

    return (
        <div className='manage_promise_container'>


            <div className='manage_promise_inner'>

                <form onSubmit={handle_submit}>

                    <h3>Manage Our Promise</h3>


                    <div className='form-container'>

                        <label>Title</label>
                        <input type="text" placeholder='Enter promise title' value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />

                    </div>

                    <div className='form-container'>

                        <label>Description</label>
                        <textarea name="" id="" placeholder='Enter description' value={data.description} rows={6} cols={10} onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>

                    </div>

                    <button type='submit'>Update</button>

                </form>

            </div>

        </div>
    )
}

export default EditPromise
