import Header from "@/components/header";
import Footer from "@/components/footer";
import { orderService, type Order } from "@/services/orderService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { X } from "lucide-react";

const statusMap: Record<string, { label: string; color: string; bg: string }> =
  {
    pending: {
      label: "Chờ xác nhận",
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    processing: {
      label: "Đang xử lý",
      color: "text-blue-700",
      bg: "bg-blue-100",
    },
    completed: {
      label: "Hoàn thành",
      color: "text-green-700",
      bg: "bg-green-100",
    },
    cancelled: { label: "Đã hủy", color: "text-red-700", bg: "bg-red-100" },
  };

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getOrders(1, 50);
      setOrders(response.orders || []);
    } catch (error: any) {
      toast.error(error.message || "Không thể tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = (orderId: number) => {
    toast("Bạn có chắc chắn muốn hủy đơn hàng này?", {
      action: {
        label: "Xác nhận hủy",
        onClick: () => confirmCancelOrder(orderId),
      },
      cancel: {
        label: "Không",
        onClick: () => {},
      },
      duration: 10000,
    });
  };

  const confirmCancelOrder = async (orderId: number) => {
    try {
      setCancellingId(orderId);
      await orderService.cancelOrder(orderId);
      toast.success("Đã hủy đơn hàng thành công");
      // Update local state
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: "cancelled" as const } : o
        )
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: "cancelled" });
      }
    } catch (error: any) {
      toast.error(error.message || "Không thể hủy đơn hàng");
    } finally {
      setCancellingId(null);
    }
  };

  const formatPrice = (price: number | string) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return Math.round(num).toLocaleString("vi-VN") + "đ";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredOrders =
    activeTab === "all" ? orders : orders.filter((o) => o.status === activeTab);

  const tabs = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "processing", label: "Đang xử lý" },
    { key: "completed", label: "Hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Title Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[280px] bg-[#45690b]" />
            <h2 className="text-[20px] md:text-[26px] font-bold text-[#45690b] whitespace-nowrap">
              ĐƠN HÀNG CỦA TÔI
            </h2>
            <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[280px] bg-[#45690b]" />
          </div>
        </div>
      </section>

      {/* Orders Content */}
      <section className="py-4 md:py-8 bg-[#fcfcf6] min-h-[60vh]">
        <div className="max-w-[1152px] mx-auto px-4">
          {/* Tabs */}
          <div
            className="flex gap-2 mb-6 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-[14px] font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-[#45690b] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-[#f8fdf0] rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[#45690b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-[18px] font-bold text-[#45690b] mb-2">
                Chưa có đơn hàng nào
              </h3>
              <p className="text-gray-500 mb-6">
                Hãy đặt hàng để xem lịch sử mua sắm của bạn
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#45690b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#42612e] transition-colors"
              >
                Mua sắm ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const status = statusMap[order.status] || statusMap.pending;
                const canCancel = order.status === "pending";
                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-bold text-[#45690b]">
                          #{order.orderCode}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-[12px] font-medium ${status.bg} ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <span className="text-[13px] text-gray-500">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>

                    {/* Order Items */}
                    <div className="p-4">
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 py-2">
                          <div className="w-16 h-16 bg-[#f8fdf0] rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product?.productUrl || "/caphe.png"}
                              alt={item.product?.productName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] font-medium text-[#1d4220] truncate">
                              {item.product?.productName ||
                                `Sản phẩm #${item.productId}`}
                            </h4>
                            <p className="text-[13px] text-gray-500">
                              x{item.quantity} · {formatPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {order.items && order.items.length > 2 && (
                        <p className="text-[13px] text-gray-500 mt-2">
                          +{order.items.length - 2} sản phẩm khác
                        </p>
                      )}
                    </div>

                    {/* Order Footer */}
                    <div className="p-4 bg-[#f8fdf0] flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[13px] text-gray-600">
                          Tổng tiền:{" "}
                        </span>
                        <span className="text-[18px] font-bold text-[#45690b]">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {canCancel && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={cancellingId === order.id}
                            className="px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg text-[14px] font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
                          >
                            {cancellingId === order.id
                              ? "Đang hủy..."
                              : "Hủy đơn"}
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-4 py-2 bg-white border border-[#45690b] text-[#45690b] rounded-lg text-[14px] font-medium hover:bg-[#45690b] hover:text-white transition-colors"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-[18px] font-bold text-[#45690b]">
                  Chi tiết đơn hàng
                </h3>
                <p className="text-[14px] text-gray-500">
                  #{selectedOrder.orderCode}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              {/* Status & Date */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <p className="text-[13px] text-gray-500 mb-1">Trạng thái</p>
                  <span
                    className={`px-3 py-1 rounded-full text-[13px] font-medium ${
                      statusMap[selectedOrder.status]?.bg || "bg-gray-100"
                    } ${
                      statusMap[selectedOrder.status]?.color || "text-gray-700"
                    }`}
                  >
                    {statusMap[selectedOrder.status]?.label || "Không xác định"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[13px] text-gray-500 mb-1">Ngày đặt</p>
                  <p className="text-[14px] font-medium text-[#1d4220]">
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="text-[15px] font-bold text-[#45690b] mb-3">
                  Sản phẩm đã đặt
                </h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-[#f8fdf0] rounded-lg"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product?.productUrl || "/caphe.png"}
                          alt={item.product?.productName}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-[14px] font-medium text-[#1d4220] truncate">
                          {item.product?.productName ||
                            `Sản phẩm #${item.productId}`}
                        </h5>
                        <p className="text-[13px] text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[15px] font-bold text-[#45690b]">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[#f8fdf0] rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[14px] text-gray-600">Tạm tính</span>
                  <span className="text-[14px] text-[#1d4220]">
                    {formatPrice(selectedOrder.totalAmount)}
                  </span>
                </div>
                {parseFloat(selectedOrder.discount) > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] text-gray-600">Giảm giá</span>
                    <span className="text-[14px] text-red-500">
                      -{formatPrice(selectedOrder.discount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-[#45690b]/20">
                  <span className="text-[16px] font-bold text-[#45690b]">
                    Tổng cộng
                  </span>
                  <span className="text-[20px] font-bold text-[#45690b]">
                    {formatPrice(
                      parseFloat(selectedOrder.totalAmount) -
                        parseFloat(selectedOrder.discount || "0")
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {selectedOrder.status === "pending" && (
              <div className="p-4 border-t">
                <button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  disabled={cancellingId === selectedOrder.id}
                  className="w-full py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {cancellingId === selectedOrder.id
                    ? "Đang hủy..."
                    : "Hủy đơn hàng"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
