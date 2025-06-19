import { FaApple, FaGooglePlay } from "react-icons/fa";
import ImageMobile from "../../assets/home/Mobile-Mockup copia copy.png";
import Pattern from "../../assets/desing/pattern.png";

export const AppPromo = () => {
  return (
    <div
      className="relative w-full bg-black-night-950 text-white flex flex-col md:flex-row
                 items-center justify-between lg:h-[500px] overflow-visible lg:mt-48"
    >
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
      {/* Efecto Lighting Purple detrás de la imagen */}
      <div
        className="absolute right-0 bottom-0 md:top-1/2 md:-translate-y-1/2
                   w-80 h-80 md:w-[500px] md:h-[460px]
                   bg-[#92b1dd90] opacity-30 blur-3xl rounded-full z-0"
      ></div>

      {/* Contenedor de texto y botones para pantallas medianas y grandes */}
      <div
        className="relative w-full md:w-1/2 flex flex-col items-center md:items-start
                      px-6 md:px-12 md:ml-20 z-10 mb-8 md:mb-0"
      >
        <h2 className="mt-8 md:mt-0 text-2xl md:text-4xl font-CamilaFont">
          Get the full Nox experience
        </h2>
        <p className="text-lg md:text-xl text-center md:text-start text-gray-200 mt-4">
          Level up your Nox experience with our award-winning app! Download now
          for a sprinkle of sweetness with every tap.
        </p>
        {/* Botones para pantallas medianas y grandes */}
        <div className="mt-6 hidden md:flex md:flex-col lg:flex-row gap-3 w-full">
          <a
            href="#"
            className="flex items-center justify-center bg-black px-4 py-2 rounded-lg text-white
                       text-sm md:text-lg font-semibold hover:bg-gray-800 transition w-auto"
          >
            <FaApple className="mr-2 text-lg md:text-2xl" />
            App Store
          </a>
          <a
            href="#"
            className="flex items-center justify-center bg-black px-4 py-2 rounded-lg text-white
                       text-sm md:text-lg font-semibold hover:bg-gray-800 transition w-auto"
          >
            <FaGooglePlay className="mr-2 text-lg md:text-2xl" />
            Google Play
          </a>
        </div>
      </div>

      {/* Contenedor de imagen y botones para pantallas pequeñas */}
      <div
        className="relative w-full md:w-1/2 flex flex-row items-center justify-center
                   md:items-end z-10 lg:absolute lg:bottom-0 lg:right-0"
      >
        {/* Botones (solo para pantallas pequeñas) */}
        <div className="md:hidden flex flex-col items-center gap-3 px-6 ml-4">
          <a
            href="#"
            className="flex items-center justify-center bg-black w-full px-4 py-2 rounded-lg text-white
                       text-sm font-semibold hover:bg-gray-800 transition"
          >
            <FaApple className="mr-2 text-lg" />
            App Store
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-full bg-black px-4 py-2 rounded-lg text-white
                       text-sm font-semibold hover:bg-gray-800 transition"
          >
            <FaGooglePlay className="mr-2 text-lg" />
            Google Play
          </a>
        </div>
        <img
          src={ImageMobile}
          alt="Insomnia Cookies App"
          className="h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[600px]
                     lg:max-h-[700px] object-contain"
        />
      </div>
    </div>
  );
};
