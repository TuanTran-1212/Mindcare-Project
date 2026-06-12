import "../../assets/css/login.css";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email) setMessage("Password reset link has been sent to your email.");
  };

  return (
    <form onSubmit={handleSubmit} className="forgot-password-form" autoComplete="off">
      <div className="logo">
        <a href="/"><img src="./assets/img/logo1.png" alt="Logo" /></a>
      </div>

      <div className="heading">
        <h2>Forgot Password</h2>
        <h6>Enter your email to reset your password</h6>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            type="email"
            className="input-field"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>Email Address</label>
        </div>

        <input type="submit" value="Send Reset Link" className="sign-btn" />

        {message && <p className="success">{message}</p>}

        <p className="text">
          Remember your password? <a href="/login">Sign in</a>
        </p>
      </div>
    </form>
  );
}