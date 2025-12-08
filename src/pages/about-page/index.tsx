import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "./hero-section";
import StorySection from "./story-section";
import GreenMessageSection from "./green-message-section";
import SpaceSection from "./space-section";
import MenuSection from "./menu-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />

      <StorySection />
      <GreenMessageSection />
      <SpaceSection />
      <MenuSection />
      <Footer />
    </div>
  );
}
