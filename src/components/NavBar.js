import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';

//navigate to a different path
const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="navigation-box">
      <div className="nav-icon" onClick={() => handleNavigate('/profile')}>
        <img src="/images/profile.png" alt="Profile" />
      </div>
      <div className="nav-icon" onClick={() => handleNavigate('/stores')}>
        <img src="/images/order.png" alt="Stores" />
      </div>
      <div className="nav-icon" onClick={() => handleNavigate('/products')}>
        <img src="/images/myorders.png" alt="Products" />
      </div>
      <div className="nav-icon" onClick={() => handleNavigate('/logout')}>
        <img src="/images/logout.png" alt="Logout" />
      </div>
    </div>
  );
};

export default NavBar;