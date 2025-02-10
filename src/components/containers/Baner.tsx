import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import NoxBanner from "../../assets/nox-banner.png";
import NoxSideBar from "../../assets/nox-sideBar.png";
import { FiShoppingBag } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // Función para alternar el modal
  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <header
      id="banner"
      className="bg-midnight-blue-950 fixed w-full top-0 z-50 shadow-lg text-white "
    >
      {/* Banner para pantallas grandes */}
      <nav className="hidden md:flex items-center justify-between px-14">
        {/* Logo */}
        <div className="flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-mustard-yellow-400 transition duration-300 ${
                isActive ? "underline decoration-[#f3c244]" : ""
              }`
            }
          >
            <img
              src={NoxBanner}
              className="h-10 md:h-12 lg:h-14 ml-20 mt-4 w-auto object-contain"
              alt="Banner"
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
                  isActive ? "underline decoration-[#f3c244]" : ""
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
                  isActive ? "underline decoration-[#f3c244]" : ""
                }`
              }
            >
              Shipping
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signin"
              className=" font-ArialBold p-2 rounded-full bg-mustard-yellow-400
              text-black-night-950
               hover:bg-mustard-yellow-500 transition duration-300"
            >
              Sign In / Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className="hover:text-mustard-yellow-400 transition duration-300"
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
          className="h-10 w-auto object-contain"
          alt="Sidebar Logo"
        />
        {/* Botón de Sign In / Sign Up para móviles */}
        <NavLink
          to="/signin"
          className="text-white hover:text-mustard-yellow-400 transition duration-300 text-lg"
        >
          Sign In / Sign Up
        </NavLink>
        <button onClick={toggleModal} className="text-white text-2xl">
          {modalOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Modal de pantalla completa (para móviles) */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-700 text-valentino-950 flex flex-col justify-center items-center z-50">
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
                    `hover:opacity-100 opacity-75 transition duration-300 ${
                      isActive ? "underline decoration-[#f3c244]" : ""
                    }`
                  }
                  onClick={() => setModalOpen(false)} // Cierra el modal al navegar
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Separador con puntos intermitentes */}
          <div className="flex items-center justify-center my-8">
            {[...Array(15)].map((_, index) => (
              <span
                key={index}
                className="w-2 h-2 mx-1 bg-[#f3c244] rounded-full"
              ></span>
            ))}
          </div>

          {/* Opciones secundarias en columnas */}
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
    </header>
  );
};

export default Navbar;
