// app/components/ui/ServiceCard.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function ServiceCard({ title, description, icon, to }) {
  return (
    <Link to={to} className="block group">
      <motion.div 
        whileHover={{ y: -10 }}
        className="card h-full flex flex-col items-start hover:border-lush/30 transition-all duration-500"
      >
        <div className="text-4xl mb-6 p-4 bg-sand rounded-xl group-hover:bg-ocean group-hover:text-white transition-colors duration-500">
          {icon}
        </div>
        <h3 className="text-xl mb-3 group-hover:text-ocean">{title}</h3>
        <p className="text-sm text-volcanic/70 leading-relaxed mb-6 flex-grow">
          {description}
        </p>
        <span className="text-xs font-bold uppercase tracking-widest text-lush flex items-center gap-2">
          Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </motion.div>
    </Link>
  );
}