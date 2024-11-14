import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

function EditOurServices() {

  const [data, setData] = useState({ ourServiceHeading: '', ourServiceDescription: '', ourServiceImage: '' })
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState({})

  const { id } = useParams()

  const navigate = useNavigate()

  async function fetch_our_services_by_id(id) {

    try {

      const res = await axios.get(`https://mern-food-ordering-app-10.onrender.com/getOurServicesById?id=${id}`)

      if (res.data.success) {

        setData(res.data.data.our_services)

      }

      else {
        toast.error(res.data.error)
      }


    } catch (error) {
      console.log(error);

    }

  }

  async function handle_edit(e) {

    e.preventDefault()

    const { ourServiceHeading, ourServiceDescription, ourServiceImage } = data

    try {

      const { data } = await axios.put(`https://mern-food-ordering-app-10.onrender.com/editOurServices`, { id, ourServiceHeading, ourServiceDescription, ourServiceImage })

      if (data.success) {
        toast.success(data.message)
        navigate('/our-services')
        setData({ ourServiceHeading: '', ourServiceDescription: '', ourServiceImage: '' })
      }

      else {
        toast.error(data.error)
      }

    } catch (error) {
      console.log(error);

    }

  }

  useEffect(() => {

    fetch_our_services_by_id(id)

  }, [id])

  async function handle_change(e) {

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {

      const { data } = await axios.post(`https://mern-food-ordering-app-10.onrender.com/upload`, formData)

      setImage({

        url: data.url,
        public_id: data.public_id

      })

      setUploading(false)

      setData(prev => ({ ...prev, ourServiceImage: data.url }))


    } catch (error) {

      console.log(error);

    }

  }

  return (
    <>

      <div className='Our-Promise-Banner'>

        <h2>EDIT OUR SERVICES</h2>

      </div>

      <div className='arrow-left' style={{ marginBottom: '-13rem' }}>

        <NavLink to={"/"}>

          <FaArrowLeft style={{ color: '#fff', width: '2.2rem', height: '2.2rem', lineHeight: '2', background: 'purple', borderRadius: '50%', fontSize: '2rem', cursor: 'pointer', padding: '.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} />

        </NavLink>

      </div>


      <div className='manage_promise_container'>


        <div className='manage_promise_inner sec'>

          <form onSubmit={handle_edit}>

            <h3 style={{ marginBottom: '3rem' }}>Edit Our Services</h3>


            <div className='form-container'>

              <label>Our Service Heading</label>
              <input type='text' placeholder='Enter our service heading' value={data.ourServiceHeading} onChange={(e) => setData({ ...data, ourServiceHeading: e.target.value })} />

            </div>


            <div className='form-container'>

              <label>Our Service Description</label>
              <textarea name="" id="" placeholder='Enter description' value={data.ourServiceDescription} rows={6} cols={10} onChange={(e) => setData({ ...data, ourServiceDescription: e.target.value })}></textarea>

            </div>

            <div className='form-container'>

              <label htmlFor="upload">Upload Image</label>
              <input type='file' accept='image/*' id='upload' onChange={handle_change} />

            </div>

            <button type='submit'>Update</button>

          </form>

        </div>

      </div>

    </>

  )
}


export default EditOurServices
