import { motion } from "framer-motion";

const suites = [
  { name: "The Atlantic Horizon", size: "120sqm", price: "$350", img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800" },
  { name: "Digital Nomad Studio", size: "65sqm", price: "$210", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800" },
  { name: "Executive Founders Suite", size: "180sqm", price: "$550", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" }
];

export default function Suites() {
  return (
    <section className="py-24 bg-sand">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">Accommodations</span>
            <h2 className="text-4xl md:text-4xl font-serif mt-4 italic text-ocean">Designed for Luxury & Excellence</h2>
          </div>
          <p className="text-volcanic/60 max-w-xs text-sm">
            Whether for a high-level summit or a nomadic retreat, our suites offer a sanctuary of productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {suites.map((suite, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-volcanic/5 shadow-resort">
                <img src={suite.img} alt={suite.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-serif">{suite.name}</h3>
              <div className="flex justify-between items-center mt-2 pb-4 border-b border-ocean/10 text-xs tracking-widest uppercase opacity-60">
                <span>{suite.size}</span>
                <span>From {suite.price} / Night</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}