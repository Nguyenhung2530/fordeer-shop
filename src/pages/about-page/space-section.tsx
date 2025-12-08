export default function SpaceSection() {
  return (
    <section className="py-12 bg-[#fafaf8]">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-8 bg-[#45690b] rounded-full" />
          <h3 className="text-[28px] font-semibold text-[#45690b]">
            Không gian rộng rãi, bình yên giữa lòng thủ đô nhộn nhịp
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
          {/* Left content */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <p className="text-[16px] text-[#45690b] leading-[1.8]">
              ForDeer - Coffee with tree rất thích hợp là "nơi dừng chân" của
              những ai yêu thiên nhiên, muốn hít thở không khí trong lành. Diện
              tích quán khá rộng, luôn đông đúc nhưng vẫn giữ được sự yên tĩnh.
              Vì thế, nếu bạn cần một nơi để tập trung làm việc và học tập, thì
              ForDeer - Coffee with tree là lựa chọn lý tưởng.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 text-[#45690b]">
                <span className="text-sm font-medium">Không gian xanh</span>
              </div>
              <div className="flex items-center gap-2 text-[#45690b]">
                <span className="text-sm font-medium">Đồ uống ngon</span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/about-img-5.png"
              alt="ForDeer Coffee Space"
              className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Two images gallery */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="/about-img-6.png"
              alt="Fordeer Drinks"
              className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="md:col-span-2 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/about-img-7.png"
              alt="Fordeer Menu"
              className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
