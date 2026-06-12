export interface RegisterRequest {
  username: string;      
  email: string;
  password: string;

}

export interface AuthResponse {
  token: string;
  role: string;
  fullName: string | null;
  userId: number;
  profileCompleted: boolean;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone: string;
  address: string;
}

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  role: string;
  isActive: boolean;
  profileCompleted: boolean;
}
export interface LoginRequest {
  email: string;
  password: string;
}

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor: tự động thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;



export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};