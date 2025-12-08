/*** Xử lý đơn hàng - tạo, xem, hủy đơn ***/

import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export interface Order {
  id: number;
  orderCode: string;
  customerId: number;
  totalAmount: string;
  discount: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  items?: {
    id: number;
    productId: number;
    quantity: number;
    price: string;
    product?: {
      productName: string;
      productUrl?: string;
    };
  }[];
}

/**
 * Tạo đơn hàng từ giỏ hàng
 */
const createOrder = async (cartItems, discount = 0) => {
  try {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập để đặt hàng");
    }

    const items = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const response = await fetch(`${API_URL}/api/customer/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items, discount }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Đặt hàng thất bại");
    }

    return data.order;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

/**
 * Lấy danh sách đơn hàng của customer
 */
const getOrders = async (page = 1, limit = 10, status = null) => {
  try {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập");
    }

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append("status", status);

    const response = await fetch(
      `${API_URL}/api/customer/orders?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Không thể tải đơn hàng");
    }

    return {
      orders: responseData.data || [],
      pagination: responseData.pagination,
    };
  } catch (error) {
    console.error("Get orders error:", error);
    throw error;
  }
};

/**
 * Lấy chi tiết đơn hàng theo ID
 */
const getOrderById = async (orderId) => {
  try {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập");
    }

    const response = await fetch(`${API_URL}/api/customer/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể tải đơn hàng");
    }

    return data.order;
  } catch (error) {
    console.error("Get order by ID error:", error);
    throw error;
  }
};

/**
 * Hủy đơn hàng
 */
const cancelOrder = async (orderId) => {
  try {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập");
    }

    const response = await fetch(
      `${API_URL}/api/customer/orders/${orderId}/cancel`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Không thể hủy đơn hàng");
    }
  } catch (error) {
    console.error("Cancel order error:", error);
    throw error;
  }
};

export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
};
