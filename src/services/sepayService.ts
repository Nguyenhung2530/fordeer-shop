import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export interface CreatePaymentRequest {
  orderId: number;
  amount: number;
  orderInfo?: string;
}

export interface CreatePaymentResponse {
  message: string;
  checkoutURL: string;
  checkoutFormFields: Record<string, string>;
  txnRef: string;
}

export const sepayService = {
  /**
   * Create SePay payment data
   */
  createPayment: async (
    data: CreatePaymentRequest
  ): Promise<CreatePaymentResponse> => {
    const token = authService.getAccessToken();
    if (!token) {
      throw new Error("Vui lòng đăng nhập để thanh toán");
    }

    const response = await fetch(`${API_URL}/api/sepay/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Không thể tạo thanh toán SePay");
    }

    return result;
  },

  /**
   * Submit payment form to SePay checkout
   */
  submitPayment: (checkoutURL: string, formFields: Record<string, string>) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = checkoutURL;

    Object.keys(formFields).forEach((key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = formFields[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  },
};
