import React, { useState } from 'react'
import '../css/manageOurPromise.css'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ManageOurPromise() {


    const [data, setData] = useState({ title: '', description: '' })

    const navigate = useNavigate()

    async function handle_submit(e) {

        e.preventDefault()

        const { title, description } = data

        try {

            const { data } = await axios.post(`https://mern-food-ordering-app-7.onrender.com/addPromise`, { title, description })

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


    return (
        <div className='manage_promise_container'>


            <div className='manage_promise_inner sec'>

                <form onSubmit={handle_submit}>

                    <h3>Manage Our Promise</h3>


                    <div className='form-container'>

                        <label>Title</label>
                        <input type="text" placeholder='Enter promise title' onChange={(e) => setData({ ...data, title: e.target.value })} />

                    </div>

                    <div className='form-container'>

                        <label>Description</label>
                        <textarea name="" id="" placeholder='Enter description' rows={6} cols={10} onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>

                    </div>

                    <button type='submit'>Save</button>

                </form>

            </div>

        </div>
    )
}

export default ManageOurPromise
