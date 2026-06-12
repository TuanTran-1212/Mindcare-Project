// src/components/profile/ReceiptModal.tsx
import React from "react";
import type { OrderData } from "../../../data/UserData";

interface ReceiptModalProps {
  order: OrderData | null;
  buyerName: string;
  onClose: () => void;
}

/**
 * ReceiptModal - shows a printable receipt for a selected order.
 * Visible when `order` is not null.
 */
const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, buyerName, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!order) return null;

  return (
    <div
      id="receipt-modal"
      className="receipt-modal"
      style={{ display: "block" }}
      onClick={handleOverlayClick}
    >
      <div className="receipt-modal-content">
        <div className="receipt-header">
          <h2 className="receipt-title">Receipt — {order.date}</h2>
        </div>

        <div className="receipt-body">
          <div className="company-info">
            <div className="company-name">MindCare Incorporated</div>
            <div className="company-address">Tan Phuoc Khanh, Ho Chi Minh City</div>
            <div className="company-website">www.mindcare.com</div>
          </div>

          <div className="order-info">
            <div>
              <strong>Date:</strong> {order.date}
            </div>
            <div>
              <strong>Order #:</strong> {order.id}
            </div>
          </div>

          <div className="sold-to">
            <strong>Sold To:</strong> {buyerName}
          </div>

          <table className="receipt-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Ordered</th>
                <th>Coupon Codes</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.course}</td>
                <td>{order.date}</td>
                <td>{order.couponCode || "—"}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.price}</td>
              </tr>
              <tr className="total-row">
                <td colSpan={5} style={{ textAlign: "right" }}>
                  <strong>Total:</strong>
                </td>
                <td>
                  <strong>{order.price}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="receipt-actions">
          <button className="receipt-btn-print" onClick={() => window.print()}>
            Print / Save PDF
          </button>
          <button className="receipt-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
