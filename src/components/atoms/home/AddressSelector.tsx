import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CAAddress } from "../../../utils/addresses";
import { setAddress } from "../../../store/features/slices/addressSlice";
import { FiTruck, FiShoppingBag, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import AddressModal from "./AddressModal";

interface ToggleSwitchProps {
  addressType: "delivery" | "pickup";
  onChange: (type: "delivery" | "pickup") => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  addressType,
  onChange,
}) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative bg-gray-800 rounded-full p-1 flex items-center">
        <motion.div
          layout
          className="absolute top-0 left-0 h-full w-1/2 bg-purple-500 rounded-full"
          animate={{ x: addressType === "pickup" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <button
          onClick={() => onChange("delivery")}
          className="relative z-10 w-1/2 flex items-center justify-center py-2 text-white font-bold"
        >
          <FiTruck className="mr-2" size={18} />
          Delivery
        </button>
        <button
          onClick={() => onChange("pickup")}
          className="relative z-10 w-1/2 flex items-center justify-center py-2 text-white font-bold"
        >
          <FiShoppingBag className="mr-2" size={18} />
          Pick Up
        </button>
      </div>
    </div>
  );
};

export const AddressSelector = () => {
  const dispatch = useAppDispatch();
  const savedAddress = useAppSelector((state) => state.address.savedAddress);
  const [isModalOpen, setModalOpen] = useState(false);
  const [initialType, setInitialType] = useState<"delivery" | "pickup">(
    "delivery"
  );

  const handleOpenModal = (type: "delivery" | "pickup") => {
    setInitialType(type);
    setModalOpen(true);
  };

  const handleSelectAddress = (
    address: CAAddress,
    type: "delivery" | "pickup"
  ) => {
    dispatch(setAddress({ ...address, type }));
  };

  // Si ya hay una dirección guardada, no se muestra la UI de selección.
  if (savedAddress) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <div className="p-6 rounded shadow-md text-center  border-purple-700 w-full max-w-md">
        {/* Toggle switch para Delivery / Pick Up */}
        <ToggleSwitch addressType={initialType} onChange={setInitialType} />

        {/* Input grande para buscar dirección */}
        <div className="relative mt-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiMapPin className="text-purple-500" size={18} />
          </div>

          <input
            type="text"
            readOnly
            onFocus={() => handleOpenModal(initialType)}
            placeholder={
              initialType === "delivery"
                ? "Enter Delivery address"
                : "Enter Pick up adress"
            }
            className={`w-full rounded-full px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none ${"pl-12"}`}
          />
        </div>

        {/* Texto descriptivo debajo del input */}
        <div className="mt-4">
          {initialType === "delivery" ? (
            <p className="text-creamy-white-50 font-ArialRegular">
              Fresh, warm cookies delivered right to your door
            </p>
          ) : (
            <p className="text-creamy-white-50 font-ArialRegular">
              Fresh, warm cookies ready for pickup
            </p>
          )}
        </div>
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialType={initialType}
        onSelectAddress={handleSelectAddress}
      />
    </div>
  );
};
