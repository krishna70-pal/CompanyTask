import { useState, useEffect } from 'react';
import type { Product } from '../types';
import './ProductForm.css';

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => void;
  submitLabel: string;
}

export default function ProductForm({ initialData, onSubmit, submitLabel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(String(initialData.price));
      setDescription(initialData.description);
      setImage(initialData.image);
    }
  }, [initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({
      name: name.trim(),
      price: parseFloat(price),
      description: description.trim(),
      image: image.trim() || 'https://via.placeholder.com/300x300?text=No+Image',
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} aria-label="Product form">
      <div className="form-group">
        <label htmlFor="product-name" className="form-label">Product Name *</label>
        <input
          type="text"
          id="product-name"
          className="form-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="product-price" className="form-label">Price (₹) *</label>
        <input
          type="number"
          id="product-price"
          className="form-input"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Enter price"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="product-description" className="form-label">Description *</label>
        <textarea
          id="product-description"
          className="form-input form-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter product description"
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="product-image" className="form-label">Image URL</label>
        <input
          type="url"
          id="product-image"
          className="form-input"
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Image Preview */}
      {image && (
        <div className="form-image-preview">
          <img src={image} alt="Preview" onError={e => (e.currentTarget.style.display = 'none')} />
        </div>
      )}

      <button type="submit" className="form-submit-btn" id="product-form-submit">
        {submitLabel}
      </button>
    </form>
  );
}
