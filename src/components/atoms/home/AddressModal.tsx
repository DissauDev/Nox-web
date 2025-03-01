import React, { useState, useEffect } from "react";
import { addresses, CAAddress } from "../../../utils/addresses";
import { useNavigate } from "react-router-dom";
import { FaLocationArrow, FaTimes, FaStore } from "react-icons/fa";

import { FaLocationCrosshairs, FaMapLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: "delivery" | "pickup";
  onSelectAddress: (address: CAAddress, type: "delivery" | "pickup") => void;
}

interface ToggleSwitchProps {
  addressType: "delivery" | "pickup";
  onChange: (type: "delivery" | "pickup") => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = React.memo(
  ({ addressType, onChange }) => {
    return (
      <div className="mx-auto w-full max-w-xs">
        <div className="relative bg-gray-800 rounded-full p-1 flex items-center">
          <motion.div
            layout
            layoutId="switchIndicator"
            className="absolute top-0 left-0 h-full w-1/2 bg-purple-500 rounded-full"
            animate={{ x: addressType === "pickup" ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <button
            onClick={() => onChange("delivery")}
            className="relative z-10 w-1/2 flex items-center justify-center py-2 font-ArialRegular text-center transition-colors duration-300"
          >
            Delivery
          </button>
          <button
            onClick={() => onChange("pickup")}
            className="relative z-10 w-1/2 flex items-center justify-center py-2 font-ArialRegular text-center transition-colors duration-300"
          >
            Pick Up
          </button>
        </div>
      </div>
    );
  }
);

const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  initialType,
  onSelectAddress,
}) => {
  const [addressType, setAddressType] = useState<"delivery" | "pickup">(
    initialType
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState<CAAddress[]>([]);
  const [ipAddress, setIpAddress] = useState<CAAddress | null>(null);
  const navigate = useNavigate();

  // Filtra las direcciones según el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAddresses([]);
      return;
    }
    const results = addresses.filter((addr) =>
      addr.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAddresses(results);
  }, [searchTerm]);

  // Obtiene la dirección basada en la IP
  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detected: CAAddress = {
          id: Date.now(), // id temporal
          postalCode: data.postal || "",
          city: data.city || "",
          state: data.region || "",
          fullAddress: `${data.postal || ""} ${data.city || ""}, ${
            data.region || ""
          }`.trim(),
        };
        setIpAddress(detected);
      })
      .catch((err) =>
        console.error("Error obteniendo ubicación por IP: ", err)
      );
  }, []);

  // Guarda la dirección seleccionada (ya sea de la lista o la detectada)
  const handleSaveAddress = (address: CAAddress) => {
    onSelectAddress(address, addressType);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-gray-900 rounded-2xl shadow-2xl w-11/12 max-w-md p-6 border border-purple-700 relative"
      >
        {/* Botón de cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes size={20} />
        </button>

        {/* Cabecera con toggle para Delivery / Pick Up */}
        <div className="mb-4">
          <h2 className="text-center text-xl font-bold text-purple-400 mb-3">
            Select Order Type
          </h2>
          <ToggleSwitch addressType={addressType} onChange={setAddressType} />
        </div>

        {/* Input de búsqueda */}
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {addressType === "delivery" ? (
              <FaLocationArrow className="text-purple-500" size={20} />
            ) : (
              <FaStore className="text-purple-500" size={20} />
            )}
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              addressType === "delivery"
                ? "Enter delivery address"
                : "Enter pick up address"
            }
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none border border-purple-700"
          />
          {addressType === "pickup" && (
            <button
              onClick={() => navigate("/map")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full font-semibold transition-colors duration-300"
            >
              <FaMapLocationDot className="mr-2" size={16} />
              View Map
            </button>
          )}
        </div>

        {/* Lista de direcciones filtradas */}
        <div className="mb-4 max-h-40 overflow-y-auto">
          {filteredAddresses.length > 0 ? (
            <ul>
              {filteredAddresses.map((addr) => (
                <li
                  key={addr.id}
                  onClick={() => handleSaveAddress(addr)}
                  className="px-4 py-2 cursor-pointer rounded hover:bg-gray-800 transition-colors duration-200"
                >
                  {addr.fullAddress}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && (
              <p className="text-gray-400">No matching addresses found.</p>
            )
          )}
        </div>

        {/* Sección para la dirección detectada por IP */}
        {ipAddress && (
          <button
            onClick={() => handleSaveAddress(ipAddress)}
            className="mt-4 p-3 bg-gray-800 w-full hover:bg-gray-700 rounded-lg transition-colors duration-300"
          >
            <div className="flex items-center mb-2">
              <FaLocationCrosshairs className="mr-2 text-[#E01766]" size={16} />
              <span className="text-gray-400 text-sm font-ArialRegular">
                Your current address
              </span>
            </div>
            <div className="text-white font-bold text-base text-left">
              {ipAddress.fullAddress}
            </div>
          </button>
        )}
        {/* Divisor */}
        <hr className="border-t border-gray-700 my-4" />

        {/* Texto descriptivo */}
        <div className="mb-4 text-center text-creamy-white-50  text-lg font-ArialRegular  ">
          {addressType === "delivery"
            ? "Fresh, warm cookies delivered right to your door"
            : "Fresh, warm cookies ready for pickup"}
        </div>
      </motion.div>
    </div>
  );
};

export default AddressModal;
