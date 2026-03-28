import type { Product } from '../types';

const API_BASE = 'http://localhost:3001';

/**
 * Fetches all products from json-server API
 */
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Fetches a single product by ID
 */
export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Adds a new product
 */
export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Updates an existing product
 */
export async function updateApiProduct(id: number, product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Deletes a product
 */
export async function deleteApiProduct(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`);
  }
}

/**
 * Tracks an order by ID (mock implementation on top of json-server)
 */
export async function fetchOrderDetails(orderId: string): Promise<any> {
  const response = await fetch(`${API_BASE}/orders/${orderId}`);
  if (!response.ok) {
    throw new Error(`Order not found: ${orderId}`);
  }
  return await response.json();
}
