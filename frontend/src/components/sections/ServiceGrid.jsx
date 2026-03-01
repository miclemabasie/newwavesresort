import React from "react";
import ServiceDiscoveryCard from "../ui/ServiceDiscoveryCard";

const services = [
  {
    title: "Events/Banquet Hall & Conference Facilities",
    subtitle: "State-of-the-art venues for high-level professional engagement and refined celebrations.",
    category: "Professional",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    to: "/conferences"
  },
  {
    title: "World Class Swimming Pool",
    subtitle: "Limbe’s premier ocean-front aquatic experience, designed for absolute serenity.",
    category: "Leisure",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    to: "/leisure"
  },
  {
    title: "In-House Library",
    subtitle: "A curated intellectual sanctuary for deep focus, research, and quiet reflection.",
    category: "Intellectual",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800",
    to: "/library"
  },
  {
    title: "Know Your Environs Guided Tours",
    subtitle: "Expertly curated journeys through Limbe's landmarks and the volcanic slopes of Mt. Cameroon.",
    category: "Experiences",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
    to: "/tours"
  }
];

export default function ServiceGrid() {
  return (
    <section className="container mx-auto py-24 bg-sand lg:max-w-7xl px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-xl">
          <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px]">
            Excellence in Service
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-ocean leading-tight">
            Everything you need, <br />
            <span className="italic">Expertly handled.</span>
          </h2>
        </div>
        <p className="text-volcanic/60 max-w-sm pb-2 text-sm leading-relaxed">
          From diplomatic-level security to world-class leisure, our services are 
          designed to support your vision and professional lifestyle.
        </p>
      </div>

      {/* 4-Column Grid: Keeping images smaller and more refined on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceDiscoveryCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}