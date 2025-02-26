import React from "react";
import ImageCoockie from "../../assets/desing/foto dulces .png";

export const Slider = () => {
  return (
    <div className="bg-black">
      <div className="flex flex-col z-10  md:flex-row items-center bg-midnight-blue-950    min-h-[300px] md:min-h-[450px]">
        {/* Contenedor del texto y el botón */}

        <div
          className="text-center md:text-left md:ml-40 flex flex-col justify-center items-center md:items-start space-y-4
         md:w-1/2 p-4 md:p-8"
        >
          <h1 className="text-xl md:text-4xl font-semibold text-white font-ArialRegular max-w-md">
            Most popular at the bakery
          </h1>
          <h3 className="text-xl  text-center font-semibold text-white font-ArialRegular">
            Pick a warm, delicious 12-packs.
          </h3>
          <button className="bg-rose-600  text-white py-2 px-12 mt-10 rounded-full shadow-md hover:bg-rose-800 transition">
            <h4 className="uppercase font-ArialBold px-2">Order Now</h4>
          </button>
        </div>

        {/* Contenedor de la imagen */}
        <div className="flex justify-center  md:justify-end w-full md:w-1/2 lg:w-1/2">
          <img
            src={ImageCoockie}
            alt="Cookies Images"
            loading="lazy"
            className="w-full h-auto object-cover md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </div>
  );
};
