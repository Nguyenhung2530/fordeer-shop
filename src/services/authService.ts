import type { Customer, LoginRequest, LoginResponse } from '@/types/auth';

const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const isEmail = credentials.email.includes('@');
    const payload: any = {
      password: credentials.password,
    };

    if (isEmail) {
      payload.email = credentials.email;
      payload.username = credentials.email; // Send both to be safe
    } else {
      payload.username = credentials.email;
      payload.phone = credentials.email;
    }

    const response = await fetch(`${API_URL}/api/auth/customer/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Login error details:', data); // Log detailed error
      throw new Error(data.message || (data.errors ? JSON.stringify(data.errors) : 'Đăng nhập thất bại'));
    }

    // Save tokens and user to localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.customer));

    return data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        await fetch(`${API_URL}/api/auth/customer/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current logged in user
   */
  getCurrentUser: (): Customer | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },

  /**
   * Get access token
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem('accessToken');
  },

  /**
   * Update current user in localStorage and trigger update event
   */
  updateCurrentUser: (user: Customer): void => {
    localStorage.setItem('user', JSON.stringify(user));
    // Dispatch custom event to notify components of user update
    window.dispatchEvent(new CustomEvent('userUpdated', { detail: user }));
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/auth/customer/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Yêu cầu đặt lại mật khẩu thất bại');
    }
  },

  /**
   * Verify OTP
   */
  verifyOtp: async (email: string, otp: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/auth/customer/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Mã OTP không chính xác');
    }
  },

  /**
   * Reset password with OTP
   */
  resetPassword: async (email: string, otp: string, newPassword: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/auth/customer/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Đặt lại mật khẩu thất bại');
    }
  },
};
