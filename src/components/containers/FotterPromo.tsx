import React from "react";
import ImageMobile from "../../assets/home/Group 70.png";
import Pattern from "../../assets/desing/pattern.png";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export const FotterPromo = () => {
  return (
    <div className="relative w-full bg-black-night-950 text-white overflow-hidden">
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

      <div className="relative flex flex-row w-full min-h-[180px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[400px]">
        {/* Texto */}
        <div className="relative z-10 w-1/2 p-6 md:p-12 flex flex-col justify-center">
          <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl  uppercase text-left text-[#F4B71E] font-CamilaFont leading-snug whitespace-pre-line">
            The art of the <br /> perfect cookie.;
          </h2>
          <div className="bg-[#3948A4] h-0.5 w-4/6 md:w-5/6 my-4" />
          <p className=" text-[8px] sm:text-xs md:text-base font-ArialBold lg:text-xl text-gray-200">
            Nox Cookies Bar, quality you can taste{" "}
          </p>
          <p className=" text-[12px] sm:text-base md:text-2xl uppercase font-ArialBold lg:text-3xl text-gray-200">
            <strong>in every detail.</strong>
          </p>
        </div>
        <div
          className="
        bg-[rgba(21,32,58,0.6)] 
    -rotate-45 
    absolute 
    bottom-0 
    left-1/2 
    -translate-x-1/2 
    translate-y-1/2
    w-24
    h-24 
    sm:w-32
    sm:h-32
    md:w-48 
    md:h-48 
    rounded-xl 
    z-20
    overflow-hidden
  "
        >
          <div
            className="
      rotate-45 
      flex 
      flex-col
      items-center
      justify-start
      sm:gap-2 gap-4
      p-0 
      md:p-3 
      pt-3 md:pt-6
      w-full 
      h-full
    "
          >
            <div className="h-4 md:block hidden" />
            <div className="flex flex-row gap-2">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F4B71E]"
              >
                <FaInstagram className="size-5 sm:size-6 md:size-7" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F4B71E]"
              >
                <FaFacebook className="size-5 sm:size-6 md:size-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Imagen pegada sin espacios */}
        <div className="relative  w-1/2  overflow-hidden">
          <img
            src={ImageMobile}
            alt="Promo App"
            className="absolute z-20 inset-0 w-full translate-x-1/4 h-full object-cover"
          />
        </div>

        {/* Efecto Lighting Purple */}
        <div
          className="absolute right-0 bottom-0 md:top-1/2 md:-translate-y-1/2
               w-60 h-60 sm:w-80 sm:h-80 md:w-[500px] md:h-[460px]
               bg-[#92b1dd90] opacity-30 blur-3xl rounded-full z-0"
        ></div>
      </div>
    </div>
  );
};
