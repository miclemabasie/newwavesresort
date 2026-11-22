import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  UtensilsCrossed,
  Clock,
  CheckCircle2,
  MessageCircle,
  ExternalLink,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Users,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useMenuCart, getMenuCartKey } from '../../context/menuCartHelpers';
import { useCurrency } from '../../context/currencyHelpers';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { FULFILLMENT_TYPES, getOptionLabel } from '../../lib/constants';
import {
  buildOrderOnlineUrl,
  buildMenuOrderWhatsAppUrl,
} from '../../lib/whatsapp';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const inputCls =
  'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-volcanic text-sm placeholder:text-volcanic/40 focus:outline-none focus:ring-2 focus:ring-ocean/25 focus:border-ocean transition-colors';

function Field({ label, required, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-volcanic/75">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}

export default function MenuOrderModal() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { formatPrice } = useCurrency();
  const { settings } = useSiteSettings();
  const {
    items,
    dailyMenuId,
    itemCount,
    subtotalXaf,
    isCheckoutOpen,
    closeCheckout,
    updateQuantity,
    updateItemNote,
    removeItem,
    clearCart,
  } = useMenuCart();

  const [fulfillmentType, setFulfillmentType] = useState('dine_in');
  const [locationLabel, setLocationLabel] = useState('');
  const [preferredTime, setPreferredTime] = useState(
    lang === 'fr' ? 'Dès que possible' : 'As soon as possible'
  );
  const [guestsCount, setGuestsCount] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showOptionalEmail, setShowOptionalEmail] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const quickTimes = useMemo(
    () =>
      lang === 'fr'
        ? ['Dès que possible', 'Dans 30 min', 'Déjeuner (13h00)', 'Dîner (19h30)']
        : ['As soon as possible', 'In 30 mins', 'Lunch (13:00)', 'Dinner (19:30)'],
    [lang]
  );

  const kitchenPhone = settings?.kitchen_whatsapp_number || settings?.whatsapp_number;

  const onlineTicketUrl = useMemo(() => {
    if (!submittedOrder?.reference_code) return '';
    return buildOrderOnlineUrl({
      referenceCode: submittedOrder.reference_code,
      viewToken: submittedOrder.view_token,
    });
  }, [submittedOrder]);

  const onlineTicketPath = useMemo(() => {
    if (!submittedOrder?.reference_code) return '/services/dining';
    const token = submittedOrder.view_token
      ? `?t=${encodeURIComponent(submittedOrder.view_token)}`
      : '';
    return `/order/${encodeURIComponent(submittedOrder.reference_code)}${token}`;
  }, [submittedOrder]);

  const whatsappUrl = useMemo(() => {
    if (!submittedOrder) return '';
    return buildMenuOrderWhatsAppUrl({
      phone: kitchenPhone,
      order: submittedOrder,
      onlineUrl: onlineTicketUrl,
      formatPrice,
      language: lang,
    });
  }, [submittedOrder, kitchenPhone, onlineTicketUrl, formatPrice, lang]);

  const handleClose = () => {
    setErrorMsg('');
    setSubmittedOrder(null);
    closeCheckout();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (items.length === 0) {
      setErrorMsg(
        t('dining.order.err_empty', 'Please select at least one dish before placing your order.')
      );
      return;
    }

    if (!guestName.trim()) {
      setErrorMsg(t('dining.order.err_name', 'Please enter your name for the kitchen ticket.'));
      return;
    }

    if (!guestPhone.trim()) {
      setErrorMsg(
        t(
          'dining.order.err_phone',
          'Please provide your phone or WhatsApp number so our chef team can confirm.'
        )
      );
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg(
        t(
          'dining.order.err_unavailable',
          'Online order saving is temporarily unavailable. Please try again in a moment.'
        )
      );
      return;
    }

    setSubmitting(true);
    try {
      const missingSlugs = [];

      items.forEach((item) => {
        const idStr = String(item.menu_item_id || '');
        if (!UUID_REGEX.test(idStr) && item.slug) {
          missingSlugs.push(item.slug);
        }
      });

      const resolvedBySlug = new Map();
      if (missingSlugs.length > 0) {
        const { data: liveRows, error: lookupError } = await supabase
          .from('menu_items')
          .select('id, slug')
          .in('slug', missingSlugs)
          .eq('is_active', true);

        if (lookupError) throw lookupError;
        (liveRows || []).forEach((row) => resolvedBySlug.set(row.slug, row.id));
      }

      const rpcItems = [];
      for (const item of items) {
        let resolvedMenuItemId = String(item.menu_item_id || '');
        if (!UUID_REGEX.test(resolvedMenuItemId)) {
          const matchedId = item.slug ? resolvedBySlug.get(item.slug) : null;
          if (!matchedId) {
            throw new Error(
              t(
                'dining.order.err_dish_sync',
                'Some dishes need a quick menu refresh. Please reload the menu and re-select.'
              )
            );
          }
          resolvedMenuItemId = matchedId;
        }

        const entryIdStr = String(item.daily_menu_entry_id || '');
        const validEntryId = UUID_REGEX.test(entryIdStr) ? entryIdStr : null;

        rpcItems.push({
          menu_item_id: resolvedMenuItemId,
          daily_menu_entry_id: validEntryId,
          quantity: Math.max(1, Math.min(50, Number(item.quantity || 1))),
          notes: item.notes?.trim() || null,
          meal_period: item.meal_period || null,
        });
      }

      const validDailyMenuId =
        dailyMenuId && UUID_REGEX.test(String(dailyMenuId)) ? dailyMenuId : null;

      const { data, error } = await supabase.rpc('create_menu_order', {
        p_daily_menu_id: validDailyMenuId,
        p_fulfillment_type: fulfillmentType,
        p_location_label: locationLabel.trim() || null,
        p_preferred_time: preferredTime.trim() || null,
        p_guests_count: Math.max(1, Math.min(40, Number(guestsCount || 1))),
        p_guest_name: guestName.trim(),
        p_guest_phone: guestPhone.trim(),
        p_guest_email: guestEmail.trim() || null,
        p_special_instructions: specialInstructions.trim() || null,
        p_items: rpcItems,
      });

      if (error) throw error;
      if (!data?.id || !data?.reference_code || !data?.view_token) {
        throw new Error('Incomplete order confirmation returned by the server.');
      }

      setSubmittedOrder(data);
      clearCart();
    } catch (err) {
      setErrorMsg(
        err?.message ||
          t(
            'dining.order.err_generic',
            'Unable to place your menu order right now. Please try again.'
          )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const locationPlaceholder =
    fulfillmentType === 'room_service'
      ? lang === 'fr'
        ? 'Ex: Suite 104, Villa Océan'
        : 'e.g., Suite 104, Ocean Villa'
      : fulfillmentType === 'takeaway'
        ? lang === 'fr'
          ? 'Ex: Réception / Retrait direct'
          : 'e.g., Front Desk Pickup'
        : lang === 'fr'
          ? 'Ex: Table 6, Terrasse ou Piscine'
          : 'e.g., Table 6, Terrace, or Poolside';

  const locationFieldLabel =
    fulfillmentType === 'room_service'
      ? t('dining.order.location_room', 'Room / Suite / Villa')
      : fulfillmentType === 'takeaway'
        ? t('dining.order.location_pickup', 'Pickup Note (Optional)')
        : t('dining.order.location_table', 'Table / Seating Area');

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={t('dining.order.modal_title', 'Menu Order')}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label={t('common.close', 'Close')}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-volcanic transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedOrder ? (
              <div className="p-6 sm:p-10 overflow-y-auto">
                <div className="max-w-xl mx-auto text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700 mb-2">
                      {t('dining.order.saved_eyebrow', 'Order Saved & Ready for Kitchen')}
                    </p>
                    <h2 className="text-3xl font-heading font-light text-volcanic">
                      {t('dining.order.confirmed_title', 'Ticket')}{' '}
                      <span className="font-semibold text-ocean">
                        {submittedOrder.reference_code}
                      </span>
                    </h2>
                    <p className="mt-2 text-sm text-volcanic/70 font-light">
                      {t(
                        'dining.order.whatsapp_instruction',
                        'Click Proceed to WhatsApp below to send your full dish selection and direct online ticket link straight to our Chef & Dining team.'
                      )}
                    </p>
                  </div>

                  <div className="text-left bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 text-xs">
                      <span className="font-semibold text-volcanic">
                        {getOptionLabel(FULFILLMENT_TYPES, submittedOrder.fulfillment_type, lang)}
                        {submittedOrder.location_label
                          ? ` • ${submittedOrder.location_label}`
                          : ''}
                      </span>
                      <span className="text-volcanic/60">
                        {submittedOrder.preferred_time ||
                          (lang === 'fr' ? 'Dès que possible' : 'As soon as possible')}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {(submittedOrder.items || []).map((item, idx) => (
                        <li
                          key={`${item.menu_item_id}-${idx}`}
                          className="flex items-start justify-between gap-4 text-sm"
                        >
                          <div>
                            <p className="font-medium text-volcanic">
                              <span className="text-ocean font-bold mr-1.5">
                                {item.quantity}×
                              </span>
                              {lang === 'fr' ? item.name_fr || item.name_en : item.name_en}
                            </p>
                            {item.item_notes && (
                              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-2 py-0.5 mt-1 inline-block">
                                {item.item_notes}
                              </p>
                            )}
                          </div>
                          <span className="font-semibold text-volcanic whitespace-nowrap">
                            {formatPrice(item.line_total_xaf)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {submittedOrder.special_instructions && (
                      <div className="pt-2 border-t border-slate-200 text-xs text-volcanic/75">
                        <span className="font-semibold text-volcanic">
                          {t('dining.order.kitchen_notes', 'Kitchen Notes')}:
                        </span>{' '}
                        {submittedOrder.special_instructions}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-volcanic/60">
                        {t('dining.order.estimated_total', 'Estimated Total')}
                      </span>
                      <span className="text-lg font-heading font-bold text-volcanic">
                        {formatPrice(submittedOrder.total_xaf)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0e1a28]/5 border border-[#0e1a28]/10 rounded-xl p-3.5 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-volcanic/60 mb-1">
                      {t('dining.order.online_link_label', 'Your Live Online Order Link')}
                    </p>
                    <p className="text-xs font-mono text-ocean break-all select-all">
                      {onlineTicketUrl}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-1">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white text-xs font-bold uppercase tracking-[0.18em] shadow-lg transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('dining.order.proceed_whatsapp', 'Proceed to WhatsApp')}</span>
                    </a>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Link
                        to={onlineTicketPath}
                        onClick={handleClose}
                        className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border-2 border-[#0e1a28] text-[#0e1a28] hover:bg-[#0e1a28] hover:text-white text-xs font-bold uppercase tracking-[0.14em] transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>
                          {t('dining.order.view_online_page', 'View Online Order Page')}
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-volcanic/70 hover:text-volcanic hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        {t('common.done', 'Done')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0">
                {/* Left Column: Dark Culinary Tray */}
                <div className="lg:col-span-5 bg-[#0e1a28] text-white p-6 sm:p-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 max-h-[38vh] lg:max-h-[85vh]">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10 shrink-0 pr-8 lg:pr-0">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand">
                        {t('dining.order.selection_eyebrow', 'Culinary Selection')}
                      </p>
                      <h3 className="text-xl font-heading font-normal text-white mt-0.5">
                        {t('dining.order.your_tray', 'Your Menu Tray')}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-sand text-xs font-semibold">
                      {itemCount}{' '}
                      {itemCount === 1
                        ? t('dining.order.dish_singular', 'dish')
                        : t('dining.order.dish_plural', 'dishes')}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                      <UtensilsCrossed className="w-10 h-10 text-sand/50 mb-3" />
                      <p className="text-sm text-white/75">
                        {t('dining.order.empty_tray', 'Your order tray is currently empty.')}
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                      {items.map((item) => {
                        const cartKey = getMenuCartKey(
                          item.menu_item_id,
                          item.daily_menu_entry_id
                        );
                        const name = lang === 'fr' ? item.name_fr || item.name_en : item.name_en;
                        const lineTotal =
                          Number(item.unit_price_xaf || 0) * Number(item.quantity || 1);

                        return (
                          <div
                            key={cartKey}
                            className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2.5"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
                                {item.image_url ? (
                                  <img
                                    src={item.image_url}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <UtensilsCrossed className="w-5 h-5 text-sand/60" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-sm font-medium text-white leading-snug line-clamp-2">
                                    {name}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => removeItem(cartKey)}
                                    aria-label={t('dining.order.remove_dish', 'Remove dish')}
                                    className="text-white/40 hover:text-red-300 transition-colors shrink-0 cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>

                                <div className="mt-2 flex items-center justify-between gap-2">
                                  <div className="inline-flex items-center rounded-full bg-white/10 border border-white/15">
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(cartKey, -1)}
                                      aria-label="Decrease quantity"
                                      className="p-1.5 text-white hover:text-sand transition-colors cursor-pointer"
                                    >
                                      <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="px-2.5 text-xs font-bold text-white min-w-[24px] text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(cartKey, 1)}
                                      aria-label="Increase quantity"
                                      className="p-1.5 text-white hover:text-sand transition-colors cursor-pointer"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  <span className="text-xs font-semibold text-sand whitespace-nowrap">
                                    {formatPrice(lineTotal)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <input
                              type="text"
                              value={item.notes || ''}
                              onChange={(e) => updateItemNote(cartKey, e.target.value)}
                              maxLength={240}
                              placeholder={t(
                                'dining.order.dish_note_placeholder',
                                'Optional prep note (e.g. mild spice, sauce on side)...'
                              )}
                              className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/35 focus:outline-none focus:border-sand/60"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 shrink-0 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">
                        {t('dining.order.estimated_total', 'Estimated Total')}
                      </p>
                      <p className="text-xl font-heading font-semibold text-sand">
                        {formatPrice(subtotalXaf)}
                      </p>
                    </div>
                    {items.length > 0 && (
                      <button
                        type="button"
                        onClick={clearCart}
                        className="text-[11px] uppercase tracking-wider text-white/50 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        {t('dining.order.clear_all', 'Clear')}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: Guest Details & Submit */}
                <form
                  onSubmit={handleSubmit}
                  className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto space-y-5 bg-white"
                >
                  <div className="pr-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ocean">
                      {t('dining.order.kitchen_direct', 'Direct to Kitchen & WhatsApp')}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-light text-volcanic mt-1">
                      {t('dining.order.complete_details', 'Complete Your Order')}
                    </h2>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-volcanic/75">
                      {t('dining.order.fulfillment_label', 'Service Type')}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {FULFILLMENT_TYPES.map((opt) => {
                        const active = fulfillmentType === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setFulfillmentType(opt.value)}
                            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-left sm:text-center ${
                              active
                                ? 'bg-[#0e1a28] text-white border-[#0e1a28] shadow-sm'
                                : 'bg-slate-50 text-volcanic border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {lang === 'fr' ? opt.labelFr : opt.labelEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={locationFieldLabel}>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-volcanic/35 absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          value={locationLabel}
                          onChange={(e) => setLocationLabel(e.target.value)}
                          placeholder={locationPlaceholder}
                          className={`${inputCls} pl-10`}
                        />
                      </div>
                    </Field>

                    <Field label={t('dining.order.guests_count', 'Party Size')}>
                      <div className="relative">
                        <Users className="w-4 h-4 text-volcanic/35 absolute left-3.5 top-3.5" />
                        <input
                          type="number"
                          min="1"
                          max="40"
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(e.target.value)}
                          className={`${inputCls} pl-10`}
                        />
                      </div>
                    </Field>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-volcanic/75">
                      {t('dining.order.preferred_time', 'Preferred Serving Time')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {quickTimes.map((preset) => {
                        const selected = preferredTime === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setPreferredTime(preset)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                              selected
                                ? 'bg-ocean text-white border-ocean'
                                : 'bg-slate-50 text-volcanic/80 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {preset}
                          </button>
                        );
                      })}
                    </div>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-volcanic/35 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        placeholder={
                          lang === 'fr'
                            ? 'Ou préciser une heure (ex: 18h45)'
                            : 'Or specify a custom time (e.g. 18:45)'
                        }
                        className={`${inputCls} pl-10`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t('dining.order.guest_name', 'Your Name')} required>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder={lang === 'fr' ? 'Ex: Jean Mbarga' : 'e.g., Jean Mbarga'}
                        className={inputCls}
                      />
                    </Field>

                    <Field label={t('dining.order.guest_phone', 'Phone / WhatsApp')} required>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+237 6XX XXX XXX"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field
                    label={t(
                      'dining.order.kitchen_notes_label',
                      'Chef & Allergy Instructions (Optional)'
                    )}
                  >
                    <textarea
                      rows={2}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder={t(
                        'dining.order.kitchen_notes_placeholder',
                        'Allergies, dietary notes, or serving preferences...'
                      )}
                      className={inputCls}
                    />
                  </Field>

                  <div>
                    <button
                      type="button"
                      onClick={() => setShowOptionalEmail((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean hover:underline cursor-pointer"
                    >
                      {showOptionalEmail ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {t('dining.order.toggle_email', 'Add email address (optional)')}
                      </span>
                    </button>

                    {showOptionalEmail && (
                      <div className="mt-2.5">
                        <Field label={t('dining.order.guest_email', 'Email Address')}>
                          <input
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="guest@example.com"
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting || items.length === 0}
                      className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-[#0e1a28] hover:bg-ocean disabled:opacity-50 text-white hover:text-white text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t('dining.order.submitting', 'Creating Kitchen Order...')}</span>
                        </>
                      ) : (
                        <span>
                          {t('dining.order.submit_btn', 'Place Menu Order')} ({formatPrice(subtotalXaf)})
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
