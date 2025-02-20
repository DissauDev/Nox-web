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
import AuthPage from "../pages/AuthPage";
import { AppPromo } from "../components/containers/AppPromo";
import Footer from "../components/containers/Footer";

// Lazy Load para ProductsDetails
const ProductsDetails = React.lazy(
  () => import("../pages/menu/ProductsDetails")
);

// Componente para manejar las rutas y aplicar el background condicionalmente
const AppRoutes: React.FC = () => {
  const location = useLocation();
  // Si la ruta es distinta de la raíz, aplicamos el background
  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "" : "bg-[#FDF9F3] min-h-screen w-full"}>
      <div className="flex flex-col md:flex-row pt-16">
        <Banner />
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/auth" element={<AuthPage />} />
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
