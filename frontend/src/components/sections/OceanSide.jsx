import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';

function OceanSide() {
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-32 text-center bg-midnight relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(242,159,71,0.14),transparent_60%)]" />

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-8 block">
            {t('ocean_side.section_tag')}
          </span>

          <h2 className="font-serif italic text-white mb-6 text-5xl md:text-5xl tracking-tight leading-tight">
            {t('ocean_side.title')}
          </h2>

          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">
                {t('ocean_side.badge_learning')}
              </span>
            </div>
          </div>

          <p className="text-xl md:text-3xl text-white/90 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
            {t('ocean_side.subtitle')}
          </p>

          <div className="flex justify-center">
            <Link
              to="/services/intellectual-talks"
              className="bg-lush text-[#0e1a28] hover:text-[#0e1a28] px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-2xl inline-block"
            >
              {t('ocean_side.button')}
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lush/20 to-transparent" />
    </section>
  );
}

export default OceanSide;
