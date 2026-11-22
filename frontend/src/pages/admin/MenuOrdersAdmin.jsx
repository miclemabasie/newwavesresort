import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  Search,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Eye,
  X,
  Clock,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useCurrency } from '../../context/currencyHelpers';
import {
  MENU_ORDER_STATUSES,
  FULFILLMENT_TYPES,
  ALLERGENS,
  getOptionLabel,
} from '../../lib/constants';
import { formatReadableDate } from '../../lib/currency';
import {
  buildOrderOnlineUrl,
  buildGeneralWhatsAppUrl,
} from '../../lib/whatsapp';

const STATUS_BADGE = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  preparing: 'bg-orange-100 text-orange-800',
  ready: 'bg-emerald-100 text-emerald-800',
  completed: 'bg-slate-200 text-slate-800',
  cancelled: 'bg-rose-100 text-rose-800',
};

const NEXT_STEP = {
  pending: { status: 'confirmed', label: 'Confirm' },
  confirmed: { status: 'preparing', label: 'Prepare' },
  preparing: { status: 'ready', label: 'Mark Ready' },
  ready: { status: 'completed', label: 'Complete' },
};

const ACTIVE_STATUSES = new Set(['pending', 'confirmed', 'preparing', 'ready']);

const inp =
  'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-volcanic focus:outline-none focus:ring-2 focus:ring-ocean/30';

