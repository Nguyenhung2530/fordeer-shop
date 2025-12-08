/*** Xử lý thanh toán SePay ***/

import { authService } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Tạo thanh toán SePay
 */
const createPayment = async (data) => {
  try {
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
  } catch (error) {
    console.error("Create payment error:", error);
    throw error;
  }
};

/**
 * Submit form thanh toán đến SePay checkout
 */
const submitPayment = (checkoutURL, formFields) => {
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
};

export const sepayService = {
  createPayment,
  submitPayment,
};
