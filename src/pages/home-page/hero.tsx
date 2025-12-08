import { useEffect, useState } from "react";

const banners = [
  { src: "/banner.png", alt: "Fordeer Coffee", hasText: true },
  { src: "/banner-slide-2.jpg", alt: "Fordeer Coffee Slide 2", hasText: false },
];

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[420px] md:h-[450px] xl:h-[600px] 2xl:h-[700px] overflow-hidden bg-[#ede8ea] mb-8 md:mb-16 xl:mb-24">
      {/* Background Images - Slider */}
      <div className="absolute inset-0">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {banner.hasText ? (
              // Banner 1: có text overlay nên cần left area
              <div className="flex h-full">
                <div className="hidden md:block w-[300px] md:w-[400px] xl:w-[500px] bg-[#ede8ea]"></div>
                <img
                  src={banner.src}
                  alt={banner.alt}
                  className={`flex-1 w-full h-full object-contain sm:object-cover object-center md:object-right transition-all duration-1000 ${
                    isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                />
              </div>
            ) : (
              // Banner 2: full width image - object-left để giữ phần text bên trái trên mobile
              <img
                src={banner.src}
                alt={banner.alt}
                className={`w-full h-full object-cover object-left sm:object-center transition-all duration-1000 ${
                  isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            )}
          </div>
        ))}
        {/* Mobile overlay for better text readability - only show on slide 0 */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-[#ede8ea]/95 via-[#ede8ea]/70 to-transparent md:hidden transition-opacity duration-500 ${
            currentSlide === 0 ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content - Only show on slide 0 */}
      <div
        className={`absolute inset-0 max-w-[1152px] xl:max-w-[1280px] 2xl:max-w-[1400px] mx-auto px-4 xl:px-6 flex items-center md:items-center transition-opacity duration-500 ${
          currentSlide === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[481px] xl:max-w-[550px] 2xl:max-w-[600px] space-y-2 sm:space-y-3 md:space-y-4 xl:space-y-6 mt-auto mb-22 sm:mb-26 md:mt-0 md:mb-0">
          <h1
            className={`text-[40px] sm:text-[56px] md:text-[60px] xl:text-[90px] 2xl:text-[110px] font-bold text-[#799a01] leading-[1] tracking-tight transition-all duration-700 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            FORDEER
          </h1>

          <div
            className={`inline-block bg-[#45690b] px-4 sm:px-6 md:px-6 xl:px-10 2xl:px-12 py-2 md:py-2 xl:py-3 rounded-[12px] md:rounded-[16px] xl:rounded-[22px] transition-all duration-700 delay-500 hover:scale-105 hover:shadow-xl ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="text-[24px] sm:text-[32px] md:text-[32px] xl:text-[48px] 2xl:text-[58px] font-bold text-white leading-[1]">
              COFFEE
            </span>
          </div>

          <p
            className={`text-[16px] sm:text-[20px] md:text-[22px] xl:text-[32px] 2xl:text-[40px] text-[#45690b] leading-[1.3] font-normal transition-all duration-700 delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Những khu rừng nhiệt đới
            <br />
            lạc giữa thành phố lớn
          </p>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-[#45690b] w-8"
                : "bg-[#45690b]/40 hover:bg-[#45690b]/60"
            }`}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div
        className={`hidden md:block absolute bottom-20 xl:bottom-28 right-40 xl:right-52 w-4 h-4 xl:w-5 xl:h-5 bg-[#d9ef7f] rounded-full animate-bounce transition-opacity duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`hidden md:block absolute top-40 xl:top-52 right-60 xl:right-80 w-3 h-3 xl:w-4 xl:h-4 bg-[#799a01] rounded-full animate-pulse transition-opacity duration-1000 delay-1200 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
