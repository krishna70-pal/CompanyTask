import { Link } from 'react-router-dom';
import './HeroBanner.css';

export default function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to <span>FlipMini</span></h1>
        <p className="hero-subtitle">Discover the best products at unbeatable prices.</p>
        <Link to="/about" className="hero-btn">Explore Now</Link>
      </div>
      <div className="hero-illustration">
        <div className="cube"></div>
        <div className="cube cube2"></div>
        <div className="cube cube3"></div>
      </div>
    </div>
  );
}
