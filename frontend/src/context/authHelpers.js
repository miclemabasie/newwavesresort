import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export function getDefaultAdminRoute(role) {
  if (role && ['admin', 'manager', 'front_desk', 'chef'].includes(role)) {
    return '/admin/overview';
  }
  return '/admin/login';
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
