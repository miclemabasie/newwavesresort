import { motion } from "framer-motion";
import { Link } from "react-router";
import logo from "../assets/general/logo.png";

export default function ComingSoon() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-volcanic flex items-center justify-center">
      
      {/* Background Layer - High-end Ocean Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1920" 
          className="w-full h-full object-cover opacity-40" 
          alt="Ocean Texture" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-ocean/20 to-volcanic" />
      </div>

      {/* Decorative Branding Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-white/[0.02] pointer-events-none select-none whitespace-nowrap z-10">
        EVOLUTION
      </div>

      {/* Content Layer */}
      <div className="relative z-20 text-center px-6 max-w-3xl">
        
        {/* The Refined Logo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 flex justify-center"
        >
          <img 
            src={logo}
            alt="New Waves Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl" 
          />
        </motion.div>

        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lush font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 block"
        >
          A New Chapter in Excellence
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
        >
          Coming Soon
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 text-base md:text-lg font-light italic mb-10 max-w-xl mx-auto"
        >
          We are currently refining this experience to meet the standards of the global nomad. Stay connected as we redefine the Atlantic coast.
        </motion.p>

        {/* Action / Navigation back */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/" className="w-full sm:w-auto bg-white text-ocean px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-lush hover:text-white transition-all shadow-2xl">
            Return Home
          </Link>
          <button className="w-full sm:w-auto border border-white/20 text-white/70 backdrop-blur-md px-10 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
            Join the Waitlist
          </button>
        </motion.div>
      </div>

      {/* Bottom Subtle Waves - matching the Hero */}
      <div className="absolute bottom-0 left-0 w-full z-40 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] fill-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,91.54,118.14,81.22,176.5,69.57,235.43,57.81,321.39,56.44,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}