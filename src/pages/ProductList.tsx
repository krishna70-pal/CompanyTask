import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import HeroBanner from '../components/HeroBanner';
import CustomerReviews from '../components/CustomerReviews';
import './ProductList.css';

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search')?.toLowerCase() || '';

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  );

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        {!query && <HeroBanner />}
        <h1 className="page-title">All Products</h1>
        <div className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" aria-hidden="true">
              <div className="skeleton-image" />
              <div className="skeleton-body">
                <div className="skeleton-line skeleton-line-title" />
                <div className="skeleton-line skeleton-line-price" />
                <div className="skeleton-line skeleton-line-btn" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="page-container">
        <div className="error-container" role="alert">
          <span className="error-icon">⚠️</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {!query && <HeroBanner />}
      <div className="page-header">
        <h1 className="page-title">{query ? `Search Results for "${query}"` : 'All Products'}</h1>
        <p className="page-subtitle">{filteredProducts.length} products available</p>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="empty-container">
          <span className="empty-icon">{query ? '🔍' : '📦'}</span>
          <h2>{query ? 'No matching products' : 'No Products Found'}</h2>
          <p>{query ? 'Try a different keyword' : 'Start by adding your first product!'}</p>
        </div>
      ) : (
        <div className="product-grid" id="product-list">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Show Customer Reviews only on main page, not in search results */}
      {!query && <CustomerReviews />}
    </div>
  );
}
