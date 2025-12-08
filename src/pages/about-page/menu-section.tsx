export default function MenuSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-[#45690b] rounded-full" />
          <h3 className="text-[28px] font-semibold text-[#45690b]">
            Thực đơn "xanh" tại Fordeer
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left content */}
          <div>
            <div className="bg-[#f8faf5] p-6 rounded-xl mb-6">
              <p className="text-[16px] text-[#45690b] leading-[1.8]">
                Đồ uống tại quán có giá từ{" "}
                <span className="font-bold text-[#9cc019]">25k-55k</span>, chiếm
                phần lớn trong menu là những món đồ uống có lợi cho sức khỏe như
                nước ép trái cây, sinh tố, trà hoa quả được biến tấu và kết hợp
                với nhau để tạo nên thức uống từ nguyên liệu quen thuộc nhưng
                vẫn đầy mới mẻ.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#45690b] to-[#5a8a0e] p-6 rounded-xl text-white">
              <p className="text-[14px] font-medium mb-2 opacity-90">
                Thông điệp của chúng tôi
              </p>
              <p className="text-[18px] font-bold leading-[1.6]">
                "Choose Green, Choose Happiness"
              </p>
              <p className="text-[14px] mt-3 opacity-90 leading-[1.6]">
                Lựa chọn sống xanh và sống có trách nhiệm với môi trường.
                Fordeer Coffee thay thế những đồ nhựa sử dụng một lần bằng cốc
                và ống hút giấy để giảm thiểu rác thải nhựa.
              </p>
            </div>
          </div>

          {/* Right images - Creative overlapping layout */}
          <div className="relative h-[450px]">
            {/* Image 9 - Top right (chai đen) */}
            <div className="absolute top-0 right-[20px] w-[200px] rounded-lg overflow-hidden shadow-lg z-10 hover:z-40 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="/about-img-9.png"
                alt="Coffee bottles"
                className="w-full h-[160px] object-cover"
              />
            </div>

            {/* Image 10 - Middle left (nước ép màu) */}
            <div className="absolute top-[100px] left-0 w-[260px] rounded-lg overflow-hidden shadow-lg z-20 hover:z-40 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="/about-img-10.png"
                alt="Juice bottles"
                className="w-full h-[220px] object-cover"
              />
            </div>

            {/* Image 11 - Bottom right (chai nâu) */}
            <div className="absolute top-[180px] right-0 w-[220px] rounded-lg overflow-hidden shadow-lg z-30 hover:z-40 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">
              <img
                src="/about-img-11.png"
                alt="Coffee products"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
