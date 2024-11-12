import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartContext } from '../context/cartContext.jsx';
import '../css/checkoutGuard.css';

function CheckoutGuard({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems } = useCartContext();
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Use useMemo outside of useEffect
    const isCartEmpty = useMemo(() => !cartItems || cartItems.length === 0, [cartItems]);

    useEffect(() => {
        console.log('CheckoutGuard Mounted');
        console.log('Cart Items:', cartItems);
        console.log('Is Cart Empty:', isCartEmpty);
        console.log('Current Path:', location.pathname);

        if (isCartEmpty) {
            console.log('Cart is empty, showing alert');
            setIsRedirecting(true);

            // Delay redirection for 3 seconds
            const timer = setTimeout(() => {
                console.log('Redirecting to menu...');
                navigate('/our-food', { replace: true });
            }, 3000);

            // Cleanup timer on unmount
            return () => clearTimeout(timer);
        } else {
            console.log('Cart has items, rendering children');
            setIsRedirecting(false);
        }
    }, [isCartEmpty, navigate, location.pathname]);

    // If we are redirecting, show the alert
    if (isRedirecting) {
        return (
            <div className="alert-container">
                <div className="alert-box">
                    <p>Please add items to your cart before accessing checkout!</p>
                    <p>Redirecting to menu in 3 seconds...</p>
                </div>
            </div>
        );
    }

    // Render children only if cartItems is not empty
    return <>{children}</>;
}

export default CheckoutGuard;
