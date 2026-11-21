import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import { Search, Sparkles, Leaf, X, CalendarDays } from 'lucide-react';
import { useDailyMenu } from '../hooks/useDailyMenu.js';
import { useCurrency } from '../context/currencyHelpers.js';
import { formatReadableDate } from '../lib/currency.js';
import {
  MEAL_PERIODS,
  MENU_CATEGORIES,
  DIETARY_TAGS,
  ALLERGENS,
  HIGHLIGHT_BADGES,
  getOptionLabel,
} from '../lib/constants.js';
import { buildBreadcrumbSchema, buildMenuSchema } from '../lib/seoSchemas.js';

export default function Dining() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { formatPrice } = useCurrency();
  const { todayISO, dailyMenu, catalogItems, isFallbackLatest, loading } = useDailyMenu();

  const [viewMode, setViewMode] = useState('today'); // 'today' | 'catalog'
  const [mealPeriod, setMealPeriod] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDietary, setActiveDietary] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const hasDailyEntries = Boolean(dailyMenu && Array.isArray(dailyMenu.entries) && dailyMenu.entries.length > 0);
  const effectiveMode = viewMode === 'today' && hasDailyEntries ? 'today' : 'catalog';

  const sourceItems = useMemo(() => {
    if (effectiveMode === 'today' && dailyMenu?.entries) {
      return dailyMenu.entries.map((entry) => ({
        ...entry.menu_item,
        entry_id: entry.id,
        meal_period: entry.meal_period,
        is_available: entry.is_available !== false,
        highlight_badge: entry.highlight_badge || '',
        effective_price_xaf: entry.daily_price_override ?? entry.menu_item.price_xaf,
      }));
    }
    return catalogItems.map((item) => ({
      ...item,
      meal_period: 'all_day',
      is_available: true,
      highlight_badge: item.is_signature ? 'chef_pick' : '',
      effective_price_xaf: item.price_xaf,
    }));
  }, [effectiveMode, dailyMenu, catalogItems]);

  const toggleDietary = (tag) => {
    setActiveDietary((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  };

  const filteredItems = useMemo(() => {
    return sourceItems.filter((item) => {
      if (effectiveMode === 'today' && mealPeriod !== 'all' && item.meal_period !== mealPeriod) {
        return false;
      }
      if (categoryFilter !== 'all' && item.category !== categoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const name = (lang === 'fr' ? item.name_fr : item.name_en || '').toLowerCase();
        const desc = (lang === 'fr' ? item.description_fr : item.description_en || '').toLowerCase();
        if (!name.includes(q) && !desc.includes(q)) return false;
      }
      if (activeDietary.length > 0) {
        const tags = Array.isArray(item.dietary_tags) ? item.dietary_tags : [];
        if (!activeDietary.every((tag) => tags.includes(tag))) return false;
      }
      return true;
    });
  }, [sourceItems, effectiveMode, mealPeriod, categoryFilter, searchQuery, activeDietary, lang]);

  const chefNote =
    lang === 'fr'
      ? dailyMenu?.chef_note_fr || t('dining.chef_note_quote')
      : dailyMenu?.chef_note_en || t('dining.chef_note_quote');

  return (
    <div className="min-h-screen bg-sand/30">
      <SEO
        title={`${t('dining.title')} ${t('dining.title_italic')}`}
        description={t('dining.description')}
        path="/services/dining"
        schemas={[
          buildMenuSchema(sourceItems, lang),
          buildBreadcrumbSchema([
            { name: t('nav.home'), path: '/' },
            { name: t('nav.dining'), path: '/services/dining' },
          ]),
        ]}
      />
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-lush font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">
              {t('dining.section_tag')}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-volcanic leading-tight mb-6">
              {t('dining.title')} <br />
              <span className="italic text-lush">{t('dining.title_italic')}</span>
            </h1>
            <p className="text-volcanic/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t('dining.description')}
            </p>
          </motion.div>
        </section>

        {/* Daily Menu Header Banner */}
        {hasDailyEntries && (
          <section className="container mx-auto px-6 mb-10">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-lush mb-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    {isFallbackLatest ? t('dining.latest_menu_fallback') : t('dining.todays_menu_badge')} —{' '}
                    {formatReadableDate(dailyMenu.service_date || todayISO, lang)}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif text-volcanic mb-1">
                  {(lang === 'fr' ? dailyMenu.title_fr : dailyMenu.title_en) || t('dining.todays_menu_tab')}
                </h2>
                <p className="text-sm text-volcanic/65 italic max-w-2xl">{chefNote}</p>
              </div>

              <div className="inline-flex rounded-full bg-sand/50 p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setViewMode('today')}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    effectiveMode === 'today' ? 'bg-volcanic text-white shadow' : 'text-volcanic/70'
                  }`}
                >
                  {t('dining.todays_menu_tab')}
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('catalog')}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    effectiveMode === 'catalog' ? 'bg-volcanic text-white shadow' : 'text-volcanic/70'
                  }`}
                >
                  {t('dining.full_catalog_tab')}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Meal Period & Category Filters */}
        <section className="container mx-auto px-6 mb-10 space-y-4">
          {effectiveMode === 'today' && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMealPeriod('all')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  mealPeriod === 'all'
                    ? 'bg-ocean text-white shadow-sm'
                    : 'bg-white border border-volcanic/15 text-volcanic/80 hover:border-ocean'
                }`}
              >
                {t('dining.meal_periods.all')}
              </button>
              {MEAL_PERIODS.map((mp) => (
                <button
                  key={mp.value}
                  type="button"
                  onClick={() => setMealPeriod(mp.value)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    mealPeriod === mp.value
                      ? 'bg-ocean text-white shadow-sm'
                      : 'bg-white border border-volcanic/15 text-volcanic/80 hover:border-ocean'
                  }`}
                >
                  {lang === 'fr' ? mp.labelFr : mp.labelEn}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={`px-4 py-2 rounded-full border text-xs uppercase tracking-wider transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-lush border-lush text-[#0e1a28] font-bold shadow-sm'
                    : 'bg-white border-volcanic/15 text-volcanic/80 hover:border-ocean'
                }`}
              >
                {t('dining.filters.all')}
              </button>
              {MENU_CATEGORIES.filter((c) =>
                sourceItems.some((item) => item.category === c.value),
              ).map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-4 py-2 rounded-full border text-xs uppercase tracking-wider transition-all ${
                    categoryFilter === cat.value
                      ? 'bg-lush border-lush text-[#0e1a28] font-bold shadow-sm'
                      : 'bg-white border-volcanic/15 text-volcanic/80 hover:border-ocean'
                  }`}
                >
                  {lang === 'fr' ? cat.labelFr : cat.labelEn}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-volcanic/40" />
                <input
                  type="text"
                  placeholder={t('dining.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full border border-volcanic/15 bg-white text-sm text-volcanic placeholder:text-volcanic/40 focus:outline-none focus:border-ocean"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs uppercase tracking-wider transition-all ${
                  activeDietary.length > 0
                    ? 'bg-lush text-[#0e1a28] border-lush font-bold shadow-sm'
                    : 'bg-white border-volcanic/15 text-volcanic/80 hover:border-ocean'
                }`}
              >
                <Leaf className="w-4 h-4" />
                <span>{t('dining.filters.dietary')}</span>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 bg-white rounded-2xl border border-sand flex flex-wrap items-center gap-4">
                  {DIETARY_TAGS.map((tag) => (
                    <label key={tag.value} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={activeDietary.includes(tag.value)}
                        onChange={() => toggleDietary(tag.value)}
                        className="w-4 h-4 accent-lush rounded"
                      />
                      <span>{lang === 'fr' ? tag.labelFr : tag.labelEn}</span>
                    </label>
                  ))}
                  {activeDietary.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveDietary([])}
                      className="ml-auto text-volcanic/60 hover:text-lush inline-flex items-center gap-1 text-xs"
                    >
                      <X className="w-4 h-4" /> Clear
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Menu Grid */}
        <section className="container mx-auto px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-80 bg-white rounded-[2rem] animate-pulse border border-sand" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-sand">
              <p className="text-volcanic/50 text-lg">{t('dining.no_results')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredItems.map((item, index) => {
                  const name = lang === 'fr' ? item.name_fr : item.name_en;
                  const desc = lang === 'fr' ? item.description_fr : item.description_en;
                  const tags = Array.isArray(item.dietary_tags) ? item.dietary_tags : [];
                  const allergens = Array.isArray(item.allergens) ? item.allergens : [];
                  const badgeLabel = item.highlight_badge
                    ? getOptionLabel(HIGHLIGHT_BADGES, item.highlight_badge, lang)
                    : '';

                  return (
                    <motion.div
                      key={item.entry_id || item.id || index}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25 }}
                      className={`group bg-white rounded-[2rem] overflow-hidden border border-sand/60 shadow-sm hover:shadow-2xl transition-all flex flex-col ${
                        !item.is_available ? 'opacity-70' : ''
                      }`}
                    >
                      <div className="h-56 overflow-hidden relative bg-sand/30">
                        <img
                          src={item.image_url || '/assets/general/image1.jpeg'}
                          alt={name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          {badgeLabel && (
                            <span className="bg-ocean text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow">
                              <Sparkles className="w-3 h-3" /> {badgeLabel}
                            </span>
                          )}
                          {!item.is_available && (
                            <span className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                              {t('dining.sold_out')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="p-7 flex-1 flex flex-col">
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2.5">
                            {tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="bg-sand/70 text-volcanic/80 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                              >
                                {getOptionLabel(DIETARY_TAGS, tag, lang)}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-xl font-serif text-volcanic group-hover:text-lush transition-colors">
                            {name}
                          </h3>
                          <span className="text-ocean font-serif font-bold text-lg whitespace-nowrap">
                            {formatPrice(item.effective_price_xaf)}
                          </span>
                        </div>

                        <p className="text-volcanic/65 text-sm leading-relaxed mb-4">{desc}</p>

                        {allergens.length > 0 && (
                          <p className="mt-auto pt-3 border-t border-sand/60 text-[11px] text-volcanic/50">
                            <span className="font-bold">{t('dining.allergens_label')}:</span>{' '}
                            {allergens.map((a) => getOptionLabel(ALLERGENS, a, lang)).join(', ')}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Chef's Note */}
        <section className="container mx-auto px-6 mt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-volcanic rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden"
          >
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif mb-6 italic text-white">
                {t('dining.chef_note_title')}
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-8">{chefNote}</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-lush/50" />
                <span className="text-lush font-bold uppercase tracking-widest text-xs">
                  {t('dining.chef_note_signature')}
                </span>
                <div className="w-12 h-px bg-lush/50" />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
