import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UtensilsCrossed,
  CalendarDays,
  Sparkles,
  Leaf,
  ArrowRight,
  MessageCircle,
  Plus,
  Minus,
  ShoppingBag,
} from 'lucide-react';
import { useDailyMenu } from '../../hooks/useDailyMenu.js';
import { useCurrency } from '../../context/currencyHelpers.js';
import { useMenuCart, getMenuCartKey } from '../../context/menuCartHelpers.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';
import { formatReadableDate } from '../../lib/currency.js';
import { buildDiningWhatsAppUrl } from '../../lib/whatsapp.js';
import {
  MEAL_PERIODS,
  DIETARY_TAGS,
  HIGHLIGHT_BADGES,
  getOptionLabel,
} from '../../lib/constants.js';

export default function Cultinary() {
  const { t, i18n } = useTranslation();
  const { todayISO, dailyMenu, catalogItems, isFallbackLatest, loading } = useDailyMenu();
  const { formatPrice } = useCurrency();
  const {
    itemCount,
    subtotalXaf,
    addItem,
    updateQuantity,
    getItemQuantity,
    openCheckout,
  } = useMenuCart();
  const { settings } = useSiteSettings();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const sourceEntries = useMemo(() => {
    if (dailyMenu?.entries?.length > 0) {
      return dailyMenu.entries
        .filter((e) => e.menu_item)
        .map((entry) => ({
          ...entry.menu_item,
          entry_id: entry.id,
          meal_period: entry.meal_period || 'all_day',
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
  }, [dailyMenu, catalogItems]);

  const availablePeriods = useMemo(() => {
    const present = new Set(sourceEntries.map((e) => e.meal_period));
    return MEAL_PERIODS.filter((mp) => present.has(mp.value));
  }, [sourceEntries]);

  const activePeriod =
    selectedPeriod !== 'all' && !availablePeriods.some((p) => p.value === selectedPeriod)
      ? 'all'
      : selectedPeriod;

  const visibleDishes = useMemo(() => {
    const list =
      activePeriod === 'all'
        ? sourceEntries
        : sourceEntries.filter((item) => item.meal_period === activePeriod);
    return list.slice(0, 6);
  }, [sourceEntries, activePeriod]);

  const menuTitle =
    (lang === 'fr' ? dailyMenu?.title_fr : dailyMenu?.title_en) ||
    t('culinary.title');
  const chefNote =
    (lang === 'fr' ? dailyMenu?.chef_note_fr : dailyMenu?.chef_note_en) ||
    t('dining.chef_note_quote');
  const formattedDate = formatReadableDate(dailyMenu?.service_date || todayISO, lang);
  const diningWaUrl = buildDiningWhatsAppUrl({
    phone: settings.whatsapp_number,
    language: lang,
  });

  return (
    <section
      id="daily-menu"
      className="py-24 md:py-32 bg-ivory border-y border-sand scroll-mt-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:max-w-7xl relative z-10">
        {/* Header + Chef's Daily Note */}
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex flex-wrap items-center gap-2.5 bg-white border border-sand px-4 py-2 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <CalendarDays className="w-3.5 h-3.5 text-lush" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-midnight">
                {isFallbackLatest
                  ? t('dining.latest_menu_fallback')
                  : t('dining.todays_menu_badge')}
              </span>
              <span className="text-volcanic/30">•</span>
              <span className="text-xs font-semibold text-ocean">{formattedDate}</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-midnight leading-[1.05]">
              {menuTitle}
            </h2>

            <p className="text-volcanic/70 text-base md:text-lg max-w-2xl leading-relaxed mb-0">
              {t('culinary.description')}
            </p>
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-7 border border-sand shadow-[var(--shadow-resort)] space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-lush">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                {t('culinary.chef_note_label')}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <Leaf className="w-3 h-3" /> 100% Organic
              </span>
            </div>
            <p className="font-serif italic text-volcanic/85 text-lg leading-snug mb-0">
              &ldquo;{chefNote}&rdquo;
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-ocean/80 mb-0">
              — {t('dining.chef_note_signature')}
            </p>
          </div>
        </div>

        {/* Meal Period Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-sand">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedPeriod('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activePeriod === 'all'
                  ? 'bg-[#0e1a28] text-white shadow-md'
                  : 'bg-white border border-volcanic/15 text-volcanic hover:border-ocean hover:text-ocean'
              }`}
            >
              {t('dining.meal_periods.all')} ({sourceEntries.length})
            </button>

            {availablePeriods.map((mp) => (
              <button
                key={mp.value}
                type="button"
                onClick={() => setSelectedPeriod(mp.value)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activePeriod === mp.value
                    ? 'bg-ocean text-white shadow-md'
                    : 'bg-white border border-volcanic/15 text-volcanic hover:border-ocean hover:text-ocean'
                }`}
              >
                {lang === 'fr' ? mp.labelFr : mp.labelEn}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-volcanic/50 hidden sm:inline">
            {t('culinary.badges.organic')}
          </span>
        </div>

        {/* Dish Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-white border border-sand animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {visibleDishes.map((dish, idx) => {
                const name = lang === 'fr' ? dish.name_fr : dish.name_en;
                const desc = lang === 'fr' ? dish.description_fr : dish.description_en;
                const tags = Array.isArray(dish.dietary_tags) ? dish.dietary_tags : [];
                const badgeLabel = dish.highlight_badge
                  ? getOptionLabel(HIGHLIGHT_BADGES, dish.highlight_badge, lang)
                  : '';
                const cartKey = getMenuCartKey(dish.id, dish.entry_id);
                const qty = getItemQuantity(dish.id, dish.entry_id);
                const dishCartPayload = {
                  menu_item_id: dish.id,
                  daily_menu_entry_id: dish.entry_id || null,
                  slug: dish.slug || '',
                  name_en: dish.name_en,
                  name_fr: dish.name_fr,
                  category: dish.category,
                  meal_period: dish.meal_period,
                  image_url: dish.image_url,
                  dietary_tags: tags,
                  allergens: Array.isArray(dish.allergens) ? dish.allergens : [],
                  unit_price_xaf: dish.effective_price_xaf ?? dish.price_xaf,
                };

                return (
                  <motion.article
                    key={dish.entry_id || dish.id || dish.slug || idx}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    className={`group bg-white rounded-3xl overflow-hidden border border-sand shadow-[var(--shadow-resort)] hover:shadow-[var(--shadow-luxury)] transition-all duration-500 flex flex-col ${
                      !dish.is_available ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-sand/40">
                      <img
                        src={dish.image_url || '/assets/general/image1.jpeg'}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight/35 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {badgeLabel && (
                          <span className="bg-ocean/95 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow">
                            <Sparkles className="w-3 h-3" /> {badgeLabel}
                          </span>
                        )}
                        {!dish.is_available && (
                          <span className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                            {t('dining.sold_out')}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
                        <span className="text-midnight font-serif font-bold text-base">
                          {formatPrice(dish.effective_price_xaf ?? dish.price_xaf)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="bg-sand/70 text-volcanic/80 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                          >
                            {getOptionLabel(DIETARY_TAGS, tag, lang)}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl font-serif text-midnight group-hover:text-ocean transition-colors mb-2">
                        {name}
                      </h3>
                      <p className="text-sm text-volcanic/65 leading-relaxed line-clamp-2 mb-4">
                        {desc}
                      </p>

                      <div className="mt-auto pt-3 border-t border-sand/60">
                        {!dish.is_available ? (
                          <span className="block w-full text-center py-2 px-4 rounded-full bg-slate-100 text-volcanic/45 text-xs font-bold uppercase tracking-wider">
                            {t('dining.sold_out')}
                          </span>
                        ) : qty > 0 ? (
                          <div className="flex items-center justify-between gap-2">
                            <div className="inline-flex items-center rounded-full bg-[#0e1a28] text-white shadow-sm">
                              <button
                                type="button"
                                onClick={() => updateQuantity(cartKey, -1)}
                                aria-label="Decrease quantity"
                                className="p-2 text-white hover:text-sand transition-colors cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-3 text-xs font-bold text-white min-w-[26px] text-center">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(cartKey, 1)}
                                aria-label="Increase quantity"
                                className="p-2 text-white hover:text-sand transition-colors cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={openCheckout}
                              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ocean hover:text-volcanic transition-colors cursor-pointer"
                            >
                              <span>{t('dining.order.review_order', 'Review Order')}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              addItem(dishCartPayload, {
                                dailyMenuId: dailyMenu?.id || null,
                                serviceDate: dailyMenu?.service_date || todayISO,
                              })
                            }
                            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-[#0e1a28] hover:bg-ocean text-white hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-sm cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t('dining.order.add_to_order', 'Add to Order')}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Action Bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/services/dining"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#0e1a28] hover:bg-ocean text-white hover:text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all"
          >
            <span>{t('culinary.todays_menu_cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {itemCount > 0 ? (
            <button
              type="button"
              onClick={openCheckout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white text-xs font-bold uppercase tracking-[0.18em] shadow-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {t('dining.order.place_order_count', 'Place Order ({{count}}) • {{total}}', {
                  count: itemCount,
                  total: formatPrice(subtotalXaf),
                })}
              </span>
            </button>
          ) : (
            <a
              href={diningWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white text-xs font-bold uppercase tracking-[0.18em] shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('culinary.whatsapp_dining_cta')}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
