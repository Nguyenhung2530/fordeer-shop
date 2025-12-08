import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./hero-section";
import StoresList from "./stores-list";

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StoresList />
      <Footer />
    </div>
  );
}
