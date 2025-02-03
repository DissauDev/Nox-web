import { FaApple, FaGooglePlay } from "react-icons/fa";
import ImageMobile from "../../assets/home/Mobile-Mockup copia  - copia.png";

const AppPromo = () => {
  return (
    <div
      className="relative w-full bg-[#231635] 
     text-white  flex flex-col md:flex-row items-center justify-between "
    >
      {/* Efecto Lighting Purple detrás de la imagen */}
      <div className="absolute right-0 bottom-0 md:top-1/2 md:-translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] bg-purple-500 opacity-30 blur-3xl rounded-full z-0"></div>

      {/* Contenedor del texto y botones (pantallas grandes) */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-start px-6 md:px-12 z-10">
        <h2 className="text-xl md:text-3xl font-CamilaFont">
          Get the full Nox experience
        </h2>
        <p className="text-sm md:text-lg text-center md:text-start text-gray-200 mt-2">
          Level up your Nox experience with our award-winning app! Download now
          for a sprinkle of sweetness with every tap.
        </p>

        {/* Botones (solo en pantallas grandes) */}
        <div className="mt-4 hidden md:flex flex-row gap-3 w-full">
          <a
            href="#"
            className="flex items-center bg-black px-4 py-2 rounded-lg text-white text-sm md:text-lg font-semibold hover:bg-gray-800 transition w-auto"
          >
            <FaApple className="mr-2 text-lg md:text-2xl" />
            App Store
          </a>
          <a
            href="#"
            className="flex items-center bg-black px-4 py-2 rounded-lg text-white text-sm md:text-lg font-semibold hover:bg-gray-800 transition w-auto"
          >
            <FaGooglePlay className="mr-2 text-lg md:text-2xl" />
            Google Play
          </a>
        </div>
      </div>

      {/* Imagen y botones (pantallas pequeñas) */}
      <div className="relative w-full md:w-1/2 flex flex-row-reverse items-center md:items-end z-10">
        <img
          src={ImageMobile}
          alt="Insomnia Cookies App"
          className="h-auto max-h-[400px] relative  sm:max-h-[500px] md:max-h-[600px] lg:max-h-[700px] object-contain"
        />

        {/* Botones (solo en pantallas pequeñas) */}
        <div className="md:hidden flex flex-col items-center px-6 mt-4 w-full">
          <a
            href="#"
            className="flex items-center text-center bg-black px-4 py-2 rounded-lg text-white text-sm font-semibold hover:bg-gray-800 transition w-full text-center"
          >
            <FaApple className="mr-2 text-lg" />
            App Store
          </a>
          <a
            href="#"
            className="flex items-center bg-black px-4 py-2 rounded-lg text-white text-sm font-semibold hover:bg-gray-800 transition w-full text-center mt-2"
          >
            <FaGooglePlay className="mr-2 text-lg" />
            Google Play
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppPromo;
