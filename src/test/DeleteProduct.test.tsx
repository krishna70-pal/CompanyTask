import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail';
import { CartProvider } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Delete Test Product',
    price: 799,
    description: 'Product to test deletion',
    image: 'https://example.com/delete.jpg',
  },
];

// We need a stateful mock provider to verify deletion
function StatefulMockProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <MockProductContext.Provider
      value={{
        products,
        loading: false,
        error: null,
        addProduct: vi.fn(),
        updateProduct: vi.fn(),
        deleteProduct,
        getProductById: (id: number) => products.find(p => p.id === id),
      }}
    >
      {children}
    </MockProductContext.Provider>
  );
}

interface MockProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const MockProductContext = createContext<MockProductContextType>({
  products: initialProducts,
  loading: false,
  error: null,
  addProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getProductById: (id: number) => initialProducts.find(p => p.id === id),
});

vi.mock('../context/ProductContext', () => ({
  useProducts: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(MockProductContext);
  },
  ProductProvider: ({ children }: { children: ReactNode }) => <StatefulMockProvider>{children}</StatefulMockProvider>,
}));

describe('Delete Product', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows confirmation dialog and deletes product on confirm', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <StatefulMockProvider>
          <CartProvider>
            <MemoryRouter initialEntries={['/product/1']}>
              <Routes>
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/" element={<div data-testid="home">Home</div>} />
              </Routes>
            </MemoryRouter>
          </CartProvider>
        </StatefulMockProvider>
      </ThemeProvider>
    );

    // Verify product is displayed
    expect(screen.getByText('Delete Test Product')).toBeInTheDocument();

    // Click Delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    // Verify confirmation dialog appears
    expect(screen.getByText('Delete Product?')).toBeInTheDocument();

    // Click confirm
    const confirmButton = screen.getByRole('button', { name: /yes, delete/i });
    await user.click(confirmButton);

    // Should navigate to home after deletion
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});
