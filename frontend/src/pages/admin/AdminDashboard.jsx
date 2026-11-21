import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase.js';
import { useAuth } from '../../context/authHelpers.js';
import { getLimbeTodayISO } from '../../lib/currency.js';
import {
  CalendarCheck,
  ChefHat,
  UtensilsCrossed,
  BedDouble,
  Images,
  MessageSquare,
  Users,
  Settings,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboard() {
  const { profile, role, hasRole } = useAuth();
  const todayISO = getLimbeTodayISO();

  const [stats, setStats] = useState({
    pendingBookings: null,
    todayMenuStatus: null,
    todayDishCount: 0,
    activeDishes: null,
    publishedSuites: null,
    galleryPhotos: null,
    galleryVideos: null,
    newInquiries: null,
  });

  useEffect(() => {
    if (!supabase || !role) return;
    let active = true;

    async function loadOverview() {
      const next = {
        pendingBookings: null,
        todayMenuStatus: null,
        todayDishCount: 0,
        activeDishes: null,
        publishedSuites: null,
        galleryPhotos: null,
        galleryVideos: null,
        newInquiries: null,
      };

      const tasks = [];

      if (['admin', 'manager', 'front_desk'].includes(role)) {
        tasks.push(
          supabase
            .from('booking_requests')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'pending')
            .then(({ count }) => {
              next.pendingBookings = count ?? 0;
            }),
        );
        tasks.push(
          supabase
            .from('contact_inquiries')
            .select('id', { count: 'exact', head: true })
            .eq('status', 'new')
            .then(({ count }) => {
              next.newInquiries = count ?? 0;
            }),
        );
      }

      if (['admin', 'manager', 'chef'].includes(role)) {
        tasks.push(
          supabase
            .from('menu_items')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true)
            .then(({ count }) => {
              next.activeDishes = count ?? 0;
            }),
        );
        tasks.push(
          supabase
            .from('daily_menus')
            .select('id, status, daily_menu_entries(count)')
            .eq('service_date', todayISO)
            .maybeSingle()
            .then(({ data }) => {
              next.todayMenuStatus = data?.status || 'not created';
              next.todayDishCount = data?.daily_menu_entries?.[0]?.count ?? 0;
            }),
        );
      }

      if (['admin', 'manager'].includes(role)) {
        tasks.push(
          supabase
            .from('room_types')
            .select('id', { count: 'exact', head: true })
            .eq('is_published', true)
            .then(({ count }) => {
              next.publishedSuites = count ?? 0;
            }),
        );
        tasks.push(
          supabase
            .from('gallery_media')
            .select('media_type')
            .eq('is_published', true)
            .then(({ data }) => {
              const rows = data || [];
              next.galleryPhotos = rows.filter((r) => r.media_type === 'image').length;
              next.galleryVideos = rows.filter((r) => r.media_type === 'youtube').length;
            }),
        );
      }

      await Promise.all(tasks);
      if (active) setStats(next);
    }

    loadOverview();
    return () => {
      active = false;
    };
  }, [role, todayISO]);

  const actions = [
    {
      to: '/admin/bookings',
      title: 'Booking Requests',
      desc: 'Review incoming guest reservations, confirm bookings & message via WhatsApp.',
      icon: CalendarCheck,
      roles: ['admin', 'manager', 'front_desk'],
      badge: stats.pendingBookings !== null ? `${stats.pendingBookings} pending` : null,
    },
    {
      to: '/admin/daily-menu',
      title: 'Daily Menu Builder (DnD)',
      desc: 'Drag & drop dishes into Breakfast, Lunch, Dinner & All-Day slots and publish live.',
      icon: ChefHat,
      roles: ['admin', 'manager', 'chef'],
      badge: stats.todayMenuStatus
        ? `${todayISO}: ${stats.todayMenuStatus} (${stats.todayDishCount})`
        : null,
    },
    {
      to: '/admin/menu-catalog',
      title: 'Master Dish Catalog',
      desc: 'Add recipes, prices in FCFA, dietary tags, allergens & dish photography.',
      icon: UtensilsCrossed,
      roles: ['admin', 'manager', 'chef'],
      badge: stats.activeDishes !== null ? `${stats.activeDishes} dishes` : null,
    },
    {
      to: '/admin/units',
      title: 'Suites & Room Units',
      desc: 'Create or edit 1/2/3-bedroom suites, upload room photos & block unavailable dates.',
      icon: BedDouble,
      roles: ['admin', 'manager'],
      badge: stats.publishedSuites !== null ? `${stats.publishedSuites} suites` : null,
    },
    {
      to: '/admin/gallery',
      title: 'Online Gallery & YouTube',
      desc: 'Upload resort photos to Supabase Storage and publish or import YouTube videos.',
      icon: Images,
      roles: ['admin', 'manager'],
      badge:
        stats.galleryPhotos !== null
          ? `${stats.galleryPhotos} photos • ${stats.galleryVideos} videos`
          : null,
    },
    {
      to: '/admin/inquiries',
      title: 'Inquiries & Mailing List',
      desc: 'Read website contact inquiries, reply by email/WhatsApp, and export subscribers.',
      icon: MessageSquare,
      roles: ['admin', 'manager', 'front_desk'],
      badge: stats.newInquiries !== null ? `${stats.newInquiries} unread` : null,
    },
    {
      to: '/admin/staff',
      title: 'Staff & Team Roles',
      desc: 'Create accounts and manage access for Chefs, Front Desk, Managers & Admins.',
      icon: Users,
      roles: ['admin'],
      badge: 'Team',
    },
    {
      to: '/admin/integrations',
      title: 'Resort Settings',
      desc: 'Configure WhatsApp concierge, YouTube Channel ID, Saker photo & optional API keys.',
      icon: Settings,
      roles: ['admin'],
      badge: 'Config',
    },
  ].filter((a) => hasRole(a.roles));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-sand shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-lush font-black tracking-[0.35em] uppercase text-[10px] block mb-1">
            Self-Contained Resort Portal • Role: {role}
          </span>
          <h1 className="text-3xl font-serif text-volcanic mb-1">
            Welcome, {profile?.full_name || 'Team Member'}
          </h1>
          <p className="text-sm text-volcanic/60 mb-0">
            Manage suites, daily menus, gallery media, bookings, inquiries, and resort staff directly from this portal.
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="px-5 py-2.5 rounded-xl bg-sand/60 hover:bg-ocean hover:text-white text-ocean text-xs font-bold uppercase tracking-wider self-start transition-colors"
        >
          Open Public Website
        </Link>
      </div>

      {/* Role-Scoped Quick Actions & Live Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group bg-white rounded-3xl p-6 border border-sand shadow-sm hover:shadow-xl hover:border-lush/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-ocean/10 text-ocean group-hover:bg-lush group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-sand/70 text-[10px] font-bold uppercase tracking-wider text-volcanic">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-serif text-volcanic group-hover:text-ocean transition-colors mb-2">
                  {item.title}
                </h2>
                <p className="text-xs text-volcanic/65 leading-relaxed mb-5">{item.desc}</p>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-lush group-hover:translate-x-1 transition-transform">
                Open workspace <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
