import React, { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  type: "book" | "course";
  price: number;
  image: string;
}

interface OrderProduct extends Product {
  quantity: number;
}

interface OrderForm {
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  payment: string;
  status: string;
}

interface OrderRow extends Record<string, unknown> {
  id: string;
  customer: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  payment: string;
  status: string;
  products: OrderProduct[];
  amount: string;
}

const COUPONS: Record<string, number> = { SAVE10: 10, SAVE20: 20, WELCOME: 15 };

const BOOK_PRODUCTS: Product[] = [
  {
    id: "bp1",
    title: "The Psychology of Money",
    type: "book",
    price: 29.99,
    image: "",
  },
  { id: "bp2", title: "Atomic Habits", type: "book", price: 24.99, image: "" },
  { id: "bp3", title: "Deep Work", type: "book", price: 19.99, image: "" },
  { id: "bp4", title: "Zero to One", type: "book", price: 22.0, image: "" },
  {
    id: "bp5",
    title: "The Lean Startup",
    type: "book",
    price: 18.0,
    image: "",
  },
];
const COURSE_PRODUCTS: Product[] = [
  {
    id: "cp1",
    title: "React & TypeScript Masterclass",
    type: "course",
    price: 49.99,
    image: "",
  },
  {
    id: "cp2",
    title: "Node.js Advanced Patterns",
    type: "course",
    price: 39.99,
    image: "",
  },
  {
    id: "cp3",
    title: "System Design Bootcamp",
    type: "course",
    price: 59.99,
    image: "",
  },
  {
    id: "cp4",
    title: "Python for Data Science",
    type: "course",
    price: 44.99,
    image: "",
  },
];
const ALL_PRODUCTS = [...BOOK_PRODUCTS, ...COURSE_PRODUCTS];

const EMPTY_FORM: OrderForm = {
  customer: "",
  email: "",
  phone: "",
  address: "",
  date: "",
  payment: "",
  status: "Pending",
};

