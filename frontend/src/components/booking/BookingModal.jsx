import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  X,
  Coffee,
  Users,
  Waves,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase.js';
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
    todayISO: today.toISOString().slice(0, 10),
    checkIn: inDate.toISOString().slice(0, 10),
    checkOut: outDate.toISOString().slice(0, 10),
  };
}

function addDaysISO(dateStr, days) {
  const dt = new Date(`${dateStr}T00:00:00Z`);
  if (Number.isNaN(dt.getTime())) return dateStr;
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
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
    companyName: '',
    checkIn: initialDates?.checkIn || defaults.checkIn,
    checkOut: initialDates?.checkOut || defaults.checkOut,
    adults: initialDates?.adults || 1,
    children: initialDates?.children || 0,
    roomsRequested: 1,
    specialRequests: '',
  });

  const [showOptional, setShowOptional] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setConfirmation(null);
      setSubmitError('');
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

  const estimatedTotal =
    nights * Number(room.base_price || 0) * Math.max(1, Number(form.roomsRequested) || 1);

  const handleCheckInChange = (nextIn) => {
    setForm((prev) => {
      if (!nextIn) return { ...prev, checkIn: nextIn };
      const nextOut = !prev.checkOut || prev.checkOut <= nextIn ? addDaysISO(nextIn, 1) : prev.checkOut;
      return { ...prev, checkIn: nextIn, checkOut: nextOut };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (nights < 1) {
      const msg =
        lang === 'fr'
          ? 'La date de départ doit suivre la date d’arrivée.'
          : 'Check-out date must be after check-in date.';
      setSubmitError(msg);
      toast.error(msg);
      return;
    }

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const companyName = form.companyName.trim();
    const specialRequests = form.specialRequests.trim();

    if (!firstName || !lastName || email.length < 3 || phone.length < 5) {
      const msg =
        lang === 'fr'
          ? 'Veuillez renseigner votre nom complet, email valide et numéro WhatsApp / téléphone.'
          : 'Please enter your first name, last name, valid email, and phone / WhatsApp number.';
      setSubmitError(msg);
      toast.error(msg);
      return;
    }

    setSubmitting(true);
    try {
      const commonDetails = {
        guest_name: `${firstName} ${lastName}`.trim(),
        guest_email: email,
        guest_phone: phone,
        guest_company_name: companyName,
        special_requests: specialRequests,
        nights,
      };

      if (isSupabaseConfigured) {
        if (!supabase) {
          throw new Error('Reservation service is temporarily unavailable. Please try again.');
        }

        let resolvedRoomId = room.id;
        if (!resolvedRoomId || String(resolvedRoomId).startsWith('fallback-')) {
          const { data: liveRoom, error: lookupError } = await supabase
            .from('room_types')
            .select('id')
            .eq('slug', room.slug)
            .eq('is_published', true)
            .maybeSingle();

          if (lookupError || !liveRoom?.id) {
            throw new Error(
              lang === 'fr'
                ? 'Impossible de vérifier cette suite auprès du serveur. Veuillez actualiser la page et réessayer.'
                : 'Unable to verify this suite with our reservation server. Please refresh and try again.',
            );
          }
          resolvedRoomId = liveRoom.id;
        }

        const { data, error } = await supabase.rpc('create_booking_request', {
          p_room_type_id: resolvedRoomId,
          p_guest_first_name: firstName,
          p_guest_last_name: lastName,
          p_guest_email: email,
          p_guest_phone: phone,
          p_check_in: form.checkIn,
          p_check_out: form.checkOut,
          p_adults: Number(form.adults) || 1,
          p_children: Number(form.children) || 0,
          p_rooms_requested: Number(form.roomsRequested) || 1,
          p_guest_whatsapp: phone,
          p_guest_nationality: '',
          p_guest_company_name: companyName,
          p_guest_type: companyName ? 'corporate' : 'individual',
          p_preferred_language: lang,
          p_special_requests: specialRequests,
          p_source: 'website',
        });

        if (error) throw new Error(error.message);
        if (!data?.id || !data?.reference_code) {
          throw new Error('Your booking could not be confirmed by the server. Please try again.');
        }

        setConfirmation({
          ...data,
          ...commonDetails,
        });
      } else {
        // Offline preview only (when Supabase env vars are absent)
        const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const rand = Math.floor(1000 + Math.random() * 9000);
        setConfirmation({
          reference_code: `WEB-${datePart}-${rand}`,
          room_type_name: roomName,
          check_in_date: form.checkIn,
          check_out_date: form.checkOut,
          rooms_requested: Number(form.roomsRequested) || 1,
          adults: Number(form.adults) || 1,
          children: Number(form.children) || 0,
          estimated_total: estimatedTotal,
          currency: room.currency || 'XAF',
          ...commonDetails,
        });
      }

      toast.success(
        lang === 'fr' ? 'Demande de réservation reçue !' : 'Booking request received!',
      );
    } catch (err) {
      const message = err?.message || 'Unable to submit booking request.';
      setSubmitError(message);
      toast.error(message);
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
          className="fixed inset-0 bg-[#0e1a28]/75 backdrop-blur-sm"
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
            className="absolute top-5 right-5 z-20 bg-[#0e1a28] text-white p-2.5 rounded-full hover:bg-lush hover:text-[#0e1a28] transition-colors shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left desktop summary panel */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-[#0e1a28] p-10 text-white flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Waves className="w-full h-full text-white p-12" />
            </div>
            <div className="relative z-10">
              <span className="text-lush font-black tracking-widest text-[10px] uppercase">
                {t('accommodations.modal.title')}
              </span>
              <h2 className="text-3xl font-serif text-white mt-3 mb-4">{roomName}</h2>
              <p className="text-white/75 text-sm mb-8 italic">
                &ldquo;{t('accommodations.modal.description')}&rdquo;
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
              <div className="flex justify-between gap-4 text-xs text-white/75 mb-2">
                <span>
                  {formatPrice(room.base_price)} {t('accommodations.per_night')}
                </span>
                <span className="whitespace-nowrap">
                  {nights} {nights === 1 ? t('accommodations.night') : t('accommodations.nights')} ×{' '}
                  {form.roomsRequested}
                </span>
              </div>
              <div className="flex justify-between items-baseline gap-4 border-t border-white/15 pt-3">
                <span className="text-xs uppercase tracking-widest text-lush font-bold">
                  {t('accommodations.modal.estimated_total')}
                </span>
                <span className="text-2xl font-serif text-white font-bold whitespace-nowrap">
                  {formatPrice(estimatedTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Right form / confirmation */}
          <div className="lg:col-span-7 p-6 md:p-10 bg-white overflow-y-auto max-h-[90vh]">
            {confirmation ? (
              <div className="py-3 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <h3 className="text-3xl font-serif text-[#0e1a28] mb-2">
                    {t('accommodations.modal.confirmed_title')}
                  </h3>
                  <p className="text-volcanic/70 text-sm max-w-md mx-auto leading-relaxed mb-0">
                    {t('accommodations.modal.confirmed_subtitle')}
                  </p>
                </div>

                <div className="bg-[#faf8f4] rounded-2xl p-5 text-left space-y-2.5 border border-sand">
                  <div className="flex justify-between items-center border-b border-volcanic/10 pb-2.5">
                    <span className="text-[10px] uppercase tracking-widest font-black text-lush">
                      {t('accommodations.modal.reference_code')}
                    </span>
                    <span className="font-mono font-bold text-lg text-ocean">
                      {confirmation.reference_code}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm gap-4">
                    <span className="text-volcanic/65">{roomName}</span>
                    <span className="font-semibold text-volcanic text-right">
                      {confirmation.check_in_date} → {confirmation.check_out_date}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-volcanic/65">{t('accommodations.adults')}</span>
                    <span className="font-medium text-volcanic">
                      {confirmation.adults}
                      {Number(confirmation.children) > 0
                        ? ` (+${confirmation.children} ${t('accommodations.children')})`
                        : ''}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm pt-1.5 border-t border-sand">
                    <span className="text-volcanic/65">{t('accommodations.modal.estimated_total')}</span>
                    <span className="font-bold text-ocean text-base">
                      {formatPrice(confirmation.estimated_total)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white font-extrabold py-4 px-6 rounded-xl uppercase text-xs tracking-[0.18em] flex items-center justify-center gap-3 shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" />
                    <span>{t('accommodations.modal.proceed_to_whatsapp')}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                  <p className="text-xs text-emerald-800/80 mb-0">
                    {t('accommodations.modal.whatsapp_ready_hint')}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 pt-3 border-t border-sand">
                  <Link
                    to={`/booking-status?ref=${encodeURIComponent(confirmation.reference_code)}`}
                    onClick={onClose}
                    className="text-xs font-bold text-ocean hover:text-[#0e1a28] inline-flex items-center gap-1"
                  >
                    {t('accommodations.modal.track_status')} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-volcanic hover:bg-[#0e1a28] text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    {t('accommodations.modal.close')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Mobile Suite Header Bar */}
                <div className="lg:hidden flex items-center gap-3.5 bg-[#faf8f4] border border-sand rounded-2xl p-3.5 mb-5 pr-12">
                  <img
                    src={room.cover_image_url || '/assets/general/image14.jpeg'}
                    alt={roomName}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base font-serif text-[#0e1a28] font-bold truncate mb-0.5">
                      {roomName}
                    </h4>
                    <p className="text-xs text-volcanic/70 mb-0">
                      {formatPrice(room.base_price)} {t('accommodations.per_night')} •{' '}
                      <strong className="text-ocean">{formatPrice(estimatedTotal)}</strong> (
                      {nights}{' '}
                      {nights === 1 ? t('accommodations.night') : t('accommodations.nights')})
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-3 mb-5 pr-10">
                  <h3 className="text-2xl font-serif text-[#0e1a28] mb-0">
                    {t('accommodations.modal.booking_title')}
                  </h3>
                  <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-sand/70 text-[11px] font-bold text-ocean whitespace-nowrap">
                    {nights}{' '}
                    {nights === 1 ? t('accommodations.night') : t('accommodations.nights')} •{' '}
                    {formatPrice(estimatedTotal)}
                  </span>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  {/* Block 1: Stay Details */}
                  <div className="bg-[#faf8f4] border border-sand rounded-2xl p-4 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <Field label={t('accommodations.modal.arrival')}>
                        <input
                          type="date"
                          required
                          min={defaults.todayISO}
                          value={form.checkIn}
                          onChange={(e) => handleCheckInChange(e.target.value)}
                          className={inputCls}
                        />
                      </Field>
                      <Field label={t('accommodations.modal.departure')}>
                        <input
                          type="date"
                          required
                          min={form.checkIn || defaults.todayISO}
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
                  </div>

                  {/* Block 2: Guest Contact */}
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                    </div>
                  </div>

                  {/* Optional Organization & Requests Toggle */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowOptional((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-ocean hover:text-[#0e1a28] transition-colors"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${showOptional ? 'rotate-180' : ''}`}
                      />
                      <span>{t('accommodations.modal.optional_details')}</span>
                    </button>

                    {(showOptional || form.companyName || form.specialRequests) && (
                      <div className="mt-3 space-y-3 pt-3 border-t border-sand/60">
                        <Field label={t('accommodations.modal.company_name')}>
                          <input
                            type="text"
                            placeholder="World Bank / FFLC / ..."
                            value={form.companyName}
                            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={t('accommodations.modal.special_requirements')}>
                          <textarea
                            rows={2}
                            placeholder={t('accommodations.modal.special_placeholder')}
                            value={form.specialRequests}
                            onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                            className={`${inputCls} resize-none`}
                          />
                        </Field>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#0e1a28] hover:bg-ocean text-white font-bold py-4 px-6 rounded-xl uppercase text-xs tracking-[0.2em] shadow-lg transition-all disabled:opacity-60"
                  >
                    {submitting
                      ? t('accommodations.modal.submitting')
                      : t('accommodations.modal.submit_request')}
                  </button>

                  <p className="text-xs text-emerald-800 text-center flex items-center justify-center gap-1.5 mb-0">
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{t('accommodations.modal.whatsapp_hint_form')}</span>
                  </p>
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
  'w-full bg-white border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-ocean transition-colors text-volcanic';

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-black uppercase tracking-widest text-volcanic/70">
        {label}
      </label>
      {children}
    </div>
  );
}
