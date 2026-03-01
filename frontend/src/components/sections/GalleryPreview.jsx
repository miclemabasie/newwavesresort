import React, { useState } from 'react';
import { galleryData } from "../../data/galleryData";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "../ui/Lightbox";
import { ArrowRight } from "lucide-react";

function GalleryPreview() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  // Slicing 8 images to perfectly fill two rows of 4 on desktop
  const previewImages = galleryData.slice(0, 8);

  return (
    <section className="bg-volcanic py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto lg:max-w-[1440px] px-6 lg:px-12">
        
        {/* Header Logic: High Contrast Pure White on Volcanic */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              The Perspective
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white italic leading-tight tracking-tight">
              A Glimpse into <br /> Serenity
            </h2>
          </div>
          
          <Link 
            to="/gallery" 
            className="group flex items-center gap-4 text-white font-black uppercase tracking-[0.4em] text-[10px] pb-3 border-b border-lush/50 hover:border-lush transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 text-lush group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        {/* 4-COLUMN GRID: Naturally reduces image size for a refined look */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {previewImages.map((item, index) => (
            <motion.div 
              key={item.id} 
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 group shadow-2xl"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Elegant Hover Overlay - High Visibility White Text */}
              <div className="absolute inset-0 bg-volcanic/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-lush font-black uppercase tracking-[0.4em] text-[9px] mb-2">
                  {item.category}
                </span>
                <p className="text-white font-serif text-lg italic translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox 
            images={previewImages} 
            index={selectedIndex} 
            setIndex={setSelectedIndex} 
            close={() => setSelectedIndex(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default GalleryPreview;