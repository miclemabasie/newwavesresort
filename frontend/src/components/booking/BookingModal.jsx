import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { X, Coffee, Users, Waves, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase.js';
import { useCurrency } from '../../context/currencyHelpers.js';
import { buildBookingWhatsAppUrl } from '../../lib/whatsapp.js';
import { useSiteSettings } from '../../hooks/useSiteSettings.js';

function defaultDates() {
  const today = new Date();
  const inDate = new Date(today);
  inDate.setDate(inDate.getDate() + 1);
  const outDate = new Date(inDate);
  outDate.setDate(outDate.getDate() + 2);
  return {
    checkIn: inDate.toISOString().slice(0, 10),
    checkOut: outDate.toISOString().slice(0, 10),
  };
}

export default function BookingModal({ room, initialDates, isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const { formatPrice } = useCurrency();
  const { settings } = useSiteSettings();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  const defaults = useMemo(() => defaultDates(), []);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsapp: '',
    nationality: '',
    companyName: '',
    checkIn: initialDates?.checkIn || defaults.checkIn,
    checkOut: initialDates?.checkOut || defaults.checkOut,
    adults: initialDates?.adults || 1,
    children: initialDates?.children || 0,
    roomsRequested: 1,
    specialRequests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setConfirmation(null);
      setForm((prev) => ({
        ...prev,
        checkIn: initialDates?.checkIn || prev.checkIn || defaults.checkIn,
        checkOut: initialDates?.checkOut || prev.checkOut || defaults.checkOut,
        adults: initialDates?.adults || prev.adults || 1,
        children: initialDates?.children ?? prev.children ?? 0,
      }));
    }
  }, [isOpen, room?.id, initialDates, defaults]);

  const roomName = room ? (lang === 'fr' ? room.name_fr : room.name_en) : '';
  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut || form.checkOut <= form.checkIn) return 0;
    const ms = new Date(form.checkOut) - new Date(form.checkIn);
    return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
  }, [form.checkIn, form.checkOut]);

  if (!isOpen || !room) return null;

  const estimatedTotal = nights * Number(room.base_price || 0) * Math.max(1, Number(form.roomsRequested) || 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nights < 1) {
      toast.error(lang === 'fr' ? 'La date de départ doit suivre l’arrivée.' : 'Check-out date must be after check-in.');
      return;
    }

    setSubmitting(true);
    try {
      if (supabase && !String(room.id).startsWith('fallback-')) {
        const { data, error } = await supabase.rpc('create_booking_request', {
          p_room_type_id: room.id,
          p_guest_first_name: form.firstName,
          p_guest_last_name: form.lastName,
          p_guest_email: form.email,
          p_guest_phone: form.phone,
          p_check_in: form.checkIn,
          p_check_out: form.checkOut,
          p_adults: Number(form.adults) || 1,
          p_children: Number(form.children) || 0,
          p_rooms_requested: Number(form.roomsRequested) || 1,
          p_guest_whatsapp: form.whatsapp || form.phone,
          p_guest_nationality: form.nationality,
          p_guest_company_name: form.companyName,
          p_guest_type: form.companyName ? 'corporate' : 'individual',
          p_preferred_language: lang,
          p_special_requests: form.specialRequests,
          p_source: 'website',
        });

        if (error) throw new Error(error.message);

        setConfirmation({
          ...data,
          guest_name: `${form.firstName} ${form.lastName}`.trim(),
          special_requests: form.specialRequests,
        });
      } else {
        // Local fallback preview confirmation
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const rand = Math.floor(1000 + Math.random() * 9000);
        setConfirmation({
          reference_code: `WEB-${datePart}-${rand}`,
          room_type_name: roomName,
          check_in_date: form.checkIn,
          check_out_date: form.checkOut,
          nights,
          rooms_requested: Number(form.roomsRequested) || 1,
          adults: Number(form.adults) || 1,
          children: Number(form.children) || 0,
          estimated_total: estimatedTotal,
          currency: room.currency || 'XAF',
          guest_name: `${form.firstName} ${form.lastName}`.trim(),
          special_requests: form.specialRequests,
        });
      }
      toast.success(lang === 'fr' ? 'Demande enregistrée avec succès.' : 'Booking request received!');
    } catch (err) {
      toast.error(err.message || 'Unable to submit booking request.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappUrl = confirmation
    ? buildBookingWhatsAppUrl({
        phone: settings.whatsapp_number,
        booking: confirmation,
        language: lang,
      })
    : '';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-volcanic/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          className="relative bg-sand w-full max-w-5xl rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl grid lg:grid-cols-12 my-auto max-h-[92vh]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-20 bg-volcanic text-white p-2.5 rounded-full hover:bg-lush transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left summary panel */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-volcanic p-10 text-white flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Waves className="w-full h-full text-white p-12" />
            </div>
            <div className="relative z-10">
              <span className="text-lush font-black tracking-widest text-[10px] uppercase">
                {t('accommodations.modal.title')}
              </span>
              <h2 className="text-3xl font-serif text-white mt-3 mb-4">{roomName}</h2>
              <p className="text-white/70 text-sm mb-8 italic">
                "{t('accommodations.modal.description')}"
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Coffee className="text-lush w-4 h-4 shrink-0" />
                  <span>{t('accommodations.modal.breakfast')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-lush w-4 h-4 shrink-0" />
                  <span>{t('accommodations.modal.concierge')}</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 bg-white/10 rounded-2xl p-6 border border-white/10 mt-8">
              <div className="flex justify-between text-xs text-white/70 mb-2">
                <span>
                  {formatPrice(room.base_price)} {t('accommodations.per_night')}
                </span>
                <span>
                  {nights} {nights === 1 ? t('accommodations.night') : t('accommodations.nights')} ×{' '}
                  {form.roomsRequested}
                </span>
              </div>
              <div className="flex justify-between items-baseline border-t border-white/15 pt-3">
                <span className="text-xs uppercase tracking-widest text-lush font-bold">
                  {t('accommodations.modal.estimated_total')}
                </span>
                <span className="text-2xl font-serif text-white font-bold">
                  {formatPrice(estimatedTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Right form / confirmation */}
          <div className="lg:col-span-7 p-6 md:p-10 bg-white overflow-y-auto max-h-[90vh]">
            {confirmation ? (
              <div className="py-6 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-3xl font-serif text-volcanic mb-2">
                    {t('accommodations.modal.confirmed_title')}
                  </h3>
                  <p className="text-volcanic/60 text-sm max-w-md mx-auto">
                    {t('accommodations.modal.confirmed_subtitle')}
                  </p>
                </div>

                <div className="bg-sand/50 rounded-2xl p-6 text-left space-y-3 border border-sand">
                  <div className="flex justify-between items-center border-b border-volcanic/10 pb-3">
                    <span className="text-[10px] uppercase tracking-widest font-black text-lush">
                      {t('accommodations.modal.reference_code')}
                    </span>
                    <span className="font-mono font-bold text-lg text-ocean">
                      {confirmation.reference_code}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-volcanic/60">{roomName}</span>
                    <span className="font-semibold text-volcanic">
                      {confirmation.check_in_date} → {confirmation.check_out_date}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-volcanic/60">{t('accommodations.modal.estimated_total')}</span>
                    <span className="font-bold text-volcanic">
                      {formatPrice(confirmation.estimated_total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black py-4 px-6 rounded-xl uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {t('accommodations.modal.confirm_whatsapp')}
                  </a>

                  <div className="flex items-center justify-between gap-4 pt-2">
                    <Link
                      to={`/booking-status?ref=${encodeURIComponent(confirmation.reference_code)}`}
                      onClick={onClose}
                      className="text-xs font-bold text-ocean hover:text-lush inline-flex items-center gap-1"
                    >
                      {t('accommodations.modal.track_status')} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-volcanic text-white text-xs font-bold uppercase tracking-widest hover:bg-lush"
                    >
                      {t('accommodations.modal.close')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-serif text-volcanic mb-6">
                  {t('accommodations.modal.booking_title')}
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t('accommodations.modal.arrival')}>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().slice(0, 10)}
                        value={form.checkIn}
                        onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={t('accommodations.modal.departure')}>
                      <input
                        type="date"
                        required
                        min={form.checkIn}
                        value={form.checkOut}
                        onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Field label={t('accommodations.adults')}>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        required
                        value={form.adults}
                        onChange={(e) => setForm({ ...form, adults: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={t('accommodations.children')}>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={form.children}
                        onChange={(e) => setForm({ ...form, children: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={t('accommodations.rooms_requested')}>
                      <input
                        type="number"
                        min={1}
                        max={Math.max(1, Number(room.total_units) || 10)}
                        value={form.roomsRequested}
                        onChange={(e) => setForm({ ...form, roomsRequested: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t('accommodations.modal.first_name')}>
                      <input
                        type="text"
                        required
                        placeholder="Amadou"
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={t('accommodations.modal.last_name')}>
                      <input
                        type="text"
                        required
                        placeholder="Kouyaté"
                        value={form.lastName}
                        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t('accommodations.modal.email')}>
                      <input
                        type="email"
                        required
                        placeholder="name@organization.org"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={t('accommodations.modal.phone')}>
                      <input
                        type="tel"
                        required
                        placeholder="+237 6XX XXX XXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t('accommodations.modal.whatsapp')}>
                      <input
                        type="tel"
                        placeholder="+237 ..."
                        value={form.whatsapp}
                        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                    <Field label={t('accommodations.modal.company_name')}>
                      <input
                        type="text"
                        placeholder="World Bank / FFLC / ..."
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label={t('accommodations.modal.special_requirements')}>
                    <textarea
                      rows={2}
                      placeholder={t('accommodations.modal.special_placeholder')}
                      value={form.specialRequests}
                      onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <div className="lg:hidden flex justify-between items-center bg-sand/50 px-4 py-3 rounded-xl text-sm">
                    <span className="font-semibold text-volcanic/70">
                      {t('accommodations.modal.estimated_total')}
                    </span>
                    <span className="font-serif font-bold text-ocean text-lg">
                      {formatPrice(estimatedTotal)}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-lush hover:bg-volcanic text-white font-black py-4 rounded-xl uppercase text-[10px] tracking-[0.3em] transition-all disabled:opacity-60"
                  >
                    {submitting
                      ? t('accommodations.modal.submitting')
                      : t('accommodations.modal.submit_request')}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const inputCls =
  'w-full bg-sand/40 border border-sand rounded-xl px-4 py-3 text-sm outline-none focus:border-lush transition-colors text-volcanic';

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black uppercase tracking-widest text-lush">
        {label}
      </label>
      {children}
    </div>
  );
}
