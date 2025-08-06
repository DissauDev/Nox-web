// src/components/NewHomeSection.jsx
import React from "react";
import pattern from "../../../assets/desing/Artboard 1@4x.png";
import confeti from "../../../assets/desing/Artboard 1 copy 2@4x.png";
import starts from "../../../assets/desing/Artboard 1 copy@4x.png";
import cookie from "../../../assets/home/chocolate-homemade c.png";
import IceCream from "../../../assets/home/various-ice-cream-ba.png";
import Wings from "../../../assets/desing/Artboard 4@4x.png";

export const NewHomeSection = () => (
  <section className="relative w-full h-full bg-[#3948a4] overflow-hidden">
    <div
      className="absolute inset-0 opacity-50"
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "250% 250%", // ajusta la escala del patrón
      }}
    />

    {/* Capa de confeti */}
    <img
      style={{ backgroundRepeat: "repeat" }}
      src={confeti}
      alt="confetti"
      className="
        absolute
        inset-0
        w-full h-full
        object-cover object-center
        opacity-75
        pointer-events-none
        z-5
      "
    />
    {/* Confeti ¡repetido! */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${confeti})`,
        backgroundRepeat: "repeat",
        backgroundSize: "800px 800px", // más pequeño = más piezas
        opacity: 0.75,
      }}
    />

    {/* Estrellas ¡repetidas! */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${starts})`,
        backgroundRepeat: "repeat",
        backgroundSize: "600px 600px", // ajusta para mayor densidad
        opacity: 0.5,
      }}
    />

    <div className="relative z-20  py-10 flex flex-col items-center justify-center h-full px-4 text-white  md:space-y-12">
      {/* --- Título + alas --- */}
      <div className="relative inline-block px-6  overflow-visible">
        {/* Ala izquierda */}
        <img
          src={Wings}
          alt="wing"
          className="
        absolute -left-1/4 -top-1/2  transform  
        h-36 sm:h-44 md:h-60 lg:h-64 
        
      "
        />

        {/* El propio título */}
        <h1
          className="
      mx-4 md:mx-12
      text-center
      font-CamilaFont 
      font-bold 
      leading-snug 
      text-3xl sm:text-4xl md:text-5xl 
      max-w-xs sm:max-w-sm md:max-w-md       
      line-clamp-2         /* fuerza máximo 2 líneas */
    "
        >
          4Th July Independence Day
        </h1>

        {/* Ala derecha volteada */}
        <img
          src={Wings}
          alt="wing mirrored"
          className="
        absolute -right-1/4 -top-1/2 transform  -scale-x-100 
        h-36 sm:h-48 md:h-60 lg:h-64
    
      "
        />
      </div>

      {/* --- Subtítulo centrado --- */}
      <h3
        className="
    text-center
    font-ArialBold 
    leading-tight 
    text-xl sm:text-2xl md:text-2xl lg:text-3xl
    max-w-md 
    my-4 md:my-0
    line-clamp-2
  "
      >
        Celebrate 4Th July with Warm Nox Cookies!
      </h3>

      {/* Imágenes y signo “+” */}
      <div className="flex flex-col md:flex-row items-center justify-center sm:my-4 md:my-0  md:gap-x-24">
        {/* Cookie con glow */}
        <div className="relative ">
          <div className="absolute inset-0 bg-[#fffce9] opacity-30 rounded-full filter blur-3xl" />
          <img
            src={cookie}
            alt="cookie"
            className="relative w-44  md:w-60 lg:w-[280px] h-auto"
          />
          <h3 className="font-ArialBold drop-shadow-md text-xl md:text-2xl items-center justify-center text-center ">
            Cookie
          </h3>
        </div>

        {/* Símbolo + */}
        <div className="text-white">
          <span className="font-ArialBold text-center text-2xl sm:text-2xl md:text-8xl">
            +
          </span>
        </div>

        {/* Ice cream con glow */}
        <div className="relative ">
          <div className="absolute inset-0 bg-[#fffce9] opacity-30 rounded-full filter blur-3xl" />
          <img
            src={IceCream}
            alt="ice cream"
            className="relative w-44  md:w-64 lg:w-[280px] h-auto"
          />
          <h3 className="font-ArialBold drop-shadow-md text-xl md:text-2xl items-center justify-center text-center ">
            Ice Cream
          </h3>
        </div>
      </div>
    </div>
  </section>
);
