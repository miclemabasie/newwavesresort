import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.js';
import { formatCurrency } from '../../lib/currency.js';
import { BOOKING_STATUSES, SYNC_STATUSES } from '../../lib/constants.js';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp.js';
import { MessageCircle, RefreshCw, Search, X } from 'lucide-react';

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [syncFilter, setSyncFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadBookings = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);
      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
    if (!supabase) return;

    const channel = supabase
      .channel('booking-requests-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'booking_requests' },
        () => {
          loadBookings();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadBookings]);

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
    if (!supabase || !selected) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({
          status: selected.status,
          external_sync_status: selected.external_sync_status,
          external_reference: selected.external_reference || null,
          internal_notes: selected.internal_notes || '',
        })
        .eq('id', selected.id);
      if (error) throw error;
      toast.success(`Updated ${selected.reference_code}`);
      setSelected(null);
      loadBookings();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const quickStatus = async (row, nextStatus) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status: nextStatus })
        .eq('id', row.id);
      if (error) throw error;
      toast.success(`${row.reference_code} → ${nextStatus}`);
      loadBookings();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (syncFilter !== 'all' && b.external_sync_status !== syncFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const hay = `${b.reference_code} ${b.guest_first_name} ${b.guest_last_name} ${b.guest_email} ${b.room_type_name_snapshot}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-volcanic mb-1">Booking Requests</h1>
          <p className="text-sm text-volcanic/60 mb-0">
            Incoming website & WhatsApp requests queued for reception and optional external sync.
          </p>
        </div>
        <button
          type="button"
          onClick={loadBookings}
          className="px-4 py-2.5 rounded-xl bg-white border border-sand hover:border-ocean text-xs font-bold text-ocean inline-flex items-center gap-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-sand grid md:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-volcanic/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reference, guest, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-sand/30 border border-sand text-sm outline-none focus:border-lush"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-sand/30 border border-sand text-sm outline-none"
        >
          <option value="all">All Booking Statuses</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.labelEn}
            </option>
          ))}
        </select>
        <select
          value={syncFilter}
          onChange={(e) => setSyncFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-sand/30 border border-sand text-sm outline-none"
        >
          <option value="all">All Sync States</option>
          {SYNC_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.labelEn}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-sand shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/40 text-[10px] font-black uppercase tracking-widest text-volcanic/60 border-b border-sand">
              <tr>
                <th className="py-4 px-5">Reference</th>
                <th className="py-4 px-5">Guest</th>
                <th className="py-4 px-5">Suite & Dates</th>
                <th className="py-4 px-5">Total</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">External Sync</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/60">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-volcanic/50">
                    Loading booking requests...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-volcanic/50">
                    No booking requests found.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => {
                  const guestWa = buildGeneralWhatsAppUrl({
                    phone: b.guest_whatsapp || b.guest_phone,
                    message: `Hello ${b.guest_first_name}, regarding your New Waves Resort booking request ${b.reference_code} (${b.check_in_date} to ${b.check_out_date}): `,
                  });

                  return (
                    <tr key={b.id} className="hover:bg-sand/15 transition-colors">
                      <td className="py-4 px-5 font-mono font-bold text-ocean text-xs">
                        {b.reference_code}
                        {b.external_reference && (
                          <div className="text-[10px] text-emerald-700 mt-0.5">
                            Ext: {b.external_reference}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        <p className="font-bold text-volcanic mb-0">
                          {b.guest_first_name} {b.guest_last_name}
                        </p>
                        <p className="text-xs text-volcanic/60 mb-0">{b.guest_phone}</p>
                        <p className="text-xs text-volcanic/50 mb-0">{b.guest_email}</p>
                      </td>
                      <td className="py-4 px-5">
                        <p className="font-medium text-volcanic mb-0">
                          {b.room_type_name_snapshot} (×{b.rooms_requested})
                        </p>
                        <p className="text-xs text-volcanic/60 mb-0">
                          {b.check_in_date} → {b.check_out_date}
                        </p>
                      </td>
                      <td className="py-4 px-5 font-semibold text-volcanic whitespace-nowrap">
                        {formatCurrency(b.estimated_total)}
                      </td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-sand text-volcanic/70'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-xs font-semibold text-volcanic/70">
                          {b.external_sync_status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                        {b.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => quickStatus(b, 'confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold uppercase hover:bg-emerald-700"
                          >
                            Confirm
                          </button>
                        )}
                        <a
                          href={guestWa}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] text-white text-[10px] font-bold uppercase hover:bg-[#1ebe5d]"
                        >
                          <MessageCircle className="w-3 h-3" /> WA
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelected({ ...b })}
                          className="px-2.5 py-1 rounded-lg bg-sand/70 hover:bg-ocean hover:text-white text-xs font-bold"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manage Drawer/Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 md:p-8 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-sand pb-3">
              <div>
                <h2 className="text-xl font-serif text-volcanic mb-0">{selected.reference_code}</h2>
                <p className="text-xs text-volcanic/60 mb-0">
                  {selected.guest_first_name} {selected.guest_last_name} • {selected.guest_email}
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="p-2 rounded-full hover:bg-sand/50">
                <X className="w-5 h-5" />
              </button>
            </div>

            {selected.special_requests && (
              <div className="bg-sand/30 rounded-xl p-3 text-xs text-volcanic/80">
                <strong>Guest Notes:</strong> {selected.special_requests}
              </div>
            )}

            <form onSubmit={handleUpdateBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Booking Status
                  </label>
                  <select
                    value={selected.status}
                    onChange={(e) => setSelected({ ...selected, status: e.target.value })}
                    className={inp}
                  >
                    {BOOKING_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                    Sync Status
                  </label>
                  <select
                    value={selected.external_sync_status}
                    onChange={(e) => setSelected({ ...selected, external_sync_status: e.target.value })}
                    className={inp}
                  >
                    {SYNC_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.labelEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                  External Confirmation / Reference Code
                </label>
                <input
                  type="text"
                  value={selected.external_reference || ''}
                  onChange={(e) => setSelected({ ...selected, external_reference: e.target.value })}
                  placeholder="e.g. RSV-2026-00042"
                  className={inp}
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-lush mb-1">
                  Internal Reception Notes
                </label>
                <textarea
                  rows={3}
                  value={selected.internal_notes || ''}
                  onChange={(e) => setSelected({ ...selected, internal_notes: e.target.value })}
                  className={inp}
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-sand">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-xl border border-sand text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-volcanic hover:bg-lush text-white text-xs font-bold uppercase disabled:opacity-60"
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

const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lush text-volcanic';
