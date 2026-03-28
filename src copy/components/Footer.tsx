import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">
              <span className="footer-logo">🛒</span>
              <span className="footer-title">FlipMini</span>
            </Link>
            <p className="footer-desc">
              Your one-stop destination for mini e-commerce testing and exploration.
              Built with React, TypeScript, and Vite.
            </p>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/info/careers">Careers</Link></li>
              <li><Link to="/info/press">Press</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-heading">Help</h3>
            <ul className="footer-links">
              <li><Link to="/track-order">Track Order</Link></li>
              <li><Link to="/info/returns">Returns</Link></li>
              <li><Link to="/info/cancellation">Cancellation</Link></li>
              <li><Link to="/info/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><Link to="/info/terms-of-use">Terms of Use</Link></li>
              <li><Link to="/info/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/info/sitemap">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} FlipMini. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
