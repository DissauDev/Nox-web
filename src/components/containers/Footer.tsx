//import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import ImageNox from "../../assets/home/logo.png";
import Pattern from "../../assets/desing/pattern.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Sección principal de enlaces */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Grid de enlaces sin títulos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {/* Columna 1: Enlaces de Orders */}
          <div className="flex flex-col space-y-2">
            <a className="hover:text-gray-300 font-ArialBold">Orders</a>

            <Link
              to="/account/orders"
              className="hover:text-gray-300 font-ArialRegular"
            >
              My Orders
            </Link>
          </div>
          {/* Columna 2: Enlaces de Company */}
          <div className="flex flex-col space-y-2">
            <Link
              to="/contact-us"
              className="hover:text-gray-300 font-ArialBold"
            >
              Contact us
            </Link>

            <Link
              to="/contact-us#info"
              className="hover:text-gray-300 font-ArialRegular"
            >
              Info
            </Link>
            <Link
              to="/contact-us#faq"
              className="hover:text-gray-300 font-ArialRegular"
            >
              FAQS
            </Link>
            <Link
              to="/contact-us#map"
              className="hover:text-gray-300 font-ArialRegular"
            >
              Map
            </Link>
          </div>
          {/* Columna 3: Enlaces de Support */}
          <div className="flex flex-col space-y-2">
            <Link
              to={"/account/dashboard"}
              className="hover:text-gray-300 font-ArialBold"
            >
              Profile
            </Link>
            <Link
              to={"/account/details"}
              className="hover:text-gray-300 font-ArialRegular"
            >
              Account Details
            </Link>
            <Link
              to={"privacy-policy"}
              className="hover:text-gray-300 font-ArialRegular"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/terms"}
              className="hover:text-gray-300 font-ArialRegular"
            >
              Terms of Service
            </Link>
            <Link
              to={"/account/wishlist"}
              className="hover:text-gray-300 font-ArialRegular"
            >
              WhishList
            </Link>
          </div>
          {/* Columna 4: Otros Enlaces (ejemplo: Blog, Press, etc.) */}
          <div className="flex flex-col space-y-2">
            <a className="hover:text-gray-300 font-ArialBold">Links</a>
            <Link
              target="_blank"
              to="https://nox.dissau.site/blog/"
              className="hover:text-gray-300"
            >
              Blog
            </Link>
            <Link
              target="_blank"
              to={
                "https://www.google.com/maps/search/?api=1&query=422+E+Campbell+Ave,+Campbell,+CA+95008"
              }
              className="hover:text-gray-300 font-ArialRegular"
            >
              Google Map
            </Link>
          </div>
        </div>

        {/* Fila de redes sociales centradas 
        
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
        </div> */}
      </div>

      <div className="relative  w-full bg-black-night-950 overflow-hidden py-4">
        {/* Fondo patrón gris oscuro */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${Pattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "1200px",
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
