/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/components/CouponsAndDiscounts.tsx
import React, { useState } from "react";
import {
  useGetCouponsQuery,
  useDeleteCouponMutation,
} from "@/store/features/api/couponsApi";
import { Coupon, TabType } from "./types/cupons";
import { FaPlus } from "react-icons/fa6";
import DiscountVoucher from "@/components/admin/DiscountVoucher";
import { toast } from "react-toastify";
import CouponModal from "@/components/admin/CuponModal";

const CouponsAndDiscounts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  const { data: coupons = [], isLoading, isError } = useGetCouponsQuery();
  const [deleteCoupon] = useDeleteCouponMutation();

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await deleteCoupon(id).unwrap();
      toast.success("Coupon deleted");
    } catch (err) {
      toast.error(err.data?.message || err.error || "Delete failed");
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setIsModalOpen(true);
  };

  // Determine active vs expired by comparing expiry date to now
  const now = new Date();
  const filteredCoupons = coupons.filter((c) => {
    const expiry = new Date(c.expiresAt);
    const isActive = expiry > now;
    const matchesTab = activeTab === "active" ? isActive : !isActive;
    const matchesSearch = c.code
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">MY COUPONS</h1>
        <button
          onClick={() => {
            setEditingCoupon(null);
            setIsModalOpen(true);
          }}
          className="px-4 flex items-center py-2 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 transition"
        >
          <FaPlus className="mr-2" /> Add Coupon
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code..."
          className="w-full px-4 py-2 bg-transparent border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>

      {/* Tabs */}
      <div className="mb-4 flex space-x-6">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-2 text-sm font-medium ${
            activeTab === "active"
              ? "border-b-2 border-yellow-400 text-gray-900"
              : "text-gray-400"
          }`}
        >
          Active Coupons
        </button>
        <button
          onClick={() => setActiveTab("expired")}
          className={`pb-2 text-sm font-medium ${
            activeTab === "expired"
              ? "border-b-2 border-yellow-400 text-gray-900"
              : "text-gray-400"
          }`}
        >
          Expired Coupons
        </button>
      </div>

      {/* Loading / Error */}
      {isLoading && <p className="text-gray-500">Loading coupons...</p>}
      {isError && <p className="text-red-500">Error loading coupons</p>}

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {filteredCoupons.map((coupon) => (
          <DiscountVoucher
            key={coupon.id}
            //@ts-ignore
            cupon={coupon}
            //@ts-ignore
            onEdit={() => handleEdit(coupon)}
            onDelete={() => handleDelete(coupon.id)}
            onSave={() => setIsModalOpen(false)}
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CouponModal
          //@ts-ignore
          coupon={editingCoupon}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCoupon(null);
          }}
          onSave={() => {
            setIsModalOpen(false);
            setEditingCoupon(null);
          }}
        />
      )}
    </div>
  );
};

export default CouponsAndDiscounts;
