import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

export default function CartPage() {
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-container">
          <span className="empty-icon">🛒</span>
          <h2>Your Cart is Empty</h2>
          <p>Browse products and add items to your cart.</p>
          <Link to="/" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart</p>
      </div>

      <div className="cart-layout">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map(item => (
            <article key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
                loading="lazy"
              />
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                <p className="cart-item-qty">Qty: {item.quantity}</p>
              </div>
              <div className="cart-item-actions">
                <p className="cart-item-total">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  id={`remove-cart-item-${item.id}`}
                >
                  ✕ Remove
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Cart Summary */}
        <aside className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-delivery">FREE</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{getCartTotal().toLocaleString()}</span>
          </div>
          <button className="btn-checkout" id="checkout-btn">
            Proceed to Checkout
          </button>
          <button className="btn-clear-cart" onClick={clearCart} id="clear-cart-btn">
            Clear Cart
          </button>
        </aside>
      </div>
    </div>
  );
}
