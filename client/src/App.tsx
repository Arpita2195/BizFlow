import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Landing from "./pages/marketing/Landing";
import DemoPicker from "./pages/marketing/DemoPicker";
import PublicBusiness from "./pages/marketing/PublicBusiness";
import NotFound from "./pages/marketing/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Onboarding from "./pages/auth/Onboarding";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import Customers from "./pages/app/Customers";
import Bookings from "./pages/app/Bookings";
import Products from "./pages/app/Products";
import Invoices from "./pages/app/Invoices";
import Quotations from "./pages/app/Quotations";
import Expenses from "./pages/app/Expenses";
import Analytics from "./pages/app/Analytics";
import Staff from "./pages/app/Staff";
import Reviews from "./pages/app/Reviews";
import Loyalty from "./pages/app/Loyalty";
import Assistant from "./pages/app/Assistant";
import Settings from "./pages/app/Settings";
import CustomerPortal from "./pages/customer/CustomerPortal";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RBACGuard from "./components/auth/RBACGuard";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<DemoPicker />} />
          <Route path="/business/:slug" element={<PublicBusiness />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/portal" element={<CustomerPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/app" element={<AppLayout />}>
            <Route index element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER", "STAFF"]}><Dashboard /></RBACGuard>} />
            <Route path="customers" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER", "STAFF"]}><Customers /></RBACGuard>} />
            <Route path="bookings" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER", "STAFF"]}><Bookings /></RBACGuard>} />
            <Route path="products" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER", "STAFF"]}><Products /></RBACGuard>} />
            <Route path="invoices" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER"]}><Invoices /></RBACGuard>} />
            <Route path="quotations" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER"]}><Quotations /></RBACGuard>} />
            <Route path="expenses" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER"]}><Expenses /></RBACGuard>} />
            <Route path="analytics" element={<RBACGuard requiredRoles={["OWNER", "ADMIN"]}><Analytics /></RBACGuard>} />
            <Route path="staff" element={<RBACGuard requiredRoles={["OWNER", "ADMIN"]}><Staff /></RBACGuard>} />
            <Route path="reviews" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER"]}><Reviews /></RBACGuard>} />
            <Route path="loyalty" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER"]}><Loyalty /></RBACGuard>} />
            <Route path="assistant" element={<RBACGuard requiredRoles={["OWNER", "ADMIN", "MANAGER"]}><Assistant /></RBACGuard>} />
            <Route path="settings" element={<RBACGuard requiredRoles={["OWNER", "ADMIN"]}><Settings /></RBACGuard>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

