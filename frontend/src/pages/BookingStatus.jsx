import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import { Search, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { useCurrency } from '../context/currencyHelpers.js';
import { useSiteSettings } from '../hooks/useSiteSettings.js';
import { BOOKING_STATUSES, getOptionLabel } from '../lib/constants.js';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp.js';

export default function BookingStatus() {
  const { t, i18n } = useTranslation();
  const [params] = useSearchParams();
  const { formatPrice } = useCurrency();
  const { settings } = useSiteSettings();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const [referenceCode, setReferenceCode] = useState(params.get('ref') || '');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!supabase) {
      toast.error('Booking lookup requires a live Supabase connection.');
      return;
    }
    setLoading(true);
    setSearched(false);
    try {
      const { data, error } = await supabase.rpc('lookup_booking_status', {
        p_reference_code: referenceCode.trim(),
        p_email: email.trim(),
      });
      if (error) throw error;
      setResult(data || null);
      setSearched(true);
    } catch (err) {
      toast.error(err.message || 'Lookup failed.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappHelpUrl = buildGeneralWhatsAppUrl({
    phone: settings.whatsapp_number,
    message:
      lang === 'fr'
        ? `Bonjour, je souhaite vérifier le statut de ma réservation ${referenceCode}.`
        : `Hello, I would like to check on booking reference ${referenceCode}.`,
  });

  return (
    <div className="min-h-screen bg-sand/30 flex flex-col">
      <SEO title={t('booking_status.title')} description={t('booking_status.subtitle')} path="/booking-status" />
      <Navbar />

      <main className="flex-1 pt-28 pb-24 container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <span className="text-lush font-black tracking-[0.4em] uppercase text-[10px] block mb-3">
            {t('booking_status.tag')}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-volcanic italic mb-4">
            {t('booking_status.title')}
          </h1>
          <p className="text-volcanic/60">{t('booking_status.subtitle')}</p>
        </div>

        <form
          onSubmit={handleLookup}
          className="bg-white rounded-3xl p-8 shadow-resort border border-sand space-y-5"
        >
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1.5">
              {t('booking_status.reference_label')}
            </label>
            <input
              type="text"
              required
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              placeholder={t('booking_status.reference_placeholder')}
              className="w-full bg-sand/30 border border-sand rounded-xl px-4 py-3 text-sm outline-none focus:border-lush font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1.5">
              {t('booking_status.email_label')}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('booking_status.email_placeholder')}
              className="w-full bg-sand/30 border border-sand rounded-xl px-4 py-3 text-sm outline-none focus:border-lush"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-volcanic hover:bg-ocean text-white font-black py-4 rounded-xl uppercase text-xs tracking-[0.25em] flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" />
            {loading ? t('booking_status.checking') : t('booking_status.submit')}
          </button>
        </form>

        {searched && !result && (
          <div className="mt-8 bg-white rounded-2xl p-6 text-center border border-sand text-volcanic/70">
            {t('booking_status.not_found')}
          </div>
        )}

        {result && (
          <div className="mt-8 bg-white rounded-3xl p-8 shadow-resort border border-sand space-y-4">
            <div className="flex justify-between items-center border-b border-sand pb-4">
              <span className="font-mono font-bold text-ocean text-lg">{result.reference_code}</span>
              <span className="px-3 py-1 rounded-full bg-lush/15 text-lush text-xs font-bold uppercase tracking-wider">
                {getOptionLabel(BOOKING_STATUSES, result.status, lang)}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-volcanic/50 font-bold">
                  {t('booking_status.suite_label')}
                </p>
                <p className="font-semibold text-volcanic">{result.room_type_name}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-volcanic/50 font-bold">
                  {t('booking_status.dates_label')}
                </p>
                <p className="font-semibold text-volcanic">
                  {result.check_in_date} → {result.check_out_date}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-volcanic/50 font-bold">
                  {t('booking_status.total_label')}
                </p>
                <p className="font-semibold text-ocean">{formatPrice(result.estimated_total)}</p>
              </div>
              {result.external_reference && (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-volcanic/50 font-bold">
                    {t('booking_status.pms_ref_label')}
                  </p>
                  <p className="font-mono font-bold text-emerald-700">{result.external_reference}</p>
                </div>
              )}
            </div>

            <a
              href={whatsappHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {t('booking_status.whatsapp_help')}
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
