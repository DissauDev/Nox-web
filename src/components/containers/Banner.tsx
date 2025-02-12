import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import NoxBanner from "../../assets/nox-banner.png";
import NoxSideBar from "../../assets/nox-sideBar.png";
import { FiShoppingBag, FiTruck } from "react-icons/fi";
import { setAddress } from "../../store/features/slices/addressSlice";
import AddressModal from "../atoms/home/AddressModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const Banner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false); // Modal del menú móvil
  const [addressModalOpen, setAddressModalOpen] = useState(false); // Modal para cambiar la dirección
  const dispatch = useAppDispatch();
  const savedAddress = useAppSelector((state) => state.address.savedAddress);

  // Función para alternar el menú móvil
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <header
      id="banner"
      className="bg-midnight-blue-950 fixed w-full top-0 z-50 shadow-lg text-white"
    >
      {/* Banner para pantallas grandes */}
      <nav className="hidden md:flex items-center justify-between px-14">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink
            to="/"
            className="transition duration-300 hover:text-mustard-yellow-400"
          >
            <img
              src={NoxBanner}
              alt="Banner"
              className="h-8 md:h-8 lg:h-14 ml-4 lg:ml-20 mt-4 w-auto object-contain"
            />
          </NavLink>
        </div>

        {/* Menú de navegación */}
        <ul className="flex items-center space-x-8 text-[18px] font-ArialRegular">
          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `hover:text-mustard-yellow-400 transition duration-300  ${
                  isActive
                    ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                    : ""
                }`
              }
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shipping"
              className={({ isActive }) =>
                `hover:text-mustard-yellow-400 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                    : ""
                }`
              }
            >
              Shipping
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth"
              className="font-ArialBold p-2 rounded-full bg-mustard-yellow-400 text-black-night-950 hover:bg-mustard-yellow-500 transition duration-300"
            >
              Sign In / Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `inline-block hover:text-mustard-yellow-400 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                    : ""
                }`
              }
            >
              <FiShoppingBag size={24} />
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Banner para móviles */}
      <div className="md:hidden flex justify-between items-center px-6 py-4">
        <img
          src={NoxSideBar}
          alt="Sidebar Logo"
          className="h-10 w-auto object-contain"
        />
        {/* Botón de Sign In / Sign Up para móviles */}
        <NavLink
          to="/signin"
          className="font-ArialBold p-2 rounded-full bg-mustard-yellow-400 text-black-night-950 hover:bg-mustard-yellow-500 transition duration-300"
        >
          Sign In / Sign Up
        </NavLink>
        <button onClick={toggleModal} className="text-white text-2xl">
          {modalOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Modal del menú para móviles */}
      {modalOpen && (
        <div className="fixed inset-0 bg-grape-950 text-valentino-950 flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-6 right-6 text-valentino-950 text-3xl"
            onClick={toggleModal}
          >
            <FaTimes />
          </button>
          {/* Opciones principales del menú */}
          <ul className="text-center space-y-8 text-2xl font-bold">
            {["Home", "Menu", "Cart"].map((item, index) => (
              <li key={index}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `hover:text-grape-200 transition duration-300 ${
                      isActive
                        ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                        : ""
                    }`
                  }
                  onClick={() => setModalOpen(false)}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Separador (puntos intermitentes) */}
          <div className="flex items-center justify-center my-8">
            {[...Array(15)].map((_, index) => (
              <span
                key={index}
                className="w-2 h-2 mx-1 bg-[#f3c244] rounded-full"
              ></span>
            ))}
          </div>

          {/* Opciones secundarias */}
          <div className="grid grid-cols-2 gap-6 text-lg font-medium">
            {["Profile", "Settings", "Help", "Logout"].map((item, index) => (
              <button
                key={index}
                className="hover:opacity-75 transition duration-300 text-valentino-950"
                onClick={() => setModalOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nuevo Banner de dirección guardada (solo se muestra si hay una dirección guardada) */}
      {savedAddress && (
        <div className="border-t border-gray-300">
          {/* Layout para pantallas medianas y grandes */}
          <div className="hidden md:flex items-center  px-14 py-2">
            <div className="flex items-center space-x-2">
              {savedAddress.type === "delivery" ? (
                <>
                  <FiTruck size={20} className="text-white" />
                  <span className="text-white font-ArialRegular ">
                    Warn delivery coockies
                  </span>
                </>
              ) : (
                <>
                  <FiShoppingBag
                    size={20}
                    className="text-white font-ArialRegular"
                  />
                  <span className="text-white">Pick Up Order</span>
                </>
              )}
            </div>
            <div className="flex items-center mx-4 space-x-4">
              <span className="text-affair-500 font-ArialBold">
                {savedAddress.fullAddress}
              </span>
              <button
                onClick={() => setAddressModalOpen(true)}
                className="text-mustard-yellow-400  hover:border-b-2 font-ArialRegular border-mustard-yellow-400"
              >
                Change
              </button>
            </div>
          </div>
          {/* Layout para pantallas pequeñas */}
          <div className="md:hidden px-6 py-2">
            <div className="flex items-center ">
              <div className="flex items-center space-x-2">
                {/* <img
                  src={NoxBanner}
                  alt="Banner"
                  className="h-8 w-auto object-contain"
                /> */}
                {savedAddress.type === "delivery" ? (
                  <span className="text-white">warn delivery coockies</span>
                ) : (
                  <span className="text-white">Pick Up Order</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-affair-500 font-bold">
                {savedAddress.fullAddress}
              </span>
              <button
                onClick={() => setAddressModalOpen(true)}
                className="text-mustard-yellow-400 hover:underline"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AddressModal para cambiar la dirección */}
      {addressModalOpen && (
        <AddressModal
          isOpen={addressModalOpen}
          onClose={() => setAddressModalOpen(false)}
          initialType={savedAddress?.type || "delivery"}
          onSelectAddress={(address, type) => {
            dispatch(setAddress({ ...address, type }));
          }}
        />
      )}
    </header>
  );
};
