import { motion } from "framer-motion";

const partners = [
  { name: "Fisiy Foundation", role: "Social Impact Lead", logo: "⚖️" },
  { name: "World Bank Network", role: "Development Partner", logo: "🌐" },
  { name: "Limbe Artisanal Guild", role: "Sustainable Sourcing", logo: "🎨" },
  { name: "Starlink Business", role: "Connectivity Partner", logo: "🛰️" },
  { name: "Cameroon Green Initiative", role: "Eco-Certification", logo: "🍃" }
];

export default function Partnerships() {
  return (
    <section className="py-24 bg-white border-y border-sand">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          
          {/* Left Side: Strategic Text */}
          <div className="lg:col-span-1">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">Strategic Synergy</span>
            <h2 className="text-4xl font-serif mt-4 text-ocean leading-tight">
              A Network of <br /> Global Excellence
            </h2>
            <p className="text-volcanic/70 mt-6 leading-relaxed text-sm">
              Ngeme operates at the intersection of international standards and local empowerment. 
              Our partnerships are carefully curated to ensure that every stay contributes to 
              a sustainable, reliable, and socially inclusive supply chain.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-sand flex items-center justify-center text-xl">🤝</div>
              <span className="text-xs font-bold uppercase tracking-widest text-volcanic/40">
                Building a reliable community
              </span>
            </div>
          </div>

          {/* Right Side: Interactive Logo/Partner Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, backgroundColor: "var(--color-sand)" }}
                  className="p-8 border border-sand rounded-2xl flex flex-col items-center text-center transition-colors duration-300"
                >
                  <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                    {partner.logo}
                  </div>
                  <h4 className="text-sm font-bold text-ocean uppercase tracking-tighter">
                    {partner.name}
                  </h4>
                  <p className="text-[10px] text-lush font-medium mt-1 uppercase tracking-widest">
                    {partner.role}
                  </p>
                </motion.div>
              ))}
              
              {/* "Become a Partner" CTA Box */}
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="p-8 bg-ocean rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <p className="text-white font-serif italic text-lg mb-2">Join the Mission</p>
                <span className="text-[9px] text-sand/60 uppercase tracking-[0.2em]">Partner with us</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}