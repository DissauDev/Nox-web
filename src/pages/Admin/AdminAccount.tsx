// src/pages/Admin/AdminAccount.tsx
import AdminSidebar from "@/components/admin/AdminSideBar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminAccount() {
  return (
    <div className=" flex  text-white">
      {/* Sidebar de administración */}
      <div className="sticky py-8">
        <AdminSidebar />
      </div>
      {/* Área para renderizar la sección activa del administrador */}
      <main className="flex-1 py-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
