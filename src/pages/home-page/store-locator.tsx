import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useNavigate } from "react-router-dom";

export default function StoreLocator() {
  const navigate = useNavigate();
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: contentRef, isVisible: contentVisible } =
    useScrollAnimation(0.2);

  const handleFindStore = () => {
    navigate("/stores");
  };

  return (
    <section className="py-8 md:py-8 xl:py-12 2xl:py-16 mb-6 md:mb-8 xl:mb-12 overflow-hidden">
      <div className="max-w-[1152px] xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-4 xl:px-6">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`flex items-center justify-center gap-3 md:gap-4 xl:gap-6 mb-6 md:mb-6 xl:mb-10 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className={`h-px xl:h-[2px] bg-[#45690b] flex-1 max-w-[80px] md:max-w-[328px] xl:max-w-[400px] transition-all duration-1000 delay-300 ${
              titleVisible ? "scale-x-100" : "scale-x-0"
            } origin-right`}
          />
          <h2 className="text-[18px] md:text-[22px] xl:text-[28px] 2xl:text-[32px] font-bold text-[#45690b] text-center uppercase whitespace-nowrap">
            Cửa hàng
          </h2>
          <div
            className={`h-px xl:h-[2px] bg-[#45690b] flex-1 max-w-[80px] md:max-w-[332px] xl:max-w-[400px] transition-all duration-1000 delay-300 ${
              titleVisible ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          />
        </div>

        <div
          ref={contentRef}
          className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-5 xl:gap-8 2xl:gap-10"
        >
          {/* Store Image */}
          <div
            className={`relative h-[180px] sm:h-[240px] md:h-[260px] xl:h-[340px] 2xl:h-[400px] overflow-hidden rounded-lg xl:rounded-xl shadow-lg transition-all duration-700 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <img
              src="/shop-img.png"
              alt="Cửa hàng"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            {/* Store name badge on mobile */}
            <div className="absolute bottom-0 left-0 bg-[#45690b]/90 text-white px-4 py-2 text-[12px] font-bold md:hidden">
              RỪNG MAI HẮC ĐẾ
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Store Finder */}
          <div
            className={`flex flex-col justify-center space-y-4 md:space-y-4 xl:space-y-6 shadow-md bg-white p-4 md:p-5 xl:p-8 2xl:p-10 rounded-lg xl:rounded-xl transition-all duration-700 delay-200 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-2 xl:space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 xl:gap-4 group">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="md:w-7 md:h-7 xl:w-9 xl:h-9 2xl:w-11 2xl:h-11 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="#42612e"
                  />
                </svg>
                <h3 className="text-[14px] md:text-[15px] xl:text-[18px] 2xl:text-[22px] font-bold text-[#42612e] uppercase">
                  Tìm một cửa hàng gần bạn
                </h3>
              </div>
            </div>

            <div className="relative group">
              <select className="w-full h-[38px] md:h-[38px] xl:h-[44px] 2xl:h-[50px] px-3 md:px-3 xl:px-4 bg-white border border-gray-300 text-[#45690b] text-[12px] md:text-[12px] xl:text-[14px] 2xl:text-[15px] appearance-none cursor-pointer hover:border-[#45690b] focus:border-[#45690b] focus:ring-2 focus:ring-[#d9ef7f] transition-all duration-300 rounded-lg xl:rounded-xl">
                <option value="">Vui lòng chọn quận, huyện</option>
                <option value="cau-giay">Cầu Giấy</option>
                <option value="dong-da">Đống Đa</option>
                <option value="ba-dinh">Ba Đình</option>
                <option value="hoan-kiem">Hoàn Kiếm</option>
                <option value="hai-ba-trung">Hai Bà Trưng</option>
              </select>
              <svg
                className="absolute right-3 md:right-4 xl:right-5 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-[-40%] transition-transform duration-300 xl:w-6 xl:h-6"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#45690b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              onClick={handleFindStore}
              className="hidden md:block w-full bg-[#45690b] text-white py-2.5 xl:py-3 2xl:py-4 rounded-full font-bold text-sm xl:text-base 2xl:text-lg hover:bg-[#42612e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Tìm cửa hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
