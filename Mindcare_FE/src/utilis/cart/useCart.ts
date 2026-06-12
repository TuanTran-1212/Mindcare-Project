// src/utilis/cart/useCart.ts
import { useContext } from 'react';
import { CartContext } from '../../data/Cart';
import type { CartContextValue } from '../../data/Cart';

/**
 * Hook để dùng cart state - tách riêng để fix Fast Refresh
 */
export const useShoppingCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useShoppingCart must be used within CartProvider');
  return ctx;
};                     