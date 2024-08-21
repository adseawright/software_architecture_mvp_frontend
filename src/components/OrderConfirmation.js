import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderID } = location.state || {}; // Get orderID from state

    return (
        <div className="order-confirmation-container">
            <h2>Order Confirmation</h2>
            {orderID ? (
                <div className="order-details">
                    <p>Thank you for your order! Your order ID is: {orderID}</p>
                </div>
            ) : (
                <p className="no-order-details">No order details available.</p>
            )}
            <div className="links-container">
                <p><Link to="/storefront" className="link">Go to Storefront</Link></p>
                <p><Link to="/profile" className="link">Go to Profile</Link></p>
            </div>
        </div>
    );
};

export default OrderConfirmation;