import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import type { Product } from '../types';
import './FormPage.css';

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <div className="page-container">
        <div className="error-container">
          <span className="error-icon">🔍</span>
          <h2>Product Not Found</h2>
          <p>Cannot edit a product that doesn't exist.</p>
          <Link to="/" className="btn-primary">← Back to Products</Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(data: Omit<Product, 'id'>) {
    try {
      await updateProduct(Number(id), data);
      navigate(`/product/${id}`);
    } catch(err) {
      alert("Failed to update product");
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Edit Product</h1>
      <p className="page-subtitle">Update the details for <strong>{product.name}</strong></p>
      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}
