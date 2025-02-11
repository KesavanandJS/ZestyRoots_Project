import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">ZestyRoots</div>

      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink to="/about" activeClassName="active-link">About</NavLink>
        <NavLink to="/contact" activeClassName="active-link">Contact</NavLink>
      </div>

      <button className="quote-button" onClick={handleLoginClick}>Login</button>
    </nav>
  );
}

export default Navbar;