// src/components/CouponCard.tsx
import { Coupon } from "@/pages/Admin/types/cupons";
import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface CouponCardProps {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative">
      {/* "Hoyos" para simular papel perforado */}
      <div className="absolute -left-2 z-20 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-black rounded-full" />
      <div className="absolute -right-2 z-20 top-1/2 transform -translate-y-1/2 w-4 h-8 bg-black rounded-full" />

      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col relative">
        {/* Botones de acción en esquina superior derecha */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button onClick={() => onEdit(coupon)} title="Editar">
            <FiEdit className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
          <button onClick={() => onDelete(coupon.id)} title="Eliminar">
            <FiTrash2 className="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </button>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h3 className="text-4xl font-bold text-slate-800">
              {coupon.discountPercentage}% Off
            </h3>
            <p className="text-gray-500 mt-1 text-lg">En tu próxima compra</p>
            <p className="text-gray-500 mt-4 text-sm">
              Vence el {new Date(coupon.expiryDate).toLocaleDateString()}
            </p>
            <p className="text-sm mt-2 text-gray-600">Código: {coupon.code}</p>
            {coupon.limited ? (
              <p className="text-xs text-red-500 mt-1">
                Restantes: {coupon.available}/{coupon.total}
              </p>
            ) : (
              <p className="text-xs text-red-500 mt-1">
                Restantes: -all | Total: -infinite
              </p>
            )}
          </div>
          <div className="w-16 h-16 relative">
            <CubeIcon className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;

// Componente del ícono (se puede mover a otro archivo si se desea reutilizar)
function CubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="purpleBlueGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <g>
        {/* Top face */}
        <polygon
          points="50,20 20,40 50,60 80,40"
          fill="#8B5CF6"
          className="opacity-90"
        />
        {/* Left face */}
        <polygon
          points="20,40 20,70 50,90 50,60"
          fill="#6366F1"
          className="opacity-80"
        />
        {/* Right face */}
        <polygon
          points="50,60 50,90 80,70 80,40"
          fill="#A855F7"
          className="opacity-95"
        />
      </g>
    </svg>
  );
}
