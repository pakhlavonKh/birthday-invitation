import BalloonAnimation from "@/components/BalloonAnimation";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PhotoGallery from "@/components/PhotoGallery";
import GiftRegistry from "@/components/GiftRegistry";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <BalloonAnimation />
      <Navigation />
      <HeroSection />
      <PhotoGallery />
      <GiftRegistry />
      <RSVPForm />
      <Footer />
    </div>
  );
}
