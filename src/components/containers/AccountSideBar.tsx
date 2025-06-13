// src/components/account/AccountSidebar.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/account/dashboard" },
  { label: "Orders", path: "/account/orders" },
  // { label: "Addresses", path: "/account/addresses" },
  { label: "Account details", path: "/account/details" },
  { label: "Wishlist", path: "/account/wishlist" },
];

export const AccountSidebar = ({
  onLogout,
  isLoading = false,
}: {
  onLogout: () => void;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full md:w-64 shrink-0 text-gray-800">
      <h1 className="text-xl font-bold mb-4">MY ACCOUNT</h1>
      <nav className="flex flex-col border-t">
        {menuItems.map(({ label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`text-left py-3 px-2 border-b hover:bg-gray-50 ${
              location.pathname === path ? "font-semibold bg-gray-100" : ""
            }`}
          >
            {label}
          </button>
        ))}
        <button
          onClick={onLogout}
          disabled={isLoading}
          className="py-3 px-2 text-left border-b hover:bg-gray-50"
        >
          {isLoading ? "...loading" : "Log out"}
        </button>
      </nav>
    </div>
  );
};
