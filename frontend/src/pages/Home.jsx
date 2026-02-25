import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Link } from "react-router";
import ImpactSection from "../components/sections/ImpactSection";
import Infrastructure from "../components/sections/Infrastructure"; 
import Cultinary from "../components/sections/Cultinary"; 
import Suites from "../components/sections/Suites"; 
import GalleryPreview from "../components/sections/GalleryPreview"; 
import Parnershtips from "../components/sections/Partnerships"; 
import { motion } from "framer-motion";
import ServiceDiscoveryCard from "../components/ui/ServiceDiscoveryCard";
import Footer from "../components/sections/Footer";
import Testimonials from "../components/sections/Testimonials";


export default function Home() {
     const services = [
    {
      title: "Guided Heritage Tours",
      subtitle: "Curated journeys to Mt. Cameroon and historical Limbe landmarks led by local experts.",
      category: "Experiences",
      image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
      to: "/tours"
    },
    {
      title: "Executive Transport",
      subtitle: "Seamless airport transfers and premium car rentals for the high-stakes traveler.",
      category: "Logistics",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
      to: "/transport"
    },
    {
      title: "Conference Facilities",
      subtitle: "State-of-the-art boardrooms with Starlink connectivity and full AV support.",
      category: "Professional",
      image: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=800",
      to: "/conferences"
    },
    {
      title: "Olympic Infinity Pool",
      subtitle: "Relax in Limbe’s largest ocean-front pool, designed for pure serenity.",
      category: "Leisure",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
      to: "/leisure"
    }
  ];

  return (
    <div className="min-h-screen selection:bg-ocean selection:text-white bg-sand">
      <Navbar />
      
        {/* Entrance */}
        <Hero />

        {/* The Intellectual/Social Mission */}
        <ImpactSection />

        {/* Professional Utility */}
        <Infrastructure />

        {/* Quick Access Grid - Direct Links to Dedicated Pages */}
        <section className="container py-24 bg-sand">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">Excellence in Service</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">Everything you need, <br/>Expertly handled.</h2>
        </div>
        <p className="text-volcanic/60 max-w-sm pb-2">
          From diplomatic-level security to world-class leisure, our services are designed to support your vision.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceDiscoveryCard key={index} {...service} />
        ))}
      </div>
        </section>


        {/* Thought Leadership Teaser */}
        <section className="py-24 text-center bg-white/50 backdrop-blur-sm border-t border-ocean/5">
          <div className="container max-w-4xl">
            <h2 className="font-serif italic text-ocean mb-6 text-4xl">The Ocean-Side Dialogues</h2>
            <p className="text-lg opacity-70 mb-10">
              A future intellectual hub convening global speakers to address the pertinence of African nature and world issues.
            </p>
            <button className="btn-primary">Request Invitation</button>
          </div>
        </section>

        {/* Cultinary section */}
        <Cultinary />

        {/* Suites section */}
        <Suites />

        
        {/* Gallery section */}
        <GalleryPreview />
        
        <Testimonials />
        {/* Partnerships section */}
        <Parnershtips />
      <Footer />
    </div>
  );
}
