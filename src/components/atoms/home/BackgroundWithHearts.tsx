import React from "react";

import Patterheart from "../../../assets/home/patron corazones.webp";
import CoockiesImage from "../../../assets/home/chocolate-homemade c.png";
import IcecreamImage from "../../../assets/home/various-ice-cream-ba.png";

export const BackgroundWithHearts = () => {
  return (
    <div className="relative min-h-screen  bg-rose-500 opacity-90 flex flex-col items-center justify-center overflow-hidden">
      {/* Imagen de fondo con corazones */}
      <img
        className="absolute inset-0 bg-cover bg-center "
        src={Patterheart}
        alt="Heart pattern"
        loading="lazy"
      />

      {/* Contenido */}
      <div className="relative z-10 text-white text-center p-6 flex flex-col items-center">
        <h1 className="text-4xl md:text-7xl max-w-xl text-balance uppercase font-CamilaFont leading-tight">
          Preorders
          <br /> Valentine’s
        </h1>
        <p className="text-lg md:text-2xl mt-4 max-w-xl mx-auto font-ArialBold">
          Our Valentine Menu now available
        </p>
        <button className="bg-mustard-yellow-400 text-sm hover:bg-mustard-yellow-500 p-2 px-14 mt-6 uppercase rounded-full font-ArialBold text-black-night-950">
          Order Now
        </button>

        {/* Imágenes y botones */}
        <div className="flex flex-col items-center mt-20 w-full space-y-10 md:space-y-0 md:flex-row md:justify-center md:space-x-20">
          <div className="relative text-center">
            <div className="absolute inset-0  bg-purple-600 opacity-20 blur-lg rounded-full w-[120%] h-[120%] -z-10"></div>
            <img
              src={CoockiesImage}
              className="w-[60vw] md:w-[24vw] h-auto"
              alt="Cookies"
            />
            <h3 className="mt-4 text-xl font-bold">Cookies</h3>
            <button className="text-mustard-yellow-400 text-sm hover:text-mustard-yellow-500 p-2 px-14 mt-6 uppercase rounded-full font-ArialBold bg-black-night-900">
              Order Now
            </button>
          </div>

          <div className="font-ArialBold text-6xl  md:block">+</div>

          <div className="relative text-center">
            <div className="absolute inset-0 bg-purple-600 opacity-20 blur-lg rounded-full w-[120%] h-[120%] -z-10"></div>
            <img
              src={IcecreamImage}
              className="w-[60vw] md:w-[24vw] h-auto"
              alt="Ice Cream"
            />
            <h3 className="mt-4 text-xl font-bold">Ice Cream</h3>
            <button className="text-mustard-yellow-400 text-sm hover:text-mustard-yellow-500 p-2 px-14 mt-6 uppercase rounded-full font-ArialBold bg-black-night-900">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
