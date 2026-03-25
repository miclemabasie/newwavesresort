import React from 'react';
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import { Mic2, GraduationCap } from "lucide-react";

function OceanSide() {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-35 text-center bg-volcanic relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

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
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">{t('ocean_side.badge_learning')}</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-2">
              <Mic2 size={16} className="text-lush" />
              <span className="text-white font-bold uppercase tracking-[0.2em] text-[11px]">{t('ocean_side.badge_podcast')}</span>
            </div>
          </div>

          <p className="text-xl md:text-3xl text-white/90 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
            {t('ocean_side.subtitle')}
          </p>

          <div className="flex justify-center">
            <button className="bg-white text-volcanic px-14 py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] hover:bg-lush hover:text-white transition-all duration-500 shadow-2xl">
              {t('ocean_side.button')}
            </button>
          </div>
          
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lush/20 to-transparent" />
    </section>
  )
}

export default OceanSide;