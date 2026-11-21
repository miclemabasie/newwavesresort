import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import logo from '../../assets/general/logo1.png';
import { Instagram, Linkedin, Facebook, Twitter, Youtube, MapPin, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { settings } = useSiteSettings();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleaned = email.trim().toLowerCase();
    if (!cleaned || !cleaned.includes('@')) return;

    setSubscribing(true);
    try {
      if (supabase) {
        const { error } = await supabase
          .from('newsletter_subscribers')
          .insert({ email: cleaned, language: lang });

        if (error) {
          if (error.code === '23505') {
            toast.success(t('footer.newsletter_already'));
            setEmail('');
            return;
          }
          throw error;
        }
      }
      toast.success(t('footer.newsletter_success'));
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Subscription failed.');
    } finally {
      setSubscribing(false);
    }
  };

  const displayAddress =
    lang === 'fr' ? settings.address_fr || t('footer.address') : settings.address_en || t('footer.address');
  const displayEmail = settings.info_email || t('footer.email');
  const displayPhone = settings.contact_phone || t('footer.phone');

  return (
    <footer className="bg-volcanic pt-24 pb-12 text-sand overflow-hidden relative">
      <div className="absolute top-0 right-0 text-[12rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none whitespace-nowrap">
        NEW WAVES
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:max-w-7xl">
        <div className="bg-lush rounded-3xl p-8 md:p-16 mb-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10">
          <div className="max-w-md text-center lg:text-left">
            <h3 className="text-white text-3xl font-serif mb-4 italic">{t('footer.newsletter_title')}</h3>
            <p className="text-white/80 text-sm leading-relaxed">{t('footer.newsletter_text')}</p>
          </div>

          <form className="w-full max-w-md flex flex-col sm:flex-row gap-3" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsletter_placeholder')}
              className="w-full flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="bg-white text-ocean hover:bg-volcanic hover:text-white px-8 py-4 rounded-xl font-bold transition-all uppercase text-[10px] tracking-widest whitespace-nowrap flex-shrink-0 disabled:opacity-60"
            >
              {t('footer.newsletter_button')}
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 border-b border-white/10 pb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src={logo} alt="New Waves Logo" className="w-12 h-12 object-contain" />
              <h4 className="text-white text-2xl font-serif">{t('footer.brand_name')}</h4>
            </div>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed mb-8">
              {t('footer.brand_description')}
            </p>
            <div className="flex gap-4">
              <SocialIcon Icon={Instagram} href="https://instagram.com" label="Instagram" />
              <SocialIcon Icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
              <SocialIcon Icon={Facebook} href="https://facebook.com" label="Facebook" />
              <SocialIcon Icon={Twitter} href="https://x.com" label="X" />
              <SocialIcon Icon={Youtube} href="https://youtube.com" label="YouTube" />
            </div>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-6">
              {t('footer.legacy_title')}
            </h5>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://fisiyfoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-lush transition-colors duration-300 block"
                >
                  {t('footer.legacy_foundation')}
                </a>
              </li>
              <li>
                <Link
                  to="/services/intellectual-talks"
                  className="text-white/50 hover:text-lush transition-colors duration-300 block"
                >
                  {t('footer.legacy_dialogues')}
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-white/50 hover:text-lush transition-colors duration-300 block">
                  {t('nav.our_story')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-6">
              {t('footer.concierge_title')}
            </h5>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/rooms" className="text-white/50 hover:text-lush transition-colors duration-300 block">
                  {t('footer.concierge_book')}
                </Link>
              </li>
              <li>
                <Link
                  to="/booking-status"
                  className="text-white/50 hover:text-lush transition-colors duration-300 block"
                >
                  {t('footer.track_booking')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/50 hover:text-lush transition-colors duration-300 block">
                  {t('footer.concierge_inquiries')}
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-lush hover:text-white font-semibold transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>{t('footer.staff_portal')}</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-[11px] uppercase tracking-[0.3em] font-bold mb-6">
              {t('footer.contact_title')}
            </h5>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-lush shrink-0 mt-0.5" />
                <span>{displayAddress}</span>
              </li>
              <li>{displayEmail}</li>
              <li>{displayPhone}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
          <div className="flex items-center gap-3">
            <span className="text-lush">✦</span>
            <span>{t('footer.est')}</span>
            <span className="hidden md:block opacity-20">|</span>
            <span>{t('footer.sanctuary')}</span>
          </div>
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-white transition-colors text-lush">
              {t('footer.privacy')}
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors text-lush">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon, href, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-lush hover:border-lush hover:-translate-y-1 transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={18} strokeWidth={1.5} />
    </a>
  );
}
