// src/routes/AppRouter.tsx
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import NotFound from "../pages/NotFound";
import { Banner } from "../components/containers/Banner";
import MapPage from "../pages/menu/MapPage";
import AuthPage from "../pages/auth/AuthPage";
import { AppPromo } from "../components/containers/AppPromo";
import Footer from "../components/containers/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Checkout } from "@/pages/cart/Checkout";
import { ContactUs } from "@/pages/home/ContactUs";
import { Orders } from "@/pages/cart/Orders";
import ScrollToTop from "./ScrollToTop";
import { TermsConditions } from "@/pages/home/TermsConditions";
import PrivacyPolicy from "@/pages/home/PrivacyPolicy";
import ResetPassword from "@/pages/auth/ResetPassword";
import MyAccount from "@/pages/auth/MyAccount";

// Admin panel
import AdminAccount from "@/pages/Admin/AdminAccount";
import { Customers } from "@/pages/Admin/Customers";
import { Categories } from "@/pages/Admin/Categories";
import Dashboard from "@/pages/Admin/DashBoard";
import { Products } from "@/pages/Admin/Products";
import CouponsAndDiscounts from "@/pages/Admin/CuponsAndDiscount";
import SalesDashboard from "@/pages/Admin/SalesDashboard";
import { OrdersDashboard } from "@/pages/Admin/OrdersDashboard";
import { OrderDetails } from "@/pages/Admin/OrderDetails";
import { PagesAdmin } from "@/pages/Admin/pageAdmin/PagesAdmin";
import PageEditor from "@/pages/Admin/pageAdmin/PageEditor";
import { UploadPage } from "@/pages/Admin/UploadPage";
import { Employees } from "@/pages/Admin/Employees";

// Auth-related
import ForgotPassword from "@/pages/auth/ForgotPassword";
import { OrderContent } from "@/pages/auth/my-account/OrderContent";
import { AddressesContent } from "@/pages/auth/my-account/AddressesContent";
import { AccountDetails } from "@/pages/auth/my-account/AccountDetails";
import { WhisList } from "@/pages/auth/my-account/WhisList";
import { DashboardAccount } from "@/pages/auth/my-account/DashboardAccount";
import { OrdersView } from "@/pages/auth/my-account/OrdersView";

// Lazy Load for ProductDetails
const ProductsDetails = React.lazy(
  () => import("../pages/menu/ProductsDetails")
);

// ─────────────────────────────────────────────────────────────────────────────
// Componentes de protección de rutas
// ─────────────────────────────────────────────────────────────────────────────

// Componente que verifica si hay usuario autenticado
const RequireAuth: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

// Componente que verifica si el usuario es ADMIN (o EMPLOYEE)
const RequireAdmin: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  // Solo ADMIN y EMPLOYEE pueden acceder al dashboard de administración
  if (user?.role !== "ADMIN" && user?.role !== "EMPLOYEE") {
    return <Navigate to="/" replace />;
  }
  return children;
};
// ─────────────────────────────────────────────────────────────────────────────

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const isAuthRoute =
    location.pathname === "/auth" ||
    location.pathname.includes("forgot-password");

  return (
    <div
      className={
        isHome || location.pathname.startsWith("/dashboard")
          ? ""
          : isAuthRoute
          ? "bg-[#21112E]"
          : "bg-[#FDF9F3] min-h-screen w-full"
      }
    >
      <div className="flex flex-col pt-20 md:pt-20">
        <Banner />
        <main className="flex-grow">
          <Toaster />
          <Suspense fallback={<div>Loading...</div>}>
            <ScrollToTop />
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/products/:category/:productKey"
                element={<ProductsDetails />}
              />
              <Route path="/ordersClient/:id" element={<Orders />} />

              {/* Rutas privadas: "/my-account/*" */}
              <Route
                path="/account/*"
                element={
                  <RequireAuth>
                    <MyAccount />
                  </RequireAuth>
                }
              >
                <Route path="dashboard" element={<DashboardAccount />} />
                <Route path="orders" element={<OrderContent />} />
                <Route path="addresses" element={<AddressesContent />} />
                <Route path="details" element={<AccountDetails />} />
                <Route path="wishlist" element={<WhisList />} />
                <Route path="ordersView/:orderkey" element={<OrdersView />} />
              </Route>

              {/* Rutas del panel de administración, protegidas */}
              <Route
                path="/dashboard/*"
                element={
                  <RequireAdmin>
                    <AdminAccount />
                  </RequireAdmin>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="categories" element={<Categories />} />
                <Route path="customers" element={<Customers />} />
                <Route path="orders" element={<OrdersDashboard />} />
                <Route path="discounts" element={<CouponsAndDiscounts />} />
                <Route path="sales" element={<SalesDashboard />} />
                <Route path="pages" element={<PagesAdmin />} />
                <Route path="uploads" element={<UploadPage />} />
                <Route path="employees" element={<Employees />} />
                <Route path="orders/:orderkey" element={<OrderDetails />} />
              </Route>

              {/* Si intenta acceder a /dashboard/pages/editor sin autenticarse/ser admin */}
              <Route
                path="/dashboard/pages/editor/:slug"
                element={
                  <RequireAdmin>
                    <PageEditor />
                  </RequireAdmin>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
      <AppPromo />
      <Footer />
    </div>
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default AppRouter;
