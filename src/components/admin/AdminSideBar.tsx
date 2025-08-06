// src/components/admin/AdminSidebar.tsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLogoutMutation } from "@/store/features/api/userApi";
import { useDispatch } from "react-redux";
import { toast } from "@/hooks/use-toast";
import { logout as logoutAction } from "@/store/features/slices/authSlice";

const adminNavItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/dashboard/products" },
  { name: "Categories", path: "/dashboard/categories" },
  { name: "Customer", path: "/dashboard/customers" },
  { name: "Orders", path: "/dashboard/orders" },
  { name: "Sales", path: "/dashboard/sales" },
  // { name: "Descuentos", path: "/dashboard/discounts" },
  { name: "Pages", path: "/dashboard/pages" },
  { name: "Uploads", path: "/dashboard/uploads" },
  { name: "Employees", path: "/dashboard/employees" },
  { name: "Settings", path: "/dashboard/settings" },
];

export default function AdminSidebar() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoOut = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      toast({
        title: "Success Log out ",
        variant: "default",
        className: "border-l-4 border-green-500",
        description: "The sesion has been closed",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error",
        className: "border-l-4 border-red-500",
        description: err.data?.message || err.error || "Log out Failed",
      });
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);

  return (
    <>
      {/* Botón mobile */}
      <div className="md:hidden w-10 mx-6 flex items-center justify-between rounded-lg p-2 bg-gradient-to-b from-[#15203a] to-[#3948a4] text-white sticky top-0 z-30">
        <button onClick={toggle}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar desktop */}
      <aside
        className="hidden md:flex flex-col mx-4 mt-10 rounded-3xl w-60 min-h-screen sticky top-0 text-white"
        style={{
          background: "linear-gradient(180deg, #15203a 0%, #3948a4 100%)",
        }}
      >
        <div className="p-6">
          <h2 className="text-lg font-ArialBold mb-8">Menú</h2>
          <nav>
            <ul className="space-y-4 font-ArialRegular">
              {adminNavItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/dashboard"}
                    className={({ isActive }) =>
                      isActive
                        ? "block border-l-4 border-[#a3c1f5] pl-4 text-white font-bold"
                        : "block text-white opacity-85 hover:opacity-100"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-6 flex-col ">
          <div className="border-t border-white/40 my-6" />
          <div className="flex flex-col items-start">
            {/*  <button className="text-white opacity-80 hover:opacity-100 py-2 font-ArialRegular rounded">
              Settings
            </button> */}

            <button
              className="text-white opacity-80 hover:opacity-100 py-2 font-ArialRegular rounded"
              onClick={handleLogoOut}
              disabled={isLoading}
            >
              {isLoading ? "...Loading" : "Log Out"}
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay y sidebar mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Capa semitransparente */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggle}
            />
            {/* Sidebar móvil */}
            <motion.aside
              className="fixed top-0 left-0 bottom-0 w-64 p-6 bg-gradient-to-b from-[#15203a] to-[#3948a4] z-50 text-white flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <button onClick={toggle} className="self-end mb-4">
                <FaTimes size={24} />
              </button>
              <nav className="flex-1 overflow-auto">
                <ul className="space-y-4 font-ArialRegular">
                  {adminNavItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === "/dashboard"}
                        onClick={toggle}
                        className={({ isActive }) =>
                          isActive
                            ? "block border-l-4 border-[#a3c1f5] pl-4 text-white font-bold"
                            : "block text-white opacity-80 hover:opacity-100"
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-white/40 my-6" />
              <div className="flex flex-col space-y-2">
                {/* <button className="text-white opacity-80 hover:opacity-100 py-2 font-ArialRegular rounded">
                  Settings
                </button> */}
                <button
                  className="text-white opacity-80 hover:opacity-100 py-2 font-ArialRegular rounded"
                  onClick={handleLogoOut}
                  disabled={isLoading}
                >
                  {isLoading ? "...Loading" : "Log Out"}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
