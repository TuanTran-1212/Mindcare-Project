import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth";
import type { JSX } from "react";

const AdminRequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if ((!user || user.role !== "admin") && !(token && role === "admin")) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRequireAuth;
