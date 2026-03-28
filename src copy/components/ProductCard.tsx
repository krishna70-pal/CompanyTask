import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import LazyImage from './LazyImage';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cartItems, addToCart, decreaseQuantity } = useCart();
  
  // Find if product is already in cart
  const cartItem = cartItems.find(item => item.id === product.id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      <Link to={`/product/${product.id}`} className="product-card-image-wrapper">
        <LazyImage
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </Link>
      <div className="product-card-body">
        <h3 className="product-card-name" title={product.name}>{product.name}</h3>
        <p className="product-card-price">₹{product.price.toLocaleString()}</p>
        
        <div className="product-card-actions">
          {qty > 0 ? (
            <div className="product-card-counter">
              <button className="counter-btn" onClick={(e) => { e.preventDefault(); decreaseQuantity(product.id); }}>−</button>
              <span className="counter-qty">{qty}</span>
              <button className="counter-btn" onClick={(e) => { e.preventDefault(); addToCart(product); }}>+</button>
            </div>
          ) : (
            <button className="product-card-btn" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
