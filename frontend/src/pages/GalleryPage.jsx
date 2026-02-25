import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import SmartImage from "../components/ui/SmartImage";
import { galleryData } from "../data/galleryData";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setSelectedIndex(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-sand min-h-screen">
      <Navbar />
      
      <header className="container py-24 text-center">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-lush font-bold tracking-[0.4em] uppercase text-xs"
        >
          Visual Legacy
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-serif mt-6 text-ocean"
        >
          The Ngeme Perspective
        </motion.h1>
      </header>

      <main className="container pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((item, index) => (
            <div key={item.id} onClick={() => setSelectedIndex(index)}>
              <SmartImage item={item} />
            </div>
          ))}
        </div>
      </main>

      {/* The Smart Lightbox Overlay */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox 
            images={galleryData} 
            index={selectedIndex} 
            setIndex={setSelectedIndex} 
            close={() => setSelectedIndex(null)} 
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

// Internal Lightbox Component for clean engineering
function Lightbox({ images, index, setIndex, close }) {
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-volcanic/95 backdrop-blur-xl flex items-center justify-center touch-none"
    >
      {/* Close Button */}
      <button 
        onClick={close}
        className="absolute top-10 right-10 z-[110] text-white hover:text-lush transition-colors p-4"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Controls (Desktop) */}
      <div className="absolute inset-x-10 flex justify-between items-center pointer-events-none">
        <button onClick={prev} className="pointer-events-auto p-4 text-white/50 hover:text-white transition-all">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-1"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button onClick={next} className="pointer-events-auto p-4 text-white/50 hover:text-white transition-all">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-1"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>

      {/* Swipeable Image Container */}
      <div className="relative w-full max-w-5xl h-[70vh] px-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.x > 100) prev();
              else if (offset.x < -100) next();
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing flex flex-col items-center"
          >
            <img 
              src={images[index].image} 
              alt={images[index].title}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
            
            {/* Image Meta Data */}
            <div className="mt-8 text-center">
              <h3 className="text-white text-2xl font-serif">{images[index].title}</h3>
              <p className="text-lush uppercase tracking-[0.3em] text-[10px] mt-2">
                {images[index].category} — {index + 1} / {images.length}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}