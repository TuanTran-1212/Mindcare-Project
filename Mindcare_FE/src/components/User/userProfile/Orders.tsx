// src/components/profile/Orders.tsx
import React, { useState } from "react";
import Purchases from "../userProfile/Purchases";
import type { OrderData } from "../../../data/UserData";

type SubTab = "purchases" | "subscriptions" | "refunds";

interface OrdersProps {
  orders: OrderData[];
  onViewReceipt: (order: OrderData) => void;
}

/**
 * Orders - tab panel containing Purchases, Subscriptions, and Refunds sub-tabs.
 */
const Orders: React.FC<OrdersProps> = ({ orders, onViewReceipt }) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("purchases");

  const subTabs: { key: SubTab; label: string }[] = [
    { key: "purchases", label: "Purchases" },
    { key: "subscriptions", label: "Subscriptions" },
    { key: "refunds", label: "Refunds" },
  ];

  return (
    <>
      <div className="sub-tab-navigation">
        {subTabs.map((tab) => (
          <button
            key={tab.key}
            className={`sub-tab-btn${activeSubTab === tab.key ? " active" : ""}`}
            data-sub-tab={tab.key}
            onClick={() => setActiveSubTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="sub-tab-content">
        {/* Purchases */}
        <div
          id="purchases"
          className={`sub-tab-pane${activeSubTab === "purchases" ? " active" : ""}`}
        >
          <Purchases orders={orders} onViewReceipt={onViewReceipt} />
        </div>

        {/* Subscriptions */}
        <div
          id="subscriptions"
          className={`sub-tab-pane${activeSubTab === "subscriptions" ? " active" : ""}`}
        >
          <div className="empty-state">
            <p>No subscriptions found.</p>
          </div>
        </div>

        {/* Refunds */}
        <div
          id="refunds"
          className={`sub-tab-pane${activeSubTab === "refunds" ? " active" : ""}`}
        >
          <div className="empty-state">
            <p>No refunds available.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
