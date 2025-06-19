import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import ImageNox from "../../assets/home/logo.png";
import Pattern from "../../assets/desing/pattern.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal de enlaces */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Grid de enlaces sin títulos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Columna 1: Enlaces de Orders */}
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300 font-ArialBold">
              Orders
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Order Status
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Track Order
            </a>
          </div>
          {/* Columna 2: Enlaces de Company */}
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300 font-ArialBold">
              About Us
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Careers
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Franchise
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Gift Cards
            </a>
          </div>
          {/* Columna 3: Enlaces de Support */}
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300 font-ArialBold">
              Contact Us
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              FAQs
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Terms of Service
            </a>
          </div>
          {/* Columna 4: Otros Enlaces (ejemplo: Blog, Press, etc.) */}
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:text-gray-300 font-ArialBold">
              Blog
            </a>
            <a href="#" className="hover:text-gray-300 ">
              Press
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Investors
            </a>
            <a href="#" className="hover:text-gray-300 font-ArialRegular">
              Sustainability
            </a>
          </div>
        </div>

        {/* Fila de redes sociales centradas */}
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-400 hover:text-white text-2xl">
            <FaTiktok />
          </a>
        </div>
      </div>

      <div className="relative  w-full bg-black-night-950 overflow-hidden py-4">
        {/* Fondo patrón gris oscuro */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${Pattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "1400px",
            backgroundPosition: "center",
            opacity: 0.05,
            filter: "grayscale(1) brightness(0.5)",
            backgroundBlendMode: "multiply",
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 max-w-6xl mx-auto flex justify-center">
          <img src={ImageNox} alt="Imagen Central" className="h-24" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
