export default function MarqueeBanner() {
  const text = "FROM A LEADING LOCAL ESPRESSO CHAIN";

  return (
    <div className="w-full bg-[#f5f1eb] py-8 md:py-10 overflow-hidden -mt-8 md:-mt-16 xl:-mt-24">
      <div className="flex animate-marquee-fast whitespace-nowrap">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-[#45690b] text-xs md:text-sm font-medium tracking-[0.25em] uppercase mx-10 md:mx-14">
              {text}
            </span>
            <span className="w-2 h-2 bg-[#c4a35a] rounded-full"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
