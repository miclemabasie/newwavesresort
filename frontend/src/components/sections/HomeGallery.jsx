import React from 'react'
import SmartImage from "../ui/SmartImage";
import { galleryData } from "../../data/galleryData";
import { Link } from 'react-router-dom';

function HomeGallery() {
  return (

    // Inside Home function, before <Footer />
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

      {/* Displaying first 6 images */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryData.slice(0, 6).map((item) => (
          <SmartImage key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export default HomeGallery