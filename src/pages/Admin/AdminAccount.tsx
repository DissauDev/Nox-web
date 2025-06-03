// src/pages/Admin/AdminAccount.tsx
import AdminSidebar from "@/components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";

export default function AdminAccount() {
  return (
    <div className=" relative flex flex-col md:flex-row  text-white">
      {/* Sidebar de administración */}
      <div className=" md:sticky pt-8">
        <AdminSidebar />
      </div>
      {/* Área para renderizar la sección activa del administrador */}
      <main className="flex-1  md:py-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
