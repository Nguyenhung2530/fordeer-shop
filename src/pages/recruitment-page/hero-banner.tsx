export default function HeroBanner() {
  return (
    <section className="relative">
      {/* Title Section with gradient lines */}
      <div className="py-8 md:py-12 bg-[#fcfcf6]">
        <div className="max-w-[1152px] xl:max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="h-[2px] flex-1 max-w-[300px] bg-gradient-to-r from-transparent to-[#45690b]" />
            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold text-[#45690b] whitespace-nowrap">
              TUYỂN DỤNG
            </h1>
            <div className="h-[2px] flex-1 max-w-[300px] bg-gradient-to-l from-transparent to-[#45690b]" />
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[450px] xl:h-[550px] overflow-hidden">
        <img
          src="/banner-requirement.png"
          alt="Recruitment Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </section>
  );
}
