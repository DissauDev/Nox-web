// MyAccount.tsx
import React from "react";

import { useLogoutMutation } from "@/store/features/api/userApi";
import { logout as logoutAction } from "@/store/features/slices/authSlice";
import { toast } from "@/hooks/use-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AccountSidebar } from "@/components/containers/AccountSideBar";

export const MyAccount = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoOut = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      toast({
        title: "Success Log out ",
        className: "border-l-4 border-green-500",
        description: "The sesion has been closed",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        className: "border-l-4 border-red-500",
        description: err.data?.message || err.error || "Log out Failed",
      });
    }
  };
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <AccountSidebar onLogout={handleLogoOut} />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
