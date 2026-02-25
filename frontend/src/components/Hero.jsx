import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1920",
    title: "The NewWavesResort",
    subtitle: "Where the Ocean Whispers Serenity, and Luxury Meets the Horizon in Tropical Limbe",
  },
  {
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1920",
    title: "Limbe’s Premier Escape",
    subtitle: "Experience the unique beauty of volcanic sands and Atlantic breezes.",
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-volcanic">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* Dark overlay for text clarity */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={slides[current].image} 
            className="w-full h-full object-cover" 
            alt="Resort" 
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={`title-${current}`}
          className="text-5xl md:text-8xl font-serif text-white mb-6 drop-shadow-md"
        >
          {slides[current].title}
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={`sub-${current}`}
          className="text-lg md:text-2xl max-w-3xl font-light italic opacity-90 mb-10"
        >
          {slides[current].subtitle}
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary !bg-blue-600 border-none shadow-xl">
            Book Your Escape
          </button>
          <button className="btn-outline border-white text-white hover:bg-white hover:text-ocean backdrop-blur-sm">
            Explore Experiences
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="absolute bottom-20 flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium opacity-90">
          <div className="flex items-center gap-2"><span>✦</span> 5-Star Rating</div>
          <div className="flex items-center gap-2"><span>🍃</span> Eco-Certified</div>
          <div className="flex items-center gap-2"><span>👤</span> Traveller's Choice</div>
          <div className="flex items-center gap-2"><span>☀️</span> Beachfront Bliss</div>
        </div>
      </div>

      {/* Wave Transition to the next section */}
      <div className="absolute bottom-0 left-0 w-full z-30 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[80px] fill-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,91.54,118.14,81.22,176.5,69.57,235.43,57.81,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}