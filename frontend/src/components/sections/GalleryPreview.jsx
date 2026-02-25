import React, { useState } from 'react';
import SmartImage from "../ui/SmartImage";
import Lightbox from "../ui/Lightbox";
import { galleryData } from "../../data/galleryData";
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function GalleryPreview() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const previewImages = galleryData.slice(0, 6);

  return (
    <section className="container py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">The Sun of the Sea</span>
          <h2 className="text-4xl font-serif mt-4 italic">A Glimpse into Serenity</h2>
        </div>
        <Link to="/gallery" className="btn-outline !py-2 !px-6 text-xs uppercase tracking-widest font-bold">
          View Full Gallery
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {previewImages.map((item, index) => (
          <div key={item.id} onClick={() => setSelectedIndex(index)}>
            <SmartImage item={item} />
          </div>
        ))}
      </div>

      {/* Shared Lightbox Logic */}
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