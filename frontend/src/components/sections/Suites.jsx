import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRoomTypes } from '../../hooks/useRoomTypes.js';
import { useCurrency } from '../../context/currencyHelpers.js';

export default function Suites() {
  const { t, i18n } = useTranslation();
  const { roomTypes } = useRoomTypes();
  const { formatPrice } = useCurrency();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const featuredSuites = roomTypes.filter((r) => r.is_featured).slice(0, 3);
  const displaySuites = featuredSuites.length > 0 ? featuredSuites : roomTypes.slice(0, 3);

  return (
    <section className="py-24 bg-sand">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-lush font-bold tracking-[0.3em] uppercase text-[10px]">
              {t('suites.section_tag')}
            </span>
            <h2 className="text-4xl md:text-4xl font-serif mt-4 italic text-volcanic">
              {t('suites.title')}
            </h2>
          </div>
          <p className="text-volcanic/60 max-w-xs text-sm">{t('suites.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displaySuites.map((suite) => {
            const name = lang === 'fr' ? suite.name_fr : suite.name_en;
            return (
              <Link key={suite.id} to={`/rooms/${suite.slug}`} className="group block">
                <motion.div whileHover={{ y: -10 }}>
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 bg-volcanic/5 shadow-resort">
                    <img
                      src={suite.cover_image_url || '/assets/general/image14.jpeg'}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xl font-serif text-volcanic group-hover:text-lush transition-colors">
                    {name}
                  </h3>
                  <div className="flex justify-between items-center mt-2 pb-4 border-b border-ocean/10 text-xs tracking-widest uppercase opacity-70">
                    <span>{suite.size_sqm ? `${suite.size_sqm} sqm` : `${suite.bedrooms} BR`}</span>
                    <span>
                      {formatPrice(suite.base_price)} {t('accommodations.per_night')}
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
