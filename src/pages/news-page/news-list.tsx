const newsItems = [
  {
    id: 1,
    title: "Khai trương cơ sở mới tại Mai Hắc Đế",
    excerpt:
      "Fordeer Coffee chính thức khai trương cơ sở mới tại 116 Mai Hắc Đế với không gian xanh mát và thiết kế độc đáo.",
    image: "/news-1.png",
    date: "15/11/2024",
    category: "Sự kiện",
  },
  {
    id: 2,
    title: "Ra mắt menu đồ uống mùa đông",
    excerpt:
      "Khám phá những thức uống ấm áp mới trong menu mùa đông của Fordeer Coffee với hương vị đặc biệt.",
    image: "/news-2.png",
    date: "10/11/2024",
    category: "Sản phẩm",
  },
  {
    id: 3,
    title: "Chương trình khách hàng thân thiết",
    excerpt:
      "Tích điểm đổi quà với chương trình khách hàng thân thiết mới từ Fordeer Coffee.",
    image: "/news-3.png",
    date: "05/11/2024",
    category: "Khuyến mãi",
  },
  {
    id: 4,
    title: "Workshop làm terrarium miễn phí",
    excerpt:
      "Tham gia workshop làm terrarium miễn phí tại Fordeer Coffee vào cuối tuần này.",
    image: "/news-4.png",
    date: "01/11/2024",
    category: "Sự kiện",
  },
  {
    id: 5,
    title: "Fordeer Coffee x Local Brand",
    excerpt:
      "Hợp tác đặc biệt giữa Fordeer Coffee và các thương hiệu địa phương trong tháng 11.",
    image: "/news-5.png",
    date: "28/10/2024",
    category: "Hợp tác",
  },
  {
    id: 6,
    title: "Giảm giá 20% cho sinh viên",
    excerpt:
      "Ưu đãi đặc biệt dành cho sinh viên - Giảm 20% tất cả đồ uống khi xuất trình thẻ sinh viên.",
    image: "/news-6.png",
    date: "25/10/2024",
    category: "Khuyến mãi",
  },
];

export default function NewsList() {
  return (
    <section className="py-12 bg-[#fafaf8]">
      <div className="max-w-[1152px] mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-[200px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#45690b] text-white text-[12px] font-medium px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <p className="text-[12px] text-[#9cc019] font-medium mb-2">
                  {item.date}
                </p>
                <h3 className="text-[18px] font-semibold text-[#45690b] mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#45690b]/70 line-clamp-3">
                  {item.excerpt}
                </p>
                <button className="mt-4 text-[14px] font-medium text-[#9cc019] hover:text-[#45690b] transition-colors">
                  Đọc thêm →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
