export default function HeroSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1152px] mx-auto px-4">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-[2px] bg-gradient-to-r from-transparent to-[#45690b] flex-1 max-w-[300px]" />
          <h1 className="text-[32px] font-bold text-[#45690b] uppercase tracking-wider">
            Cửa Hàng
          </h1>
          <div className="h-[2px] bg-gradient-to-l from-transparent to-[#45690b] flex-1 max-w-[300px]" />
        </div>
        <p className="text-center text-[16px] text-[#45690b]/80 max-w-[600px] mx-auto">
          Tìm cửa hàng Fordeer Coffee gần bạn nhất
        </p>
      </div>
    </section>
  );
}
