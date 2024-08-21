import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Effect to add and remove a class for the register page styling
  useEffect(() => {
    document.body.classList.add('register-page');
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  // Handles the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a registration request to the server
      const response = await axios.post('/register', { username, email, password });
      // Store the token and user_id in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id); // Save user_id
      // Redirect to the profile page upon successful registration
      window.location.href = '/profile';
    } catch (err) {
      // Handle registration errors
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="register-button">Register</button>
      </form>

      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Register;