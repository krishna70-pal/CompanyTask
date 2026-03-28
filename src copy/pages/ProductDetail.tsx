import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import LazyImage from '../components/LazyImage';
import CustomerReviews from '../components/CustomerReviews';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products, loading, deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Custom states for new features
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');

  const product = getProductById(Number(id));

  // scroll to top and reset image on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      setActiveImage(product.image);
    }
  }, [id, product]);

  if (loading) {
    return (
      <div className="page-container align-center">
        <h2 style={{ textAlign: 'center', marginTop: '100px' }}>Loading product details...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-container">
        <div className="error-container">
          <span className="error-icon">🔍</span>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist or was removed.</p>
          <Link to="/" className="btn-primary">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const originalPrice = Math.floor(product.price * 1.4); // Mock 40% discount
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  // Similar products logic (exclude current, take 4)
  const similarProducts = products.filter(p => String(p.id) !== String(product?.id)).slice(0, 4);
  
  // Gallery images (Main + Similar ones)
  const galleryImages = [product.image, ...similarProducts.slice(0, 3).map(p => p.image)];
  const [activeImage, setActiveImage] = useState(product.image);

  async function handleDelete() {
    try {
      await deleteProduct(product!.id);
      navigate('/');
    } catch(err) {
      alert("Failed to delete product");
    }
  }

  function handleAddToCart() {
    addToCart(product!);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }
  
  function handleBuyNow() {
    addToCart(product!);
    navigate('/cart');
  }

  function checkPincode() {
    if (pincode.length === 6) {
      setPincodeMsg(`Delivery available to ${pincode} in 2-3 days.`);
    } else {
      setPincodeMsg('Please enter a valid 6-digit PIN code.');
    }
  }

  function applyCoupon() {
    if (couponCode.toLowerCase() === 'flipmini') {
      setCouponMsg('Coupon applied successfully! 10% extra off at checkout.');
    } else {
      setCouponMsg('Invalid or expired coupon code.');
    }
  }

  return (
    <div className="product-detail-page">
      <div className="page-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt; <span>{product.name}</span>
        </div>

        <div className="detail-layout">
          {/* Left Column - Image & Main Actions */}
          <div className="detail-media-section">
            <div className="media-gallery-container">
              <div className="thumbnails-column">
                {galleryImages.map((img, idx) => (
                  <div 
                    key={idx} 
                    className={`thumbnail-box ${activeImage === img ? 'active' : ''}`}
                    onMouseEnter={() => setActiveImage(img)}
                  >
                    <LazyImage src={img} alt={`Gallery ${idx}`} className="thumbnail-img" />
                  </div>
                ))}
              </div>
              <div className="detail-image-wrapper">
                <LazyImage
                  src={activeImage}
                  alt={product.name}
                  className="detail-image"
                />
              </div>
            </div>
            
            <div className="detail-main-actions">
              <button 
                className={`btn-primary-action btn-cart ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                id="add-to-cart-btn"
              >
                🛒 {addedToCart ? 'ADDED TO CART' : 'ADD TO CART'}
              </button>
              <button 
                className="btn-primary-action btn-buy"
                onClick={handleBuyNow}
              >
                ⚡ BUY NOW
              </button>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="detail-info-section">
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-ratings-summary">
              <span className="rating-badge">4.5 ★</span>
              <span className="rating-count">12,453 Ratings & 843 Reviews</span>
            </div>

            <div className="detail-pricing">
              <span className="price-new">₹{product.price.toLocaleString()}</span>
              <span className="price-old">₹{originalPrice.toLocaleString()}</span>
              <span className="price-discount">{discountPercentage}% off</span>
            </div>
            
            <div className="offers-section">
              <h3>Available offers</h3>
              <ul>
                <li><strong>Bank Offer</strong> 5% Cashback on Flipkart Axis Bank Card</li>
                <li><strong>Special Price</strong> Get extra {Math.round(discountPercentage/2)}% off (price inclusive of cashback/coupon)</li>
                <li><strong>Partner Offer</strong> Sign up for Flipkart Pay Later and get Flipkart Gift Card worth up to ₹500*</li>
              </ul>
            </div>

            <div className="delivery-section">
              <h3>Delivery</h3>
              <div className="input-group">
                <span className="location-icon">📍</span>
                <input 
                  type="text" 
                  placeholder="Enter Delivery Pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, '').substring(0, 6))}
                />
                <button className="btn-text" onClick={checkPincode}>Check</button>
              </div>
              {pincodeMsg && <p className={`status-msg ${pincodeMsg.includes('Please') ? 'error' : ''}`}>{pincodeMsg}</p>}
              <p className="delivery-estimated">Delivery by <b>Tommorrow</b> | <span className="free-text">Free</span> <s>₹40</s></p>
            </div>

            <div className="coupon-section">
              <h3>Apply Coupon</h3>
              <div className="input-group">
                <span className="tag-icon">🏷️</span>
                <input 
                  type="text" 
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />
                <button className="btn-text" onClick={applyCoupon}>Apply</button>
              </div>
              {couponMsg && <p className={`status-msg ${couponMsg.includes('Invalid') ? 'error' : 'success'}`}>{couponMsg}</p>}
            </div>

            <div className="detail-description-box">
              <h3>Product Description</h3>
              <p>{product.description}</p>
            </div>

          </div>
        </div>

        {/* Similar Products Section */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <h2 className="section-heading">Similar Products</h2>
            <div className="similar-grid">
              {similarProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section at the bottom */}
        <div className="detail-reviews-wrapper">
          <CustomerReviews />
        </div>

        {/* Product Footer Part - Admin Actions */}
        <div className="product-page-footer">
          <div className="admin-actions">
            <Link to={`/edit/${product.id}`} className="btn-outline-small" id="edit-product-btn">
              ✏️ Edit Product
            </Link>
            <button 
              className="btn-outline-small danger" 
              onClick={() => setShowDeleteConfirm(true)}
              id="delete-product-btn"
            >
              🗑️ Delete Product
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Delete confirmation">
          <div className="modal-content">
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete "<strong>{product.name}</strong>"? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDelete} id="confirm-delete-btn">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
