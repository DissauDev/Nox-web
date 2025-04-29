// src/components/CouponsAndDiscounts.tsx
import React, { useState } from "react";
import { Coupon, ExpiredFilter, TabType } from "./types/cupons";
import CouponCard from "@/components/admin/CuponCard";
import CouponModal from "@/components/admin/CuponModal";
import { FaPlus } from "react-icons/fa6";
import DiscountVoucher from "@/components/admin/DiscountVoucher";

const CouponsAndDiscounts: React.FC = () => {
  // Estados para pestañas y filtro interno de vencidos
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [expiredFilter, setExpiredFilter] = useState<ExpiredFilter>("used");

  // Estado para búsqueda por código
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estado de la lista de cupones (datos de ejemplo)
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      discountPercentage: 20,
      expiryDate: "2022-01-30",
      code: "SUPER20",
      limited: true,
      available: 50,
      total: 100,
      used: false,
      status: "active",
    },
    {
      id: "2",
      discountPercentage: 15,
      expiryDate: "2022-02-15",
      code: "SAVE15",
      limited: false,
      available: 0,
      total: "-infinite",
      used: false,
      status: "active",
    },
    {
      id: "3",
      discountPercentage: 10,
      expiryDate: "2022-03-10",
      code: "TENOFF",
      limited: true,
      available: 0,
      total: 50,
      used: true,
      status: "deactivated",
    },
    {
      id: "4",
      discountPercentage: 30,
      expiryDate: "2021-12-31",
      code: "THIRTY30",
      limited: true,
      available: 0,
      total: 50,
      used: true,
      status: "expired",
    },
    {
      id: "5",
      discountPercentage: 25,
      expiryDate: "2021-12-31",
      code: "TWENTY5",
      limited: true,
      available: 10,
      total: 50,
      used: false,
      status: "expired",
    },
  ]);

  // Estados para modal y cupón en edición
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Funciones de acción
  const handleDelete = (id: string) => {
    if (window.confirm("¿Seguro de eliminar este cupón?")) {
      setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleSave = (coupon: Coupon) => {
    if (editingCoupon) {
      // Actualizar cupón existente
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? coupon : c)));
    } else {
      // Crear cupón nuevo, asignando id automáticamente
      setCoupons((prev) => [
        ...prev,
        { ...coupon, id: (prev.length + 1).toString() },
      ]);
    }
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  // Filtrado según la pestaña activa y búsqueda por código
  const filteredCoupons = coupons.filter((coupon) => {
    // Filtro por pestaña
    const tabFilter =
      activeTab === "expired"
        ? coupon.status === "expired" &&
          (expiredFilter === "used" ? coupon.used : !coupon.used)
        : coupon.status === activeTab;

    // Filtro por búsqueda (convertimos a minúsculas para una comparación case-insensitive)
    const searchFilter = coupon.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return tabFilter && searchFilter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">MIS CUPONES</h1>
        <button
          onClick={() => {
            setEditingCoupon(null);
            setIsModalOpen(true);
          }}
          className="px-4 flex justify-center items-center py-2 bg-[#FEC600] text-gray-900 font-semibold rounded-md hover:bg-yellow-500 transition-colors"
        >
          <FaPlus className="mx-2" /> Add Cupon
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code..."
          className=" px-4 py-2 border bg-transparent rounded-md focus:outline-none focus:border-2 border-[#FEC600]"
        />
      </div>

      {/* Pestañas principales */}
      <div className="mb-4">
        <div className="flex space-x-6">
          <button
            className={`pb-2 text-sm font-medium ${
              activeTab === "active"
                ? "border-b-2 border-[#FEC600] "
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("active")}
          >
            Cupones Activos
          </button>
          <button
            className={`pb-2 text-sm font-medium ${
              activeTab === "expired"
                ? "border-b-2 border-[#FEC600]"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("expired")}
          >
            Cupones Vencidos
          </button>
          <button
            className={`pb-2 text-sm font-medium ${
              activeTab === "deactivated"
                ? "border-b-2 border-[#FEC600]"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("deactivated")}
          >
            Cupones Desactivados
          </button>
        </div>
      </div>
      {/* Subpestañas para cupones vencidos */}
      {activeTab === "expired" && (
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-1 text-xs rounded-full border ${
              expiredFilter === "used"
                ? "bg-gray-600 text-white"
                : "border-gray-300 text-white"
            }`}
            onClick={() => setExpiredFilter("used")}
          >
            Vencidos Usados
          </button>
          <button
            className={`px-4 py-1 text-xs rounded-full border ${
              expiredFilter === "unused"
                ? "bg-gray-600 text-white"
                : "border-gray-300 text-white"
            }`}
            onClick={() => setExpiredFilter("unused")}
          >
            Vencidos Sin usar
          </button>
        </div>
      )}
      <DiscountVoucher />
      {/* Lista de cupones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {filteredCoupons.map((coupon) => (
          <DiscountVoucher key={coupon.id} />
        ))}
      </div>
      {isModalOpen && (
        <CouponModal
          coupon={editingCoupon}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCoupon(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CouponsAndDiscounts;
