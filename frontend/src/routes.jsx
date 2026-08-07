import { lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminShell from './layouts/AdminShell.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const NewBatteries = lazy(() => import('./pages/NewBatteries.jsx'));
const Accessories = lazy(() => import('./pages/Accessories.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'));
const NewBatteryAdmin = lazy(() => import('./pages/admin/NewBatteryAdmin.jsx'));
const OldBatteryAdmin = lazy(() => import('./pages/admin/OldBatteryAdmin.jsx'));
const AccessoryAdmin = lazy(() => import('./pages/admin/AccessoryAdmin.jsx'));
const AcidAdmin = lazy(() => import('./pages/admin/AcidAdmin.jsx'));
const ServiceAdmin = lazy(() => import('./pages/admin/ServiceAdmin.jsx'));
const SaleAdmin = lazy(() => import('./pages/admin/SaleAdmin.jsx'));
const CostAdmin = lazy(() => import('./pages/admin/CostAdmin.jsx'));
const Reports = lazy(() => import('./pages/admin/Reports.jsx'));
const ContactMessagesAdmin = lazy(() => import('./pages/admin/ContactMessages.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE — its own Navbar + Footer */}
      <Route
        element={
          <>
            <Navbar />
            <main>
              <Outlet />
            </main>
            <Footer />
          </>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/batteries" element={<NewBatteries />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ADMIN AREA — NO public Navbar / Footer */}
      <Route path="/admin" element={<AdminShell />}>
        {/* Public admin login */}
        <Route path="login" element={<AdminLogin />} />

        {/* Protected admin pages */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="new-batteries" element={<NewBatteryAdmin />} />
          <Route path="old-batteries" element={<OldBatteryAdmin />} />
          <Route path="accessories" element={<AccessoryAdmin />} />
          <Route path="acid" element={<AcidAdmin />} />
          <Route path="services" element={<ServiceAdmin />} />
          <Route path="sales" element={<SaleAdmin />} />
          <Route path="costs" element={<CostAdmin />} />
          <Route path="reports" element={<Reports />} />
          <Route path="messages" element={<ContactMessagesAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}