import React from 'react'
import '../css/cookiePolicy.css'
import { NavLink } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'

function CookiePolicy() {
  return (
    <div className='policy-container'>

      <NavLink to={"/"}>

        <FaArrowLeft style={{ color: '#fff', background: 'skyblue', width: '2.5rem', height: '2.5rem', lineHeight: '2.5', borderRadius: '50%', padding: '.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer' }} />

      </NavLink>

      <h2>

        Cookie Policy for Food Hunt

      </h2>
      <p>

        This Cookie Policy explains how Food Hunt ("we", "us", or "our") uses cookies and similar technologies on our pancake ecommerce website https://localhost:8002 (the "Site").

      </p>

      <p>

        It explains what these technologies are and why we use them, as well as your rights to control our use of them.

      </p>

      <h2>

        What are cookies?

      </h2>

      <p>

        Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
        How we use cookies
        We use cookies for the following purposes:

      </p>

      <h2>Essential cookies: </h2>
      <p>
        These cookies are necessary for the Site to function properly and cannot be switched off in our systems. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling in forms.
      </p>
      <h2> Performance cookies:</h2>
      <p>

        These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Site. They help us know which pages are the most and least popular and see how visitors move around the Site.

      </p>
      <h2> Functionality cookies:</h2>

      <p>These cookies enable the Site to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</p>
      <h2>Targeting cookies: </h2>

      <p>These cookies may be set through our Site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.
      </p>

      <h2>

        Types of cookies we use

      </h2>
      <h2>Session cookies:</h2>

      <p>These cookies are temporary and expire once you close your browser.</p>

      <h2>Persistent cookies: </h2>

      <p>These cookies remain on your device for a set period or until you delete them manually.
      </p>

      <h2> Third-party cookies</h2>
      <p>

        In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the Site, deliver advertisements on and through the Site, and so on.

      </p>
      <h2>

        How to control cookies

      </h2>
      <p>

        You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Site though your access to some functionality and areas of our Site may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.


      </p>
      <h2>
        Your consent
      </h2>
      <p>
        By continuing to use our Site, you are agreeing to our placing cookies on your computer or device in accordance with the terms of this Cookie Policy.
      </p>
      <h2>
        Updates to this policy
      </h2>
      <p>

        We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this policy regularly to stay informed about our use of cookies and related technologies.

      </p>
      <h2>

        More information

      </h2>

      <p>

        If you have any questions about our use of cookies or other technologies, please email us at <a href="#"><NavLink to={"/contact"}>contact us</NavLink></a>.

      </p>



    </div>
  )
}

export default CookiePolicy
