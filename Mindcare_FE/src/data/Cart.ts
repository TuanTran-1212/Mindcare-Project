export interface CartItem {
  id: number;
  title: string;
  price: number;        
  image: string;
  quantity: number;
  productType: "BOOK"| "COURSE";
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}


import { createContext } from 'react';


export interface CartContextValue {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  addItem: (product: {id: number; title: string; price: number; image: string , productType: "BOOK"| "COURSE"}) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
//component nào dùng context này mà không có Provider bọc bên ngoài, giá trị sẽ là null."