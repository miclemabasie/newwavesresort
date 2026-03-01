import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const values = [
  {
    id: "exclusivity",
    title: "Exclusivity",
    label: "A Private Sanctuary",
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1400",
    desc: "A sanctuary designed for the discerning few, ensuring peace and professional focus."
  },
  {
    id: "connectivity",
    title: "Connectivity",
    label: "High-Speed Infrastructure",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400",
    desc: "Meeting a global network of digital nomads with enterprise-grade professional tools."
  },
  {
    id: "culture",
    title: "Local Culture",
    label: "Limbe Heritage",
    image: "https://images.unsplash.com/photo-1523474253046-2cd2c78b681e?auto=format&fit=crop&q=80&w=1400",
    desc: "Celebrating local crafts and Atlantic heritage through curated partnerships."
  },
  {
    id: "luxury",
    title: "Timeless Luxury",
    label: "Enduring Elegance",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400",
    desc: "An aesthetic of comfort that transcends trends, rooted in architectural harmony."
  },
  {
    id: "organic",
    title: "Organic Produce",
    label: "Volcanic Soil",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1400",
    desc: "Fresh nourishment sourced directly from the fertile volcanic farms of the region."
  }
];

export default function ValuesSection() {
  const [hoveredId, setHoveredId] = useState(values[0].id);

  const activeValue = values.find(v => v.id === hoveredId);

  return (
    <section className="relative w-full min-h-[700px] flex items-center overflow-hidden bg-volcanic">
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={hoveredId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={activeValue.image} 
            className="w-full h-full object-cover grayscale-[40%]" 
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-volcanic via-volcanic/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: The List (Interactive) */}
        <div className="space-y-4">
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-6 block">
            Our Values
          </span>
          
          <div className="flex flex-col">
            {values.map((v) => (
              <button
                key={v.id}
                onMouseEnter={() => setHoveredId(v.id)}
                className="group py-4 text-left relative"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${hoveredId === v.id ? 'text-lush' : 'text-white/20'}`}>
                    0{values.indexOf(v) + 1}
                  </span>
                  <h3 className={`text-3xl md:text-4xl font-serif transition-all duration-500 ${hoveredId === v.id ? 'text-white translate-x-4' : 'text-white/30 group-hover:text-white/60'}`}>
                    {v.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: The Detail Card */}
        <div className="hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] max-w-md"
            >
              <p className="text-lush font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                {activeValue.label}
              </p>
              <p className="text-white/80 text-lg leading-relaxed font-light">
                {activeValue.desc}
              </p>
              <div className="mt-8 h-px w-12 bg-lush" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}