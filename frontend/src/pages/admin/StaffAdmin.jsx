import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase.js';
import { useAuth } from '../../context/authHelpers.js';
import { UserPlus, Trash2, KeyRound, RefreshCw, Shield } from 'lucide-react';

const ROLES = [
  {
    value: 'chef',
    label: 'Chef / Culinary',
    access: 'Master Dish Catalog & Drag-and-Drop Daily Menu Builder',
    badge: 'bg-amber-100 text-amber-800',
  },
  {
    value: 'front_desk',
    label: 'Front Desk / Reception',
    access: 'Booking Requests Inbox, Guest WhatsApp & Contact Inquiries',
    badge: 'bg-sky-100 text-sky-800',
  },
  {
    value: 'manager',
    label: 'Resort Manager',
    access: 'Suites/Units, Gallery & YouTube, Bookings, Inquiries & Menu',
    badge: 'bg-emerald-100 text-emerald-800',
  },
  {
    value: 'admin',
    label: 'Administrator',
    access: 'Full Access including Staff Accounts, Resort Settings & API Keys',
    badge: 'bg-volcanic text-white',
  },
];

async function invokeStaffAction(payload) {
  const { data, error } = await supabase.functions.invoke('staff-management', {
    body: payload,
  });
  if (data?.error) throw new Error(data.error);
  if (error) {
    let msg = error.message || 'Staff management request failed';
    try {
      const json = await error.context?.json?.();
      if (json?.error) msg = json.error;
    } catch {
      // ignore non-JSON body
    }
    throw new Error(msg);
  }
  return data;
}

export default function StaffAdmin() {
  const { user } = useAuth();
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'chef',
  });

  const loadStaff = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const data = await invokeStaffAction({ action: 'list' });
      setStaff(data?.staff || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      await invokeStaffAction({
        action: 'create',
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      toast.success(`Created ${form.role} account for ${form.full_name}`);
      setForm({ full_name: '', email: '', password: '', role: 'chef' });
      loadStaff();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = async (member, nextRole) => {
    if (member.role === nextRole) return;
    try {
      await invokeStaffAction({
        action: 'update_role',
        user_id: member.id,
        role: nextRole,
      });
      toast.success(`${member.full_name} → ${nextRole}`);
      loadStaff();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResetPassword = async (member) => {
    const newPassword = window.prompt(
      `Enter a new password (min 8 characters) for ${member.full_name}:`,
    );
    if (!newPassword) return;
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    try {
      await invokeStaffAction({
        action: 'reset_password',
        user_id: member.id,
        password: newPassword,
      });
      toast.success(`Password updated for ${member.full_name}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (member) => {
    if (member.id === user?.id) {
      toast.error('You cannot delete your own account.');
      return;
    }
    if (!window.confirm(`Permanently remove staff account "${member.full_name}" (${member.email})?`)) {
      return;
    }
    try {
      await invokeStaffAction({ action: 'delete', user_id: member.id });
      toast.success(`Removed ${member.full_name}`);
      loadStaff();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-volcanic mb-1">Staff & Role Management</h1>
          <p className="text-sm text-volcanic/60 mb-0">
            Create logins and assign permissions for Chefs, Front Desk, Managers, and Administrators without leaving the website.
          </p>
        </div>
        <button
          type="button"
          onClick={loadStaff}
          className="px-4 py-2.5 rounded-xl bg-white border border-sand hover:border-ocean text-xs font-bold text-ocean inline-flex items-center gap-2 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* Add Staff Member Form */}
      <form
        onSubmit={handleCreate}
        className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm space-y-5"
      >
        <h2 className="text-xl font-serif text-ocean mb-0 flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-lush" /> Add New Staff Member
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={lbl}>Full Name *</label>
            <input
              type="text"
              required
              placeholder="Chef Marie Ndongo"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Email Login *</label>
            <input
              type="email"
              required
              placeholder="chef@newwavesresort.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Initial Password (min 8 chars) *</label>
            <input
              type="password"
              required
              minLength={8}
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={inp}
            />
          </div>
          <div>
            <label className={lbl}>Role *</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inp}
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-volcanic hover:bg-lush text-white text-xs font-bold uppercase tracking-wider disabled:opacity-60"
          >
            {saving ? 'Creating...' : 'Create Staff Login'}
          </button>
        </div>
      </form>

      {/* Role Permissions Guide */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map((r) => (
          <div key={r.value} className="bg-white rounded-2xl p-4 border border-sand space-y-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${r.badge}`}>
              <Shield className="w-3 h-3" /> {r.label}
            </span>
            <p className="text-xs text-volcanic/70 mb-0 leading-relaxed">{r.access}</p>
          </div>
        ))}
      </div>

      {/* Existing Staff Table */}
      <div className="bg-white rounded-3xl border border-sand shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-sand/40 text-[10px] font-black uppercase tracking-widest text-volcanic/60 border-b border-sand">
              <tr>
                <th className="py-4 px-5">Staff Member</th>
                <th className="py-4 px-5">Email</th>
                <th className="py-4 px-5">Role</th>
                <th className="py-4 px-5">Last Sign-In</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-volcanic/50">
                    Loading team members...
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-volcanic/50">
                    No staff members found.
                  </td>
                </tr>
              ) : (
                staff.map((m) => (
                  <tr key={m.id} className="hover:bg-sand/15">
                    <td className="py-4 px-5 font-bold text-volcanic">
                      {m.full_name}
                      {m.id === user?.id && (
                        <span className="ml-2 px-2 py-0.5 rounded-full bg-lush/15 text-lush text-[10px] uppercase">
                          You
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-xs text-volcanic/75 font-mono">{m.email || '—'}</td>
                    <td className="py-4 px-5">
                      <select
                        aria-label={`Role for ${m.full_name}`}
                        value={m.role}
                        onChange={(e) => handleRoleChange(m, e.target.value)}
                        className="px-3 py-1.5 rounded-lg bg-sand/40 border border-sand text-xs font-bold text-volcanic"
                      >
                        {ROLES.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 px-5 text-xs text-volcanic/60">
                      {m.last_sign_in_at ? new Date(m.last_sign_in_at).toLocaleString() : 'Never'}
                    </td>
                    <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleResetPassword(m)}
                        className="px-2.5 py-1.5 rounded-lg bg-sand/60 hover:bg-ocean hover:text-white text-xs font-bold inline-flex items-center gap-1"
                        title="Reset password"
                      >
                        <KeyRound className="w-3.5 h-3.5" /> Reset PW
                      </button>
                      {m.id !== user?.id && (
                        <button
                          type="button"
                          onClick={() => handleDelete(m)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="Delete account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const lbl = 'block text-[10px] font-black uppercase tracking-widest text-lush mb-1';
const inp =
  'w-full bg-sand/30 border border-sand rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-lush text-volcanic';
