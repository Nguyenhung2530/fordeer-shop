import Header from "@/components/header";
import Footer from "@/components/footer";
import { cartService } from "@/services/cartService";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SePayReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<
    "loading" | "success" | "failed" | "cancelled"
  >("loading");

  const paymentStatus = searchParams.get("status");
  const orderId = searchParams.get("orderId");
  const txnRef = searchParams.get("txnRef");

  // Debug: log all params
  console.log(
    "SePay return params:",
    Object.fromEntries(searchParams.entries())
  );

  useEffect(() => {
    const statusLower = paymentStatus?.toLowerCase();

    if (
      statusLower === "success" ||
      statusLower === "completed" ||
      statusLower === "paid"
    ) {
      setStatus("success");
      cartService.clearCart();
    } else if (statusLower === "cancel" || statusLower === "cancelled") {
      setStatus("cancelled");
    } else if (statusLower === "error" || statusLower === "failed") {
      setStatus("failed");
    } else {
      // Default to failed if unknown status
      console.log("Unknown payment status:", paymentStatus);
      setStatus("failed");
    }
  }, [paymentStatus]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-8 md:py-16 bg-[#fcfcf6]">
        <div className="max-w-[500px] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {status === "loading" ? (
              <div className="p-8 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#45690b] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Đang xử lý kết quả thanh toán...
                </p>
              </div>
            ) : status === "success" ? (
              <>
                <div className="bg-gradient-to-r from-[#45690b] to-[#799a01] p-8 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-[#45690b]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h1 className="text-[24px] font-bold text-white mb-2">
                    Thanh toán thành công!
                  </h1>
                  <p className="text-white/80 text-[14px]">
                    Cảm ơn bạn đã mua hàng
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  {txnRef && (
                    <div className="text-center p-4 bg-[#f8fdf0] rounded-lg">
                      <p className="text-[14px] text-gray-600 mb-1">
                        Mã giao dịch
                      </p>
                      <p className="text-[18px] font-bold text-[#45690b]">
                        {txnRef}
                      </p>
                    </div>
                  )}

                  {orderId && (
                    <div className="flex justify-between text-[14px]">
                      <span className="text-gray-600">Mã đơn hàng:</span>
                      <span className="font-medium text-[#1d4220]">
                        #{orderId}
                      </span>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => navigate("/orders")}
                      className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
                    >
                      Xem đơn hàng
                    </button>
                    <button
                      onClick={() => navigate("/")}
                      className="w-full bg-[#d9ef7f] text-[#45690b] py-3 rounded-full font-bold hover:bg-[#c5e060] transition-colors"
                    >
                      Tiếp tục mua sắm
                    </button>
                  </div>
                </div>
              </>
            ) : status === "cancelled" ? (
              <>
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <h1 className="text-[24px] font-bold text-white mb-2">
                    Đã hủy thanh toán
                  </h1>
                  <p className="text-white/80 text-[14px]">
                    Bạn đã hủy giao dịch thanh toán
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
                    >
                      Thử lại
                    </button>
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                      Quay lại giỏ hàng
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-10 h-10 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h1 className="text-[24px] font-bold text-white mb-2">
                    Thanh toán thất bại
                  </h1>
                  <p className="text-white/80 text-[14px]">
                    Đã có lỗi xảy ra trong quá trình thanh toán
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-3 pt-4">
                    <button
                      onClick={() => navigate("/checkout")}
                      className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
                    >
                      Thử lại
                    </button>
                    <button
                      onClick={() => navigate("/cart")}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                    >
                      Quay lại giỏ hàng
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
