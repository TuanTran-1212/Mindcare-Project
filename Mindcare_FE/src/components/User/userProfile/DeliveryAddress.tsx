// src/components/profile/DeliveryAddress.tsx
import React, { useState } from "react";
import type { UserProfile } from "../../../data/UserData";

interface DeliveryAddressProps {
  user: UserProfile;
  onSave: (data: Partial<UserProfile>) => void;
  onMessage: (msg: string, type: "success" | "error") => void;
}

/**
 * DeliveryAddress - form for managing default and additional shipping addresses.
 */
const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ user, onSave, onMessage }) => {
  const [shippingAddress, setShippingAddress] = useState(user.shippingAddress);
  const [additionalAddress, setAdditionalAddress] = useState(user.additionalAddress);
  const [shippingPreference, setShippingPreference] = useState(user.shippingPreference);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({ shippingAddress, additionalAddress, shippingPreference });
      setLoading(false);
      onMessage("Delivery address saved successfully!", "success");
    }, 800);
  };

  return (
    <section className="profile-section">
      <h2 className="section-title">Delivery Address</h2>
      <form id="shipping-form" className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="shipping-address">Default Shipping Address</label>
          <textarea
            id="shipping-address"
            name="shipping-address"
            rows={3}
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="additional-address">Additional Shipping Address</label>
          <textarea
            id="additional-address"
            name="additional-address"
            rows={3}
            placeholder="Alternative shipping address"
            value={additionalAddress}
            onChange={(e) => setAdditionalAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="shipping-preference">Preferred Shipping Option</label>
          <select
            id="shipping-preference"
            name="shipping-preference"
            value={shippingPreference}
            onChange={(e) => setShippingPreference(e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="overnight">Overnight</option>
          </select>
        </div>

        <button type="submit" className={`save-btn${loading ? " loading" : ""}`}>
          {loading ? (
            <>
              <span className="spinner" /> Saving...
            </>
          ) : (
            "Save Address"
          )}
        </button>
      </form>
    </section>
  );
};

export default DeliveryAddress;
