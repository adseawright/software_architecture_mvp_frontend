import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Storefront.css';

const Storefront = () => {
    const [products, setProducts] = useState([]);
    const { storeId } = useParams();
    const navigate = useNavigate();

    // Fetch products when the component mounts or storeId changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch products for the given storeId
                const response = await axios.get(`/views/products?store_id=${storeId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [storeId]);

    // Add a product to the cart and store it in localStorage
    const addToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    };

    return (
        <div className="storefront-container">
            <h2>Storefront</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id}>
                        <div>
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">${parseFloat(product.price).toFixed(2)} - {product.unit}</p>
                        </div>
                        <div className="button-group">
                            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="go-to-cart" onClick={() => navigate('/cart')}>Go to Cart</button>
        </div>
    );
};

export default Storefront;