import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import BookingModal from '../components/booking/BookingModal';
import { Check, Search, ArrowUpDown, Calendar, Users, BedDouble, ArrowRight } from 'lucide-react';
import { useRoomTypes } from '../hooks/useRoomTypes.js';
import { useCurrency } from '../context/currencyHelpers.js';
import { SUITE_CATEGORIES, AVAILABILITY_STATUSES, getOptionLabel } from '../lib/constants.js';
import { buildBreadcrumbSchema, buildRoomSchema } from '../lib/seoSchemas.js';

export default function Accommodations() {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [selectedSuite, setSelectedSuite] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);

  const { roomTypes, availabilityMap, loading, checkingAvailability } = useRoomTypes({
    checkIn,
    checkOut,
    adults,
    children: 0,
  });

  const hasValidRange = Boolean(checkIn && checkOut && checkOut > checkIn);

  const filteredSuites = useMemo(() => {
    let list = roomTypes.filter((suite) => {
      if (categoryFilter !== 'all' && suite.suite_category !== categoryFilter) {
        return false;
      }

      if (hasValidRange && availabilityMap[suite.id]) {
        if (availabilityMap[suite.id].available_units < 1) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const title = (lang === 'fr' ? suite.name_fr : suite.name_en || '').toLowerCase();
        const desc = (
          lang === 'fr'
            ? suite.description_fr || suite.short_description_fr
            : suite.description_en || suite.short_description_en || ''
        ).toLowerCase();
        if (!title.includes(q) && !desc.includes(q)) return false;
      }

      return true;
    });

    if (sortBy === 'low-high') {
      list = [...list].sort((a, b) => Number(a.base_price) - Number(b.base_price));
    } else if (sortBy === 'high-low') {
      list = [...list].sort((a, b) => Number(b.base_price) - Number(a.base_price));
    }

    return list;
  }, [roomTypes, categoryFilter, hasValidRange, availabilityMap, searchQuery, sortBy, lang]);

  const schemas = useMemo(() => {
    return [
      buildBreadcrumbSchema([
        { name: t('nav.home'), path: '/' },
        { name: t('nav.accommodations'), path: '/rooms' },
      ]),
      ...roomTypes.slice(0, 4).map((r) => buildRoomSchema(r, lang)),
    ];
  }, [roomTypes, lang, t]);

  return (
    <div className="bg-sand/30 min-h-screen">
      <SEO
        title={t('accommodations.title')}
        description={t('accommodations.subtitle')}
        path="/rooms"
        schemas={schemas}
      />
      <Navbar />

      <main className="pt-28 pb-24">
        <section className="container mx-auto px-6 mb-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lush font-black tracking-[0.5em] uppercase text-[10px] block mb-4"
          >
            {t('accommodations.section_tag')}
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif text-volcanic italic">
            {t('accommodations.title')}
          </h1>
          <p className="text-volcanic/60 mt-6 max-w-2xl mx-auto text-lg">
            {t('accommodations.subtitle')}
          </p>
        </section>

        {/* Date Availability & Filter Bar */}
        <section className="container mx-auto px-6 mb-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-sand space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1.5">
                  <Calendar className="inline w-3.5 h-3.5 mr-1" />
                  {t('accommodations.check_in')}
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-sand/30 border border-sand rounded-xl px-4 py-2.5 text-sm text-volcanic outline-none focus:border-lush"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1.5">
                  <Calendar className="inline w-3.5 h-3.5 mr-1" />
                  {t('accommodations.check_out')}
                </label>
                <input
                  type="date"
                  min={checkIn || new Date().toISOString().slice(0, 10)}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-sand/30 border border-sand rounded-xl px-4 py-2.5 text-sm text-volcanic outline-none focus:border-lush"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1.5">
                  <Users className="inline w-3.5 h-3.5 mr-1" />
                  {t('accommodations.adults')}
                </label>
                <select
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full bg-sand/30 border border-sand rounded-xl px-4 py-2.5 text-sm text-volcanic outline-none focus:border-lush"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {t('accommodations.adults')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
                  <input
                    type="text"
                    placeholder={t('accommodations.search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sand bg-sand/30 text-sm text-volcanic placeholder:text-volcanic/40 focus:outline-none focus:border-lush"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-3 border-t border-sand/60">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-ocean text-white'
                      : 'bg-sand/50 text-volcanic/70 hover:bg-sand'
                  }`}
                >
                  {t('accommodations.all_categories')}
                </button>
                {SUITE_CATEGORIES.filter((c) => c.value !== 'conference').map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategoryFilter(cat.value)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      categoryFilter === cat.value
                        ? 'bg-lush text-white'
                        : 'bg-sand/50 text-volcanic/70 hover:bg-sand'
                    }`}
                  >
                    {lang === 'fr' ? cat.labelFr : cat.labelEn}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 self-end md:self-auto">
                <ArrowUpDown className="w-4 h-4 text-volcanic/60" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-sand/30 border border-sand rounded-full py-2 px-4 text-xs font-semibold text-volcanic focus:outline-none focus:border-lush"
                >
                  <option value="default">{t('accommodations.sort_by')}</option>
                  <option value="low-high">{t('accommodations.sort_low_high')}</option>
                  <option value="high-low">{t('accommodations.sort_high_low')}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-2">
            <p className="text-volcanic/60 text-sm">
              {checkingAvailability
                ? '...'
                : `${filteredSuites.length} ${
                    filteredSuites.length === 1
                      ? t('accommodations.suites_available')
                      : t('accommodations.suites_available_plural')
                  }`}
            </p>
            <Link to="/booking-status" className="text-xs font-bold text-ocean hover:text-lush">
              {t('nav.track_booking')} →
            </Link>
          </div>
        </section>

        {/* Suites Grid */}
        <section className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-2xl h-96 animate-pulse border border-sand" />
              ))}
            </div>
          ) : filteredSuites.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-sand">
              <p className="text-volcanic/50 text-lg">{t('accommodations.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredSuites.map((suite, idx) => {
                  const title = lang === 'fr' ? suite.name_fr : suite.name_en;
                  const desc =
                    lang === 'fr'
                      ? suite.short_description_fr || suite.description_fr
                      : suite.short_description_en || suite.description_en;
                  const availInfo = availabilityMap[suite.id];
                  const availLabel = getOptionLabel(AVAILABILITY_STATUSES, suite.availability_status, lang);
                  const amenities = Array.isArray(suite.amenities) ? suite.amenities : [];
                  const isUnavailable =
                    suite.availability_status === 'booked' || suite.availability_status === 'maintenance';

                  return (
                    <motion.div
                      key={suite.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.04 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-resort border border-sand group hover:shadow-2xl transition-shadow flex flex-col"
                    >
                      <Link to={`/rooms/${suite.slug}`} className="h-52 overflow-hidden relative block">
                        <img
                          src={suite.cover_image_url || '/assets/general/image14.jpeg'}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-volcanic/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                          {availInfo
                            ? t('accommodations.available_count', { count: availInfo.available_units })
                            : availLabel}
                        </div>
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                          <span className="text-ocean font-serif font-bold text-sm">
                            {formatPrice(suite.base_price)}
                          </span>
                          <span className="text-[9px] text-volcanic/60 uppercase tracking-wider ml-1">
                            {t('accommodations.per_night')}
                          </span>
                        </div>
                      </Link>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[11px] text-lush font-bold uppercase tracking-wider mb-1.5">
                          <span className="inline-flex items-center gap-1">
                            <BedDouble className="w-3.5 h-3.5" />
                            {suite.bedrooms}{' '}
                            {suite.bedrooms === 1 ? t('accommodations.bedroom') : t('accommodations.bedrooms')}
                          </span>
                          {suite.size_sqm && <span>• {suite.size_sqm} m²</span>}
                        </div>

                        <Link to={`/rooms/${suite.slug}`}>
                          <h3 className="text-xl font-serif text-volcanic mb-2 group-hover:text-ocean transition-colors">
                            {title}
                          </h3>
                        </Link>
                        <p className="text-volcanic/60 text-xs leading-relaxed mb-4 line-clamp-3">{desc}</p>

                        <div className="space-y-2 mb-5">
                          <p className="text-[9px] uppercase tracking-[0.25em] font-black text-lush">
                            {t('accommodations.amenities')}
                          </p>
                          <div className="grid grid-cols-1 gap-1.5">
                            {amenities.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Check className="w-3 h-3 text-lush flex-shrink-0" strokeWidth={3} />
                                <span className="text-[11px] font-medium text-volcanic/80 truncate">
                                  {typeof item === 'string' ? item : lang === 'fr' ? item.name_fr : item.name_en}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto space-y-2">
                          <button
                            type="button"
                            disabled={isUnavailable}
                            onClick={() => setSelectedSuite(suite)}
                            className="w-full bg-volcanic hover:bg-lush text-white font-black py-3.5 rounded-xl transition-all shadow-md uppercase text-[10px] tracking-[0.25em] disabled:opacity-40"
                          >
                            {t('accommodations.reserve')}
                          </button>
                          <Link
                            to={`/rooms/${suite.slug}`}
                            className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-bold text-ocean hover:text-lush"
                          >
                            {t('accommodations.view_suite')} <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>

      <BookingModal
        room={selectedSuite}
        initialDates={{ checkIn, checkOut, adults }}
        isOpen={Boolean(selectedSuite)}
        onClose={() => setSelectedSuite(null)}
      />

      <Footer />
    </div>
  );
}
