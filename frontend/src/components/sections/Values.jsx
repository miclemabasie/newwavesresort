import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'react-i18next';

const valueKeys = [
  { id: "exclusivity", titleKey: "values.exclusivity.title", labelKey: "values.exclusivity.label", descKey: "values.exclusivity.desc", image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1400" },
  { id: "connectivity", titleKey: "values.connectivity.title", labelKey: "values.connectivity.label", descKey: "values.connectivity.desc", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400" },
  { id: "culture", titleKey: "values.culture.title", labelKey: "values.culture.label", descKey: "values.culture.desc", image: "https://images.unsplash.com/photo-1523474253046-2cd2c78b681e?auto=format&fit=crop&q=80&w=1400" },
  { id: "luxury", titleKey: "values.luxury.title", labelKey: "values.luxury.label", descKey: "values.luxury.desc", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400" },
  { id: "organic", titleKey: "values.organic.title", labelKey: "values.organic.label", descKey: "values.organic.desc", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1400" },
];

export default function ValuesSection() {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(valueKeys[0].id);
  const activeValue = valueKeys.find(v => v.id === activeId);

  return (
    <section className="relative w-full min-h-[800px] flex items-center py-20 overflow-hidden bg-volcanic">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={activeValue.image} 
            className="w-full h-full object-cover grayscale-[20%]" 
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-volcanic via-volcanic/80 lg:via-volcanic/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="w-full relative z-10 mx-auto px-6 lg:px-20 max-w-[1800px] grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-4">
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            {t('values.section_tag')}
          </span>
          
          <div className="flex flex-col">
            {valueKeys.map((v, index) => (
              <button
                key={v.id}
                onClick={() => setActiveId(v.id)}
                onMouseEnter={() => setActiveId(v.id)}
                className="group py-5 text-left relative outline-none"
              >
                <div className="flex items-center gap-6">
                  <span className={`text-[11px] font-black tracking-widest transition-colors duration-300 ${activeId === v.id ? 'text-lush' : 'text-white/20'}`}>
                    0{index + 1}
                  </span>
                  <h3 className={`text-3xl md:text-5xl lg:text-7xl font-serif transition-all duration-500 ${activeId === v.id ? 'text-white translate-x-4 md:translate-x-8' : 'text-white/20 group-hover:text-white/40'}`}>
                    {t(v.titleKey)}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[2rem] md:rounded-[3.5rem] w-full max-w-xl mx-auto lg:ml-auto"
            >
              <span className="text-lush font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                {t(activeValue.labelKey)}
              </span>
              <p className="text-white text-xl md:text-2xl leading-relaxed font-light">
                {t(activeValue.descKey)}
              </p>
              
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px w-12 bg-lush" />
                <span className="text-white/30 text-[9px] uppercase tracking-widest font-black">
                  Refining the Sanctuary
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}