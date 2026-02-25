import { motion } from "framer-motion";

export default function SmartImage({ item }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative group overflow-hidden rounded-xl bg-volcanic aspect-square cursor-pointer"
    >
      {/* The Image */}
      <img 
        src={item.image} 
        alt={item.title} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
      />

      {/* Interactive Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <span className="text-[10px] uppercase tracking-widest text-lush font-bold mb-2">
          {item.category}
        </span>
        <h4 className="text-white text-xl font-serif">{item.title}</h4>
        <p className="text-white/70 text-xs mt-2 line-clamp-2">
          {item.description}
        </p>
        
        {/* Decorative corner bracket */}
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/30 group-hover:border-lush transition-colors" />
      </div>
    </motion.div>
  );
}