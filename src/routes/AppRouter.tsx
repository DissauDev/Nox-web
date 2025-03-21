import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
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

// Lazy Load para ProductsDetails
const ProductsDetails = React.lazy(
  () => import("../pages/menu/ProductsDetails")
);

// Componente para manejar las rutas y aplicar el background condicionalmente
const AppRoutes: React.FC = () => {
  const location = useLocation();
  // Si la ruta es distinta de la raíz, aplicamos el background
  const isHome = location.pathname === "/";
  const isauth = location.pathname === "/auth";

  return (
    <div
      className={
        isHome
          ? ""
          : isauth
          ? "bg-[#21112E]"
          : "bg-[#FDF9F3] min-h-screen w-full"
      }
    >
      <div className="flex flex-col pt-16 lg:pt-20 md:pt-16">
        <Banner />
        <main className="flex-grow">
          <Toaster />
          <Suspense fallback={<div>Loading...</div>}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route
                path="/products/:category/:productKey"
                element={<ProductsDetails />}
              />
              <Route path="/home" element={<Navigate to="/" />} />
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
