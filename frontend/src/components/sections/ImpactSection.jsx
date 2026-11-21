import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import image1 from '../../assets/general/image2.jpeg';

export default function ImpactSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 md:py-28 bg-white border-y border-sand">
      <div className="container mx-auto px-6 lg:max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-lush" />
              <span className="text-lush font-black tracking-[0.35em] uppercase text-[10px]">
                {t('impact.section_tag')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-midnight">
              {t('impact.title')}
            </h2>
            <p className="text-base md:text-lg text-volcanic/75 mb-6 leading-relaxed">
              {t('impact.description')}
            </p>
            <ul className="space-y-3.5 mb-10">
              {[
                'impact.list.education',
                'impact.list.employment',
                'impact.list.sustainability',
                'impact.list.digital',
              ].map((key) => (
                <li
                  key={key}
                  className="flex items-center gap-3 text-sm font-medium text-volcanic/80"
                >
                  <span className="w-2 h-2 bg-lush rounded-full shrink-0" />
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://fisiyfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0e1a28] hover:bg-ocean text-white hover:text-white text-xs font-bold uppercase tracking-[0.2em] shadow-md transition-all"
            >
              <span>{t('impact.button')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-[var(--shadow-luxury)] border border-sand">
              <img
                src={image1}
                alt="Ngeme Vision"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-transparent to-transparent" />
            </div>

            {/* Overlapping Impact Stat Callout */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-sand max-w-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-serif font-bold text-lush">
                  {t('our_story.impact_stats.title')}
                </span>
                <span className="text-[11px] font-black uppercase tracking-wider text-midnight">
                  {t('our_story.impact_stats.label')}
                </span>
              </div>
              <p className="text-xs text-volcanic/65 mt-1 mb-0">
                {t('our_story.impact_stats.detail')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
