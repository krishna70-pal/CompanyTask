import { useState } from 'react';
import { fetchOrderDetails } from '../services/api';
import './Auth.css'; // Reuse auth styles for simplicity

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError('');
    setStatus(null);

    try {
      const order = await fetchOrderDetails(orderId);
      setStatus(order.status || 'Processing');
    } catch (err: any) {
      if (orderId === 'mock123') {
        setStatus('Shipped'); // Mock for testing
      } else {
        setError("Order not found or invalid ID. Try 'mock123'.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container align-center">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h1 className="auth-title">Track Your Order</h1>
        <p className="auth-subtitle">Enter your order ID to see its status</p>

        <form onSubmit={handleTrack} className="auth-form">
          <div className="form-group">
            <label htmlFor="orderId" className="form-label">Order ID</label>
            <input
              type="text"
              id="orderId"
              className="form-input"
              placeholder="e.g. mock123"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: 'var(--danger)', fontSize: '0.9rem' }}>{error}</p>}

          <button type="submit" className="form-submit-btn" disabled={isLoading}>
            {isLoading ? 'Tracking...' : 'Track'}
          </button>
        </form>

        {status && (
          <div style={{ marginTop: '32px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>Order Status</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
              {status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
