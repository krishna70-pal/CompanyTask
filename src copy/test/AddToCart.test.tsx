import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../pages/ProductDetail';
import { CartProvider, useCart } from '../context/CartContext';
import { ThemeProvider } from '../context/ThemeContext';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types';

// Create a simple ProductContext mock
const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Cart Test Product',
    price: 499,
    description: 'Product for cart testing',
    image: 'https://example.com/img.jpg',
  },
];

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
  products: mockProducts,
  loading: false,
  error: null,
  addProduct: vi.fn(),
  updateProduct: vi.fn(),
  deleteProduct: vi.fn(),
  getProductById: (id: number) => mockProducts.find(p => p.id === id),
});

function MockProductProvider({ children }: { children: ReactNode }) {
  return (
    <MockProductContext.Provider
      value={{
        products: mockProducts,
        loading: false,
        error: null,
        addProduct: vi.fn(),
        updateProduct: vi.fn(),
        deleteProduct: vi.fn(),
        getProductById: (id: number) => mockProducts.find(p => p.id === id),
      }}
    >
      {children}
    </MockProductContext.Provider>
  );
}

// Mock the ProductContext module
vi.mock('../context/ProductContext', () => ({
  useProducts: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(MockProductContext);
  },
  ProductProvider: ({ children }: { children: ReactNode }) => <MockProductProvider>{children}</MockProductProvider>,
}));

// Helper to read cart count
function CartCounter() {
  const { getCartCount } = useCart();
  return <div data-testid="cart-count">{getCartCount()}</div>;
}

describe('Add to Cart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('adds a product to cart when Add to Cart button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <MockProductProvider>
          <CartProvider>
            <MemoryRouter initialEntries={['/product/1']}>
              <Routes>
                <Route path="/product/:id" element={<ProductDetail />} />
              </Routes>
            </MemoryRouter>
            <CartCounter />
          </CartProvider>
        </MockProductProvider>
      </ThemeProvider>
    );

    // Verify product is displayed
    expect(screen.getByText('Cart Test Product')).toBeInTheDocument();

    // Click Add to Cart
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    // Verify cart count increased
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });
});
