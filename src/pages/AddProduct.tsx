import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductForm from '../components/ProductForm';
import type { Product } from '../types';
import './FormPage.css';

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  async function handleSubmit(data: Omit<Product, 'id'>) {
    try {
      await addProduct(data);
      navigate('/');
    } catch(err) {
      alert("Failed to add product");
    }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Add New Product</h1>
      <p className="page-subtitle">Fill in the details to add a new product to the catalog.</p>
      <ProductForm onSubmit={handleSubmit} submitLabel="Add Product" />
    </div>
  );
}
