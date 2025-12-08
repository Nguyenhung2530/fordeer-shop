import { MapPin, Phone, Clock } from "lucide-react";

const stores = [
  {
    id: 1,
    name: "Fordeer Coffee - Tây Sơn",
    address: "123 Tây Sơn, Đống Đa, Hà Nội",
    phone: "0971 953 116",
    hours: "07:00 - 22:00",
    image: "/store-img.png",
    isOpen: true,
  },
  {
    id: 2,
    name: "Fordeer Coffee - Mai Hắc Đế",
    address: "116 Mai Hắc Đế, Hai Bà Trưng, Hà Nội",
    phone: "0971 953 117",
    hours: "07:00 - 22:00",
    image: "/shop-img.png",
    isOpen: true,
  },
  {
    id: 3,
    name: "Fordeer Coffee - Văn Quán",
    address: "45 Văn Quán, Hà Đông, Hà Nội",
    phone: "0971 953 118",
    hours: "07:00 - 22:00",
    image: "/about-img-5.png",
    isOpen: false,
  },
  {
    id: 4,
    name: "Fordeer Coffee - Tô Hiệu",
    address: "217 Tô Hiệu, Cầu Giấy, Hà Nội",
    phone: "0971 953 119",
    hours: "07:00 - 22:00",
    image: "/about-img-1.png",
    isOpen: true,
  },
];

export default function StoresList() {
  return (
    <section className="py-12 bg-[#fafaf8]">
      <div className="max-w-[1152px] mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex"
            >
              <div className="w-[200px] h-[200px] flex-shrink-0 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-[18px] font-semibold text-[#45690b]">
                    {store.name}
                  </h3>
                  <span
                    className={`text-[12px] font-medium px-2 py-1 rounded-full ${
                      store.isOpen
                        ? "bg-[#d9ef7f] text-[#45690b]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {store.isOpen ? "Đang mở" : "Đã đóng"}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-[14px] text-[#45690b]/80">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#9cc019]" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#45690b]/80">
                    <Phone className="w-4 h-4 flex-shrink-0 text-[#9cc019]" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#45690b]/80">
                    <Clock className="w-4 h-4 flex-shrink-0 text-[#9cc019]" />
                    <span>{store.hours}</span>
                  </div>
                </div>
                <button className="mt-4 bg-[#45690b] text-white text-[14px] font-medium px-4 py-2 rounded-lg hover:bg-[#5a8a0e] transition-colors">
                  Xem bản đồ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
