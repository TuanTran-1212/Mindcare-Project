// src/components/profile/PaymentMethod.tsx
import React, { useState } from "react";

interface PaymentMethodProps {
  onMessage: (msg: string, type: "success" | "error") => void;
}

/**
 * PaymentMethod - form for storing credit card details.
 * Includes card number formatting (xxxx xxxx xxxx xxxx), expiry (MM/YY), and CVV.
 */
const PaymentMethod: React.FC<PaymentMethodProps> = ({ onMessage }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim() || !cardName.trim()) {
      onMessage("Please fill in all payment fields.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onMessage("Payment method saved successfully!", "success");
    }, 800);
  };

  return (
    <section className="profile-section">
      <h2 className="section-title">Payment Method</h2>
      <form id="payment-form" className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-number">Credit Card Number</label>
          <input
            type="text"
            id="card-number"
            name="card-number"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input
              type="text"
              id="expiry-date"
              name="expiry-date"
              placeholder="MM/YY"
              maxLength={5}
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiry(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              maxLength={3}
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="card-name">Name on Card</label>
          <input
            type="text"
            id="card-name"
            name="card-name"
            placeholder="NGUYEN VAN A"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>

        <button type="submit" className={`save-btn${loading ? " loading" : ""}`}>
          {loading ? (
            <>
              <span className="spinner" /> Saving...
            </>
          ) : (
            "Save Payment Method"
          )}
        </button>
      </form>
    </section>
  );
};

export default PaymentMethod;