interface OrderModalProps {
  mode: "add" | "edit" | null;
  row: OrderRow | null;
  onClose: () => void;
  onSave: (row: OrderRow) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  mode,
  row,
  onClose,
  onSave,
}) => {
  const show = mode !== null;
  const [form, setForm] = useState<OrderForm>(() => {
    if (mode === "edit" && row) {
      return {
        customer: row.customer,
        email: row.email ?? "",
        phone: row.phone ?? "",
        address: row.address ?? "",
        date: row.date ?? "",
        payment: row.payment ?? "",
        status: row.status ?? "Pending",
      };
    }
    return EMPTY_FORM;
  });
  const [products, setProducts] = useState<OrderProduct[]>(() => {
    return mode === "edit" && row && Array.isArray(row.products)
      ? (row.products as OrderProduct[])
      : [];
  });
  const [selectedProd, setSelectedProd] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (!show) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [show, onClose]);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  const subtotal = products.reduce((s, p) => s + p.price * p.quantity, 0);
  const finalPrice = Math.max(0, subtotal - discount);

  const addProduct = (val: string) => {
    const prod = ALL_PRODUCTS.find((p) => p.id === val);
    if (!prod) return;
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === prod.id);
      if (idx >= 0) {
        const n = [...prev];
        n[idx] = { ...n[idx], quantity: n[idx].quantity + 1 };
        return n;
      }
      return [...prev, { ...prod, quantity: 1 }];
    });
    setSelectedProd("");
  };

  const changeQty = (idx: number, delta: number) => {
    setProducts((prev) => {
      const n = [...prev];
      n[idx] = { ...n[idx], quantity: n[idx].quantity + delta };
      if (n[idx].quantity <= 0) n.splice(idx, 1);
      return n;
    });
  };

  const applyC = () => {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscount(COUPONS[code]);
      alert(`Coupon applied! You saved $${COUPONS[code]}`);
    } else if (code) {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const handleSave = () => {
    if (!form.customer.trim()) {
      alert('"Customer Name" is required');
      return;
    }
    if (!form.email.trim()) {
      alert('"Email" is required');
      return;
    }
    if (products.length === 0) {
      alert("Please add at least one product");
      return;
    }
    const saved: OrderRow = {
      ...form,
      id: mode === "add" ? "VZ" + Date.now() : (row?.id ?? "VZ" + Date.now()),
      products,
      amount: finalPrice.toFixed(2),
    };
    onSave(saved);
  };

  const F = (label: string, el: React.ReactNode) => (
    <div className="mb-3">
      <label className="form-label fw-medium small">{label}</label>
      {el}
    </div>
  );

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 1050,
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1055,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            width: "100%",
            maxWidth: 960,
            maxHeight: "92vh",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#f8f9fa",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid #dee2e6",
              borderRadius: "12px 12px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h5 style={{ margin: 0, fontWeight: 600 }}>
              {mode === "add" ? "Create Order" : "Edit Order"}
            </h5>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 22,
                color: "#6c757d",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Body — split layout */}
          <div
            style={{
              display: "flex",
              flex: 1,
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            {/* LEFT — Products */}
            <div
              style={{
                flex: "0 0 50%",
                borderRight: "1px solid #dee2e6",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem" }}>
                {/* Product select */}
                <div className="mb-3">
                  <label className="form-label fw-medium small">
                    Add Product
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={selectedProd}
                    onChange={(e) => {
                      if (e.target.value) addProduct(e.target.value);
                      setSelectedProd(e.target.value);
                    }}
                  >
                    <option value="">Select Product</option>
                    <optgroup label="Books">
                      {BOOK_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} — ${p.price}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Courses">
                      {COURSE_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} — ${p.price}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Product cards */}
                <div
                  style={{
                    maxHeight: 260,
                    overflowY: "auto",
                    border: "1px solid #e9ecef",
                    borderRadius: 6,
                    padding: 8,
                  }}
                >
                  {products.length === 0 ? (
                    <div className="text-center text-muted py-4">
                      <i className="fas fa-shopping-cart fa-2x mb-2 d-block" />
                      <p className="mb-0 small">No products added yet</p>
                    </div>
                  ) : (
                    products.map((p, i) => (
                      <div
                        key={p.id}
                        className="card mb-2"
                        style={{ border: "1px solid #e9ecef" }}
                      >
                        <div className="card-body p-2">
                          <div className="d-flex align-items-center">
                            <div
                              style={{
                                width: 46,
                                height: 46,
                                background: "#f8f9fa",
                                borderRadius: 6,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <i
                                className={`fas ${p.type === "book" ? "fa-book" : "fa-play-circle"} text-muted`}
                              />
                            </div>
                            <div className="flex-grow-1 ms-2">
                              <div
                                className="fw-medium"
                                style={{ fontSize: 13, lineHeight: 1.2 }}
                              >
                                {p.title}
                              </div>
                              <small className="text-muted">
                                {p.type === "book" ? "Book" : "Course"} — $
                                {p.price.toFixed(2)}
                              </small>
                            </div>
                            <div className="d-flex align-items-center gap-1 ms-2">
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                style={{
                                  width: 24,
                                  height: 24,
                                  padding: 0,
                                  borderRadius: "50%",
                                  fontSize: 11,
                                }}
                                onClick={() => changeQty(i, -1)}
                              >
                                <i className="fas fa-minus" />
                              </button>
                              <span
                                style={{
                                  minWidth: 24,
                                  textAlign: "center",
                                  fontWeight: 600,
                                  fontSize: 13,
                                }}
                              >
                                {p.quantity}
                              </span>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                style={{
                                  width: 24,
                                  height: 24,
                                  padding: 0,
                                  borderRadius: "50%",
                                  fontSize: 11,
                                }}
                                onClick={() => changeQty(i, 1)}
                              >
                                <i className="fas fa-plus" />
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger ms-1"
                                style={{
                                  width: 24,
                                  height: 24,
                                  padding: 0,
                                  borderRadius: 4,
                                  fontSize: 11,
                                }}
                                onClick={() =>
                                  setProducts((prev) =>
                                    prev.filter((_, j) => j !== i),
                                  )
                                }
                              >
                                <i className="fas fa-trash-alt" />
                              </button>
                            </div>
                          </div>
                          <div className="d-flex justify-content-between mt-1 pt-1 border-top">
                            <span className="text-muted small">Total:</span>
                            <span className="fw-semibold text-success small">
                              ${(p.price * p.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Price summary */}
              <div
                style={{
                  borderTop: "1px solid #dee2e6",
                  padding: "1rem 1.25rem",
                  background: "#f8f9fa",
                  flexShrink: 0,
                }}
              >
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="mb-2 border-top pt-2">
                  <label className="form-label small mb-1">Coupon:</label>
                  <div className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={applyC}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-muted">Discount:</span>
                  <span className="text-success">-${discount.toFixed(2)}</span>
                </div>
                <div
                  className="d-flex justify-content-between fw-bold border-top pt-2"
                  style={{ fontSize: 15 }}
                >
                  <span>Final Price:</span>
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* RIGHT — Customer info */}
            <div
              style={{ flex: "0 0 50%", overflowY: "auto", padding: "1.25rem" }}
            >
              {F(
                "Customer Name *",
                <input
                  className="form-control form-control-sm"
                  value={form.customer}
                  placeholder="Enter customer name"
                  onChange={(e) =>
                    setForm((p) => ({ ...p, customer: e.target.value }))
                  }
                />,
              )}
              {F(
                "Email *",
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={form.email}
                  placeholder="Enter email address"
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                />,
              )}
              {F(
                "Phone Number",
                <input
                  type="tel"
                  className="form-control form-control-sm"
                  value={form.phone}
                  placeholder="Enter phone number"
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                />,
              )}
              {F(
                "Address",
                <textarea
                  className="form-control form-control-sm"
                  rows={2}
                  value={form.address}
                  placeholder="Enter address"
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                />,
              )}
              {F(
                "Order Date",
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={form.date}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, date: e.target.value }))
                  }
                />,
              )}
              <div className="row g-2">
                <div className="col-6">
                  {F(
                    "Payment Method",
                    <select
                      className="form-select form-select-sm"
                      value={form.payment}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, payment: e.target.value }))
                      }
                    >
                      <option value="">Select</option>
                      {["Mastercard", "Visa", "COD", "Paypal"].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>,
                  )}
                </div>
                <div className="col-6">
                  {F(
                    "Delivery Status",
                    <select
                      className="form-select form-select-sm"
                      value={form.status}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, status: e.target.value }))
                      }
                    >
                      <option value="">Select</option>
                      {["Pending", "Cancelled", "Delivered", "Returns"].map(
                        (v) => (
                          <option key={v}>{v}</option>
                        ),
                      )}
                    </select>,
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "1rem 1.5rem",
              borderTop: "1px solid #dee2e6",
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <button className="btn btn-light" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              <i className="fas fa-check me-1" />
              {mode === "add" ? "Add Order" : "Update Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
export type { OrderRow, OrderProduct };
