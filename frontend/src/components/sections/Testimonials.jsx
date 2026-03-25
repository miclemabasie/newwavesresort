import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = t('testimonials.testimonials', { returnObjects: true });
  const [index, setIndex] = useState(0);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50 && index < testimonials.length - 1) {
      setIndex(index + 1);
    } else if (info.offset.x > 50 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="py-32 bg-sand/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
        <span className="text-[30rem] font-serif leading-none">“</span>
      </div>

      <div className="container relative z-10 px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lush font-bold tracking-[0.4em] uppercase text-[10px]"
          >
            {t('testimonials.section_tag')}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 text-volcanic italic">
            {t('testimonials.title')}
          </h2>
          <div className="h-1 w-12 bg-lush mx-auto mt-8" />
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        <div className="lg:hidden relative">
          <div className="overflow-visible">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${index * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex cursor-grab active:cursor-grabbing"
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-2">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  index === i ? "w-8 bg-lush" : "w-2 bg-ocean/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-volcanic/40 font-semibold">
            Member of the Global Sustainable Tourism Council
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <motion.div 
      className="bg-white p-10 rounded-2xl shadow-[0_10px_40px_rgba(26,95,122,0.04)] border border-ocean/5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex gap-1 mb-6 text-[10px] text-lush">
          {Array(5).fill("✦").map((star, idx) => <span key={idx}>{star}</span>)}
        </div>
        
        <p className="text-volcanic/80 leading-relaxed italic mb-8 font-light text-lg">
          "{t.quote}"
        </p>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-sand">
        <div className="h-10 w-10 rounded-full bg-sand flex items-center justify-center text-ocean font-serif font-bold text-xs shadow-inner shrink-0">
          {t.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="min-w-0">
          <h4 className="text-ocean font-bold text-xs uppercase tracking-tighter leading-none mb-1 truncate">
            {t.author}
          </h4>
          <p className="text-[9px] text-volcanic/50 uppercase tracking-widest font-medium truncate">
            {t.role} <span className="mx-1 text-lush">•</span> {t.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}