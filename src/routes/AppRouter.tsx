import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/home/Home";
import Menu from "../pages/menu/Menu";
import Cart from "../pages/cart/Cart";
import NotFound from "../pages/NotFound";
import { Banner } from "../components/containers/Banner";
import MapPage from "../pages/menu/MapPage";
import AuthPage from "../pages/AuthPage";

// Lazy Load para ProductsDetails
const ProductsDetails = React.lazy(
  () => import("../pages/menu/ProductsDetails")
);

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col md:flex-row pt-16">
        {/* Banner para pantallas grandes */}
        <Banner />

        {/* Contenedor principal de las rutas */}
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Rutas principales */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/auth" element={<AuthPage />} />
              {/* Ruta dinámica para productos */}
              <Route
                path="/products/:category/:productKey"
                element={<ProductsDetails />}
              />

              {/* Redirección y 404 */}
              <Route path="/home" element={<Navigate to="/" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default AppRouter;
