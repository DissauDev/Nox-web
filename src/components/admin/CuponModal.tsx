// src/components/CouponModal.tsx
import { Coupon, TabType } from "@/pages/Admin/types/cupons";
import { Listbox } from "@headlessui/react";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface CouponModalProps {
  coupon: Coupon | null;
  onClose: () => void;
  onSave: (coupon: Coupon) => void;
}

const statusOptions: { value: TabType; label: string }[] = [
  { value: "active", label: "Activo" },
  { value: "deactivated", label: "Desactivado" },
  { value: "expired", label: "Vencido" },
];

const CouponModal: React.FC<CouponModalProps> = ({
  coupon,
  onClose,
  onSave,
}) => {
  // Determinamos si se trata de un cupón nuevo o de edición
  const isNew = coupon === null;

  const [discountPercentage, setDiscountPercentage] = useState(
    coupon?.discountPercentage || 0
  );
  const [expiryDate, setExpiryDate] = useState(coupon ? coupon.expiryDate : "");
  const [code, setCode] = useState(coupon?.code || "");
  const [limited, setLimited] = useState(coupon?.limited || false);
  // Si es nuevo, "available" se definirá igual a "total", por lo que no mostramos campo de disponibilidad.
  const [total, setTotal] = useState(coupon ? coupon.total : "");
  // Para cupón nuevo se fuerza el estado "active"; de lo contrario se permite editar a través del dropdown
  const [status, setStatus] = useState<TabType>(coupon?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = coupon
      ? { ...coupon }
      : {
          id: "",
          discountPercentage: 0,
          expiryDate: "",
          code: "",
          limited: false,
          available: 0,
          total: "",
          used: false,
          status: "active",
        };
    newCoupon.discountPercentage = discountPercentage;
    newCoupon.expiryDate = expiryDate;
    newCoupon.code = code;
    newCoupon.limited = limited;
    // Si es nuevo, la disponibilidad se iguala al total
    newCoupon.available = isNew
      ? parseInt(total.toString())
      : coupon!.available;
    newCoupon.total = total;
    newCoupon.status = status;
    // Para cupón nuevo, no se permite marcar como usado manualmente
    newCoupon.used = isNew ? false : coupon!.used;
    onSave(newCoupon);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">
            {isNew ? "Nuevo Cupón" : "Editar Cupón"}
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-slate-100 p-1 rounded-full"
          >
            <IoMdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Descuento */}
          <div>
            <label className="block text-sm font-medium">Descuento (%)</label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(parseInt(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {/* Fecha de vencimiento */}
          <div>
            <label className="block text-sm font-medium">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Campo para cupón limitado */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={limited}
              onChange={(e) => setLimited(e.target.checked)}
              className="mr-2"
            />
            <label className="text-sm">Ticket limitado</label>
          </div>
          {/* Campo Total: si es nuevo se usa para definir la disponibilidad */}
          <div>
            <label className="block text-sm font-medium">Total</label>
            <input
              type="text"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className={`mt-1 block w-full border border-gray-300 rounded-md p-2 `}
              required
            />
          </div>
          {/* Dropdown para seleccionar estado con Headless UI */}

          {!isNew && (
            <div>
              <label className="block text-sm font-medium mb-1">Estado</label>
              <Listbox value={status} onChange={setStatus}>
                <Listbox.Button className="w-full border border-gray-300 rounded-md p-2 text-left">
                  {
                    statusOptions.find((option) => option.value === status)
                      ?.label
                  }
                </Listbox.Button>
                <Listbox.Options className="mt-1 border border-gray-300 rounded-md bg-white">
                  {statusOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        `cursor-pointer px-4 py-2 ${
                          active ? "bg-[#FEC600] text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouponModal;
