import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import {
  UtensilsCrossed,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  CheckCircle2,
  ChefHat,
  Flame,
  Bell,
  RefreshCw,
  MessageCircle,
  Printer,
  AlertTriangle,
  ArrowLeft,
  ExternalLink,
  XCircle,
  Loader2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import SEO from '../components/SEO';
import { supabase } from '../lib/supabase';
import { useCurrency } from '../context/currencyHelpers';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useAuth } from '../context/authHelpers';
import {
  MENU_ORDER_STATUSES,
  FULFILLMENT_TYPES,
  MENU_CATEGORIES,
  MEAL_PERIODS,
  DIETARY_TAGS,
  ALLERGENS,
  getOptionLabel,
} from '../lib/constants';
import { formatReadableDate } from '../lib/currency';
import {
  buildOrderOnlineUrl,
  buildMenuOrderWhatsAppUrl,
  buildGeneralWhatsAppUrl,
} from '../lib/whatsapp';

const PROGRESS_STEPS = [
  { key: 'pending', icon: Bell },
  { key: 'confirmed', icon: CheckCircle2 },
  { key: 'preparing', icon: Flame },
  { key: 'ready', icon: ChefHat },
];

const STATUS_BADGE_MAP = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-sky-100 text-sky-800 border-sky-200',
  preparing: 'bg-orange-100 text-orange-800 border-orange-200',
  ready: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  completed: 'bg-slate-200 text-slate-800 border-slate-300',
  cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
};

const ACTIVE_POLL_STATUSES = new Set(['pending', 'confirmed', 'preparing', 'ready']);

