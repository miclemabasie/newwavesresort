import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Our Story", to: "/story" },
    { name: "Experiences", to: "/experiences" },
    { name: "Dining", to: "/dining" },
    { name: "Accommodations", to: "/rooms" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean/5">
      <div className="container flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-[70]">
          <div className="w-9 h-9 border-2 border-ocean flex items-center justify-center rounded-sm">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-ocean fill-none stroke-2 text-ocean">
              <path d="M2 12c.5.5 1.5.5 2 0s1.5-.5 2 0 1.5.5 2 0 1.5-.5 2 0 1.5.5 2 0 1.5-.5 2 0 1.5.5 2 0 1.5-.5 2 0" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tighter text-ocean uppercase hidden sm:inline-block">
            The NewWaveResort
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.to} className="nav-link">
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-4">
          <Link to="/book" className="btn-primary !py-2 !px-5 text-xs md:text-sm">
            Plan Your Stay
          </Link>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden z-[70] p-2 text-ocean focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center transition-colors"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current block transition-colors"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center transition-colors"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-volcanic/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Sidebar Container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "circOut" }}
              /* inset-y-0 and h-screen ensures the background covers the full height */
              className="fixed inset-y-0 right-0 h-screen w-[85%] max-w-sm bg-sand z-[65] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-10 pt-32 pb-10">
                <div className="flex flex-col gap-8 text-left">
                  {navItems.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      key={item.name}
                    >
                      <NavLink 
                        to={item.to} 
                        className={({ isActive }) => 
                          `text-3xl font-serif block transition-colors ${
                            isActive ? "text-ocean" : "text-volcanic hover:text-ocean"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 pt-10 border-t border-ocean/10">
                  <h4 className="text-ocean font-bold uppercase tracking-widest text-xs mb-4">Location</h4>
                  <p className="text-volcanic/70 text-sm leading-relaxed mb-8">
                    Down Beach, Limbe<br />
                    South West Region, Cameroon
                  </p>
                  
                  <div className="flex gap-4">
                    {['Instagram', 'Facebook', 'TripAdvisor'].map((social) => (
                      <span key={social} className="text-[10px] uppercase tracking-tighter border border-ocean/20 px-2 py-1 rounded text-ocean/60">
                        {social}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}