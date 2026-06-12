import { createContext, useState, type ReactNode } from "react";
import type { AuthResponse } from "../../services/AuthService";


interface AuthContextType {
  user: AuthResponse | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  updateProfileCompleted: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data: AuthResponse) => {
    setUser(data);
    localStorage.setItem("auth", JSON.stringify(data));
    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  };

  const updateProfileCompleted = () => {
    if (user) {
      const updated = { ...user, profileCompleted: true };
      setUser(updated);
      localStorage.setItem("auth", JSON.stringify(updated));
    }
  };

  

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfileCompleted }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
/*
Khởi tạo
Khi ứng dụng chạy lần đầu, useState đọc localStorage.getItem('auth') để khôi phục thông tin user (nếu từng đăng nhập trước đó).
→ Tránh bị logout khi reload trang.

Đăng nhập (login)
Component gọi login(data) (thường sau khi gọi API /login hoặc /register thành công).
→ Lưu data vào state và localStorage.
→ Các component khác useAuth() sẽ nhận được user mới.

Cập nhật profile (updateProfileCompleted)
Sau khi người dùng hoàn thiện thông tin (gọi API /users/profile thành công), component gọi updateProfileCompleted() để set profileCompleted = true.
→ Cập nhật state và localStorage → các component biết user đã hoàn thành hồ sơ.

Đăng xuất (logout)
Gọi logout() → xóa state và localStorage → chuyển về trạng thái chưa đăng nhập.
 */
