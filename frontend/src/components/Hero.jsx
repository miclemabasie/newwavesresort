import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Established Excellence",
    title: "New Waves Resort",
    subtitle: "A sanctuary for the global nomad where luxury meets a legacy of social impact.",
  },
  {
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "The Intellectual Hub",
    title: "Intelligence in Paradise",
    subtitle: "Experience the unique synergy of volcanic coastlines and world-class professional infrastructure.",
  },
  {
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Culinary Heritage",
    title: "Atlantic Gastronomy",
    subtitle: "Freshness redefined. Savor the spirit of Limbe through our curated ocean-to-table dining.",
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAuto(false); 
  };

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isAuto, nextSlide]);

  return (
    <section className="relative h-screen min-h-[750px] overflow-hidden bg-volcanic">
      
      {/* Background Layer with Deeper Ocean Overlays */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "linear" }}
              src={slides[current].image} 
              className="w-full h-full object-cover" 
              alt="Ngeme Resort" 
            />
            {/* Dark Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-ocean/40 to-black/80" />
            {/* Added a subtle blue tint layer */}
            <div className="absolute inset-0 bg-ocean/20 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 h-full container flex flex-col items-center justify-center text-center px-6 pt-12">
        
        <motion.span
          key={`upper-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lush font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:text-xs mb-6 drop-shadow-lg"
        >
          {slides[current].upperTitle}
        </motion.span>

        <motion.h1 
          key={`title-${current}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          /* Fluid Typography: min 2.5rem, max 10rem. Scalable but NEVER too small. */
          className="text-[clamp(2.5rem,10vw,10rem)] font-serif leading-[1.1] mb-8 text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
        >
          {slides[current].title}
        </motion.h1>
        
        <motion.p 
          key={`sub-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg md:text-2xl max-w-3xl font-light italic text-white/90 mb-12 drop-shadow-md px-4"
        >
          {slides[current].subtitle}
        </motion.p>

        {/* Action Buttons - Optimized for Mobile spacing */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-30 w-full sm:w-auto max-w-xs sm:max-w-none">
          <button className="bg-white text-ocean hover:bg-lush hover:text-white px-8 py-4 rounded-lg font-bold transition-all uppercase text-[12px] tracking-widest shadow-xl group">
            Make a Reservation
            <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
          <button className="border border-white/40 text-white backdrop-blur-md hover:bg-white/10 px-8 py-4 rounded-lg font-bold transition-all uppercase text-[12px] tracking-widest">
            The Foundation Story
          </button>
        </div>
      </div>

      {/* Manual Switch Controls - Moved further down on mobile to avoid button overlap */}
      <div className="absolute inset-x-0 bottom-24 md:bottom-32 z-40 flex justify-between items-center container pointer-events-none px-6 md:px-10">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-ocean transition-all group"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        
        {/* Indicators - hidden on very small screens to save space */}
        <div className="hidden sm:flex items-center gap-4">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => { setCurrent(i); setIsAuto(false); }}
              className={`h-1 transition-all duration-700 pointer-events-auto ${current === i ? "w-16 bg-lush" : "w-6 bg-white/30"}`} 
            />
          ))}
        </div>

        <button 
          onClick={() => { nextSlide(); setIsAuto(false); }}
          className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-md hover:bg-white hover:text-ocean transition-all group"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
            <path d="M9 18l6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Trust Badges - Hidden on mobile, visible on LG+ */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-10">
        {['5-Star Excellence', 'Starlink Certified', 'Fisiy Foundation Project'].map((badge, i) => (
          <div key={i} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold text-white/60">
            <span className="text-lush">✦</span> {badge}
          </div>
        ))}
      </div>

      {/* Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full z-40 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] fill-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,91.54,118.14,81.22,176.5,69.57,235.43,57.81,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}