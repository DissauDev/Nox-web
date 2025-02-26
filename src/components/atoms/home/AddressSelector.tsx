import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CAAddress } from "../../../utils/addresses";
import { setAddress } from "../../../store/features/slices/addressSlice";
import { FiTruck, FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";
import AddressModal from "./AddressModal";
import { FaMapMarkerAlt } from "react-icons/fa";

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
      <div className="relative bg-gray-900 rounded-full p-1 flex items-center">
        <motion.div
          layout
          className="absolute top-0 left-0 h-full w-1/2 bg-purple-500 rounded-full"
          animate={{ x: addressType === "pickup" ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <button
          onClick={() => onChange("delivery")}
          className="relative z-10 w-1/2 flex items-center justify-center py-2 text-white "
        >
          Delivery
        </button>
        <button
          onClick={() => onChange("pickup")}
          className="relative z-10 w-1/2 flex items-center justify-center py-2 text-white"
        >
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
    <div className="relative">
      {/* Contenedor que oculta el desborde (para la luz superior) */}
      <div className="overflow-hidden">
        <div className="relative flex flex-col items-center justify-center mt-20  px-4">
          {/* Luz difuminada arriba a la derecha */}
          <div
            className="absolute top-0 right-0 transform -translate-y-1/2 
                     w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64
                     bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl z-0"
          />

          {/* Componente principal */}
          <div className="relative p-6 rounded shadow-md text-center border-purple-700 w-full max-w-md z-10">
            {/* Toggle switch para Delivery / Pick Up */}
            <ToggleSwitch addressType={initialType} onChange={setInitialType} />

            {/* Input para buscar dirección - versión flex */}
            <div className="mt-6">
              <div className="flex  items-center bg-[#0B1529] border border-[#Fdf9f3] rounded-full w-full max-w-xs mx-auto overflow-hidden">
                <FaMapMarkerAlt className="text-[#E01766] ml-3" size={18} />
                <input
                  type="text"
                  readOnly
                  onFocus={() => handleOpenModal(initialType)}
                  placeholder={
                    initialType === "delivery"
                      ? "Enter Delivery address"
                      : "Enter Pick up adress"
                  }
                  className="flex-1 text-center  py-2 px-4 bg-transparent text-[#Fdf9f3] font-ArialRegular font-semibold focus:outline-none"
                />
              </div>
            </div>

            {/* Texto descriptivo debajo del input */}
            <div className="mt-4 mx-8 max-w-xs">
              {initialType === "delivery" ? (
                <p className="text-creamy-white-50 text-xl font-semibold font-ArialRegular">
                  Fresh, warm cookies delivered right to your door
                </p>
              ) : (
                <p className="text-creamy-white-50 text-xl font-semibold font-ArialRegular">
                  Fresh, warm cookies ready for Pickup
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Luz difuminada abajo a la izquierda (fuera del contenedor con overflow-hidden para que se muestre) */}
      <div
        className="absolute bottom-32 md:bottom-40 left-0 transform -translate-x-1/2 translate-y-1/2 
                 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60
                 bg-[rgba(89,47,255,0.49)] rounded-full blur-3xl z-0"
      />

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        initialType={initialType}
        onSelectAddress={handleSelectAddress}
      />
    </div>
  );
};
