import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add product to cart (increase quantity if already exists)
  const addToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Remove product from cart entirely
  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Decrease quantity of an item
  const decreaseQuantity = useCallback((productId: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  }, []);

  // Calculate total price
  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // Get total number of items in cart
  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, getCartTotal, getCartCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use CartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
