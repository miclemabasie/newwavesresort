import { motion, AnimatePresence } from "framer-motion";

export default function Lightbox({ images, index, setIndex, close }) {
  if (index === null) return null;

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-volcanic/95 backdrop-blur-xl flex items-center justify-center touch-none"
    >
      <button onClick={close} className="absolute top-10 right-10 z-[110] text-white hover:text-lush p-4">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      <div className="absolute inset-x-10 flex justify-between items-center pointer-events-none hidden md:flex">
        <button onClick={prev} className="pointer-events-auto p-4 text-white/50 hover:text-white"><svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-1"><path d="M15 18l-6-6 6-6" /></svg></button>
        <button onClick={next} className="pointer-events-auto p-4 text-white/50 hover:text-white"><svg viewBox="0 0 24 24" className="w-10 h-10 fill-none stroke-current stroke-1"><path d="M9 18l6-6-6-6" /></svg></button>
      </div>

      <div className="relative w-full max-w-5xl h-[70vh] px-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            drag="x" dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset }) => {
              if (offset.x > 100) prev();
              else if (offset.x < -100) next();
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing flex flex-col items-center"
          >
            <img src={images[index].image} alt={images[index].title} className="w-full h-full object-contain" />
            <div className="mt-8 text-center text-white">
              <h3 className="text-2xl font-serif">{images[index].title}</h3>
              <p className="text-lush uppercase tracking-[0.3em] text-[10px] mt-2">{images[index].category}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}