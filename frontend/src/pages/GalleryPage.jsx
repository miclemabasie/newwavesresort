import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import SmartImage from "../components/ui/SmartImage";
import { galleryData } from "../data/galleryData";
import { motion } from "framer-motion";

export default function GalleryPage() {
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
          {galleryData.map((item) => (
            <SmartImage key={item.id} item={item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}