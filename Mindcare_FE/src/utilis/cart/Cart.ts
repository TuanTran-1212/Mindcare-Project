import type { CartItem } from '../../data/Cart';

/**
 * Tính tổng số lượng sản phẩm trong giỏ hàng
 */
export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Tính tổng tiền giỏ hàng (chuyển từ string price sang number)
 */
export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
   
    return total + item.price * item.quantity;
  }, 0);
};

/**
 * Format số tiền theo kiểu Việt Nam ($VND)
 */


/**
 * Thêm sản phẩm vào giỏ hàng (hoặc tăng số lượng nếu đã tồn tại)
 * @returns CartItem[] - giỏ hàng mới
 */
export const addToCart = (
  currentItems: CartItem[],
  product: { id: number, title: string; price: number; image: string, productType: "BOOK" | "COURSE" }
): CartItem[] => {
  const existingItem = currentItems.find(item => item.title === product.title);

  if (existingItem) {
    return currentItems.map(item =>
      item.title === product.title
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    const newItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
      productType: product.productType,
    };
    return [...currentItems, newItem];
  }
};

/**
 * Xóa một item khỏi giỏ hàng theo id
 */
export const removeFromCart = (items: CartItem[], id: number): CartItem[] => {
  return items.filter(item => item.id !== id);
};

/**
 * Cập nhật số lượng của một item
 */
export const updateCartItemQuantity = (
  items: CartItem[],
  id: number,
  newQuantity: number
): CartItem[] => {
  if (newQuantity < 1) return items;

  return items.map(item =>
    item.id === id ? { ...item, quantity: newQuantity } : item
  );
};