import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../styles/Profile.css';
import NavBar from './NavBar'; // Ensure this path is correct
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState({});
  const [message, setMessage] = useState('');
  const [storeName, setStoreName] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ username: '', email: '' });

  // Adds a class to the body for profile page styling and removes it on cleanup
  useEffect(() => {
    document.body.classList.add('profile-page');
    return () => {
      document.body.classList.remove('profile-page');
    };
  }, []);

  // Fetches the profile and stores data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`/profile?user_id=${userId}`);
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        setMessage('Failed to fetch profile');
      }
    };

    const fetchStores = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`/views/stores?owner_id=${userId}`);
        setStores(response.data);
        setStoreName(response.data[0]?.name || ''); // Set initial store name
        if (response.data[0]) {
          fetchProducts(response.data[0].id); // Fetch products for the first store
        }
      } catch (error) {
        setMessage('Failed to fetch stores');
      }
    };

    fetchProfile();
    fetchStores();
  }, []);

  // Fetches products for a specific store
  const fetchProducts = async (storeId) => {
    try {
      const response = await axios.get(`/views/products?store_id=${storeId}`);
      setProducts((prevProducts) => ({
        ...prevProducts,
        [storeId]: response.data,
      }));
    } catch (error) {
      setMessage('Failed to fetch products');
    }
  };

  // Handlers for input changes
  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleProductUnitChange = (e) => {
    setProductUnit(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  // Updates the user profile
  const handleUpdateProfile = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      await axios.put(`/profile/${userId}`, updatedProfile);
      setProfile(updatedProfile);
      setEditMode(false);
      setMessage('Profile updated successfully');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile');
    }
  };

  // Deletes the user profile
  const handleDeleteProfile = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      await axios.delete(`/profile/${userId}`);
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      window.location.href = '/login';
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  // Creates a new store
  const handleCreateStore = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      await axios.post('/views/stores', { name: storeName, owner_id: userId });
      setMessage('Store created successfully');
      setTimeout(() => {
        setMessage('');
        window.location.reload(); // Reload to fetch and display the new store
      }, 3000);
    } catch (error) {
      console.error('Error creating store:', error);
      setMessage('Failed to create store');
    }
  };

  // Creates a new product
  const handleCreateProduct = async () => {
    try {
      const storeId = stores[0]?.id;
      if (!storeId) {
        setMessage('Store not found');
        return;
      }
      await axios.post('/views/products', {
        store_id: storeId,
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice).toFixed(2), // Ensure price is formatted correctly
        unit: productUnit,
      });
      setMessage('Product created successfully');
      setTimeout(() => {
        setMessage('');
        fetchProducts(storeId); // Fetch updated products list
      }, 3000);
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('Failed to create product');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="welcome-box" onClick={() => setEditMode(!editMode)}>
          <img src="/images/profile.png" alt="Avatar" className="avatar" />
          <h3>Hello, {profile.username || 'Name'}!</h3>
        </div>
        {editMode && (
          <div className="profile-crud">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={updatedProfile.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={updatedProfile.email}
                onChange={handleInputChange}
              />
            </div>
            <button className="update-button" onClick={handleUpdateProfile}>
              Update Profile
            </button>
            <button className="delete-button" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </div>
        )}
        {!editMode && stores.length === 0 && (
          <div className="store-crud">
            <div className="form-group">
              <label>Store Name:</label>
              <input
                type="text"
                value={storeName}
                onChange={handleStoreNameChange}
              />
            </div>
            <button className="create-button" onClick={handleCreateStore}>
              Create Store
            </button>
          </div>
        )}
        {stores.length > 0 && (
          <>
            {products[stores[0].id] && products[stores[0].id].length > 0 ? (
              <div className="product-crud">
                <h4>{stores[0].name}</h4>
                <div>
                  <p>{products[stores[0].id][0].name}</p>
                  <p>{products[stores[0].id][0].description}</p>
                  <p>${parseFloat(products[stores[0].id][0].price).toFixed(2)} - {products[stores[0].id][0].unit}</p>
                </div>
                <div className="storefront-link">
                  <Link to={`/storefront/${stores[0].id}`}>Go to Storefront</Link>
                </div>
              </div>
            ) : (
              <div className="product-crud">
                <h4>{stores[0].name}</h4>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder='Product Name'
                    value={productName}
                    onChange={handleProductNameChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder='Product Description'
                    value={productDescription}
                    onChange={handleProductDescriptionChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder='$ Price'
                    value={productPrice}
                    onChange={handleProductPriceChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder='Unit e.g. Unit, Cup, Qt...'
                    value={productUnit}
                    onChange={handleProductUnitChange}
                  />
                </div>
                <button className="create-button" onClick={handleCreateProduct}>
                  Create Product
                </button>
              </div>
            )}
          </>
        )}
        {message && <p className="message">{message}</p>}
      </div>
      <div className="navbar-container">
        <NavBar />
      </div>
    </div>
  );
};

export default Profile;