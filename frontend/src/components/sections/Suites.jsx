import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Suites() {
  const { t } = useTranslation();
  const suites = t('suites.suites', { returnObjects: true });

  return (
    <section className="py-24 bg-sand">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">{t('suites.section_tag')}</span>
            <h2 className="text-4xl md:text-4xl font-serif mt-4 italic text-volcanic">{t('suites.title')}</h2>
          </div>
          <p className="text-volcanic/60 max-w-xs text-sm">
            {t('suites.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {suites.map((suite, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-volcanic/5 shadow-resort">
                <img src={suite.img} alt={suite.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-serif text-volcanic">{suite.name}</h3>
              <div className="flex justify-between items-center mt-2 pb-4 border-b border-ocean/10 text-xs tracking-widest uppercase opacity-60">
                <span>{suite.size}</span>
                <span>From {suite.price} / Night</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}