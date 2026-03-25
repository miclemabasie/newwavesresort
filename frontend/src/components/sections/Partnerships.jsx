import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

export default function Partnerships() {
  const { t } = useTranslation();
  const partners = t('partnerships.partners', { returnObjects: true });

  return (
    <section className="py-24 bg-white border-y border-sand">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          
          <div className="lg:col-span-1">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">{t('partnerships.section_tag')}</span>
            <h2 className="text-4xl font-serif mt-4 text-volcanic leading-tight">
              {t('partnerships.title')}
            </h2>
            <p className="text-volcanic/70 mt-6 leading-relaxed text-sm">
              {t('partnerships.description')}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-sand flex items-center justify-center text-xl">🤝</div>
              <span className="text-xs font-bold uppercase tracking-widest text-volcanic/40">
                Building a reliable community
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {partners.map((partner, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, backgroundColor: "var(--color-sand)" }}
                  className="p-8 border border-sand rounded-2xl flex flex-col items-center text-center transition-colors duration-300"
                >
                  <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">
                    {partner.logo}
                  </div>
                  <h4 className="text-sm font-bold text-volcanic uppercase tracking-tighter">
                    {partner.name}
                  </h4>
                  <p className="text-[10px] text-lush font-medium mt-1 uppercase tracking-widest">
                    {partner.role}
                  </p>
                </motion.div>
              ))}
              
              <motion.div
                whileHover={{ scale: 0.98 }}
                className="p-8 bg-lush rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer"
              >
                <p className="text-white font-serif italic text-lg mb-2">{t('partnerships.cta')}</p>
                <span className="text-[9px] text-sand/60 uppercase tracking-[0.2em]">{t('partnerships.cta_sub')}</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}