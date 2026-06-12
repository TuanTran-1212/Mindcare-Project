// src/components/profile/PointsInfo.tsx
import React from "react";
import type { CouponData } from "../../../data/UserData";

interface PointsInfoProps {
  points: number;
  coupons: CouponData[];
}

/**
 * PointsInfo - displays reward points total and available coupon codes.
 */
const PointsInfo: React.FC<PointsInfoProps> = ({ points, coupons }) => {
  const pointsValue = (points * 0.01).toFixed(2);

  return (
    <section className="profile-section">
      <h2 className="section-title">Rewards &amp; Points</h2>
      <div className="points-info">
        <div className="points-card">
          <h3>Reward Points</h3>
          <div className="points-amount">
            {points.toLocaleString()} <span>pts</span>
          </div>
          <p>Equivalent to: ${pointsValue}</p>
        </div>

        <div className="coupons-list">
          <h4>Available Discount Codes</h4>
          {coupons.length === 0 ? (
            <p style={{ color: "#999", fontSize: "14px" }}>No coupons available.</p>
          ) : (
            coupons.map((c) => (
              <div className="coupon-item" key={c.code}>
                <span className="coupon-code">{c.code}</span>
                <span className="coupon-discount">{c.discount}</span>
                <span className="coupon-expiry">Expires: {c.expiry}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PointsInfo;
