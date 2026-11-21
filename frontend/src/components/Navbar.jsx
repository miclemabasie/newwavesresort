import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Lock, LayoutDashboard } from 'lucide-react';
import logo from '../assets/general/logo1.png';
import { useAuth } from '../context/authHelpers.js';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from './CurrencySwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const { user, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const isSignedInStaff = Boolean(user && role);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: t('nav.home'), to: '/' },
    { name: t('nav.our_story'), to: '/story' },
    { name: t('nav.experiences'), to: '/experiences' },
    { name: t('nav.dining'), to: '/services/dining' },
    { name: t('nav.accommodations'), to: '/rooms' },
    { name: t('nav.gallery'), to: '/gallery' },
    { name: t('nav.contact'), to: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ocean/5">
      <div className="container flex items-center justify-between h-20 gap-3">
        {/* Brand Logo + Fixed Resort Caption (notes.md items 1-3) */}
        <Link to="/" className="flex items-center gap-3 z-[70] min-w-0">
          <img src={logo} alt="New Waves Resort Logo" className="w-11 h-11 object-contain shrink-0" />
          <div className="hidden sm:flex flex-col leading-tight min-w-0">
            <span className="text-xs md:text-sm font-serif font-bold text-ocean truncate">
              {t('nav.brand_name', 'New Waves Resort, Ngeme Limbe')}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-volcanic/60 font-semibold truncate">
              {t('nav.brand_tagline', 'A Resort Designed by & for Professionals')}
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="nav-link whitespace-nowrap">
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Action Button, Currency, Language Switcher & Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link to="/rooms" className="btn-pay py-2! px-4! text-xs whitespace-nowrap hidden sm:inline-block">
            {t('common.plan_your_stay')}
          </Link>

          <Link
            to={isSignedInStaff ? '/admin' : '/admin/login'}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ocean/20 hover:border-lush text-ocean hover:text-lush text-xs font-bold whitespace-nowrap transition-colors"
            title={isSignedInStaff ? t('nav.staff_dashboard') : t('nav.staff_portal')}
          >
            {isSignedInStaff ? (
              <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <Lock className="w-3.5 h-3.5 shrink-0" />
            )}
            <span>{isSignedInStaff ? t('nav.staff_dashboard') : t('nav.staff_portal')}</span>
          </Link>

          <CurrencySwitcher />
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden z-[70] p-2 text-lush focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center transition-colors"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current block transition-colors"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current block origin-center transition-colors"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-volcanic/40 backdrop-blur-sm z-[60] xl:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'circOut' }}
              className="fixed inset-y-0 right-0 h-screen w-[85%] max-w-sm bg-sand z-[65] xl:hidden shadow-2xl flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-8 pt-28 pb-10">
                <div className="flex flex-col gap-6 text-left">
                  {navItems.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.04 }}
                      key={item.to}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `text-2xl font-serif block transition-colors ${
                            isActive ? 'text-lush' : 'text-volcanic hover:text-lush'
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </motion.div>
                  ))}

                  <Link
                    to="/booking-status"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-bold uppercase tracking-widest text-ocean hover:text-lush pt-2"
                  >
                    {t('nav.track_booking')}
                  </Link>

                  <Link
                    to={isSignedInStaff ? '/admin' : '/admin/login'}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-lush hover:text-ocean pt-1"
                  >
                    {isSignedInStaff ? (
                      <LayoutDashboard className="w-4 h-4 shrink-0" />
                    ) : (
                      <Lock className="w-4 h-4 shrink-0" />
                    )}
                    <span>{isSignedInStaff ? t('nav.staff_dashboard') : t('nav.staff_portal')}</span>
                  </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-ocean/10">
                  <Link
                    to="/rooms"
                    onClick={() => setIsOpen(false)}
                    className="btn-pay w-full text-xs uppercase tracking-widest mb-6"
                  >
                    {t('common.plan_your_stay')}
                  </Link>
                  <h4 className="text-ocean font-bold uppercase tracking-widest text-xs mb-3">
                    {t('footer.contact_title')}
                  </h4>
                  <p className="text-volcanic/70 text-sm leading-relaxed">{t('footer.address')}</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
