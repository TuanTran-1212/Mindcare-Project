// RequireAuth.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './UseAuth'; // custom hook lấy context
import type { JSX } from 'react';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('token'); // fallback

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default RequireAuth;