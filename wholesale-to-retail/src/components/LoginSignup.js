import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState('consumer');
  const [formData, setFormData] = useState({ name: '', state: '', email: '', contact: '', password: '' });
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', state: '', email: '', contact: '', password: '' });
    setErrors({});
    setPopupMessage('');
  };

  const toggleRole = (role) => {
    setUserRole(role);
    setFormData({ name: '', state: '', email: '', contact: '', password: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!isLogin && !formData.state) {
      newErrors.state = 'State is required';
    }

    if (!isLogin && !formData.contact) {
      newErrors.contact = 'Contact number is required';
    } else if (!isLogin && !/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = 'Contact number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const url = isLogin 
          ? `http://localhost:5000/${userRole}/login`
          : `http://localhost:5000/${userRole}/signup`;

        const response = await axios.post(url, formData);
        
        setPopupMessage(response.data.message);

        if (isLogin) {
          const userId = response.data.userId;

          // Redirect based on user role
          if (userRole === 'consumer') {
            navigate(`/buyer/${userId}`);
          } else {
            navigate(`/dashboard/${userId}`);
          }
        }

        setTimeout(() => setPopupMessage(''), 3000);

      } catch (error) {
        setPopupMessage(error.response ? error.response.data.message : 'An error occurred');
      }
    }
  };

  return (
    <div className="login-signup-container">
      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setPopupMessage('')}>OK</button>
        </div>
      )}

      <div className="role-selector">
        <button onClick={() => toggleRole('consumer')} className={userRole === 'consumer' ? 'active' : ''}>Buyer</button>
        <button onClick={() => toggleRole('producer')} className={userRole === 'producer' ? 'active' : ''}>Seller</button>
      </div>

      {isLogin ? (
        <div className="login-form">
          <h2>{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
            <button type="submit">Login</button>
          </form>
          <p>Don't have an account? <span onClick={toggleForm}>Sign up here</span></p>
        </div>
      ) : (
        <div className="signup-form">
          <h2>{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            {errors.name && <p className="error">{errors.name}</p>}
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
            {errors.state && <p className="error">{errors.state}</p>}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
            <input type="tel" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} required />
            {errors.contact && <p className="error">{errors.contact}</p>}
            <button type="submit">Sign Up</button>
          </form>
          <p>Already have an account? <span onClick={toggleForm}>Login here</span></p>
        </div>
      )}
    </div>
  );
}

export default LoginSignup;