export default function MenuOrdersAdmin() {
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('active');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadOrders = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('menu_orders')
      .select('*, items:menu_order_items(*)')
      .order('created_at', { ascending: false })
      .limit(120);

    if (error) {
      toast.error(error.message || 'Unable to load menu orders');
      setLoading(false);
      return;
    }

    const sorted = (data || []).map((order) => ({
      ...order,
      items: [...(order.items || [])].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      ),
    }));
    setOrders(sorted);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    loadOrders();

    const channel = supabase
      .channel('admin-menu-orders-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'menu_orders' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            toast.success(
              `New kitchen order ${payload.new?.reference_code || ''} received!`
            );
          }
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadOrders]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadOrders();
    } finally {
      setRefreshing(false);
    }
  };

  const quickUpdateStatus = async (order, nextStatus) => {
    if (!supabase || !order?.id) return;
    setSaving(true);
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
        `Order ${order.reference_code} -> ${getOptionLabel(MENU_ORDER_STATUSES, nextStatus)}`
      );
      await loadOrders();
    } catch (err) {
      toast.error(err?.message || 'Status update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSelected = async (e) => {
    e.preventDefault();
    if (!selected || !supabase) return;
    setSaving(true);
    try {
      const nowIso = new Date().toISOString();
      const payload = {
        status: selected.status,
        internal_notes: selected.internal_notes?.trim() || null,
      };
      if (selected.status === 'confirmed' && !selected.confirmed_at)
        payload.confirmed_at = nowIso;
      if (selected.status === 'ready' && !selected.ready_at) payload.ready_at = nowIso;
      if (selected.status === 'completed' && !selected.completed_at)
        payload.completed_at = nowIso;
      if (selected.status === 'cancelled' && !selected.cancelled_at)
        payload.cancelled_at = nowIso;

      const { error } = await supabase
        .from('menu_orders')
        .update(payload)
        .eq('id', selected.id);

      if (error) throw error;
      toast.success(`Updated order ${selected.reference_code}`);
      setSelected(null);
      await loadOrders();
    } catch (err) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter === 'active' && !ACTIVE_STATUSES.has(o.status)) return false;
      if (statusFilter !== 'active' && statusFilter !== 'all' && o.status !== statusFilter) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        const itemText = (o.items || [])
          .map((i) => `${i.name_en_snapshot || ''} ${i.name_fr_snapshot || ''}`)
          .join(' ');
        const hay =
          `${o.reference_code} ${o.guest_name} ${o.guest_phone} ${o.location_label || ''} ${itemText}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [orders, statusFilter, search]);

  const activeCount = useMemo(
    () => orders.filter((o) => ACTIVE_STATUSES.has(o.status)).length,
    [orders]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900">
            Menu Orders Inbox
          </h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Live kitchen queue ({activeCount} active orders). Click any ticket or progress it in 1 click.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0e1a28] hover:bg-ocean text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-[#0e1a28] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Active Queue ({activeCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#0e1a28] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All ({orders.length})
          </button>
          {MENU_ORDER_STATUSES.map((st) => (
            <button
              key={st.value}
              type="button"
              onClick={() => setStatusFilter(st.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === st.value
                  ? 'bg-ocean text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st.labelEn}
            </button>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, guest name, phone, location, or dish..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ocean/25"
          />
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
          Loading kitchen orders...
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-2">
          <UtensilsCrossed className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No menu orders match your filter.</p>
          <p className="text-xs text-slate-500">
            New guest orders submitted on the dining pages appear here automatically.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const nextStep = NEXT_STEP[order.status];
            const ticketPath = `/order/${encodeURIComponent(order.reference_code)}${
              order.view_token ? `?t=${encodeURIComponent(order.view_token)}` : ''
            }`;
            const fullUrl = buildOrderOnlineUrl({
              referenceCode: order.reference_code,
              viewToken: order.view_token,
            });
            const statusLabel = getOptionLabel(MENU_ORDER_STATUSES, order.status, 'en');
            const waUrl = order.guest_phone
              ? buildGeneralWhatsAppUrl({
                  phone: order.guest_phone,
                  message: `Hello ${order.guest_name}, update on your New Waves Resort menu order ${order.reference_code}: status is "${statusLabel}". Ticket: ${fullUrl}`,
                })
              : null;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-base text-slate-900">
                        {order.reference_code}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          STATUS_BADGE[order.status] || STATUS_BADGE.pending
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {formatReadableDate(order.service_date, 'en')} • Created{' '}
                      {new Date(order.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-heading font-bold text-slate-900">
                      {formatPrice(order.total_xaf)}
                    </p>
                    <p className="text-xs text-slate-500">
                      {getOptionLabel(FULFILLMENT_TYPES, order.fulfillment_type, 'en')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4 space-y-1.5 text-sm">
                    <p className="font-semibold text-slate-900">{order.guest_name}</p>
                    <p className="text-xs text-slate-600 font-mono">{order.guest_phone}</p>
                    {order.location_label && (
                      <p className="text-xs text-slate-600 inline-flex items-center gap-1 mr-3">
                        <MapPin className="w-3.5 h-3.5 text-ocean" />
                        <span>{order.location_label}</span>
                      </p>
                    )}
                    {order.preferred_time && (
                      <p className="text-xs text-slate-600 inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-ocean" />
                        <span>
                          {order.preferred_time} ({order.guests_count} guests)
                        </span>
                      </p>
                    )}
                    {order.special_instructions && (
                      <p className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <strong>Kitchen note:</strong> {order.special_instructions}
                      </p>
                    )}
                    {order.internal_notes && (
                      <p className="mt-1 p-2 rounded-lg bg-slate-100 text-xs text-slate-700">
                        <strong>Staff note:</strong> {order.internal_notes}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Ordered Dishes
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(order.items || []).map((item) => (
                        <div
                          key={item.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-900">
                              <span className="text-ocean font-bold mr-1">
                                {item.quantity}×
                              </span>
                              {item.name_en_snapshot}
                            </span>
                            <span className="font-medium text-slate-700 whitespace-nowrap">
                              {formatPrice(item.line_total_xaf)}
                            </span>
                          </div>
                          {item.item_notes && (
                            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded px-2 py-0.5">
                              {item.item_notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    {nextStep && (
                      <button
                        type="button"
                        disabled={saving}
                        onClick={() => quickUpdateStatus(order, nextStep.status)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0e1a28] hover:bg-ocean text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {nextStep.label}
                      </button>
                    )}

                    <Link
                      to={ticketPath}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Online Ticket</span>
                    </Link>

                    {waUrl && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white hover:text-white text-xs font-semibold transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WA Guest</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelected({ ...order })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Manage</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail & Edit Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-ocean">
                  Kitchen Ticket Detail
                </p>
                <h2 className="text-xl font-heading font-bold text-slate-900">
                  {selected.reference_code} — {selected.guest_name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close modal"
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {(selected.items || []).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-slate-900">
                      {item.quantity}× {item.name_en_snapshot}
                      {item.prep_station_snapshot ? ` (${item.prep_station_snapshot})` : ''}
                    </p>
                    {Array.isArray(item.allergens_snapshot) &&
                      item.allergens_snapshot.length > 0 && (
                        <p className="text-amber-800">
                          Allergens:{' '}
                          {item.allergens_snapshot
                            .map((a) => getOptionLabel(ALLERGENS, a, 'en'))
                            .join(', ')}
                        </p>
                      )}
                    {item.item_notes && (
                      <p className="text-sky-900 font-medium">Note: {item.item_notes}</p>
                    )}
                  </div>
                  <span className="font-bold text-slate-900 whitespace-nowrap">
                    {formatPrice(item.line_total_xaf)}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSaveSelected} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Order Status
                  </span>
                  <select
                    value={selected.status}
                    onChange={(e) =>
                      setSelected((prev) => ({ ...prev, status: e.target.value }))
                    }
                    className={inp}
                  >
                    {MENU_ORDER_STATUSES.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.labelEn}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Total Order Amount
                  </span>
                  <span className="text-lg font-bold text-slate-900">
                    {formatPrice(selected.total_xaf)}
                  </span>
                </div>
              </div>

              <label className="block space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Internal Kitchen / Waitstaff Notes
                </span>
                <textarea
                  rows={3}
                  value={selected.internal_notes || ''}
                  onChange={(e) =>
                    setSelected((prev) => ({
                      ...prev,
                      internal_notes: e.target.value,
                    }))
                  }
                  placeholder="Prep station notes, table waiter assignment..."
                  className={inp}
                />
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg bg-[#0e1a28] hover:bg-ocean text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
