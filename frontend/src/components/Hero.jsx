import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, ArrowRight, UtensilsCrossed, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

function getInitialSearchDates() {
  const today = new Date();
  const inDate = new Date(today);
  inDate.setDate(inDate.getDate() + 1);
  const outDate = new Date(inDate);
  outDate.setDate(outDate.getDate() + 2);
  return {
    todayISO: today.toISOString().slice(0, 10),
    checkIn: inDate.toISOString().slice(0, 10),
    checkOut: outDate.toISOString().slice(0, 10),
  };
}

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const rawSlides = t('hero.slides', { returnObjects: true });
  const slides =
    Array.isArray(rawSlides) && rawSlides.length > 0
      ? rawSlides
      : [
          {
            image:
              'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1920',
            upperTitle: 'Established Excellence',
            title: 'New Waves Resort',
            subtitle:
              'A sanctuary for the global citizen where luxury meets a legacy of social impact.',
          },
        ];

  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);

  const initialDates = useMemo(() => getInitialSearchDates(), []);
  const [checkIn, setCheckIn] = useState(initialDates.checkIn);
  const [checkOut, setCheckOut] = useState(initialDates.checkOut);
  const [adults, setAdults] = useState(2);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev >= slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? slides.length - 1 : prev - 1));
    setIsAuto(false);
  };

  useEffect(() => {
    if (!isAuto) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isAuto, nextSlide]);

  const activeSlide = slides[current] || slides[0];

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut && checkOut > checkIn) params.set('checkOut', checkOut);
    params.set('adults', String(adults));
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-midnight flex flex-col justify-between pt-14 pb-10 md:pt-20 md:pb-12">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.img
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 12, ease: 'easeOut' }}
              src={activeSlide.image}
              className="w-full h-full object-cover"
              alt={activeSlide.title}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-midnight/35 to-midnight/90" />
            <div className="absolute inset-0 bg-radial from-transparent via-midnight/15 to-midnight/60" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Centered Hero Content */}
      <div className="relative z-20 container mx-auto flex-1 flex flex-col items-center justify-center text-center px-6 py-8">
        <div className="max-w-5xl">
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 text-white/90 text-[10px] font-bold uppercase tracking-[0.3em]">
            <MapPin className="w-3.5 h-3.5 text-lush" />
            <span>{t('hero.location_badge')}</span>
          </div>

          <motion.span
            key={`upper-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lush font-bold tracking-[0.4em] uppercase text-[11px] mb-4 block"
          >
            {activeSlide.upperTitle}
          </motion.span>

          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="text-[clamp(2.9rem,8vw,6.8rem)] font-serif leading-[0.98] mb-6 text-white drop-shadow-[0_18px_36px_rgba(0,0,0,0.45)] italic font-semibold"
          >
            {activeSlide.title}
          </motion.h1>

          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-base md:text-xl max-w-2xl mx-auto font-light text-white/90 mb-10 leading-relaxed drop-shadow"
          >
            {activeSlide.subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/rooms"
              className="w-full sm:w-auto bg-lush hover:bg-white text-[#0e1a28] hover:text-[#0e1a28] px-9 py-4 rounded-full font-black transition-all uppercase text-[11px] tracking-[0.22em] shadow-2xl inline-flex items-center justify-center gap-2"
            >
              <span>{t('common.reservation')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#daily-menu"
              className="w-full sm:w-auto bg-white/20 hover:bg-white text-white hover:text-[#0e1a28] border border-white/40 backdrop-blur-md px-8 py-4 rounded-full font-bold transition-all uppercase text-[11px] tracking-[0.2em] inline-flex items-center justify-center gap-2"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-lush" />
              <span>{t('hero.daily_menu_cta')}</span>
            </a>

            <Link
              to="/story"
              className="w-full sm:w-auto bg-[#0e1a28]/60 hover:bg-white text-white hover:text-[#0e1a28] border border-white/35 backdrop-blur-sm px-8 py-4 rounded-full font-bold transition-all uppercase text-[11px] tracking-[0.2em]"
            >
              {t('common.foundation_story')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Floating Availability Bar + Slide Controls */}
      <div className="relative z-20 container mx-auto px-6 space-y-5">
        {/* Slide Controls */}
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.title || idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                onClick={() => {
                  setCurrent(idx);
                  setIsAuto(false);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === idx ? 'w-10 bg-lush' : 'w-3 bg-white/35 hover:bg-white/60'
                }`}
              />
            ))}
            <span className="ml-2 text-[11px] font-mono font-bold text-white/75">
              0{current + 1} / 0{slides.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-lush hover:border-lush hover:text-midnight transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                nextSlide();
                setIsAuto(false);
              }}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-lush hover:border-lush hover:text-midnight transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Glassmorphic Quick-Booking Availability Bar */}
        <form
          onSubmit={handleQuickSearch}
          className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-4 md:p-5 shadow-[var(--shadow-luxury)] border border-white/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-end"
        >
          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-lush mb-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {t('hero.quick_book.check_in')}
            </label>
            <input
              type="date"
              required
              min={initialDates.todayISO}
              value={checkIn}
              onChange={(e) => {
                const nextIn = e.target.value;
                setCheckIn(nextIn);
                if (checkOut <= nextIn) {
                  const dt = new Date(nextIn);
                  dt.setDate(dt.getDate() + 1);
                  setCheckOut(dt.toISOString().slice(0, 10));
                }
              }}
              className="w-full bg-sand/50 border border-sand rounded-xl px-3.5 py-2.5 text-sm font-medium text-midnight outline-none focus:border-ocean"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-lush mb-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {t('hero.quick_book.check_out')}
            </label>
            <input
              type="date"
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-sand/50 border border-sand rounded-xl px-3.5 py-2.5 text-sm font-medium text-midnight outline-none focus:border-ocean"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-lush mb-1.5">
              <Users className="w-3.5 h-3.5" />
              {t('hero.quick_book.guests')}
            </label>
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full bg-sand/50 border border-sand rounded-xl px-3.5 py-2.5 text-sm font-medium text-midnight outline-none focus:border-ocean"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {t('accommodations.adults')}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0e1a28] hover:bg-ocean text-white font-bold py-3 px-6 rounded-xl uppercase text-[11px] tracking-[0.2em] inline-flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <span>{t('hero.quick_book.search_cta')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
