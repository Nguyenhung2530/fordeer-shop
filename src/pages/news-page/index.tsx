import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./hero-section";
import NewsList from "./news-list";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <NewsList />
      <Footer />
    </div>
  );
}
