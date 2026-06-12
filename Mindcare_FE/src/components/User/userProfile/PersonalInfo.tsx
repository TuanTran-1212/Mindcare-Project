// src/components/profile/PersonalInfo.tsx
import React, { useState } from "react";
import type { UserProfile } from "../../../data/UserData";

interface PersonalInfoProps {
  user: UserProfile;
  onSave: (data: Partial<UserProfile>) => void;
  onMessage: (msg: string, type: "success" | "error") => void;
}

/**
 * PersonalInfo - editable form for basic user information.
 */
const PersonalInfo: React.FC<PersonalInfoProps> = ({ user, onSave, onMessage }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [password, setPassword] = useState(user.password);
  const [loading, setLoading] = useState(false);

  const validatePersonalInfo = (): boolean => {
    if (!fullName.trim()) {
      onMessage("Please fill in the Full Name field.", "error");
      return false;
    }
    if (!email.trim()) {
      onMessage("Please fill in the Email field.", "error");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onMessage("Please enter a valid email address.", "error");
      return false;
    }
    if (phone.trim()) {
      const phoneRegex = /^[+]?[0-9\s\-()]{10,}$/;
      if (!phoneRegex.test(phone)) {
        onMessage("Please enter a valid phone number.", "error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validatePersonalInfo()) return;

    setLoading(true);
    setTimeout(() => {
      onSave({ fullName, email, phone, password });
      setLoading(false);
      onMessage("Personal information saved successfully!", "success");
    }, 800);
  };

  return (
    <section className="profile-section">
      <h2 className="section-title">Basic Information</h2>
      <form id="basic-form" className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className={`save-btn${loading ? " loading" : ""}`}>
          {loading ? (
            <>
              <span className="spinner" /> Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </section>
  );
};

export default PersonalInfo;
