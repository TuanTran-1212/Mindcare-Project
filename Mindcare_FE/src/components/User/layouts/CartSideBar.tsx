// src/components/CartSidebar.tsx
import { baseUrl } from "../../../services/api";
import { useShoppingCart } from "../../../utilis/cart/useCart";
import { showNotification } from "../../../utilis/Notification";

/**
 * CartSidebar - Hiển thị giỏ hàng dạng sidebar
 * isOpen và onClose lấy trực tiếp từ CartContext - không cần props
 */
const CartSidebar = () => {
  const {
    cartItems,
    totalItems,
    removeItem,
    updateQuantity,
    isCartOpen,
    totalPrice,
    closeCart,
  } = useShoppingCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showNotification("Your Cart is empty!", "error");
      return;
    }
    window.location.href = "/paymentConfirm";
  };

  return (
    <>
      {/* Overlay - chỉ hiện khi cart mở */}
      <div
        className={`cart-overlay ${isCartOpen ? "active" : ""}`}
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "active" : ""}`}>
        <div className="cart-sidebar-header">
          <h3>Shop Cart ({totalItems})</h3>
          <button className="close-cart" onClick={closeCart}>
            ×
          </button>
        </div>

        <div className="cart-sidebar-content">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p className="empty-cart">Cart Empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item" data-id={item.id}>
                  <div className="cart-item-image">
                    <img src={`${baseUrl}${item.image}`} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <div className="cart-item-price">$ {item.price}</div>
                    <div className="cart-item-quantity">
                      <button
                        className="quantity-btn minus"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn plus"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="cart-total-side">
              <span>Total:</span>
              <span className="total-price">$ {totalPrice.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;