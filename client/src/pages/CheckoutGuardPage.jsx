import React from 'react'
import CheckoutGuard from '../components/CheckoutGuard.jsx'
import Footer from '../components/Footer.jsx'
import OrderPage from '../pages/OrderPage.jsx'

function CheckoutGuardPage() {
  return (
    <div>

        <CheckoutGuard>
          <OrderPage />
        </CheckoutGuard>
        <Footer />
      
    </div>
  )
}

export default CheckoutGuardPage
