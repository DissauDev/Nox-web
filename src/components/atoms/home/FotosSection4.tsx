import React from "react";
import Image1 from "../../../assets/home/img 1.webp";
import Image2 from "../../../assets/home/img 2.webp";
import Image3 from "../../../assets/home/img 3.webp";
import { HomeSection5 } from "./HomeSection5";

export const FotosSection4 = () => {
  return (
    <div className="relative ">
      {/* SECCIÓN 1: Primera imagen con dos efectos de luz alrededor */}
      <div className="relative flex flex-col items-center justify-center mt-10">
        {/* Luz en la esquina superior derecha de la imagen 1 */}
        <div
          className="absolute top-0 right-0 transform  -translate-y-1/4
                    w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64
                     bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl z-0 pointer-events-none"
        />
        {/* Luz en la esquina inferior izquierda de la imagen 1 */}
        <div
          className="absolute bottom-0 left-0 transform translate-y-1/4
                   w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64
                     bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl z-0 pointer-events-none"
        />
        <img
          src={Image1}
          alt="Imagen 1"
          className="w-4/5 mb-10 h-auto relative z-10"
        />
        <div className="px-4 text-center">
          <h1 className="font-ArialLight font-semibold text-2xl md:text-4xl">
            Order Today, Enjoy This Week
          </h1>
          <h3 className="font-ArialLight font-bold text-xs md:text-xl mx-10 mb-10 md:p-4 md:w-[70vw] text-balance">
            Place an order today and choose your favorite Mini or Large cookies
            in either a 48-Pack or 96-Pack. Enjoy your delicious treats, ready
            for pickup in as little as 90 minutes
          </h3>
        </div>
      </div>

      {/* SECCIÓN 2: Segunda imagen sin efectos de luz */}
      <div className="flex flex-col items-center justify-center">
        <img src={Image2} alt="Imagen 2" className="w-4/5 mb-10 h-auto" />
        <div className="px-4 text-center">
          <h1 className="font-ArialLight font-semibold text-2xl md:text-4xl">
            Choose Your Flavors
          </h1>
          <h3 className="font-ArialLight font-bold text-xs md:text-xl mx-10 mb-10 md:p-4 md:w-[70vw] text-balance">
            Treat your guests to a delectable assortment from our weekly menu!
            Choose from our rotating flavors of Mini or Large cookies. Starting
            with orders of 48, you can add increments of 12 to customize your
            selection perfectly
          </h3>
        </div>
      </div>

      {/* SECCIÓN 3: Tercera imagen con efectos de luz */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Luz en la esquina superior derecha de la imagen 3 */}
        <div
          className="absolute top-0 right-0 transform -translate-y-1/4
                   w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64
                     bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl z-0 pointer-events-none"
        />
        <img
          src={Image3}
          alt="Imagen 3"
          className="w-4/5 mb-10 h-auto relative z-10"
        />
        <div className="px-4 text-center">
          <h1 className="font-ArialLight font-semibold text-2xl md:text-4xl">
            Planning Something Big?
          </h1>
          <h3 className="font-ArialLight font-bold text-xs md:text-xl mx-10 mb-10 md:p-4 md:w-[70vw] text-balance">
            Need more cookies? Place an order in advance and make your event a
            hit! Whether it's a birthday bash, corporate event, or family
            reunion, we've got you covered with a variety of flavor options
            tailored for your gatherings.
          </h3>
        </div>
        <div className="relative z-10">
          <HomeSection5 />
        </div>
        {/* Efecto de luz detrás de HomeSection5, posicionado de forma absoluta dentro de la sección */}
        <div className="absolute top-2/3 inset-0 bott flex items-center justify-center pointer-events-none z-0">
          <div
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80
                       bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl"
          />
        </div>
        {/* HomeSection5 con z-index superior para que se muestre por encima del efecto */}
      </div>
    </div>
  );
};
