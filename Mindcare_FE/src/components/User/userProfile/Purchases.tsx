// src/components/profile/Purchases.tsx
import React from "react";
import type { OrderData } from "../../../data/UserData";

interface PurchasesProps {
  orders: OrderData[];
  onViewReceipt: (order: OrderData) => void;
}

/**
 * Purchases - table listing all completed orders with a Receipt button per row.
 * Shows empty-state when no orders exist.
 */
const Purchases: React.FC<PurchasesProps> = ({ orders, onViewReceipt }) => {
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <p>No purchases found.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="purchase-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Payment Method</th>
            <th>Invoice</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                <i className="fas fa-shopping-cart" style={{ marginRight: 6 }} />
                {order.course}
              </td>
              <td>{order.date}</td>
              <td className="price-free">{order.price}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <button
                  className="receipt-btn"
                  onClick={() => onViewReceipt(order)}
                >
                  Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Purchases;
