import {
  Wallet,
  Users,
  TrendingUp,
  Gift,
  PartyPopper,
  Shield,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Thu nhập cạnh tranh",
    description: "Mức lương hấp dẫn cùng các khoản thưởng theo hiệu suất",
    icon: Wallet,
  },
  {
    id: 2,
    title: "Môi trường thân thiện",
    description: "Đội ngũ trẻ trung, năng động và luôn hỗ trợ lẫn nhau",
    icon: Users,
  },
  {
    id: 3,
    title: "Cơ hội phát triển",
    description: "Lộ trình thăng tiến rõ ràng và đào tạo chuyên nghiệp",
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Ưu đãi đặc biệt",
    description: "Giảm giá sản phẩm và nhiều phúc lợi hấp dẫn khác",
    icon: Gift,
  },
  {
    id: 5,
    title: "Sự kiện & Team building",
    description: "Tham gia các hoạt động gắn kết và sự kiện thú vị",
    icon: PartyPopper,
  },
  {
    id: 6,
    title: "Bảo hiểm đầy đủ",
    description: "BHXH, BHYT và các chế độ bảo hiểm theo quy định",
    icon: Shield,
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-12 md:py-20 bg-[#f5f1eb]">
      <div className="max-w-[1152px] xl:max-w-[1280px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#45690b] mb-3">
            NHỮNG ĐẶC QUYỀN CỦA TREEMAN
          </h2>
          <p className="text-[#45690b]/70 text-base md:text-lg">
            Chúng tôi luôn quan tâm đến sự phát triển và hạnh phúc của nhân viên
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="group bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-[#45690b]/5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#d9ef7f] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#45690b]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#45690b] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[#45690b]/70 text-sm md:text-base">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-[#45690b] rounded-3xl p-8 md:p-10 text-white max-w-2xl">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              Sẵn sàng gia nhập đội ngũ?
            </h3>
            <p className="text-white/80 mb-6">
              Gửi CV của bạn ngay hôm nay và bắt đầu hành trình mới cùng Fordeer
              Coffee
            </p>
            <button className="px-8 py-3 bg-[#d9ef7f] text-[#45690b] font-bold rounded-full hover:bg-white transition-colors">
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
