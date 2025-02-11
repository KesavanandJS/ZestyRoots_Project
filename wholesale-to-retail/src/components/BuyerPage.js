import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerPage.css';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon

function BuyerPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Groceries'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="buyer-page">
      <header className="navbar">
        <h1>ZestyRoots</h1>
        <div className="nav-options">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select value={filterCategory} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="cart-icon-container">
            <FaShoppingCart size={24} color="white" />
            <span className="cart-count">{cart.length}</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>

      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to log out?</h3>
            <button className="confirm-btn" onClick={confirmLogout}>Yes</button>
            <button className="cancel-btn" onClick={cancelLogout}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerPage;
