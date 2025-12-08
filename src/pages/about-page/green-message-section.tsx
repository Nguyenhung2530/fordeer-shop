export default function GreenMessageSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-[#45690b] rounded-full" />
          <h3 className="text-[28px] font-semibold text-[#45690b]">
            ForDeer - Coffee with tree với thông điệp "sống xanh"
          </h3>
        </div>

        {/* Content */}
        <div className="mb-10">
          <p className="text-[16px] text-[#45690b] leading-[1.8] mb-4">
            ForDeer là quán cà phê với mô hình một khu vườn tràn ngập cây cảnh.
            Tại đây, quán dùng rất nhiều loại cây xanh để trang trí nhằm lan tỏa
            thông điểm "sống xanh" đến tất cả mọi người.
          </p>
          <p className="text-[16px] text-[#45690b] leading-[1.8]">
            Những chậu cây với thiết kế độc đáo, đẹp mắt sẽ hấp dẫn các vị khách
            khi đến thăm ForDeer - Coffee with tree. Đến đây, bạn hoàn toàn bị
            choáng ngợp bởi số lượng cây cảnh "khổng lồ". Sự đa dạng trong số
            lượng chủng loại cây làm bạn vô cùng thích thú và tò mò. Khắp mọi
            nơi tại ForDeer - Coffee with tree đều có mặt cây xanh, làm bạn như
            đang lạc vào khu vườn nhiệt đới mát mẻ.
          </p>
        </div>

        {/* Full width image */}
        <div className="rounded-xl overflow-hidden shadow-lg mb-12">
          <img
            src="/about-img-3.png"
            alt="ForDeer Coffee Interior"
            className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Two columns - image and text */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/about-img-4.png"
              alt="ForDeer Coffee Decoration"
              className="w-full h-[220px] object-cover"
            />
          </div>
          <div className="bg-[#f8faf5] p-6 rounded-xl">
            <p className="text-[16px] text-[#45690b] leading-[1.8]">
              Ngoài ra, đến ForDeer - Coffee with tree bạn còn bắt gặp những bức
              tranh được làm từ lá khô ép lại, giữ nguyên bản hoặc vẽ lên các
              họa tiết boho xinh xắn. Điều này cũng góp một phần ý nghĩa vào
              cách mà ForDeer - Coffee with tree giữ gìn lối sống "xanh"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
