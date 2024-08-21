import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [loading, setLoading] = useState(true); // State for managing loading indicator
    const navigate = useNavigate();

    // useCallback hook to memoize the handlePaymentSuccess function
    const handlePaymentSuccess = useCallback((details, data) => {
        alert('Transaction completed by ' + details.payer.name.given_name);
        localStorage.removeItem('cart'); // Clear the cart from localStorage
        navigate('/storefront'); // Navigate back to storefront
    }, [navigate]);

    // useEffect to handle loading the PayPal buttons and navigating if the cart is empty
    useEffect(() => {
        // Fetch cart items from localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // If the cart is empty, navigate back to the storefront
        if (cart.length === 0) {
            navigate('/storefront');
            return;
        }

        // Calculate the total amount for the purchase
        const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

        // Function to load PayPal buttons with retry logic
        const loadPaypalButtons = () => {
            let attempts = 0;
            const maxAttempts = 5;

            const tryRenderButtons = () => {
                if (window.paypal) {
                    // Render PayPal buttons
                    window.paypal.Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [{
                                    amount: {
                                        value: totalAmount,
                                        currency_code: 'USD'
                                    }
                                }],
                                application_context: {
                                    shipping_preference: 'SET_PROVIDED_ADDRESS', // Force PayPal to prompt for shipping/payment info
                                    user_action: 'PAY_NOW', // Ensures the Pay Now button appears on the PayPal page
                                    return_url: window.location.href, // Optional: URL where PayPal returns the user
                                    cancel_url: window.location.href // Optional: URL where PayPal returns the user if they cancel
                                }
                            });
                        },
                        onApprove: (data, actions) => {
                            return actions.order.capture().then((details) => {
                                handlePaymentSuccess(details, data);
                            });
                        },
                        onError: (err) => {
                            console.error('PayPal Checkout Error:', err);
                            alert('There was an error processing your payment. Please try again.');
                        }
                    }).render('#paypal-button-container').then(() => {
                        setLoading(false); // Remove loading indicator once PayPal buttons are rendered
                    });
                } else if (attempts < maxAttempts) {
                    attempts++;
                    const retryDelay = attempts * 200; // Increasing delay with each attempt
                    setTimeout(tryRenderButtons, retryDelay);
                } else {
                    alert('Failed to load PayPal buttons. Please refresh the page or try again later.');
                }
            };

            tryRenderButtons();
        };

        loadPaypalButtons();
    }, [navigate, handlePaymentSuccess]);

    return (
        <div>
            <h2>Checkout</h2>
            {loading && <p>Loading payment options...</p>} {/* Loading indicator */}
            <div id="paypal-button-container"></div> {/* Container for PayPal buttons */}
        </div>
    );
};

export default Checkout;
