export default function StorySection() {
  return (
    <section className="py-12 bg-[#fafaf8]">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-[#45690b] rounded-full" />
          <h3 className="text-[28px] font-semibold text-[#45690b]">
            Tropical Forest x Fordeer
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <div>
            <p className="text-[16px] text-[#45690b] leading-[1.8] mb-6">
              Không phải là một thương hiệu xa lạ, Tropical Forest x Fordeer là
              một chuỗi cafe kết hợp cùng cửa hàng cây cảnh đã nổi tiếng tại Hà
              Nội từ những năm 2017. Thương hiệu mới xuất hiện và lặng lẽ biến
              mất, quán vẫn là nơi chốn quen thuộc cho nhiều bạn trẻ vốn luôn
              tìm kiếm sự mới lạ cũng là bởi Tropical Forest x Fordeer có một
              điều gì đó rất đặc biệt.
            </p>
            <p className="text-[16px] text-[#45690b] leading-[1.8]">
              Tại đây, dường như ta được tạm lánh khỏi những ồn ào náo nhiệt của
              thành phố, khỏi khói bụi ô nhiễm ngày càng nghiêm trọng mà trở lại
              sự kết nối nguyên sơ, yên bình giữa con người và thiên nhiên.
            </p>
          </div>

          {/* Right image */}
          <div className="relative">
            <img
              src="/about-img-1.png"
              alt="Fordeer Coffee"
              className="w-full h-[320px] object-cover rounded-xl shadow-lg"
            />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#45690b]/10 rounded-full -z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#9cc019]/20 rounded-full -z-10" />
          </div>
        </div>

        {/* Full width paragraph */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border-l-4 border-[#45690b]">
          <p className="text-[16px] text-[#45690b] leading-[1.8]">
            Khởi nguồn từ cơ sở đầu tiên ở Tây Sơn được nhiều bạn trẻ đón nhận
            và trở thành khách quen, Tropical Forest x Fordeer tiếp tục mở rộng
            chuỗi cửa hàng với sự xuất hiện tại Văn Quán - Hà Đông và gần đây
            nhất là cơ sở tại 116 Mai Hắc Đế vừa mới khai trương ngày 29/5. Sự
            kiện khai trương thu hút được nhiều bạn trẻ tới khám phá bởi tuy
            cùng một chuỗi nhưng mỗi quán đều sở hữu một thiết kế riêng biệt,
            không trùng lặp với nhau.
          </p>
        </div>

        {/* Banner image - full width */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src="/about-img-2.png"
            alt="Fordeer Coffee Banner"
            className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
