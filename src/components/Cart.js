import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    // Load cart items from localStorage when the component mounts
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCartItems);
    }, []);

    // Function to handle checkout process
    const handleCheckout = async () => {
        try {
            // Prepare order details for the API request
            const orderDetails = {
                intent: 'CAPTURE',
                purchase_units: cartItems.map((item, index) => ({
                    reference_id: `PU-${index + 1}`, // Adding a unique reference_id
                    amount: {
                        value: parseFloat(item.price).toFixed(2), // Fix the decimal places
                        currency_code: 'USD'
                    }
                }))
            };
            // Make the API request to create an order
            const response = await axios.post('/views/create-order', orderDetails);

            // Navigate to order confirmation page if order creation is successful
            if (response.data.orderID) {
                // Clear the cart after successful order creation
                localStorage.removeItem('cart');
                setCartItems([]);
                navigate('/order-confirmation', { state: { orderID: response.data.orderID } });
            } else {
                throw new Error('Failed to create order');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    // Function to remove an item from the cart
    const handleRemoveFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    return (
        <div className="cart-container">
            <h2>Cart</h2>
            <ul className="cart-items-list">
                {cartItems.map((item) => (
                    <li key={item.id}>
                        <div>
                            <h3 className="cart-item-name">{item.name}</h3>
                            <p className="cart-item-description">{item.description}</p>
                            <p className="cart-item-price">${parseFloat(item.price).toFixed(2)} - {item.unit}</p>
                        </div>
                        <div>
                            <button className="remove-from-cart" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="checkout" onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
        </div>
    );
};

export default Cart;
