import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Established Excellence",
    title: "New Waves Resort",
    subtitle: "A digital nomad sanctuary for the global citizen where luxury meets a legacy of social impact.",
  },
  {
    image: "https://images.unsplash.com/photo-1506929197414-43407987248b?auto=format&fit=crop&q=80&w=1920", // Coastal aesthetic
    upperTitle: "The Volcanic Oasis",
    title: "Paradise away from Home", // New Title requested
    subtitle: "Where dreams are made and relived. Discover our Unique Stone Beach for adventurers.", // New Sub-text requested
  },
  {
    image: "https://images.apache.org/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "The Intellectual Hub",
    title: "Digital Nomad Sanctuary", // Added "Digital" as requested
    subtitle: "Experience the unique synergy of volcanic coastlines and professional infrastructure.",
  },
  {
    image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1920",
    upperTitle: "Culinary Heritage",
    title: "Atlantic Gastronomy",
    subtitle: "Freshness redefined. Savor the spirit of Limbe through our curated dining experience.",
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
    /* Changed h-screen to h-[100vh] and ensured it starts from the very top of the page */
    <section className="relative h-[100vh] w-full overflow-hidden bg-volcanic">
      
      {/* Background Layer */}
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
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
              src={slides[current].image} 
              className="w-full h-full object-cover" 
              alt="Resort View" 
            />
            {/* Added a darker top gradient to make the White Transparent Nav readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-ocean/10 mix-blend-multiply opacity-50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer - Centered vertically within the full viewport */}
      <div className="relative z-20 h-full container mx-auto flex flex-col items-center justify-center text-center px-6">
        
        <div className="max-w-5xl mt-[-5vh]"> {/* Slight upward offset to balance the visual weight */}
          <motion.span
            key={`upper-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lush font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6 block"
          >
            {slides[current].upperTitle}
          </motion.span>

          <motion.h1 
            key={`title-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            /* Adjusted size for better desktop "View-In-One" fitting */
            className="text-[clamp(2.5rem,7vw,8.5rem)] font-serif leading-[1.1] mb-6 text-white drop-shadow-2xl"
          >
            {slides[current].title}
          </motion.h1>
          
          <motion.p 
            key={`sub-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-light italic text-white/90 mb-10 leading-relaxed px-4"
          >
            {slides[current].subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="w-64 sm:w-auto bg-white text-ocean px-10 py-4 rounded-full font-bold transition-all uppercase text-[11px] tracking-[0.2em] hover:bg-lush hover:text-white shadow-2xl">
              Make a Reservation
            </button>
            <button className="w-64 sm:w-auto border border-white/30 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold transition-all uppercase text-[11px] tracking-[0.2em] hover:bg-white/10">
              The Foundation Story
            </button>
          </div>
        </div>
      </div>

      {/* Manual Switch Controls - Thinner & No Indicators */}
      <div className="absolute inset-x-0 bottom-16 md:bottom-24 z-40 flex justify-between items-center container mx-auto pointer-events-none px-10">
        <button 
          onClick={prevSlide}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-white/60 hover:text-white transition-all backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-1">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button 
          onClick={() => { nextSlide(); setIsAuto(false); }}
          className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:border-white/60 hover:text-white transition-all backdrop-blur-sm"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-1">
            <path d="M9 18l6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Reduced Wave Height to keep buttons visible */}
      <div className="absolute bottom-0 left-0 w-full z-40 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[30px] md:h-[50px] fill-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,91.54,118.14,81.22,176.5,69.57,235.43,57.81,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}