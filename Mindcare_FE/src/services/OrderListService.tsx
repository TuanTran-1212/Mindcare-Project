import axios from "axios";

// OrderStatus (enum, bạn có thể định nghĩa chi tiết hơn)
export type OrderStatus = "PENDING" | "PAID" | "CANCELLED";

// OrderItemRequest
export interface OrderItemRequest {
  productType: "BOOK" | "COURSE"; // BOOK hoặc COURSE
  productId: number; // > 0
  quantity: number; // >= 1 
  unitPrice?: number; // optional, có thể tính sau
}

// OrderRequest
export interface OrderRequest {
  userId?: number; // có thể null
  shippingAddress: string; // required, not blank
  paymentMethod: string; // COD, VNPay, Momo, Bank
  shippingFee?: number;
  discount?: number;
  orderStatus?: OrderStatus;
  items: OrderItemRequest[]; // not empty
}

// OrderItemResponse
export interface OrderItemResponse {
  id: number;
  productType: "BOOK" | "COURSE";
  productId: number;
  productName: string; // resolve từ book/course service
  productImg: string; // resolve từ book/course service
  quantity: number;
  unitPrice: number;
  subtotal: number; // quantity * unitPrice
}

// OrderResponse
export interface OrderResponse {
  id: number;
  orderCode: string;
  userId: number;
  userFullName: string;
  userAvatar: string
  userEmail: string;
  userPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  status: OrderStatus; // trạng thái (OrderStatus)
  shippingFee: number;
  discount: number;
  total: number;
  createdAt: string; // ISO datetime string
  paidAt: string | null; // có thể null
  items: OrderItemResponse[];
}
// Tạo axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const OrderService = {
  // Lấy danh sách orders (có thể lọc theo userId)
  getAll: async (userId?: number): Promise<OrderResponse[]> => {
    try {
      const params = userId ? { userId } : {};
      const response = await api.get("/orders", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Lấy order theo id (nếu có endpoint, hiện tại API chưa có, nhưng có thể thêm)
  getById: async (id: number): Promise<OrderResponse> => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with id ${id}:`, error);
      throw error;
    }
  },
  // Tạo mới order
  create: async (data: OrderRequest): Promise<OrderResponse> => {
    try {
      const response = await api.post("/orders", data);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  // Cập nhật order
  update: async (id: number, data: OrderRequest): Promise<OrderResponse> => {
    try {
      const response = await api.put(`/orders/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating order with id ${id}:`, error);
      throw error;
    }
  },
  // Xóa order
  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/orders/${id}`);
    } catch (error) {
      console.error(`Error deleting order with id ${id}:`, error);
      throw error;
    }
  },
};
