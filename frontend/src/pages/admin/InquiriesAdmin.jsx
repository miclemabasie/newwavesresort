import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.js';
import { useAuth } from '../../context/authHelpers.js';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp.js';
import { RefreshCw, Mail, MessageCircle, Trash2, Download } from 'lucide-react';

const INQUIRY_STATUSES = ['new', 'read', 'replied', 'archived'];

export default function InquiriesAdmin() {
  const { hasRole } = useAuth();
  const canViewSubscribers = hasRole(['admin', 'manager']);

  const [tab, setTab] = useState('inquiries');
  const [statusFilter, setStatusFilter] = useState('all');
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const tasks = [
        supabase
          .from('contact_inquiries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(200),
      ];
      if (canViewSubscribers) {
        tasks.push(
          supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('subscribed_at', { ascending: false })
            .limit(500),
        );
      }

      const [inqRes, subRes] = await Promise.all(tasks);
      if (inqRes.error) throw inqRes.error;
      setInquiries(inqRes.data || []);

      if (subRes) {
        if (subRes.error) throw subRes.error;
        setSubscribers(subRes.data || []);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [canViewSubscribers]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateStatus = async (row, nextStatus) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status: nextStatus })
        .eq('id', row.id);
      if (error) throw error;
      toast.success(`Inquiry marked ${nextStatus}`);
      setInquiries((prev) => prev.map((i) => (i.id === row.id ? { ...i, status: nextStatus } : i)));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteSubscriber = async (sub) => {
    if (!supabase || !window.confirm(`Remove ${sub.email} from newsletter list?`)) return;
    try {
      const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', sub.id);
      if (error) throw error;
      toast.success('Subscriber removed');
      setSubscribers((prev) => prev.filter((s) => s.id !== sub.id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const downloadCsv = () => {
    const csv = ['email,language,subscribed_at']
      .concat(subscribers.map((s) => `${s.email},${s.language},${s.subscribed_at}`))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newwaves-newsletter-subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredInquiries = inquiries.filter(
    (i) => statusFilter === 'all' || i.status === statusFilter,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-volcanic mb-1">Inquiries & Mailing List</h1>
          <p className="text-sm text-volcanic/60 mb-0">
            Respond to contact form messages and manage resort newsletter subscribers.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          className="px-4 py-2.5 rounded-xl bg-white border border-sand hover:border-ocean text-xs font-bold text-ocean inline-flex items-center gap-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-white p-1 border border-sand">
          <button
            type="button"
            onClick={() => setTab('inquiries')}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              tab === 'inquiries' ? 'bg-volcanic text-white shadow' : 'text-volcanic/70'
            }`}
          >
            Contact Inquiries ({inquiries.length})
          </button>
          {canViewSubscribers && (
            <button
              type="button"
              onClick={() => setTab('subscribers')}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                tab === 'subscribers' ? 'bg-volcanic text-white shadow' : 'text-volcanic/70'
              }`}
            >
              Newsletter Subscribers ({subscribers.length})
            </button>
          )}
        </div>

        {tab === 'inquiries' && (
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white border border-sand text-xs font-bold outline-none"
          >
            <option value="all">All Statuses</option>
            {INQUIRY_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.toUpperCase()}
              </option>
            ))}
          </select>
        )}

        {tab === 'subscribers' && canViewSubscribers && subscribers.length > 0 && (
          <button
            type="button"
            onClick={downloadCsv}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-volcanic text-white text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="h-64 bg-white rounded-3xl border border-sand animate-pulse" />
      ) : tab === 'inquiries' ? (
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-sand text-volcanic/50 text-sm">
              No contact inquiries found.
            </div>
          ) : (
            filteredInquiries.map((row) => {
              const mailto = `mailto:${row.email}?subject=${encodeURIComponent(
                `Re: New Waves Resort — ${row.inquiry_type}`,
              )}`;
              const waUrl = row.phone
                ? buildGeneralWhatsAppUrl({
                    phone: row.phone,
                    message: `Hello ${row.full_name}, regarding your inquiry (${row.inquiry_type}) to New Waves Resort: `,
                  })
                : '';

              return (
                <div
                  key={row.id}
                  className="bg-white rounded-3xl p-6 border border-sand shadow-sm space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-sand/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-lg font-serif text-volcanic mb-0">{row.full_name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-ocean/10 text-ocean text-[10px] font-bold uppercase">
                          {row.inquiry_type}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            row.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : row.status === 'replied'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-sand text-volcanic/60'
                          }`}
                        >
                          {row.status}
                        </span>
                      </div>
                      <p className="text-xs text-volcanic/60 mb-0 mt-1">
                        {row.email} {row.phone ? `• ${row.phone}` : ''} •{' '}
                        {new Date(row.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={mailto}
                        className="px-3 py-1.5 rounded-lg bg-ocean text-white hover:text-white text-[11px] font-bold inline-flex items-center gap-1 hover:bg-volcanic"
                      >
                        <Mail className="w-3.5 h-3.5" /> Email
                      </a>
                      {waUrl && (
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#15803D] text-white hover:text-white text-[11px] font-bold inline-flex items-center gap-1 hover:bg-[#166534]"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      )}
                      <select
                        aria-label={`Status for ${row.full_name}`}
                        value={row.status}
                        onChange={(e) => updateStatus(row, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-sand/50 border border-sand text-[11px] font-bold"
                      >
                        {INQUIRY_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <p className="text-sm text-volcanic/80 whitespace-pre-line mb-0">{row.message}</p>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-sand shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-sand/40 text-[10px] font-black uppercase tracking-widest text-volcanic/60 border-b border-sand">
                <tr>
                  <th className="py-4 px-5">Email</th>
                  <th className="py-4 px-5">Language</th>
                  <th className="py-4 px-5">Subscribed</th>
                  <th className="py-4 px-5 text-right">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand/60">
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-volcanic/50">
                      No newsletter subscribers yet.
                    </td>
                  </tr>
                ) : (
                  subscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-sand/15">
                      <td className="py-3.5 px-5 font-medium text-volcanic">{sub.email}</td>
                      <td className="py-3.5 px-5 uppercase text-xs font-bold text-ocean">
                        {sub.language}
                      </td>
                      <td className="py-3.5 px-5 text-xs text-volcanic/60">
                        {new Date(sub.subscribed_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => deleteSubscriber(sub)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Remove subscriber"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
