import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "./hero";
import MarqueeBanner from "./marquee-banner";
import ProductCategories from "./product-categories";
import ProductGrid from "./product-grid";
import NewsSection from "./news-section";
import StoreLocator from "./store-locator";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MarqueeBanner />
      <ProductCategories />
      <ProductGrid />
      <NewsSection />
      <StoreLocator />
      <Footer />
    </main>
  );
}
