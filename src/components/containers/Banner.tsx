/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import NoxBanner from "../../assets/nox-banner.png";
import NoxSideBar from "../../assets/nox-sideBar.png";
import { FiShoppingBag, FiTruck } from "react-icons/fi";
import { setAddress } from "../../store/features/slices/addressSlice";
import AddressModal from "../atoms/home/AddressModal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CustomModal from "./CustomModal";

export const Banner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const savedAddress = useAppSelector((state) => state.address.savedAddress);
  const products = useAppSelector((state) => state.orders.products);
  const totalQuantity = products.length;
  const [modalType, setModalType] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);

  // Función para actualizar la variable CSS de la altura del banner
  const updateBannerHeight = () => {
    if (bannerRef.current) {
      const bannerHeight = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--banner-height",
        bannerHeight + "px"
      );
    }
  };

  useEffect(() => {
    updateBannerHeight();
    window.addEventListener("resize", updateBannerHeight);
    return () => window.removeEventListener("resize", updateBannerHeight);
  }, [savedAddress]); // Se re-calcula si cambia savedAddress

  const toggleModal = () => setModalOpen(!modalOpen);
  const handelCheck = (e: React.MouseEvent) => {
    if (!savedAddress) {
      e.preventDefault();
      setModalType("address");
      setIsOpen(true);
    } else if (savedAddress && products.length === 0) {
      e.preventDefault();
      setModalType("order");
      setIsOpen(true);
    } else {
      e.preventDefault();
      setModalType("checkout");
      setIsOpen(true);
    }
  };

  return (
    <header
      id="banner"
      ref={bannerRef}
      className="bg-midnight-blue-950 fixed w-full top-0 z-50 shadow-lg text-white"
    >
      {/* Barra superior para pantallas grandes */}
      <div className="hidden md:block bg-mustard-yellow-400 py-1 text-center">
        <span className="text-black font-ArialRegular text-sm">
          🚚 Get FREE DELIVERY with code <strong>JUST4U</strong> on orders $15+
        </span>
      </div>

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
                `hover:text-mustard-yellow-400 transition duration-300 ${
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
              to="/contact-us"
              className={({ isActive }) =>
                `hover:text-mustard-yellow-400 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                    : ""
                }`
              }
            >
              Contact Us
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
              onClick={handelCheck}
              to="/checkout"
              className={({ isActive }) =>
                `relative inline-block gap-2 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                    : "py-1 px-2 border-b-2 border-transparent"
                }`
              }
            >
              <FiShoppingBag
                size={24}
                className="hover:text-mustard-yellow-400"
              />
              <div
                className={`bg-mustard-yellow-400 hover:bg-mustard-yellow-400 w-5 h-5 rounded-full
                  absolute -top-3 -right-3 text-sm font-ArialBold text-center flex items-center justify-center ${
                    totalQuantity === 0 ? "hidden" : "block"
                  }`}
              >
                <h3 className="m-0">
                  {totalQuantity > 0
                    ? totalQuantity > 9
                      ? "9+"
                      : totalQuantity
                    : null}
                </h3>
              </div>
            </NavLink>
            {isOpen && (
              <CustomModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                //@ts-ignore
                modalType={modalType}
              />
            )}
          </li>
        </ul>
      </nav>

      {/* Banner para móviles */}
      <div className="md:hidden flex justify-between items-center px-6 py-4">
        <NavLink to="/">
          <img
            src={NoxSideBar}
            alt="Sidebar Logo"
            className="h-10 w-auto object-contain"
          />
        </NavLink>
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

      {/* Modal del menú móvil */}
      {modalOpen && (
        <div className="fixed inset-0 bg-grape-950 text-valentino-950 flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-6 right-6 text-valentino-950 text-3xl"
            onClick={toggleModal}
          >
            <FaTimes />
          </button>
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
          <div className="flex items-center justify-center my-8">
            {[...Array(15)].map((_, index) => (
              <span
                key={index}
                className="w-2 h-2 mx-1 bg-[#f3c244] rounded-full"
              ></span>
            ))}
          </div>
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

      {/* Se muestra extensión si hay dirección guardada */}
      {savedAddress && (
        <div className="border-t border-gray-300">
          <div className="hidden md:flex items-center px-14 py-2">
            <div className="flex items-center space-x-2">
              {savedAddress.type === "delivery" ? (
                <>
                  <FiTruck size={20} className="text-white" />
                  <span className="text-white font-ArialRegular">
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
                className="text-mustard-yellow-400 hover:border-b-2 font-ArialRegular border-mustard-yellow-400"
              >
                Change
              </button>
            </div>
          </div>
          <div className="md:hidden px-6 py-2">
            <div className="flex items-center ">
              <div className="flex items-center space-x-2">
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
