import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { galleryData } from "../data/galleryData";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...new Set(galleryData.map((item) => item.category))];
  }, []);

  const filteredImages = useMemo(() => {
    return activeCategory === "All"
      ? galleryData
      : galleryData.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setSelectedIndex(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-sand/30 min-h-screen">
      <Navbar />
      
      <header className="container mx-auto pt-20 pb-12 text-center lg:max-w-5xl">
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px]"
        >
          Visual Legacy
        </motion.span>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-7xl font-serif mt-6 text-volcanic tracking-tight"
        >
          Visualize the <span className="italic text-lush">Legacy.</span>
        </motion.h1>
      </header>

      {/* STICKY CATEGORY NAV */}
      <nav className="sticky top-[70px] z-40 bg-sand/80 backdrop-blur-md border-y border-volcanic/5 mb-12">
        <div className="container mx-auto overflow-x-auto no-scrollbar py-4 px-6 flex justify-start md:justify-center items-center gap-8 md:gap-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-300 ${
                activeCategory === cat ? "text-lush" : "text-volcanic/40 hover:text-volcanic"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-lush"
                />
              )}
            </button>
          ))}
        </div>
      </nav>

     {/* 4-COLUMN GRID SECTION */}
      <main className="container mx-auto pb-32 lg:max-w-[1440px]">
        <LayoutGroup>
          <motion.div 
            layout
            /* Changed to lg:grid-cols-4 for smaller, tighter desktop view */
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((item, index) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedIndex(index)}
                  className="cursor-pointer group relative"
                >
                  {/* Tighter aspect ratio for 4-column layout */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-volcanic/5 border border-volcanic/5 shadow-sm transition-transform duration-500 group-hover:scale-[1.03]">
                    
                    <div className="w-full h-full">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-volcanic/90 via-volcanic/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                       <span className="text-lush font-black uppercase tracking-[0.3em] text-[8px] mb-1">
                         {item.category}
                       </span>
                       <h3 className="text-white text-lg font-serif italic leading-tight">
                         {item.title}
                       </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </main>

      {/* Lightbox remains full-screen for detailed viewing */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox 
            images={filteredImages} 
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

function Lightbox({ images, index, setIndex, close }) {
  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-volcanic/98 backdrop-blur-2xl flex items-center justify-center touch-none"
    >
      <button 
        onClick={close}
        className="absolute top-6 right-6 z-[110] text-white/50 hover:text-lush transition-all p-3 bg-white/5 rounded-full"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <div className="hidden md:flex absolute inset-x-8 justify-between items-center pointer-events-none">
        <button onClick={prev} className="pointer-events-auto p-4 text-white/20 hover:text-white transition-all bg-white/10 rounded-full">
          <ChevronLeft size={32} strokeWidth={1} />
        </button>
        <button onClick={next} className="pointer-events-auto p-4 text-white/20 hover:text-white transition-all bg-white/10 rounded-full">
          <ChevronRight size={32} strokeWidth={1} />
        </button>
      </div>

      <div className="relative w-full max-w-5xl h-[80vh] px-4 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="w-full h-full flex flex-col items-center"
          >
            <img 
              src={images[index].image} 
              alt={images[index].title}
              className="w-full h-full object-contain"
            />
            <div className="mt-8 text-center">
              <h3 className="text-white text-2xl font-serif italic">{images[index].title}</h3>
              <p className="text-lush font-black uppercase tracking-[0.4em] text-[9px] mt-2">
                {images[index].category}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}