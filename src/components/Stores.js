import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import '../styles/Stores.css';

const Stores = () => {
    const [stores, setStores] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [editingStore, setEditingStore] = useState(null); // State to track the store being edited

    // Function to fetch stores
    const fetchStores = async () => {
        try {
            const userId = localStorage.getItem('user_id');
            const response = await axios.get(`/views/stores?owner_id=${userId}`);
            setStores(response.data);
        } catch (error) {
            setMessage('Failed to fetch stores');
        }
    };

    // Fetch stores when the component mounts
    useEffect(() => {
        fetchStores();
    }, []);

    // Handle the addition or update of a store
    const handleAddOrUpdateStore = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('user_id');
            if (editingStore) {
                // Update existing store
                await axios.put(`/views/stores/${editingStore.id}`, { name, description });
                setMessage('Store updated successfully');
            } else {
                // Add new store
                const response = await axios.post('/views/stores', { name, description, owner_id: userId });
                setMessage(response.data.message);
                setStores([...stores, response.data.store]); // Add the new store to the list
                localStorage.setItem('store_id', response.data.store.id); // Update store_id in localStorage
            }

            setName('');
            setDescription('');
            setEditingStore(null); // Reset editing state
            fetchStores(); // Refresh the stores list
        } catch (error) {
            setMessage('Failed to add/update store: ' + (error.response.data.message || error.message));
        }
    };

    // Handle editing of a store
    const handleEditStore = (store) => {
        setName(store.name);
        setDescription(store.description);
        setEditingStore(store);
    };

    // Handle deletion of a store
    const handleDeleteStore = async (storeId) => {
        try {
            await axios.delete(`/views/stores/${storeId}`);
            setMessage('Store deleted successfully');
            fetchStores(); // Refresh the stores list
        } catch (error) {
            setMessage('Failed to delete store: ' + (error.response.data.message || error.message));
        }
    };

    return (
        <div className="stores-container">
            <h2>Stores</h2>
            {/* Form to add or update a store */}
            <form onSubmit={handleAddOrUpdateStore} className="store-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="store-button">
                    {editingStore ? 'Update Store' : 'Add Store'}
                </button>
            </form>
            <p>{message}</p>
            <h3>Store List</h3>
            {/* List of stores */}
            <ul className="store-list">
                {stores.map((store) => (
                    <li key={store.id} className="store-item">
                        {store.name} - <Link to={`/storefront/${store.id}`}>View Storefront</Link>
                        <button onClick={() => handleEditStore(store)} className="edit-button">Edit</button>
                        <button onClick={() => handleDeleteStore(store.id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
            <div className="nav-links">
                <Link to="/profile">Go to Profile</Link>
                <Link to="/products">Go to Products</Link>
            </div>
        </div>
    );
};

export default Stores;