import React, { useState, useEffect, useCallback } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    // Effect to add and remove a class for the login page styling
    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    // Optmize handleLogin to prevent it from being recreated on every render
    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        try {
            // Send a login request to the server
            const response = await axios.post('/login', { email, password });
            // Store the token and user_id in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.user_id);
            // Navigate to the profile page upon successful login
            navigate('/profile');
        } catch (error) {
            console.log('Login Error:', error);
            // Handle different error scenarios and display appropriate messages
            if (error.response) {
                if (error.response.status === 400) {
                    setMessage('Missing email or password.');
                } else if (error.response.status === 401) {
                    setMessage('Invalid credentials. Please check your email and password.');
                } else {
                    setMessage('An unexpected error occurred. Please try again later.');
                }
            } else if (error.request) {
                setMessage('No response from server. Please check your network connection.');
            } else {
                setMessage('An error occurred while setting up the request. Please try again.');
            }
            // Clear the message after 5 seconds
            setTimeout(() => {
                setMessage('');
            }, 5000); // Delay to show the message before clearing it
        }
    }, [email, password, navigate]);

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>Don't have an account? <a className='register-link' href="/register">Register here</a></p>
            {message && <p className="error-message">{message}</p>}
        </div>
    );
};

export default Login;