export default function OrderDetail() {
  const { referenceCode = '' } = useParams();
  const [searchParams] = useSearchParams();
  const viewToken = searchParams.get('t') || '';

  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const { formatPrice } = useCurrency();
  const { settings } = useSiteSettings();
  const { hasRole } = useAuth();
  const isStaff = hasRole(['admin', 'manager', 'chef', 'front_desk']);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase && referenceCode));
  const [refreshing, setRefreshing] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [internalNotesDraft, setInternalNotesDraft] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const loadOrder = useCallback(
    async ({ silent = false } = {}) => {
      if (!supabase || !referenceCode) return null;
      const { data, error } = await supabase.rpc('get_menu_order_by_token', {
        p_reference_code: referenceCode,
        p_token: viewToken || null,
      });

      if (error && !silent) {
        toast.error(error.message || 'Unable to load order');
      }

      if (data) {
        setOrder(data);
        setInternalNotesDraft(data.internal_notes || '');
      } else {
        setOrder(null);
      }
      return data;
    },
    [referenceCode, viewToken]
  );

  useEffect(() => {
    let cancelled = false;
    if (!supabase || !referenceCode) return undefined;

    (async () => {
      const { data } = await supabase.rpc('get_menu_order_by_token', {
        p_reference_code: referenceCode,
        p_token: viewToken || null,
      });
      if (cancelled) return;
      if (data) {
        setOrder(data);
        setInternalNotesDraft(data.internal_notes || '');
      } else {
        setOrder(null);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [referenceCode, viewToken, isStaff]);

  useEffect(() => {
    if (!order || !ACTIVE_POLL_STATUSES.has(order.status) || !supabase) return undefined;
    const timer = window.setInterval(() => {
      loadOrder({ silent: true });
    }, 20000);
    return () => window.clearInterval(timer);
  }, [order, loadOrder]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      await loadOrder({ silent: false });
    } finally {
      setRefreshing(false);
    }
  };

  const handleStaffStatusChange = async (nextStatus) => {
    if (!supabase || !order?.id || !isStaff) return;
    setUpdatingStatus(true);
    try {
      const nowIso = new Date().toISOString();
      const payload = { status: nextStatus };
      if (nextStatus === 'confirmed' && !order.confirmed_at) payload.confirmed_at = nowIso;
      if (nextStatus === 'ready' && !order.ready_at) payload.ready_at = nowIso;
      if (nextStatus === 'completed' && !order.completed_at) payload.completed_at = nowIso;
      if (nextStatus === 'cancelled' && !order.cancelled_at) payload.cancelled_at = nowIso;

      const { error } = await supabase
        .from('menu_orders')
        .update(payload)
        .eq('id', order.id);

      if (error) throw error;
      toast.success(
        `Order updated to ${getOptionLabel(MENU_ORDER_STATUSES, nextStatus, lang)}`
      );
      await loadOrder({ silent: true });
    } catch (err) {
      toast.error(err?.message || 'Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveInternalNotes = async () => {
    if (!supabase || !order?.id || !isStaff) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from('menu_orders')
        .update({ internal_notes: internalNotesDraft.trim() || null })
        .eq('id', order.id);
      if (error) throw error;
      toast.success('Internal kitchen notes saved');
      await loadOrder({ silent: true });
    } catch (err) {
      toast.error(err?.message || 'Failed to save internal notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const kitchenPhone = settings?.kitchen_whatsapp_number || settings?.whatsapp_number;

  const onlineUrl = useMemo(() => {
    if (!order?.reference_code) return '';
    return buildOrderOnlineUrl({
      referenceCode: order.reference_code,
      viewToken: order.view_token || viewToken,
    });
  }, [order, viewToken]);

  const guestToKitchenWaUrl = useMemo(() => {
    if (!order) return '';
    return buildMenuOrderWhatsAppUrl({
      phone: kitchenPhone,
      order,
      onlineUrl,
      formatPrice,
      language: lang,
    });
  }, [order, kitchenPhone, onlineUrl, formatPrice, lang]);

  const staffToGuestWaUrl = useMemo(() => {
    if (!order?.guest_phone) return '#';
    const statusLabel = getOptionLabel(MENU_ORDER_STATUSES, order.status, lang);
    const msg =
      lang === 'fr'
        ? `Bonjour ${order.guest_name}, mise à jour pour votre commande ${order.reference_code} au New Waves Resort : statut actuel "${statusLabel}". Ticket en ligne : ${onlineUrl}`
        : `Hello ${order.guest_name}, update on your New Waves Resort menu order ${order.reference_code}: current status is "${statusLabel}". Online ticket: ${onlineUrl}`;
    return buildGeneralWhatsAppUrl({ phone: order.guest_phone, message: msg });
  }, [order, lang, onlineUrl]);

  const activeStepIndex = useMemo(() => {
    if (!order) return -1;
    if (order.status === 'completed') return PROGRESS_STEPS.length;
    return PROGRESS_STEPS.findIndex((s) => s.key === order.status);
  }, [order]);

  const formattedTime = useMemo(() => {
    if (!order?.created_at) return '';
    try {
      return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Africa/Douala',
      }).format(new Date(order.created_at));
    } catch {
      return '';
    }
  }, [order, lang]);

  return (
    <div className="min-h-screen bg-sand/25 flex flex-col">
      <SEO
        title={`Order ${referenceCode || ''}`.trim()}
        description="Live kitchen order ticket and preparation tracker at New Waves Resort, Ngeme Limbe."
        path={`/order/${encodeURIComponent(referenceCode)}`}
      />

      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 print:pt-4 print:pb-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {loading ? (
            <div className="bg-white rounded-3xl border border-sand p-12 text-center shadow-sm space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-ocean mx-auto" />
              <p className="text-sm text-volcanic/65">
                {t('dining.order.loading_ticket', 'Loading kitchen order ticket...')}
              </p>
            </div>
          ) : !order ? (
            <div className="bg-white rounded-3xl border border-sand p-10 sm:p-14 text-center shadow-sm space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-volcanic/60">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-serif text-midnight">
                  {t('dining.order.not_found_title', 'Order Ticket Not Found')}
                </h1>
                <p className="text-sm text-volcanic/70 leading-relaxed">
                  {t(
                    'dining.order.not_found_desc',
                    'Please check that you opened the complete order link shared after checkout, or browse our menu to place a new order.'
                  )}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/services/dining"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0e1a28] hover:bg-ocean text-white hover:text-white text-xs font-bold uppercase tracking-[0.18em] transition-all shadow-md"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('dining.order.back_to_menu', 'Explore Daily Menu')}</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Staff / Chef Control Deck (strictly visible to authenticated staff only) */}
              {isStaff && (
                <section className="print:hidden bg-white rounded-3xl border-2 border-ocean/25 p-5 sm:p-6 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-9 h-9 rounded-xl bg-ocean/10 text-ocean flex items-center justify-center">
                        <ChefHat className="w-5 h-5" />
                      </span>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-ocean">
                          Chef & Staff Live Controls
                        </p>
                        <h2 className="text-base font-bold text-midnight">
                          Update Ticket {order.reference_code}
                        </h2>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {order.guest_phone && (
                        <a
                          href={staffToGuestWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Guest</span>
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0e1a28] hover:bg-ocean text-white hover:text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Ticket</span>
                      </button>
                      <Link
                        to="/admin/orders"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-volcanic text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>All Kitchen Orders</span>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { status: 'confirmed', label: 'Confirm Order' },
                      { status: 'preparing', label: 'Start Preparing' },
                      { status: 'ready', label: 'Mark Ready' },
                      { status: 'completed', label: 'Mark Completed' },
                      { status: 'cancelled', label: 'Cancel Order' },
                    ].map((btn) => {
                      const isCurrent = order.status === btn.status;
                      const isCancel = btn.status === 'cancelled';
                      return (
                        <button
                          key={btn.status}
                          type="button"
                          disabled={updatingStatus || isCurrent}
                          onClick={() => handleStaffStatusChange(btn.status)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 ${
                            isCurrent
                              ? 'bg-[#0e1a28] text-white ring-2 ring-ocean/30'
                              : isCancel
                                ? 'bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200'
                                : 'bg-slate-100 hover:bg-[#0e1a28] text-volcanic hover:text-white border border-slate-200'
                          }`}
                        >
                          {btn.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                    <label className="flex-1 block">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-volcanic/60 mb-1">
                        Internal Kitchen Notes (Staff Only)
                      </span>
                      <textarea
                        rows={2}
                        value={internalNotesDraft}
                        onChange={(e) => setInternalNotesDraft(e.target.value)}
                        placeholder="Station assignment, VIP priority, waiter handoff notes..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm text-volcanic focus:outline-none focus:ring-2 focus:ring-ocean/25"
                      />
                    </label>
                    <button
                      type="button"
                      disabled={savingNotes}
                      onClick={handleSaveInternalNotes}
                      className="px-5 py-2.5 rounded-xl bg-[#0e1a28] hover:bg-ocean disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                    >
                      {savingNotes ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>
                </section>
              )}

              {/* Dark Header Banner */}
              <section className="bg-[#0e1a28] text-white rounded-3xl p-6 sm:p-9 shadow-xl border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-sand">
                      {t('dining.order.ticket_eyebrow', 'New Waves Resort • Kitchen Order Ticket')}
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight">
                      {order.reference_code}
                    </h1>
                    <p className="text-xs sm:text-sm text-white/70">
                      {formatReadableDate(order.service_date, lang)}
                      {formattedTime ? ` • ${formattedTime}` : ''}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        STATUS_BADGE_MAP[order.status] || STATUS_BADGE_MAP.pending
                      }`}
                    >
                      {getOptionLabel(MENU_ORDER_STATUSES, order.status, lang)}
                    </span>

                    <button
                      type="button"
                      onClick={handleManualRefresh}
                      disabled={refreshing}
                      aria-label={t('dining.order.refresh', 'Refresh status')}
                      className="print:hidden inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                      <span>{t('dining.order.refresh_btn', 'Refresh')}</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                        {t('dining.order.fulfillment_label', 'Service Type')}
                      </p>
                      <p className="text-white font-medium">
                        {getOptionLabel(FULFILLMENT_TYPES, order.fulfillment_type, lang)}
                        {order.location_label ? ` • ${order.location_label}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                        {t('dining.order.preferred_time', 'Preferred Serving Time')}
                      </p>
                      <p className="text-white font-medium">
                        {order.preferred_time ||
                          (lang === 'fr' ? 'Dès que possible' : 'As soon as possible')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Users className="w-4 h-4 text-sand shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                        {t('dining.order.guests_count', 'Party Size')}
                      </p>
                      <p className="text-white font-medium">
                        {order.guests_count}{' '}
                        {Number(order.guests_count) === 1
                          ? lang === 'fr'
                            ? 'personne'
                            : 'guest'
                          : lang === 'fr'
                            ? 'personnes'
                            : 'guests'}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4-Step Kitchen Progress Tracker */}
              {order.status === 'cancelled' ? (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 flex items-center gap-3 text-rose-800">
                  <XCircle className="w-6 h-6 shrink-0 text-rose-600" />
                  <div>
                    <p className="font-bold text-sm">
                      {t('dining.order.cancelled_banner_title', 'Order Cancelled')}
                    </p>
                    <p className="text-xs text-rose-700 mt-0.5">
                      {t(
                        'dining.order.cancelled_banner_desc',
                        'This menu order has been cancelled. Contact our kitchen via WhatsApp if you would like to place a revised order.'
                      )}
                    </p>
                  </div>
                </div>
              ) : (
                <section className="bg-white rounded-3xl border border-sand p-5 sm:p-7 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-ocean">
                      {t('dining.order.tracker_title', 'Live Kitchen Preparation Status')}
                    </p>
                    {order.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {getOptionLabel(MENU_ORDER_STATUSES, 'completed', lang)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PROGRESS_STEPS.map((step, idx) => {
                      const StepIcon = step.icon;
                      const reached = activeStepIndex >= idx;
                      const isCurrent = order.status === step.key;
                      return (
                        <div
                          key={step.key}
                          className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 ${
                            isCurrent
                              ? 'bg-[#0e1a28] text-white border-[#0e1a28] shadow-md'
                              : reached
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                : 'bg-slate-50 text-volcanic/50 border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              isCurrent
                                ? 'bg-sand text-[#0e1a28]'
                                : reached
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 text-volcanic/45'
                            }`}
                          >
                            <StepIcon className="w-4 h-4" />
                          </span>
                          <span className="text-xs font-bold leading-snug">
                            {getOptionLabel(MENU_ORDER_STATUSES, step.key, lang)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Visual Itemized Dishes List */}
              <section className="bg-white rounded-3xl border border-sand p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-sand pb-4">
                  <h2 className="text-2xl font-serif text-midnight">
                    {t('dining.order.items_heading', 'Ordered Dishes')}
                  </h2>
                  <span className="text-xs font-bold uppercase tracking-wider text-volcanic/60">
                    {(order.items || []).reduce(
                      (sum, item) => sum + Number(item.quantity || 0),
                      0
                    )}{' '}
                    {t('dining.order.items_count_label', 'items')}
                  </span>
                </div>

                <div className="divide-y divide-sand/70">
                  {(order.items || []).map((item, idx) => {
                    const dishName =
                      lang === 'fr' ? item.name_fr || item.name_en : item.name_en || item.name_fr;
                    const categoryLabel = item.category
                      ? getOptionLabel(MENU_CATEGORIES, item.category, lang)
                      : '';
                    const periodLabel = item.meal_period
                      ? getOptionLabel(MEAL_PERIODS, item.meal_period, lang)
                      : '';
                    const tags = Array.isArray(item.dietary_tags) ? item.dietary_tags : [];
                    const allergens = Array.isArray(item.allergens) ? item.allergens : [];

                    return (
                      <div
                        key={item.id || `${item.menu_item_id}-${idx}`}
                        className="py-5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                      >
                        <div className="flex items-start gap-4 min-w-0">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-sand/30 shrink-0 flex items-center justify-center border border-sand/60">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={dishName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UtensilsCrossed className="w-7 h-7 text-ocean/45" />
                            )}
                          </div>

                          <div className="space-y-1.5 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#0e1a28] text-white text-xs font-bold">
                                {item.quantity}×
                              </span>
                              <h3 className="text-lg font-serif font-semibold text-midnight">
                                {dishName}
                              </h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5">
                              {categoryLabel && (
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-volcanic/75 text-[10px] font-bold uppercase tracking-wider">
                                  {categoryLabel}
                                </span>
                              )}
                              {periodLabel && (
                                <span className="px-2 py-0.5 rounded-full bg-ocean/10 text-ocean text-[10px] font-bold uppercase tracking-wider">
                                  {periodLabel}
                                </span>
                              )}
                              {item.prep_station && (
                                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider">
                                  Station: {item.prep_station}
                                </span>
                              )}
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full bg-sand/60 text-volcanic/75 text-[10px] font-bold uppercase tracking-wider"
                                >
                                  {getOptionLabel(DIETARY_TAGS, tag, lang)}
                                </span>
                              ))}
                            </div>

                            {allergens.length > 0 && (
                              <p className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                                <span>
                                  <strong>{t('dining.allergens_label')}:</strong>{' '}
                                  {allergens.map((a) => getOptionLabel(ALLERGENS, a, lang)).join(', ')}
                                </span>
                              </p>
                            )}

                            {item.item_notes && (
                              <div className="text-xs text-volcanic bg-sky-50 border border-sky-200 rounded-lg px-3 py-1.5">
                                <span className="font-bold text-ocean">
                                  {t('dining.order.dish_note_label', 'Prep Note')}:
                                </span>{' '}
                                {item.item_notes}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <p className="text-base font-heading font-bold text-midnight">
                            {formatPrice(item.line_total_xaf)}
                          </p>
                          <p className="text-xs text-volcanic/50">
                            {formatPrice(item.unit_price_xaf)}{' '}
                            {t('dining.order.per_dish', 'each')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Kitchen Instructions + Guest Info + Total */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 bg-white rounded-3xl border border-sand p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-ocean">
                    {t('dining.order.guest_and_notes', 'Guest Details & Chef Notes')}
                  </h3>

                  <div className="space-y-2 text-sm text-volcanic">
                    <p className="font-semibold text-midnight">{order.guest_name}</p>
                    <p className="inline-flex items-center gap-2 text-volcanic/75 mr-4">
                      <Phone className="w-3.5 h-3.5 text-ocean" />
                      <span>{order.guest_phone}</span>
                    </p>
                    {order.guest_email && (
                      <p className="inline-flex items-center gap-2 text-volcanic/75">
                        <Mail className="w-3.5 h-3.5 text-ocean" />
                        <span>{order.guest_email}</span>
                      </p>
                    )}
                  </div>

                  {order.special_instructions && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-950">
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-800 mb-1">
                        {t('dining.order.kitchen_notes', 'Special Kitchen Instructions')}
                      </p>
                      <p>{order.special_instructions}</p>
                    </div>
                  )}
                </div>

                <div className="md:col-span-5 bg-[#0e1a28] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-sand">
                      {t('dining.order.estimated_total', 'Estimated Total')}
                    </p>
                    <p className="text-3xl font-heading font-bold text-white mt-2">
                      {formatPrice(order.total_xaf)}
                    </p>
                  </div>

                  <div className="print:hidden flex flex-col gap-2.5">
                    <a
                      href={guestToKitchenWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full bg-[#15803D] hover:bg-[#166534] text-white hover:text-white text-xs font-bold uppercase tracking-[0.16em] shadow transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>
                        {t('dining.order.message_kitchen_wa', 'Message Kitchen on WhatsApp')}
                      </span>
                    </a>

                    <Link
                      to="/services/dining"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-white/10 hover:bg-white hover:text-[#0e1a28] text-white text-xs font-bold uppercase tracking-[0.16em] transition-colors"
                    >
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>{t('dining.order.order_more', 'Order More Dishes')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
