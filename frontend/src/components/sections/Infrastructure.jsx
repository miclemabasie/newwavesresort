// app/components/sections/Infrastructure.jsx
import ServiceCard from "../ui/ServiceCard";

export default function Infrastructure() {
  const features = [
    {
      title: "Resilient Connectivity",
      description: "Dual-redundant Fiber & Starlink systems. Guaranteed low-latency for global board meetings.",
      icon: "🌐",
      to: "/nomads"
    },
    {
      title: "Energy Sovereignty",
      description: "Smart solar grid integration ensuring 24/7 power for work and leisure.",
      icon: "☀️",
      to: "/nomads"
    },
    {
      title: "Executive Suites",
      description: "Soundproofed conference facilities and boardrooms with high-end AV technology.",
      icon: "🏢",
      to: "/conferences"
    }
  ];

  return (
    <section className="bg-ocean py-24">
      <div className="container">
        <div className="mb-16">
          <h2 className="text-white font-serif italic mb-4">Precision Infrastructure</h2>
          <p className="text-white/70 max-w-2xl">
            Reliability is our baseline. We provide the technical stability required by world-class leaders and digital professionals.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <ServiceCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}