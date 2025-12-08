import { authService } from "@/services/authService";
import { cartService, type CartItem } from "@/services/cartService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Demo promo codes
const PROMO_CODES: Record<
  string,
  { discount: number; type: "percent" | "fixed"; description: string }
> = {
  nguoingheo: {
    discount: 50,
    type: "percent",
    description: "Giảm 50% cho người nghèo",
  },
  noelvuive: {
    discount: 25,
    type: "percent",
    description: "Giảm 25% mừng Noel",
  },
  fordeer10: {
    discount: 10,
    type: "percent",
    description: "Giảm 10% thành viên Fordeer",
  },
  freeship: {
    discount: 30000,
    type: "fixed",
    description: "Miễn phí ship 30k",
  },
  tet2025: {
    discount: 20,
    type: "percent",
    description: "Giảm 20% mừng Tết 2025",
  },
};

export default function CartSummary() {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cartService.getCart());

    const handleCartUpdate = (e: CustomEvent<CartItem[]>) => {
      setCartItems(e.detail);
    };

    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);
    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate as EventListener
      );
    };
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate discount based on applied promo
  const calculateDiscount = () => {
    if (!appliedPromo || !PROMO_CODES[appliedPromo]) return 0;
    const promo = PROMO_CODES[appliedPromo];
    if (promo.type === "percent") {
      return Math.round((subtotal * promo.discount) / 100);
    }
    return promo.discount;
  };

  const discount = calculateDiscount();
  const total = subtotal - discount;

  const handleApplyPromo = () => {
    const code = promoCode.toLowerCase().trim();
    if (!code) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      toast.success(`Áp dụng thành công: ${PROMO_CODES[code].description}`);
    } else {
      toast.error("Mã giảm giá không hợp lệ");
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    toast.info("Đã xóa mã giảm giá");
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN") + "đ";
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    if (!authService.isAuthenticated()) {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return;
    }

    // Save discount info to localStorage for checkout page
    if (appliedPromo && discount > 0) {
      localStorage.setItem(
        "checkoutDiscount",
        JSON.stringify({
          code: appliedPromo,
          amount: discount,
          description: PROMO_CODES[appliedPromo]?.description,
        })
      );
    } else {
      localStorage.removeItem("checkoutDiscount");
    }

    navigate("/checkout");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-[90px]">
      {/* Header */}
      <div className="bg-[#45690b] text-white p-4">
        <h3 className="text-[18px] font-bold">Tóm tắt đơn hàng</h3>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Promo Code */}
        <div>
          <label className="block text-[#45690b] font-bold text-[14px] mb-2">
            Mã giảm giá
          </label>
          {appliedPromo ? (
            <div className="flex items-center justify-between p-3 bg-[#f8fdf0] border border-[#d9ef7f] rounded-lg">
              <div>
                <p className="text-[14px] font-bold text-[#45690b] uppercase">
                  {appliedPromo}
                </p>
                <p className="text-[12px] text-gray-600">
                  {PROMO_CODES[appliedPromo]?.description}
                </p>
              </div>
              <button
                onClick={handleRemovePromo}
                className="text-red-500 hover:text-red-700 text-[12px] font-medium"
              >
                Xóa
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                placeholder="Nhập mã giảm giá"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-[14px] focus:border-[#45690b] outline-none"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-[#d9ef7f] text-[#45690b] font-bold rounded-lg hover:bg-[#c5e060] transition-colors text-[14px]"
              >
                Áp dụng
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-[14px]">
            <span className="text-gray-600">
              Tạm tính ({cartItems.length} sản phẩm)
            </span>
            <span className="text-[#1d4220]">{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-[14px]">
              <span className="text-gray-600">Giảm giá</span>
              <span className="text-red-500">-{formatPrice(discount)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-[#45690b] font-bold text-[16px]">
            Tổng cộng
          </span>
          <span className="text-[#45690b] font-bold text-[24px]">
            {formatPrice(total)}
          </span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="w-full bg-[#45690b] text-white py-4 rounded-full font-bold text-[16px] hover:bg-[#42612e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Tiến hành thanh toán
        </button>

        {/* Payment Methods */}
        <div className="text-center">
          <p className="text-[12px] text-gray-500 mb-3">
            Chấp nhận thanh toán qua
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              VISA
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              MC
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              Momo
            </div>
            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] text-gray-500">
              COD
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-[#f8fdf0] p-4 border-t border-[#d9ef7f]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Miễn phí vận chuyển đơn từ 200.000đ</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Đổi trả trong 7 ngày</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[#45690b]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Tích điểm thành viên FORDEER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
