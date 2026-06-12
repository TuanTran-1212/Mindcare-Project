// services/UserService.ts

import axios from "axios";

// Tạo axios instance
const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Định nghĩa types

// src/types/user.ts
export interface UserResponse {
  id: number;                // Long → number
  email: string;
  fullName: string;
  username: string;
  phone: string;
  address: string;
  role: string;              // "ADMIN", "DOCTOR", "USER"
  avatarUrl: string;
  isActive: boolean;
  profileCompleted: boolean;
}

export interface UserRequest {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    avatarUrl?: string;
    password: string;
    status: "active" | "inactive"
}


export const getUserById = async (userId: number): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/users/${userId}`);
  return response.data;
};