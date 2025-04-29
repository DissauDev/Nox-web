// DiscountCouponModal.tsx
import React from "react";
import { Check, Edit, Maximize, Send, X } from "lucide-react";
import DiscountVoucher from "../DiscountVoucher";
import VoucherCard from "./VoucherCard";

interface DiscountCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DiscountCouponModal({
  isOpen,
  onClose,
}: DiscountCouponModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 w-full flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>

      {/* Modal box */}
      <div className="relative bg-gray-900 text-white p-6 max-w-4xl w-full mx-4 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto font-sans z-10">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header buttons */}
        <div className="flex gap-2 mb-6">
          <button className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition">
            <Edit className="w-5 h-5" />
          </button>
          <button className="bg-gray-800 p-2 rounded hover:bg-gray-700 transition">
            <Maximize className="w-5 h-5" />
          </button>
          <button className="bg-gray-800 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition">
            <Send className="w-5 h-5" />
            <span>Enviar</span>
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Coupon image */}

          <VoucherCard />

          {/* Coupon details */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-4">
              Descuento 10% de bienvenida
            </h1>

            {/* Coupon code button */}
            <div className="bg-green-500 text-white text-center py-4 rounded mb-6">
              <div className="text-xl font-bold">BIEN3020</div>
            </div>

            {/* Coupon conditions */}
            <ul className="space-y-2 mb-6">
              {[
                "Activo",
                "Válido hasta el 2 oct 2021 1:59",
                "Cupón descuento",
                "10% de descuento",
                "100€ Compra mínima",
                "Válido en tienda física y online",
                "Se envía manualmente",
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Descripción</h2>
              <p className="text-gray-300">
                Cupón descuento 10% para clientes nuevos en su primera compra en
                nuestra tienda online.
              </p>
            </div>

            {/* Conditions */}
            <div>
              <h2 className="text-xl font-bold mb-2">Condiciones</h2>
              <p className="text-gray-300 mb-2">
                No acumulable a otras promociones.
              </p>
              <p className="text-gray-300 mb-2">Solo para clientes nuevos.</p>
              <p className="text-gray-300 mb-2">Compra mínima de 100€</p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
