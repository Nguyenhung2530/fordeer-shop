import { useState } from "react";

const featuredPositions = [
  { id: 1, title: "Barista", count: 5 },
  { id: 2, title: "Trưởng ca", count: 3 },
  { id: 3, title: "Quản lý", count: 2 },
];

const positionCategories = [
  {
    id: 1,
    title: "KHỐI VĂN PHÒNG",
    image: "/requi-1.png",
    positions: ["Kế toán", "Designer", "Marketing", "HR"],
  },
  {
    id: 2,
    title: "KHỐI CỬA HÀNG",
    image: "/requi-2.png",
    positions: ["Quản lý", "Trưởng ca", "Barista", "Thu ngân"],
  },
];

export default function PositionsSection() {
  const [activePosition, setActivePosition] = useState<number | null>(null);

  return (
    <section className="py-12 md:py-20 bg-[#fcfcf6]">
      <div className="max-w-[1152px] xl:max-w-[1280px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#45690b] mb-3">
            BẠN MUỐN ỨNG TUYỂN VỊ TRÍ NÀO?
          </h2>
          <p className="text-[#45690b]/70 text-base md:text-lg">
            Khám phá các cơ hội nghề nghiệp tại Fordeer Coffee
          </p>
        </div>

        {/* Featured Position Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          {featuredPositions.map((pos) => (
            <button
              key={pos.id}
              onClick={() =>
                setActivePosition(activePosition === pos.id ? null : pos.id)
              }
              className={`group relative px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold transition-all duration-300 ${
                activePosition === pos.id
                  ? "bg-[#d9ef7f] text-[#45690b] shadow-lg scale-105"
                  : "bg-[#45690b] text-white hover:bg-[#5a8a0e] hover:shadow-lg hover:scale-105"
              }`}
            >
              {pos.title}
              <span
                className={`ml-2 text-sm px-2 py-0.5 rounded-full ${
                  activePosition === pos.id
                    ? "bg-[#45690b] text-white"
                    : "bg-white/20"
                }`}
              >
                {pos.count}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center mb-12 md:mb-16">
          <a
            href="#all-positions"
            className="inline-flex items-center gap-2 text-[#45690b] font-medium hover:text-[#5a8a0e] transition-colors group"
          >
            Xem thêm các vị trí khác
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>

        {/* Position Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8" id="all-positions">
          {positionCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#45690b]/10"
            >
              {/* Image */}
              <div className="relative h-[250px] md:h-[300px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#45690b]/80 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-xl md:text-2xl font-bold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 bg-[#45690b]">
                <ul className="space-y-3 mb-6">
                  {category.positions.map((position, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-white text-base md:text-lg"
                    >
                      <span className="w-2 h-2 bg-[#d9ef7f] rounded-full" />
                      {position}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-white text-[#45690b] font-bold rounded-full hover:bg-[#d9ef7f] transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
