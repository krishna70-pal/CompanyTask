import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';
import { fetchProducts, createProduct, updateApiProduct, deleteApiProduct } from '../services/api';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProductById: (id: number | string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from API on mount
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => { cancelled = true; };
  }, []);

  // Add a new product (hits JSON server)
  const addProduct = useCallback(async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error('Failed to add product', err);
      throw err;
    }
  }, []);

  // Update an existing product
  const updateProduct = useCallback(async (id: number, updatedProduct: Omit<Product, 'id'>) => {
    try {
      const savedProduct = await updateApiProduct(id, updatedProduct);
      setProducts(prev => prev.map(p => (String(p.id) === String(id) ? savedProduct : p)));
    } catch (err) {
      console.error('Failed to update product', err);
      throw err;
    }
  }, []);

  // Delete a product
  const deleteProduct = useCallback(async (id: number) => {
    try {
      await deleteApiProduct(id);
      setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
    } catch (err) {
      console.error('Failed to delete product', err);
      throw err;
    }
  }, []);

  // Get a single product by ID locally
  const getProductById = useCallback(
    (id: number | string) => products.find(p => String(p.id) === String(id)),
    [products]
  );

  return (
    <ProductContext.Provider
      value={{ 
        products, 
        loading, 
        error, 
        searchQuery,
        setSearchQuery,
        addProduct, 
        updateProduct, 
        deleteProduct, 
        getProductById 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use ProductContext
export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
