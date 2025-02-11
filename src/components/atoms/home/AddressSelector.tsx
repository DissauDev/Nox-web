import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { CAAddress } from "../../../utils/addresses";
import { AddressModal } from "./AddressModal";
import { setAddress } from "../../../store/features/slices/addressSlice";
import { FiShoppingBag, FiTruck } from "react-icons/fi";

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
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="p-6 rounded shadow-md text-center">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleOpenModal("delivery")}
            className="flex items-center px-4 py-2 bg-grape-800 text-white font-ArialBold rounded-full"
          >
            <FiTruck className="mr-2" /> Delivery
          </button>
          <button
            onClick={() => handleOpenModal("pickup")}
            className="flex items-center px-4 py-2 bg-grape-800 text-white font-ArialBold rounded-full"
          >
            <FiShoppingBag className="mr-2" />{" "}
            {/* Agrega un margen a la derecha del ícono */}
            Pick Up
          </button>
        </div>
        <div>
          <input
            type="text"
            readOnly
            onFocus={() => handleOpenModal(initialType)}
            placeholder="Buscar dirección"
            className="w-full px-3 py-2 bg-black-night-700  rounded-full"
          />
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
