import { useEffect, useState, useCallback } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import { AuthContext, useAuth, getDefaultAdminRoute } from './authHelpers.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const loadProfile = useCallback(async (uid) => {
    if (!supabase || !uid) {
      setProfile(null);
      return null;
    }
    const { data, error } = await supabase
      .from('staff_profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();

    if (error) {
      setProfile(null);
      return null;
    }
    setProfile(data);
    return data;
  }, []);

  useEffect(() => {
    if (!supabase) return;

    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const sessionUser = data?.session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        await loadProfile(sessionUser.id);
      } else {
        setProfile(null);
      }
      if (mounted) setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        await loadProfile(sessionUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
    };
  }, [loadProfile]);

  const signIn = async (email, password) => {
    if (!supabase) {
      throw new Error('Supabase is not configured. Please add credentials to frontend/.env.');
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const prof = await loadProfile(data.user.id);
    if (!prof) {
      await supabase.auth.signOut();
      throw new Error('Account does not have a staff profile assigned. Contact an administrator.');
    }
    return { user: data.user, profile: prof };
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const role = profile?.role || null;

  const hasRole = useCallback(
    (allowedRoles) => {
      if (!allowedRoles || allowedRoles.length === 0) return Boolean(role);
      return Boolean(role && allowedRoles.includes(role));
    },
    [role],
  );

  return (
    <AuthContext.Provider value={{ user, profile, role, loading, signIn, signOut, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function ProtectedRoute({ allowedRoles, children }) {
  const { user, role, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-ocean/20 border-t-lush rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-volcanic/60">Verifying staff access...</p>
        </div>
      </div>
    );
  }

  if (!user || !role) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !hasRole(allowedRoles)) {
    return <Navigate to={getDefaultAdminRoute(role)} replace />;
  }

  return children;
}
