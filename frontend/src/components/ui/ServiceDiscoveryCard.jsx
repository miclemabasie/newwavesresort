import { motion } from "framer-motion";
import { Link } from "react-router";

export default function ServiceDiscoveryCard({ title, subtitle, image, to, category }) {
  return (
    <Link to={to} className="group relative block w-full h-[450px] overflow-hidden rounded-2xl bg-volcanic">
      {/* Background Image with Zoom Effect */}
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
      />

      {/* Sophisticated Gradient Overlay (Luxury Standard) */}
      <div className="absolute inset-0 bg-gradient-to-t from-volcanic via-volcanic/20 to-transparent opacity-90" />

      {/* Content Container */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Category Badge */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-lush"
        >
          {category}
        </motion.span>

        {/* Title */}
        <h3 className="text-2xl font-serif text-white mb-2 leading-tight">
          {title}
        </h3>

        {/* Description / Subtitle (Reveals on Hover) */}
        <div className="overflow-hidden">
          <p className="text-sm text-sand/80 leading-relaxed max-h-0 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 group-hover:mb-6">
            {subtitle}
          </p>
        </div>

        {/* The Action Line */}
        <div className="flex items-center gap-4 text-white">
          <div className="h-px w-8 bg-white/50 transition-all duration-500 group-hover:w-12 group-hover:bg-lush" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Discover Detail</span>
        </div>
      </div>

      {/* Top Right Detail (Optional Corner Accent) */}
      <div className="absolute top-6 right-6 h-10 w-10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </Link>
  );
}