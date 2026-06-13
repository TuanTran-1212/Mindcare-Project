import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../assets/images";
import { useAuth } from "../../Login/UseAuth";
import api from "../../../services/api";
import type { AuthResponse } from "../../../services/AuthService";
import "../../../assets/css/admin-login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (user?.role === "admin" || storedRole === "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profileCompleted");

      const payload = { emailOrUserName: email, password };
      const response = await api.post<AuthResponse>("/auth/login", payload);
      const loginData = response.data;

      if (loginData.role !== "admin") {
        setError("Account does not have admin access");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("role", loginData.role);
      localStorage.setItem("profileCompleted", String(loginData.profileCompleted));

      await login(loginData);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid email or password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src={images.logo.lo1} alt="MindCare" className="admin-login-logo" />
          <h2>Admin Login</h2>
          <p>Please log in to manage the system</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-input-group">
            <label>Email / Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email or username"
              disabled={loading}
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
