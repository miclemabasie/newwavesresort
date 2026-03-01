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
    <section className="container mx-auto py-24 lg:max-w-[1440px]">
      {/* Header Logic: High Contrast Volcanic */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 px-4 lg:px-0">
        <div className="max-w-xl">
          <span className="text-lush font-extrabold tracking-[0.5em] uppercase text-[10px] mb-4 block">
            The Perspective
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-ocean italic leading-tight">
            A Glimpse into <br /> Serenity
          </h2>
        </div>
        
        <Link 
          to="/gallery" 
          className="group flex items-center gap-3 text-volcanic font-black uppercase tracking-[0.3em] text-[10px] pb-2 border-b-2 border-lush hover:text-lush transition-all duration-300"
        >
          View Full Gallery
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>

      {/* 4-COLUMN GRID: Naturally reduces image size */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {previewImages.map((item, index) => (
          <motion.div 
            key={item.id} 
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedIndex(index)}
            className="cursor-pointer relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-volcanic/5 border border-volcanic/5 group shadow-sm"
          >
            {/* Direct Image Render for better control over "Edge-to-Edge" fill */}
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            
            {/* Elegant Hover Overlay */}
            <div className="absolute inset-0 bg-volcanic/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
              <span className="text-lush font-black uppercase tracking-[0.3em] text-[8px] mb-1">
                {item.category}
              </span>
              <p className="text-white font-serif text-sm italic translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
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