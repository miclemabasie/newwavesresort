import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ImpactSection from "../components/sections/ImpactSection";
import Infrastructure from "../components/sections/Infrastructure"; 
import Cultinary from "../components/sections/Cultinary"; 
import Suites from "../components/sections/Suites"; 
import GalleryPreview from "../components/sections/GalleryPreview"; 
import Parnershtips from "../components/sections/Partnerships"; 
import Footer from "../components/sections/Footer";
import Testimonials from "../components/sections/Testimonials";
import Principles from "../components/sections/Principles";
import Facilities from "../components/sections/Facilities";
import Values from "../components/sections/Values";
import ServiceGrid from "../components/sections/ServiceGrid";
import OceanSide from "../components/sections/OceanSide";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-ocean selection:text-white bg-sand">
      <Navbar />
      
      <Hero />
      <ImpactSection />
      <Values />
      <Principles />
      <Infrastructure />

      {/* Abstracted Service Section with Diplomat's phrasing */}
      <ServiceGrid />

      <Facilities />

      <OceanSide />

      <Cultinary />
      <Suites />
      <GalleryPreview />
      <Testimonials />
      <Parnershtips />
      
      <Footer />
    </div>
  );
}