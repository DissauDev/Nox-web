/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import NoxBanner from "../../assets/nox-banner.png";
import NoxSideBar from "../../assets/nox-sideBar.png";
import { FiShoppingBag, FiTruck } from "react-icons/fi";
//import { setAddress } from "../../store/features/slices/addressSlice";
//import AddressModal from "../atoms/home/AddressModal";
import { useAppSelector } from "../../store/hooks";
import CustomModal from "./CustomModal";
import { toast } from "@/hooks/use-toast";
import React, { useRef, useState, useLayoutEffect } from "react";

export const Banner: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  //const [addressModalOpen, setAddressModalOpen] = useState(false);
  //const dispatch = useAppDispatch();

  const location = useLocation();
  const savedAddress = useAppSelector((state) => state.address.savedAddress);
  const products = useAppSelector((state) => state.orders.products);
  const totalQuantity = products.length;
  const userAuth = useAppSelector((state) => state.auth.user);
  const [modalType, setModalType] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const bannerRef = useRef<HTMLDivElement>(null);
  const showAddressSection =
    location.pathname === "/" || location.pathname === "/home";
  // Función para actualizar la variable CSS de la altura del banner

  const updateBannerHeight = () => {
    if (bannerRef.current) {
      const h = bannerRef.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--banner-height", `${h}px`);
    }
  };

  // 1) Montar listener de resize solo una vez
  useLayoutEffect(() => {
    window.addEventListener("resize", updateBannerHeight);
    return () => window.removeEventListener("resize", updateBannerHeight);
  }, []);

  // 2) Cada vez que cambie la ruta o la sección de dirección,
  //    reaplicamos la medida antes del paint
  useLayoutEffect(() => {
    updateBannerHeight();
  }, [location.pathname, savedAddress]);

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
      className="bg-[#15203A] fixed w-full top-0 z-50 shadow-lg text-white"
    >
      {/* Barra superior para pantallas grandes */}
      <div className="hidden md:block bg-mustard-yellow-400 py-1 text-center">
        <span className="text-black font-ArialRegular text-sm">
          Get our Cookies , <strong>Mon - Sun / 11:30AM - 11:00PM</strong> ,
          Enjoy!
        </span>
      </div>

      <nav className="hidden md:flex items-center justify-between px-8">
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
        <ul className="flex items-center md:space-x-4 space-x-8 lg:space-x-8 text-[18px] font-ArialRegular">
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
              target="_blank"
              rel="noopener noreferrer"
              to="https://nox.dissau.site/blog/"
              className={({ isActive }) =>
                `hover:text-mustard-yellow-400 transition duration-300 ${
                  isActive
                    ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                    : ""
                }`
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            {isAuth ? (
              <NavLink
                to={userAuth.role === "USER" ? "/account" : "/dashboard"}
                className={({ isActive }) =>
                  `hover:text-mustard-yellow-400 transition duration-300 ${
                    isActive
                      ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                      : ""
                  }`
                }
              >
                {userAuth.role === "USER" ? " My account" : "Dashboard"}
              </NavLink>
            ) : (
              <NavLink
                to="/auth"
                className="font-ArialBold p-2 rounded-full bg-mustard-yellow-400 text-black-night-950 hover:bg-mustard-yellow-500 transition duration-300"
              >
                Sign In / Sign Up
              </NavLink>
            )}
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
        {!isAuth && (
          <NavLink
            to="/auth"
            className="font-ArialBold p-2 rounded-full bg-mustard-yellow-400 text-black-night-950 hover:bg-mustard-yellow-500 transition duration-300"
          >
            Sign In / Sign Up
          </NavLink>
        )}

        <button onClick={toggleModal} className="text-white text-2xl">
          {modalOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Modal del menú móvil */}
      {modalOpen && (
        <div className="fixed inset-0 bg-[#15203A] text-valentino-950 flex flex-col justify-center items-center z-50">
          <button
            className="absolute top-6 right-6 text-valentino-950 text-3xl"
            onClick={toggleModal}
          >
            <FaTimes />
          </button>
          <ul className="text-center space-y-8 text-2xl font-bold">
            {["Home", "Menu", "Cart"].map((item, index) => (
              <li key={index}>
                {item === "Cart" ? (
                  <NavLink
                    to={products.length === 0 ? "#" : "/cart"}
                    onClick={(e) => {
                      if (products.length === 0) {
                        e.preventDefault(); // cancela navegación
                        toast({
                          className: "border-l-4 border-yellow-500",
                          title: "🛒 Cart is Empty",
                          description:
                            "Please select at least one item to proceed.",
                        });
                      } else {
                        setModalOpen(false);
                      }
                    }}
                    className={({ isActive }) =>
                      `hover:text-grape-200 transition duration-300 ${
                        isActive
                          ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                          : ""
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                ) : (
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
                )}
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
          {/* Nuevos enlaces dinámicos: Profile, Contact Us, Blog */}
          <div className="grid grid-cols-1 gap-6 text-lg font-medium">
            {/* Profile */}
            {isAuth ? (
              <NavLink
                to={userAuth.role === "USER" ? "/account" : "/dashboard"}
                className={({ isActive }) =>
                  `hover:text-mustard-yellow-400 transition duration-300 ${
                    isActive
                      ? "border-b-2 border-mustard-yellow-400 rounded-sm px-2 py-1"
                      : ""
                  }`
                }
              >
                {userAuth.role === "USER" ? " My account" : "Dashboard"}
              </NavLink>
            ) : (
              <NavLink
                to="/auth"
                className="hover:opacity-75 transition duration-300 text-valentino-950 text-center"
                onClick={() => setModalOpen(false)}
              >
                Profile
              </NavLink>
            )}

            {/* Contact Us */}
            <NavLink
              to="/contact-us"
              className="hover:opacity-75 transition duration-300 text-valentino-950 text-center"
              onClick={() => setModalOpen(false)}
            >
              Contact Us
            </NavLink>

            {/* Blog (externo) */}
            <a
              href="https://nox.dissau.site/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-75 transition duration-300 text-valentino-950 text-center"
              onClick={() => setModalOpen(false)}
            >
              Blog
            </a>
          </div>
        </div>
      )}

      {/* Se muestra extensión si hay dirección guardada */}
      {showAddressSection && savedAddress && (
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
              <span className="text-[#fffce9] font-ArialBold">
                {savedAddress.fullAddress}
              </span>
              <a
                target="_blank"
                href="https://www.google.com/maps/place/422+E+Campbell+Ave,+Campbell,+CA+95008/@37.2869301,-121.9425607,16z/data=!3m1!4b1!4m6!3m5!1s0x808e34de644e1383:0xc1a0f0116d73eac4!8m2!3d37.2869301!4d-121.9425607!16s%2Fg%2F11c177bkr9?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D"
                className="text-mustard-yellow-400 hover:border-b-2 font-ArialRegular border-[#f4b71e]"
              >
                On Map
              </a>
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
              <span className="text-sapphire-400 font-bold">
                {savedAddress.fullAddress}
              </span>
              <a
                target="_blank"
                href="https://www.google.com/maps/place/422+E+Campbell+Ave,+Campbell,+CA+95008/@37.2869301,-121.9425607,16z/data=!3m1!4b1!4m6!3m5!1s0x808e34de644e1383:0xc1a0f0116d73eac4!8m2!3d37.2869301!4d-121.9425607!16s%2Fg%2F11c177bkr9?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D"
                className="text-mustard-yellow-400 hover:underline"
              >
                On Map
              </a>
            </div>
          </div>
        </div>
      )}

      {/*addressModalOpen && (
        <AddressModal
          isOpen={addressModalOpen}
          onClose={() => setAddressModalOpen(false)}
          initialType={savedAddress?.type || "delivery"}
          onSelectAddress={(address, type) => {
            dispatch(setAddress({ ...address, type }));
          }}
        />
      ) */}
    </header>
  );
};
