import React, { useEffect, useState } from 'react'
import '../css/contact.css'
import { FaEnvelope, FaEnvelopeOpen, FaPhone } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

function Contact() {

    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");

        const formData = new FormData(event.target);

        formData.append("access_key", "b864ad24-f1e9-4470-9ac5-068b25b9749f");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            toast.success("Email sent!")
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    useEffect(() => {

        window.scrollTo(0, 0)

    }, [])


    return (

        <>

            <div className='Our-Promise-Banner'>

                <h2>GET IN TOUCH</h2>

            </div>

            <div className='contact-container sec'>


                <div className='contact-left'>

                    <span>Send us a message <FaEnvelopeOpen style={{ color: 'orange' }} />  </span>
                    <p>Feel free to leave us a meesage. We will contact you within 3 business day.</p>
                    <p><FaPhone style={{ color: 'orange' }} /> &nbsp; (+27) 62 419 2299</p>
                    <p><FaEnvelope style={{ color: 'orange' }} /> &nbsp; tinisthera@gmail.com</p>

                    <div className='working-h'>

                        <h1 style={{marginBottom:'1rem'}}>Working Hours</h1>
                        <p>Mon-Fri:&nbsp;<p> Open 24 hours</p></p>
                        <p>Sat-Sun:&nbsp; <p>Open 24 hours</p></p>
                        <p>Public Holiday: &nbsp; <p>Open 24 hours</p></p>

                    </div>

                </div>


                <div className='contact-right'>

                    <form onSubmit={async (event) => onSubmit(event)}>

                        <div className='form-con'>

                            <span>Enter your name</span>
                            <input type="text" name='name' placeholder='Enter your name' required />

                            <span>Enter your email</span>
                            <input type="email" name='email' placeholder='Enter your email' required />

                            <span>Write your messages here</span>
                            <textarea name="message" id="" rows={10} cols={10} placeholder='Enter your message'></textarea>

                        </div>

                        <button type='submit'>Send message</button>

                    </form>

                </div>

            </div >
        </>


    )
}

export default Contact
