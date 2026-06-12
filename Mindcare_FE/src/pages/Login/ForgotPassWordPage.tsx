// src/pages/ForgotPassword.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "../../components/Login/Carousel";

import { images } from "../../assets/images";

const FORGOT_SLIDES = [
  "Secure Password Recovery",
  "Reset Your Password Safely",
  "Get Back to Your Account",
];

const FORGOT_IMAGES = [images.login.l1, images.login.l2, images.login.l3];

/**
 * ForgotPassword - email-based password reset form.
 * Reuses the shared Carousel component.
 */
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isActive = (value: string) => value.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section id="main">
      <div className="box">
        <div className="inner-box">
          {/* ── Form ── */}
          <div className="forms-wrap">
            <form
              autoComplete="off"
              className="sign-in-form"
              onSubmit={handleSubmit}
            >
              <div className="logo logo-login">
                <Link to="/">
                  <img src={images.logo.lo1} alt="Logo" />
                </Link>
              </div>

              <div className="heading">
                <h2>Forgot Password</h2>
                <h6>Enter your email to reset your password</h6>
              </div>

              <div className="actual-form">
                {submitted ? (
                  <p
                    style={{
                      color: "#10b981",
                      fontSize: "0.9rem",
                      marginBottom: "1rem",
                    }}
                  >
                    A reset link has been sent to <strong>{email}</strong>.
                    Please check your inbox.
                  </p>
                ) : (
                  <>
                    <div className="input-wrap">
                      <input
                        type="email"
                        className={`input-field${isActive(email) ? " active" : ""}`}
                        autoComplete="off"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="contact-f">Email Address</label>
                    </div>

                    {error && (
                      <p
                        style={{
                          color: "#e74c3c",
                          fontSize: "0.8rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {error}
                      </p>
                    )}

                    <input
                      type="submit"
                      value="Send Reset Link"
                      className="sign-btn"
                    />
                  </>
                )}

                <p className="text">
                  Remember your password? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </form>
          </div>

          {/* ── Carousel ── */}
          <Carousel slides={FORGOT_SLIDES} images={FORGOT_IMAGES} />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
