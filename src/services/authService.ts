/*** Xử lý login, logout, register cho Customer và Staff ***/

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Đăng nhập - thử customer trước, nếu fail thì thử staff
 */
const login = async (credentials) => {
  try {
    // Try customer login first
    const isEmail = credentials.email.includes("@");
    const customerPayload = {
      ...(isEmail
        ? { email: credentials.email }
        : { phone: credentials.email }),
      password: credentials.password,
    };

    const customerResponse = await fetch(`${API_URL}/api/auth/customer/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerPayload),
    });

    if (customerResponse.ok) {
      const data = await customerResponse.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.customer));

      // Sync cart after login
      import("./cartService").then(({ cartService }) => {
        cartService.onLogin();
      });

      return data;
    }

    // If customer login fails, try admin/staff login
    const staffResponse = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const staffData = await staffResponse.json();

    if (!staffResponse.ok) {
      let errorMessage = staffData.message || "Đăng nhập thất bại";
      if (errorMessage.toLowerCase().includes("invalid credentials")) {
        errorMessage = "Tài khoản hoặc mật khẩu không đúng";
      }
      throw new Error(errorMessage);
    }

    const user = staffData.user;
    localStorage.setItem("accessToken", user.accessToken);
    localStorage.setItem("refreshToken", user.refreshToken || "");
    localStorage.setItem("user", JSON.stringify(user));

    return {
      message: staffData.message || "Login successful",
      customer: user,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken || "",
    };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

/**
 * Đăng ký tài khoản customer
 */
const register = async (data) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/customer/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      let errorMessage = responseData.message || "Đăng ký thất bại";
      if (errorMessage.toLowerCase().includes("email already exists")) {
        errorMessage = "Email đã được sử dụng";
      }
      throw new Error(errorMessage);
    }

    localStorage.setItem("accessToken", responseData.accessToken);
    localStorage.setItem("refreshToken", responseData.refreshToken);
    localStorage.setItem("user", JSON.stringify(responseData.customer));

    import("./cartService").then(({ cartService }) => {
      cartService.onLogin();
    });

    return responseData;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

/**
 * Đăng xuất và xóa thông tin đăng nhập
 */
const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await fetch(`${API_URL}/api/auth/customer/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
};

/**
 * Lấy thông tin user hiện tại từ localStorage
 */
const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};

/**
 * Kiểm tra user đã đăng nhập chưa
 */
const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

/**
 * Lấy access token
 */
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Cập nhật user trong localStorage và dispatch event
 */
const updateCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new CustomEvent("userUpdated", { detail: user }));
};

/**
 * Yêu cầu reset mật khẩu
 */
const forgotPassword = async (email) => {
  try {
    const response = await fetch(
      `${API_URL}/api/auth/customer/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Yêu cầu đặt lại mật khẩu thất bại");
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

/**
 * Xác thực OTP
 */
const verifyOtp = async (email, otp) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/customer/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Mã OTP không chính xác");
    }
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
};

/**
 * Reset mật khẩu với OTP
 */
const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await fetch(
      `${API_URL}/api/auth/customer/reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Đặt lại mật khẩu thất bại");
    }
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

export const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  isAuthenticated,
  getAccessToken,
  updateCurrentUser,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
