import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import { ProductProvider } from '../context/ProductContext';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';

// Mock the API call
vi.mock('../services/api', () => ({
  fetchProducts: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        name: 'Test Product 1',
        price: 999,
        description: 'A test product',
        image: 'https://example.com/img1.jpg',
      },
      {
        id: 2,
        name: 'Test Product 2',
        price: 1499,
        description: 'Another test product',
        image: 'https://example.com/img2.jpg',
      },
    ])
  ),
}));

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>{ui}</BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product list with product names after loading', async () => {
    renderWithProviders(<ProductList />);

    // Wait for products to load
    const product1 = await screen.findByText('Test Product 1');
    const product2 = await screen.findByText('Test Product 2');

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });

  it('shows loading skeletons initially', () => {
    renderWithProviders(<ProductList />);

    // Should show "All Products" heading during loading
    expect(screen.getByText('All Products')).toBeInTheDocument();
  });
});
