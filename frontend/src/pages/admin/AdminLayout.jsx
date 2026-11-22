import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import logo from '../../assets/general/logo1.png';
import { useAuth } from '../../context/authHelpers.js';
import {
  LayoutDashboard,
  CalendarCheck,
  ClipboardList,
  UtensilsCrossed,
  ChefHat,
  BedDouble,
  Images,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    to: '/admin/overview',
    label: 'Overview',
    icon: LayoutDashboard,
    roles: ['admin', 'manager', 'front_desk', 'chef'],
  },
  {
    to: '/admin/bookings',
    label: 'Booking Requests',
    icon: CalendarCheck,
    roles: ['admin', 'manager', 'front_desk'],
  },
  {
    to: '/admin/orders',
    label: 'Menu Orders',
    icon: ClipboardList,
    roles: ['admin', 'manager', 'chef', 'front_desk'],
  },
  {
    to: '/admin/daily-menu',
    label: 'Daily Menu (DnD)',
    icon: ChefHat,
    roles: ['admin', 'manager', 'chef'],
  },
  {
    to: '/admin/menu-catalog',
    label: 'Dish Catalog',
    icon: UtensilsCrossed,
    roles: ['admin', 'manager', 'chef'],
  },
  {
    to: '/admin/units',
    label: 'Suites & Units',
    icon: BedDouble,
    roles: ['admin', 'manager'],
  },
  {
    to: '/admin/gallery',
    label: 'Gallery & YouTube',
    icon: Images,
    roles: ['admin', 'manager'],
  },
  {
    to: '/admin/inquiries',
    label: 'Inquiries & Mailing',
    icon: MessageSquare,
    roles: ['admin', 'manager', 'front_desk'],
  },
  {
    to: '/admin/staff',
    label: 'Staff & Roles',
    icon: Users,
    roles: ['admin'],
  },
  {
    to: '/admin/integrations',
    label: 'Resort Settings',
    icon: Settings,
    roles: ['admin'],
  },
];

export default function AdminLayout() {
  const { profile, role, signOut, hasRole } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleItems = NAV_ITEMS.filter((item) => hasRole(item.roles));

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-volcanic text-white">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="NWR" className="w-10 h-10 object-contain" />
          <div>
            <p className="text-sm font-serif font-bold text-white mb-0">New Waves</p>
            <p className="text-[10px] uppercase tracking-widest text-lush font-bold mb-0">
              Staff Portal
            </p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-lush text-volcanic font-bold shadow'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/80"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="px-3 py-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate mb-0">
              {profile?.full_name || 'Staff Member'}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-lush font-bold mb-0">
              {role}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            title="Sign Out"
            className="p-2 rounded-lg text-white/60 hover:text-rose-400 hover:bg-rose-500/10"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sand/30 flex">
      <SEO title="Staff Operations" noindex />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-72 max-w-[85%] z-10">{sidebarContent}</div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="lg:hidden bg-white border-b border-sand px-4 h-16 flex items-center justify-between sticky top-0 z-30">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-volcanic hover:bg-sand/50"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-serif font-bold text-ocean text-sm">New Waves Staff</span>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs font-bold text-volcanic/60 hover:text-rose-600"
          >
            Sign Out
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
