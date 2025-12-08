import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./hero-section";
import CategoryFilter from "./category-filter";
import ProductList from "./product-list";
import { useState } from "react";

export default function OrderPage() {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <div className="max-w-[1152px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </aside>
          <main className="lg:col-span-3">
            <ProductList category={activeCategory} />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
