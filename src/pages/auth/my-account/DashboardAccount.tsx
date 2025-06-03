import { RootState } from "@/store/store";
import React from "react";
import {
  FiBox,
  FiCloud,
  FiMapPin,
  FiUser,
  FiHeart,
  FiLogOut,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "Orders",
    icon: <FiBox size={32} className="mx-auto mb-2 text-gray-600" />,
    path: "/account/orders",
  },

  /*
    label: "Downloads",
    icon: <FiCloud size={32} className="mx-auto mb-2 text-gray-600" />,
    path: "/account/downloads",
  */

  /*
    label: "Addresses",
    icon: <FiMapPin size={32} className="mx-auto mb-2 text-gray-600" />,
    path: "/account/addresses",
 */

  {
    label: "Account Details",
    icon: <FiUser size={32} className="mx-auto mb-2 text-gray-600" />,
    path: "/account/details",
  },

  /*
    label: "Wishlist",
    icon: <FiHeart size={32} className="mx-auto mb-2 text-gray-600" />,
    path: "/account/wishlist",
 */

  {
    label: "Logout",
    icon: <FiLogOut size={32} className="mx-auto mb-2 text-gray-600" />,
    path: "/logout", // Puedes manejar esto con lógica especial
  },
];

export const DashboardAccount: React.FC = () => {
  const userState = useSelector((state: RootState) => state.auth.user) || "";
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    if (path === "/logout") {
      // Aquí va tu lógica de logout
      console.log("Logging out...");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-gray-800">
      <h2 className="text-xl font-bold mb-2">
        Hello {userState.name} (not {userState.name}? Log out)
      </h2>
      <p className="text-gray-700 mb-6">
        From your account dashboard you can view your{" "}
        <strong>recent orders</strong>, manage your{" "}
        <strong>shipping and billing addresses</strong>, and{" "}
        <strong>edit your password and account details</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(({ label, icon, path }) => (
          <button
            key={label}
            onClick={() => handleClick(path)}
            className="border border-gray-300 rounded-md py-6 px-4 text-center hover:bg-gray-50 transition"
          >
            {icon}
            <span className="block mt-1 text-sm font-semibold text-gray-800 uppercase">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
