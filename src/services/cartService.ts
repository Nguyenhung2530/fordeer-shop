/*** Xử lý giỏ hàng - localStorage và sync với server ***/

import { authService } from "./authService";

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note?: string;
  size?: string;
}

const CART_KEY = "fordeer_cart";
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Lấy giỏ hàng từ localStorage
 */
const getCart = () => {
  try {
    const cartStr = localStorage.getItem(CART_KEY);
    return cartStr ? JSON.parse(cartStr) : [];
  } catch (error) {
    console.error("Get cart error:", error);
    return [];
  }
};

/**
 * Lưu giỏ hàng vào localStorage
 */
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  dispatchCartUpdate(cart);
};

/**
 * Thêm sản phẩm vào giỏ hàng
 */
const addToCart = (item) => {
  try {
    const cart = getCart();
    const existingIndex = cart.findIndex(
      (i) => i.productId === item.productId && i.size === item.size
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity || 1;
    } else {
      cart.push({ ...item, quantity: item.quantity || 1 });
    }

    saveCart(cart);

    if (authService.isAuthenticated()) {
      syncToServer(cart).catch(console.error);
    }

    return cart;
  } catch (error) {
    console.error("Add to cart error:", error);
    return getCart();
  }
};

/**
 * Cập nhật số lượng sản phẩm
 */
const updateQuantity = (productId, quantity, size) => {
  try {
    const cart = getCart();
    const index = cart.findIndex(
      (i) => i.productId === productId && i.size === size
    );

    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
    }

    saveCart(cart);

    if (authService.isAuthenticated()) {
      syncToServer(cart).catch(console.error);
    }

    return cart;
  } catch (error) {
    console.error("Update quantity error:", error);
    return getCart();
  }
};

/**
 * Cập nhật ghi chú sản phẩm
 */
const updateNote = (productId, note, size) => {
  try {
    const cart = getCart();
    const index = cart.findIndex(
      (i) => i.productId === productId && i.size === size
    );

    if (index >= 0) {
      cart[index].note = note;
    }

    saveCart(cart);
    return cart;
  } catch (error) {
    console.error("Update note error:", error);
    return getCart();
  }
};

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
const removeFromCart = (productId, size) => {
  try {
    const cart = getCart();
    const filtered = cart.filter(
      (i) => !(i.productId === productId && i.size === size)
    );

    saveCart(filtered);

    if (authService.isAuthenticated()) {
      syncToServer(filtered).catch(console.error);
    }

    return filtered;
  } catch (error) {
    console.error("Remove from cart error:", error);
    return getCart();
  }
};

/**
 * Xóa toàn bộ giỏ hàng
 */
const clearCart = () => {
  try {
    localStorage.removeItem(CART_KEY);
    dispatchCartUpdate([]);

    if (authService.isAuthenticated()) {
      clearOnServer().catch(console.error);
    }
  } catch (error) {
    console.error("Clear cart error:", error);
  }
};

/**
 * Tính tổng tiền giỏ hàng
 */
const getTotal = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Đếm số lượng sản phẩm trong giỏ
 */
const getItemCount = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

/**
 * Dispatch event cập nhật giỏ hàng
 */
const dispatchCartUpdate = (cart) => {
  window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart }));
};

// ============ SERVER SYNC METHODS ============

/**
 * Đồng bộ giỏ hàng lên server
 */
const syncToServer = async (cart) => {
  try {
    const token = authService.getAccessToken();
    if (!token) return;

    await fetch(`${API_URL}/api/customer/cart/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items: cart }),
    });
  } catch (error) {
    console.error("Sync to server error:", error);
  }
};

/**
 * Tải giỏ hàng từ server và merge với local
 */
const loadFromServer = async () => {
  try {
    const token = authService.getAccessToken();
    if (!token) return getCart();

    const response = await fetch(`${API_URL}/api/customer/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) return getCart();

    const data = await response.json();
    const serverCart = data.items || [];
    const localCart = getCart();
    const mergedCart = mergeCarts(localCart, serverCart);

    saveCart(mergedCart);
    await syncToServer(mergedCart);

    return mergedCart;
  } catch (error) {
    console.error("Load from server error:", error);
    return getCart();
  }
};

/**
 * Merge 2 giỏ hàng (local ưu tiên)
 */
const mergeCarts = (localCart, serverCart) => {
  const merged = [...localCart];

  for (const serverItem of serverCart) {
    const existingIndex = merged.findIndex(
      (i) => i.productId === serverItem.productId && i.size === serverItem.size
    );

    if (existingIndex < 0) {
      merged.push(serverItem);
    }
  }

  return merged;
};

/**
 * Xóa giỏ hàng trên server
 */
const clearOnServer = async () => {
  try {
    const token = authService.getAccessToken();
    if (!token) return;

    await fetch(`${API_URL}/api/customer/cart`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Clear on server error:", error);
  }
};

/**
 * Gọi khi user đăng nhập - sync giỏ hàng
 */
const onLogin = async () => {
  try {
    await loadFromServer();
  } catch (error) {
    console.error("On login sync error:", error);
  }
};

/**
 * Gọi khi user đăng xuất
 */
const onLogout = () => {
  // Giữ nguyên local cart
};

export const cartService = {
  getCart,
  saveCart,
  addToCart,
  updateQuantity,
  updateNote,
  removeFromCart,
  clearCart,
  getTotal,
  getItemCount,
  dispatchCartUpdate,
  syncToServer,
  loadFromServer,
  mergeCarts,
  clearOnServer,
  onLogin,
  onLogout,
};
