import React, { useState, useEffect } from "react";
import { addresses, CAAddress } from "../../../utils/addresses";
import { useNavigate } from "react-router-dom";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { FiShoppingBag, FiTruck } from "react-icons/fi";
import { FaMapLocationDot } from "react-icons/fa6";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: "delivery" | "pickup";
  onSelectAddress: (address: CAAddress, type: "delivery" | "pickup") => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({
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

  // Filtra las direcciones del arreglo según lo ingresado
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

  // Obtiene la dirección basada en la IP y la guarda en el estado
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

  // Función para guardar la dirección (ya sea de las sugerencias, la ingresada manualmente o la detectada por IP)
  const handleSaveAddress = (address: CAAddress) => {
    onSelectAddress(address, addressType);
    onClose();
  };

  // Dirección construida con la entrada manual del usuario
  const manualAddress: CAAddress = {
    id: Date.now(), // id temporal
    postalCode: "",
    city: "",
    state: "",
    fullAddress: searchTerm,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black-night-950 bg-opacity-80 z-50">
      <div className="bg-black-night-800 rounded-lg shadow-lg w-11/12 max-w-md p-6 border border-grape-700">
        {/* Cabecera con botones para Delivery / Pickup y botón de cierre */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-1"></div>
          <div className="flex space-x-2">
            <button
              onClick={() => setAddressType("delivery")}
              className={`px-4 py-2 flex items-center rounded-full font-ArialBold ${
                addressType === "delivery"
                  ? "bg-grape-800 text-white"
                  : "bg-black-night-700 text-gray-300"
              }`}
            >
              <FiTruck className="mr-2" /> Delivery
            </button>
            <button
              onClick={() => setAddressType("pickup")}
              className={`px-4 flex items-center py-2 rounded-full font-ArialBold ${
                addressType === "pickup"
                  ? "bg-grape-800 text-white"
                  : "bg-black-night-700 text-gray-300"
              }`}
            >
              <FiShoppingBag className="mr-2" /> Pick Up
            </button>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {/* Input de búsqueda con botón "View on Map" integrado en modo pickup */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Write address (post, city, state)"
            className="w-full pr-20 px-3 py-2 rounded-full bg-black-night-700 text-white placeholder-gray-400 focus:outline-none"
          />
          {addressType === "pickup" && (
            <button
              onClick={() => navigate("/map")}
              className="absolute items-center flex right-2 top-1/2 transform -translate-y-1/2
               bg-grape-500 hover:bg-grape-600 text-white px-3 py-1 rounded-full font-ArialBold"
            >
              <FaMapLocationDot className="mr-2" /> View Map
            </button>
          )}
        </div>

        {/* Lista de direcciones filtradas según la búsqueda */}
        <div className="mb-4 max-h-60 overflow-y-auto">
          {filteredAddresses.length > 0 ? (
            <ul>
              {filteredAddresses.map((addr) => (
                <li
                  key={addr.id}
                  onClick={() => handleSaveAddress(addr)}
                  className="px-3 py-2 hover:bg-black-night-700 cursor-pointer rounded text-white"
                >
                  {addr.fullAddress}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && (
              <p className="text-gray-400">
                No se encontraron direcciones coincidentes.
              </p>
            )
          )}
        </div>

        {/* Sección para mostrar la dirección detectada por IP */}
        {ipAddress && (
          <button
            onClick={() => handleSaveAddress(ipAddress)}
            className="mt-4 p-3 bg-black-night-700 w-full hover:bg-black-night-900 rounded"
          >
            <p className="text-gray-300 mb-2 flex items-center">
              {" "}
              <FaLocationArrow className="mr-2" /> Your Current Address
            </p>
            <div className="flex justify-between items-center">
              <span className="text-white">{ipAddress.fullAddress}</span>
            </div>
            <div className="w-1"></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressModal;
