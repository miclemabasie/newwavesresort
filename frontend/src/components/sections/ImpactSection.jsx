import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import image1 from "../../assets/general/limbehouse.jpg";

export default function ImpactSection() {
  const { t } = useTranslation();

  return (
    <section className="container py-24">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-lush"></span>
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-xs">{t('impact.section_tag')}</span>
          </div>
          <h2 className="text-5xl font-serif mb-8 leading-tight text-volcanic">{t('impact.title')}</h2>
          <p className="text-lg text-volcanic/80 mb-6 leading-relaxed">
            {t('impact.description')}
          </p>
          <ul className="space-y-4 mb-10">
            {[
              'impact.list.education',
              'impact.list.employment',
              'impact.list.sustainability',
              'impact.list.digital'
            ].map((key) => (
              <li key={key} className="flex items-center gap-3 text-sm font-medium text-volcanic/70">
                <span className="w-1.5 h-1.5 bg-lush rounded-full"></span> {t(key)}
              </li>
            ))}
          </ul>
          <button
            className="btn-outline"
            onClick={() => window.open('https://fisiyfoundation.org/', '_blank')}
          >
            {t('impact.button')}
          </button>
        </motion.div>
        
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={image1} 
            alt="Ngeme Vision" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}