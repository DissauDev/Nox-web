// src/components/admin/AdminSidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

const adminNavItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Productos", path: "/dashboard/products" },
  { name: "Categorías", path: "/dashboard/categories" },
  { name: "Clientes", path: "/dashboard/customers" },
  { name: "Órdenes", path: "/dashboard/orders" },
  { name: "Ventas", path: "/dashboard/sales" },
  { name: "Descuentos", path: "/dashboard/discounts" },
  { name: "Pages", path: "/dashboard/Pages" },
];

export default function AdminSidebar() {
  return (
    <aside
      className="hidden md:flex border-ra md:flex-col mx-4 mt-10 rounded-3xl  w-60 min-h-screen sticky top-0 text-white "
      style={{
        background: "linear-gradient(180deg, #370958 0%, #1C0B29 100%)",
      }}
    >
      <div className="p-6">
        <h2 className="text-lg font-ArialBold mb-8">Menu</h2>
        <nav>
          <ul className="space-y-4 font-ArialRegular">
            {adminNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    isActive
                      ? "block border-l-4 border-pink-500 pl-4 text-white font-bold"
                      : "block text-white opacity-80 hover:opacity-100"
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
          <button className=" text-white opacity-80 hover:opacity-100 transition-colors py-2  font-ArialRegular rounded">
            Settings
          </button>
          <button className=" text-white opacity-80 hover:opacity-100 py-2 font-ArialRegular rounded">
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
