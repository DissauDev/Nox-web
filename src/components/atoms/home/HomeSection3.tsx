import React from "react";
import NoxLogo from "../../../assets/desing/Recurso 8@2x.png";

export const HomeSection3 = () => {
  return (
    <div className="relative">
      <div className="relative flex justify-end items-center p-6">
        {/* Luz difuminada de fondo */}

        {/* Contenedor del texto y botón */}
        <div className="max-w-4xl p-12 ml-auto mr-4 md:mr-24 text-right">
          <h1 className="font-ArialBold  text-2xl md:text-4xl">
            {"Most popular"}
            <br />
            {"at the bakery"}
          </h1>

          <div className="flex justify-center mt-4">
            <button className="bg-mustard-yellow-400 px-8 text-black font-ArialBold py-1.5 rounded-full text-xl">
              order now
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0  transform -translate-y-1/2 
                     w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64
                     bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl z-0"
      />
      {/* Luz difuminada abajo a la izquierda (fuera del contenedor con overflow-hidden para que se muestre) */}
      <div
        className="absolute top-0 -z-10 right-0 transform -translate-x-1/2 translate-y-1/2 
                 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60
                 bg-[rgba(89,47,255,0.27)] rounded-full blur-3xl "
      />
      <div className="flex flex-col items-center justify-center my-10 max-w-full overflow-hidden px-4">
        <img
          src={NoxLogo}
          className="h-auto w-[30vw] max-w-[220px] mb-4"
          alt="Nox Catering Logo"
        />
        <div className="text-center max-w-[90%] md:max-w-[70%] lg:max-w-[60%]">
          <h1 className="uppercase font-medium text-4xl md:text-5xl my-4">
            Nox Catering
          </h1>
          <h3 className="font-ArialRegular  text-[14px] md:text-[16px] lg:text-2xl text-balance">
            Transform every occasion into a sweet celebration. Just select your
            nearest store and schedule your order in a few clicks.
          </h3>
        </div>
        <div className="flex justify-center items-center my-10">
          <button
            className="bg-affair-800 hover:bg-affair-900 rounded-full
         py-2 px-8 md:px-10 font-ArialRegular font-medium text-[16px] md:text-[18px]"
          >
            Order Catering
          </button>
        </div>
      </div>
    </div>
  );
};
