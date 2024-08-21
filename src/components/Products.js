import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { Link } from 'react-router-dom';
import '../styles/Products.css'; 

const Products = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('');
    const [message, setMessage] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); // State to track the product being edited

    const fetchProducts = async () => {
        try {
            const storeId = localStorage.getItem('store_id');
            if (!storeId) {
                setMessage('No store selected');
                return;
            }
            const response = await axios.get(`/views/products?store_id=${storeId}`);
            setProducts(response.data);
        } catch (error) {
            setMessage('Failed to fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const storeId = localStorage.getItem('store_id');
            if (!storeId) {
                setMessage('No store selected');
                return;
            }
            const formattedPrice = parseFloat(price).toFixed(2);

            if (editingProduct) {
                // Update existing product
                await axios.put(`/views/products/${editingProduct.id}`, { name, description, price: formattedPrice, unit });
                setMessage('Product updated successfully');
            } else {
                // Add new product
                await axios.post('/views/products', { name, description, price: formattedPrice, unit, store_id: storeId });
                setMessage('Product added successfully');
            }

            setName('');
            setDescription('');
            setPrice('');
            setUnit('');
            setEditingProduct(null); // Reset editing state
            fetchProducts(); // Refresh the products list
        } catch (error) {
            setMessage('Failed to add/update product: ' + (error.response?.data.message || error.message));
        }
    };

    const handleEditProduct = (product) => {
        setName(product.name);
        setDescription(product.description);
        setPrice(parseFloat(product.price).toFixed(2)); // Ensure the price has two decimal points
        setUnit(product.unit);
        setEditingProduct(product);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            setMessage('Product deleted successfully');
            fetchProducts(); // Refresh the products list
        } catch (error) {
            setMessage('Failed to delete product: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div className="products-container">
            <h2>Products</h2>
            <form onSubmit={handleAddOrUpdateProduct}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="unit">Unit:</label>
                    <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
                </div>
                <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            </form>
            <p className="message">{message}</p>
            <h3>Product List</h3>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id}>
                        <div>
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>${parseFloat(product.price).toFixed(2)} - {product.unit}</p>
                        </div>
                        <div>
                            <button className="edit-button" onClick={() => handleEditProduct(product)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <Link className="link-to-storefront" to={`/storefront/${localStorage.getItem('store_id')}`}>Go to Storefront</Link>
        </div>
    );
};

export default Products;