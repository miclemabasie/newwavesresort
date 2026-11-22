import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, ProtectedRoute } from './context/AuthContext.jsx';
import { useAuth, getDefaultAdminRoute } from './context/authHelpers.js';
import { CurrencyProvider } from './context/CurrencyContext.jsx';
import { MenuCartProvider } from './context/MenuCartContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import MenuOrderModal from './components/dining/MenuOrderModal.jsx';

import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import OurStory from './pages/OurStory';
import Services from './pages/Section';
import Dining from './pages/Dining';
import OrderDetail from './pages/OrderDetail';
import Accommodations from './pages/Accomodations';
import UnitDetail from './pages/UnitDetail';
import BookingStatus from './pages/BookingStatus';
import NotFound from './pages/NotFound';
import IntellectualTalks from './pages/services/IntellectualTalk';
import AtlanticGastronomy from './pages/services/AtlanticGastronomy';
import DiplomaticTransfers from './pages/services/DiplomaticTransfers';
import VolcanicExpeditions from './pages/services/VolcanicExpeditions';
import PremiumFleet from './pages/services/PremiumFleet';
import FisiyLibrary from './pages/services/FisiyLibrary';

// Lazy-load staff portal & @dnd-kit so public visitors download zero admin code
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const DailyMenuBuilder = lazy(() => import('./pages/admin/DailyMenuBuilder.jsx'));
const MenuCatalogAdmin = lazy(() => import('./pages/admin/MenuCatalogAdmin.jsx'));
const MenuOrdersAdmin = lazy(() => import('./pages/admin/MenuOrdersAdmin.jsx'));
const BookingsAdmin = lazy(() => import('./pages/admin/BookingsAdmin.jsx'));
const UnitsAdmin = lazy(() => import('./pages/admin/UnitsAdmin.jsx'));
const GalleryAdmin = lazy(() => import('./pages/admin/GalleryAdmin.jsx'));
const InquiriesAdmin = lazy(() => import('./pages/admin/InquiriesAdmin.jsx'));
const StaffAdmin = lazy(() => import('./pages/admin/StaffAdmin.jsx'));
const IntegrationsAdmin = lazy(() => import('./pages/admin/IntegrationsAdmin.jsx'));

function AdminIndexRedirect() {
  const { role } = useAuth();
  return <Navigate to={getDefaultAdminRoute(role)} replace />;
}

function AdminLoader() {
  return (
    <div className="min-h-screen bg-sand flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-ocean/20 border-t-lush rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <MenuCartProvider>
          <ScrollToTop />
          <Toaster position="bottom-right" />
          <MenuOrderModal />
          <Suspense fallback={<AdminLoader />}>
            <Routes>
              {/* Public Website */}
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<OurStory />} />
              <Route path="/rooms" element={<Accommodations />} />
              <Route path="/rooms/:slug" element={<UnitDetail />} />
              <Route path="/booking-status" element={<BookingStatus />} />
              <Route path="/experiences" element={<Services />} />
              <Route path="/services/dining" element={<Dining />} />
              <Route path="/order/:referenceCode" element={<OrderDetail />} />
              <Route path="/services/culinary" element={<AtlanticGastronomy />} />
              <Route path="/services/intellectual-talks" element={<IntellectualTalks />} />
              <Route path="/services/transfers" element={<DiplomaticTransfers />} />
              <Route path="/services/expeditions" element={<VolcanicExpeditions />} />
              <Route path="/services/fleet" element={<PremiumFleet />} />
              <Route path="/services/library" element={<FisiyLibrary />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/dialogues" element={<ComingSoon />} />
              <Route path="/foundation" element={<ComingSoon />} />

              {/* Friendly Redirects */}
              <Route path="/book" element={<Navigate to="/rooms" replace />} />
              <Route path="/dining" element={<Navigate to="/services/dining" replace />} />
              <Route path="/menu" element={<Navigate to="/services/dining" replace />} />

            {/* Staff Operations Portal */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminIndexRedirect />} />
              <Route
                path="overview"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager', 'front_desk', 'chef']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="daily-menu"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager', 'chef']}>
                    <DailyMenuBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="menu-catalog"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager', 'chef']}>
                    <MenuCatalogAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="bookings"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager', 'front_desk']}>
                    <BookingsAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="orders"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager', 'chef', 'front_desk']}>
                    <MenuOrdersAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="units"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    <UnitsAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="gallery"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    <GalleryAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="inquiries"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager', 'front_desk']}>
                    <InquiriesAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="staff"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <StaffAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="integrations"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <IntegrationsAdmin />
                  </ProtectedRoute>
                }
              />
            </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
        </MenuCartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;
