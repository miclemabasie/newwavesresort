import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../../components/SEO';
import logo from '../../assets/general/logo1.png';
import { useAuth, getDefaultAdminRoute } from '../../context/authHelpers.js';
import { supabase, isSupabaseConfigured } from '../../lib/supabase.js';
import { Lock, Mail, User, ArrowLeft, ShieldCheck } from 'lucide-react';

async function readFunctionError(data, error, fallback) {
  if (data?.error) return data.error;
  if (error) {
    try {
      const json = await error.context?.json?.();
      if (json?.error) return json.error;
    } catch {
      // ignore non-JSON body
    }
    if (error.message) return error.message;
  }
  return fallback;
}

export default function AdminLogin() {
  const { user, role, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [checkingSetup, setCheckingSetup] = useState(isSupabaseConfigured);
  const [needsBootstrap, setNeedsBootstrap] = useState(false);
  const [forceSignInView, setForceSignInView] = useState(false);

  // Sign-In Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // First-Time Admin Setup Form
  const [setupForm, setSetupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user && role) {
      const target = location.state?.from || getDefaultAdminRoute(role);
      navigate(target, { replace: true });
    }
  }, [user, role, navigate, location.state]);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    let active = true;
    supabase.functions
      .invoke('staff-management', { body: { action: 'status' } })
      .then(({ data, error }) => {
        if (!active) return;
        if (!error && data && data.hasStaff === false) {
          setNeedsBootstrap(true);
        } else {
          setNeedsBootstrap(false);
        }
      })
      .catch(() => {
        if (active) setNeedsBootstrap(false);
      })
      .finally(() => {
        if (active) setCheckingSetup(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { profile } = await signIn(email.trim(), password);
      toast.success(`Welcome back, ${profile.full_name}`);
      navigate(getDefaultAdminRoute(profile.role), { replace: true });
    } catch (err) {
      toast.error(err.message || 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBootstrap = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    if (!setupForm.fullName.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (setupForm.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (setupForm.password !== setupForm.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('staff-management', {
        body: {
          action: 'bootstrap',
          full_name: setupForm.fullName.trim(),
          email: setupForm.email.trim(),
          password: setupForm.password,
        },
      });

      if (error || data?.error) {
        throw new Error(await readFunctionError(data, error, 'Could not complete admin setup.'));
      }

      toast.success('Admin account created! Signing you in...');
      await signIn(setupForm.email.trim(), setupForm.password);
      navigate('/admin/overview', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Setup failed');
    } finally {
      setSubmitting(false);
    }
  };

  const showBootstrapForm = needsBootstrap && !forceSignInView;

  return (
    <div className="min-h-screen bg-sand/40 flex flex-col justify-center items-center px-6 py-12">
      <SEO title="Staff Portal Sign In" path="/admin/login" noindex />

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-resort border border-sand p-8 md:p-10 space-y-6">
        <div className="text-center space-y-3">
          <img src={logo} alt="New Waves Resort" className="w-16 h-16 mx-auto object-contain" />
          <span className="text-lush font-black tracking-[0.35em] uppercase text-[10px] block">
            New Waves Resort • Ngeme Limbe
          </span>
          <h1 className="text-3xl font-serif text-volcanic">
            {showBootstrapForm ? 'Create Resort Admin Account' : 'Staff Operations Portal'}
          </h1>
          <p className="text-xs text-volcanic/60 mb-0">
            {showBootstrapForm
              ? 'First-time website setup — once created, add Chefs, Front Desk & Managers directly inside the portal.'
              : 'Chefs, Front Desk, Managers & Administrators'}
          </p>
        </div>

        {!isSupabaseConfigured && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            <strong>Supabase not configured yet.</strong> Add{' '}
            <code className="font-mono">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono">VITE_SUPABASE_PUBLISHABLE_KEY</code> to{' '}
            <code className="font-mono">frontend/.env</code> to enable staff sign-in.
          </div>
        )}

        {checkingSetup ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-ocean/20 border-t-lush rounded-full animate-spin mx-auto" />
            <p className="text-xs text-volcanic/60">Checking resort portal status...</p>
          </div>
        ) : showBootstrapForm ? (
          <form onSubmit={handleBootstrap} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
              <span>No staff accounts exist yet. Create your owner Admin login right here — no external dashboard needed.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-lush block">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-volcanic/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={setupForm.fullName}
                  onChange={(e) => setSetupForm({ ...setupForm, fullName: e.target.value })}
                  placeholder="Dr. Cyprian Fisiy"
                  className={inpCls}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-lush block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-volcanic/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={setupForm.email}
                  onChange={(e) => setSetupForm({ ...setupForm, email: e.target.value })}
                  placeholder="admin@newwavesresort.com"
                  className={inpCls}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-lush block">
                Password (min 8 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-volcanic/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={setupForm.password}
                  onChange={(e) => setSetupForm({ ...setupForm, password: e.target.value })}
                  placeholder="••••••••"
                  className={inpCls}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-lush block">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-volcanic/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={setupForm.confirmPassword}
                  onChange={(e) => setSetupForm({ ...setupForm, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={inpCls}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !isSupabaseConfigured}
              className="w-full bg-lush hover:bg-volcanic text-[#0e1a28] hover:text-white font-black py-4 rounded-xl uppercase text-xs tracking-[0.25em] transition-all disabled:opacity-50"
            >
              {submitting ? 'Creating Admin...' : 'Create Admin & Enter Portal'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setForceSignInView(true)}
                className="text-xs font-semibold text-ocean hover:text-lush"
              >
                Already have a staff account? Sign in
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-lush block">
                Staff Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-volcanic/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@newwavesresort.com"
                  className={inpCls}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-lush block">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-volcanic/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inpCls}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !isSupabaseConfigured}
              className="w-full bg-volcanic hover:bg-lush text-white hover:text-[#0e1a28] font-black py-4 rounded-xl uppercase text-xs tracking-[0.25em] transition-all disabled:opacity-50"
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>

            {needsBootstrap && forceSignInView && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setForceSignInView(false)}
                  className="text-xs font-semibold text-lush hover:text-ocean"
                >
                  First time here? Create initial admin account
                </button>
              </div>
            )}
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ocean hover:text-lush"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

const inpCls =
  'w-full bg-sand/30 border border-sand rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-lush text-volcanic';
