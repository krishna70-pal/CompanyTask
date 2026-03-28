import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const { getCartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getCartCount();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">🛒</span>
          <span className="navbar-title">FlipMini</span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
            aria-label="Search products"
          />
          <button type="submit" className="navbar-search-btn" aria-label="Submit search">
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/cart" className="nav-link nav-link-cart" aria-label={`Cart with ${cartCount} items`}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
