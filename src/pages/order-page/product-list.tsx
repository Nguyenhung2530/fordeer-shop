import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { productService, Product } from "@/services/productService";
import { cartService } from "@/services/cartService";
import { toast } from "sonner";

interface ProductListProps {
  category: string;
}

interface ProductWithSize extends Product {
  sizes: { label: string; price: string; priceNumber: number }[];
}

export default function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithSize | null>(null);
  const [selectedSize, setSelectedSize] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getProducts(
          category || undefined
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "đ";
  };

  const handleOpenModal = (product: Product) => {
    const productWithSize: ProductWithSize = {
      ...product,
      sizes: [
        { label: "Nhỏ", price: "0đ", priceNumber: 0 },
        { label: "Vừa", price: "+6.000đ", priceNumber: 6000 },
        { label: "Lớn", price: "+10.000đ", priceNumber: 10000 },
      ],
    };
    setSelectedProduct(productWithSize);
    setSelectedSize(0);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const sizeExtra = selectedProduct.sizes[selectedSize].priceNumber;
    const sizeLabel = selectedProduct.sizes[selectedSize].label;
    const basePrice =
      typeof selectedProduct.price === "string"
        ? parseFloat(selectedProduct.price)
        : selectedProduct.price;

    cartService.addToCart({
      productId: selectedProduct.id,
      name: selectedProduct.productName,
      price: basePrice + sizeExtra,
      image: selectedProduct.productUrl || "/placeholder.jpg",
      size: sizeLabel,
    });

    toast.success(`Đã thêm "${selectedProduct.productName}" vào giỏ hàng!`);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#45690b]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[20px] font-semibold text-[#45690b]">
          {category || "Tất cả sản phẩm"}
        </h3>
        <span className="text-[14px] text-[#45690b]/60">
          {products.length} sản phẩm
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => handleOpenModal(product)}
          >
            <div className="relative aspect-square overflow-hidden bg-[#f5f5f0]">
              <img
                src={product.productUrl || "/placeholder.jpg"}
                alt={product.productName}
                className="w-full h-full object-contain p-2 md:p-4 hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-2 md:p-4">
              <h4 className="text-[13px] md:text-[16px] font-semibold text-[#45690b] mb-1 md:mb-2 line-clamp-1">
                {product.productName}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-[14px] md:text-[18px] font-bold text-[#9cc019]">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(product);
                  }}
                  className="bg-[#45690b] text-white p-1.5 md:p-2 rounded-lg hover:bg-[#5a8a0e] transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-[#45690b]/60">
          Không có sản phẩm nào trong danh mục này
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#fcf8e8] rounded-t-2xl md:rounded-2xl max-w-[800px] w-full max-h-[90vh] md:max-h-none overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 z-10"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-[45%] bg-gradient-to-br from-[#fef9e7] to-[#fcf3d5] flex items-center justify-center p-6 md:p-8">
                <img
                  src={selectedProduct.productUrl || "/placeholder.jpg"}
                  alt={selectedProduct.productName}
                  className="max-h-[200px] md:max-h-[400px] w-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 p-5 md:p-8">
                <h2 className="text-[22px] md:text-[32px] font-bold text-[#45690b] mb-1 md:mb-2">
                  {selectedProduct.productName}
                </h2>
                <p className="text-[18px] md:text-[24px] font-bold text-[#799a01] mb-3 md:mb-4">
                  {formatPrice(selectedProduct.price)}
                </p>

                {selectedProduct.description && (
                  <p className="text-[13px] md:text-[15px] text-gray-700 leading-relaxed mb-4 md:mb-6">
                    {selectedProduct.description}
                  </p>
                )}

                <div className="mb-4 md:mb-6">
                  <p className="text-[14px] md:text-[16px] font-bold text-[#1d1d1d] mb-2 md:mb-3">
                    Chọn size (bắt buộc):
                  </p>
                  <div className="flex gap-2 md:gap-3">
                    {selectedProduct.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(idx)}
                        className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg border-2 transition-all duration-300 ${
                          selectedSize === idx
                            ? "border-[#45690b] bg-[#d9ef7f]"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center gap-0.5 md:gap-1">
                          <span className="font-medium text-[12px] md:text-[14px]">
                            {size.label}
                          </span>
                          {size.price !== "0đ" && (
                            <span className="text-[10px] md:text-sm text-gray-600">
                              {size.price}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#45690b] text-white py-3 md:py-4 rounded-full text-[15px] md:text-[18px] font-bold hover:bg-[#42612e] active:scale-[0.98] transition-all duration-300 shadow-lg"
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
