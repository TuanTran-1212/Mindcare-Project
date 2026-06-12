// src/pages/PaymentConfirm.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../../../utilis/cart/useCart";
// import { formatPrice } from "../../../utilis/cart/Cart";
// import type { UserResponse } from "../../../services/AuthService";
import { getUserById } from "../../../services/UserService";
import {
  OrderService,
  type OrderItemRequest,
  type OrderRequest,
} from "../../../services/OrderListService";
import { toast } from "react-toastify";

type PaymentMethod = "1" | "2" | "3" | "";

/**
 * PaymentConfirm - opened after clicking checkout in the CartSidebar.
 * Pre-fills customer info from the logged-in user (if any).
 * Validates all required fields before placing the order.
 */
const PaymentConfirm = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useShoppingCart();

  // Pre-fill from logged-in user

  // Customer fields
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");

  // Order fields
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("");
  const [promoCode, setPromoCode] = useState("");
  // const [discount, setDiscount] = useState(0);
  // const [promoMessage, setPromoMessage] = useState("");
  const discount = 0;
  const promoMessage = "";

  //FETCH

  // const [user, setUser] = useState<UserResponse>();
  const fetchUser = async () => {
    try {
      const data = await getUserById(7);
      // setUser(data);
      setFullName(data.fullName);
      setAddress(data.address);
      setPhone(data.phone);
      setEmail(data.email);
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response?.data?.message || "Failed to load user");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  }, []);

  // //
  // // Load logged-in user data
  // useEffect(() => {
  //   const id = localStorage.getItem("loggedInUserId");
  //   if (id) {
  //     const user = getUserById(Number(id));
  //     if (user) {
  //       // eslint-disable-next-line react-hooks/set-state-in-effect
  //       setProfile(user);
  //       setFullName(user.fullName);
  //       setAddress(user.shippingAddress || user.address);
  //       setPhone(user.phone);
  //       setEmail(user.email);
  //       setDateOfBirth(user.dateOfBirth);
  //     }
  //   }
  // }, []);

  // ── Validation ──
  const validateForm = (): string | null => {
    if (!fullName.trim()) return "Please enter your full name.";
    if (!address.trim()) return "Please enter your address.";
    if (!phone.trim()) return "Please enter your phone number.";
    if (!email.trim()) return "Please enter your email.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number.";
    if (!paymentMethod) return "Please select a payment method.";
    if (cartItems.length === 0) return "Your cart is empty.";
    return null;
  };

  const finalTotal = Math.max(totalPrice - discount, 0);

  // ── Place order ──
  // const handlePlaceOrder = () => {
  //   const error = validateForm();
  //   if (error) {
  //     alert(error);
  //     return;
  //   }
  //   clearCart();
  //   alert("Order placed successfully!");
  //   navigate("/");
  // };

  // Trong handlePlaceOrder
  const handlePlaceOrder = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const error = validateForm();
    // if (error) {
    //   alert(error);
    //   return;
    // }

    // Chuẩn bị items
    const items: OrderItemRequest[] = cartItems.map((item) => {
      // Parse price từ string (vd: "$100.00" hoặc "100.000₫")
      
      // Điều chỉnh nếu đơn vị tiền tệ cần chia/ nhân
      // Ở đây giả sử priceNumber đã là số tiền thực tế
       console.log(item.productType);
      return {
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        productType: item.productType.toUpperCase() as "BOOK" | "COURSE",
      };
     
    });
   
    

    // Tạo shippingAddress 
    const shippingAddress = address;

    // Lấy userId từ state user (đã fetch ở useEffect)
    const orderData: OrderRequest = {
      userId: 7, // 
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod || "COD",
      shippingFee: 0, // tuỳ chỉnh nếu có phí ship
      discount: discount > 0 ? discount : 0,
      orderStatus: "PENDING", // hoặc bỏ nếu không bắt buộc
      items: items,
    };
     
   
    try {
      const createdOrder = await OrderService.create(orderData);
      console.log("Order created:", createdOrder);
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      // 1. Lỗi từ response của backend (axios error)
      if (err.response) {
        const { status, data } = err.response;
        console.log(data);
        // Trường hợp validation errors (thường status 400)
        if (status === 400 && data.errors) {
          // data.errors có thể là Map<string, string> hoặc object
          const errorMessages = Object.values(data.errors).join("\n");
          alert(`Validation failed:\n${errorMessages}`);
          toast.error(`Validation failed:\n${errorMessages}`);
        }
        // Lỗi business logic (status 409, 422, ...)
        else if (data.message) {
          alert(data.message);
          toast.error(data.message);
        }
        // Lỗi chung
        else {
          alert(`Error ${status}: ${JSON.stringify(data)}`);
          toast.error(`Error ${status}: ${data.message || "Unknown error"}`);
        }
      }
      // 2. Lỗi không có response (network error)
      else if (err.request) {
        alert("Network error: Cannot connect to server.");
        toast.error("Network error: Cannot connect to server.");
      }
      // 3. Lỗi khác (setup code)
      else {
        alert(`Unexpected error: ${err.message}`);
        toast.error(`Unexpected error: ${err.message}`);
      }
    }
  };

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="container" style={{ maxWidth: 1400 }}>
      <div className="payment-form">
        {/* ── Header ── */}
        <div className="payment-header">
          <i className="fa fa-credit-card fa-4x" />
          <h2>Payment</h2>
          <p className="lead">
            Please review your customer information and cart before placing your
            order.
          </p>
        </div>

        {/* ── Content ── */}
        <div className="payment-content">
          {/* ── Customer section ── */}
          <div className="customer-section">
            <h4 className="section-title">Customer Information</h4>

            <div className="form-group">
              <label htmlFor="kh_ten">Full Name</label>
              <input
                type="text"
                id="kh_ten"
                name="kh_ten"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kh_diachi">Address</label>
              <input
                type="text"
                id="kh_diachi"
                name="kh_diachi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kh_dienthoai">Phone Number</label>
              <input
                type="text"
                id="kh_dienthoai"
                name="kh_dienthoai"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="kh_email">Email</label>
              <input
                type="text"
                id="kh_email"
                name="kh_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <label htmlFor="kh_ngaysinh">Date of Birth</label>
              <input
                type="text"
                id="kh_ngaysinh"
                name="kh_ngaysinh"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div> */}
          </div>

          {/* ── Cart section ── */}
          <div className="cart-section">
            <h4 className="cart-title">
              <span>Cart</span>
              <span className="badge" id="cart-count">
                {totalItems}
              </span>
            </h4>

            <ul className="cart-list" id="cart-list">
              {cartItems.length === 0 ? (
                <li className="cart-item">Your cart is empty</li>
              ) : (
                cartItems.map((item) => {
                  const priceNum = item.price;
                  // parseInt(item.price.replace(/[^\d]/g, "")) || 0;

                  const itemTotal = priceNum * item.quantity;
                  const formatted = itemTotal;
                  return (
                    <li
                      className="cart-item"
                      key={item.id}
                      data-product-id={item.id}
                    >
                      <div className="cart-item-info">
                        <h6 className="cart-item-name">{item.title}</h6>
                        <small className="cart-item-details">
                          {item.price} ×{" "}
                          <span className="cart-item-quantity">
                            {item.quantity}
                          </span>
                        </small>
                      </div>
                      <span className="cart-item-total">$ {formatted}</span>
                    </li>
                  );
                })
              )}
            </ul>

            {/* Payment method */}
            <h4 className="section-title">Payment Method</h4>
            <div className="payment-options">
              {[
               
                { value: "Bank", label: "Bank Transfer" },
                { value: "COD", label: "Ship COD" },
              ].map((opt) => (
                <div className="radio-option" key={opt.value}>
                  <input
                    id={`httt-${opt.value}`}
                    name="httt_ma"
                    type="radio"
                    value={opt.value}
                    checked={paymentMethod === opt.value}
                    onChange={() =>
                      setPaymentMethod(opt.value as PaymentMethod)
                    }
                  />
                  <label htmlFor={`httt-${opt.value}`}>{opt.label}</label>
                </div>
              ))}
            </div>

            {/* Promo code */}
            <div className="promo-section">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="button" className="promo-btn">
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                style={{
                  fontSize: 14,
                  marginTop: 6,
                  color: discount > 0 ? "#10b981" : "#e74c3c",
                }}
              >
                {promoMessage}
              </p>
            )}

            {/* Total */}
            <div className="total-price-section">
              <div className="total-price">
                {discount > 0 && (
                  <>
                    <div className="original-price">
                      $ {totalPrice.toFixed(2)}
                    </div>
                    <div className="discount">
                      — Discount: $ {totalPrice.toFixed(2)}
                    </div>
                  </>
                )}
                <div className="total-label">Total:</div>
                <div className="total-amount" id="total-amount">
                 $ {finalTotal.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Place order button ── */}
        <button
          className="order-btn"
          type="button"
          name="btnDatHang"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirm;
