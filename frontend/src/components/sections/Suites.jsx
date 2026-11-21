import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BedDouble, ArrowRight, MessageCircle } from 'lucide-react';
import { useRoomTypes } from '../../hooks/useRoomTypes.js';
import { useCurrency } from '../../context/currencyHelpers.js';
import BookingModal from '../booking/BookingModal.jsx';

export default function Suites() {
  const { t, i18n } = useTranslation();
  const { roomTypes, loading } = useRoomTypes();
  const { formatPrice } = useCurrency();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [selectedSuite, setSelectedSuite] = useState(null);

  const featuredSuites = roomTypes.filter((r) => r.is_featured).slice(0, 3);
  const displaySuites = featuredSuites.length > 0 ? featuredSuites : roomTypes.slice(0, 3);

  return (
    <section className="py-24 md:py-28 bg-sand">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px]">
              {t('suites.section_tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mt-3 italic text-midnight mb-3">
              {t('suites.title')}
            </h2>
            <p className="text-volcanic/70 max-w-xl text-sm md:text-base mb-0">
              {t('suites.subtitle')}
            </p>
          </div>

          <Link
            to="/rooms"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-volcanic/20 hover:border-[#0e1a28] hover:bg-[#0e1a28] text-[#0e1a28] hover:text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all shrink-0"
          >
            <span>{t('suites.view_all')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading && displaySuites.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl h-[420px] border border-sand animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displaySuites.map((suite) => {
              const name = lang === 'fr' ? suite.name_fr : suite.name_en;
              const desc =
                lang === 'fr'
                  ? suite.short_description_fr || suite.description_fr
                  : suite.short_description_en || suite.description_en;

              return (
                <motion.article
                  key={suite.id}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-sand shadow-[var(--shadow-resort)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500 flex flex-col"
                >
                  <Link to={`/rooms/${suite.slug}`} className="aspect-[4/3] overflow-hidden relative block">
                    <img
                      src={suite.cover_image_url || '/assets/general/image14.jpeg'}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/45 via-transparent to-transparent" />

                    <span className="absolute top-3.5 left-3.5 bg-[#0e1a28]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {suite.suite_category}
                    </span>

                    <div className="absolute bottom-3.5 right-3.5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg">
                      <span className="text-[#0e1a28] font-serif font-bold text-base">
                        {formatPrice(suite.base_price)}
                      </span>
                      <span className="text-[10px] text-volcanic/60 uppercase tracking-wider ml-1">
                        {t('accommodations.per_night')}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-[11px] text-lush font-bold uppercase tracking-wider mb-2">
                      <span className="inline-flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5" />
                        {suite.bedrooms}{' '}
                        {suite.bedrooms === 1 ? t('accommodations.bedroom') : t('accommodations.bedrooms')}
                      </span>
                      {suite.size_sqm && <span>• {suite.size_sqm} m²</span>}
                    </div>

                    <Link to={`/rooms/${suite.slug}`}>
                      <h3 className="text-2xl font-serif text-midnight group-hover:text-ocean transition-colors mb-2">
                        {name}
                      </h3>
                    </Link>

                    <p className="text-xs md:text-sm text-volcanic/65 leading-relaxed line-clamp-2 mb-6">
                      {desc}
                    </p>

                    <div className="mt-auto pt-4 border-t border-sand flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedSuite(suite)}
                        className="flex-1 bg-[#0e1a28] hover:bg-lush text-white hover:text-[#0e1a28] font-bold py-3 px-4 rounded-xl text-[11px] uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{t('suites.book_now')}</span>
                      </button>

                      <Link
                        to={`/rooms/${suite.slug}`}
                        className="px-4 py-3 rounded-xl bg-sand/60 border border-ocean/20 hover:bg-ocean text-ocean hover:text-white text-xs font-bold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{t('accommodations.view_suite')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <BookingModal
        room={selectedSuite}
        isOpen={Boolean(selectedSuite)}
        onClose={() => setSelectedSuite(null)}
      />
    </section>
  );
}
