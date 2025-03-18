import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
//import ImageCoockie from "../../assets/desing/foto dulces .png";
import ImageCoockie from "../../assets/cookie.png";
import ImageCoockie1 from "../../assets/FOTOS NOX CATERING/cookie2.png";
import ImageCoockie2 from "../../assets/FOTOS NOX CATERING/cookie11.png";
import ImageCoockie3 from "../../assets/FOTOS NOX CATERING/cookie6.png";
import ImageCoockie4 from "../../assets/FOTOS NOX CATERING/cookie8.png";

export const Slider = () => {
  const [showExit, setShowExit] = useState(false);

  // Después de 3 segundos se muestra la animación de salida
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExit(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black">
      <div
        className="relative flex md:flex-row items-center overflow-hidden 
                   bg-midnight-blue-950 min-h-[400px] md:min-h-[500px] w-full px-4 md:px-6"
      >
        {!showExit && <EnterAnimation />}
        {showExit && <ExitAnimation />}
      </div>
    </div>
  );
};

const EnterAnimation = () => {
  return (
    <>
      {/* Texto y botón */}
      <motion.div
        className="absolute left-4 md:left-8 max-w-[220px] md:max-w-[600px] lg:max-w-[960px] text-left opacity-0 leading-tight z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-9xl font-bold">
          Most popular at the bakery
        </h1>
        <button className="bg-rose-600 text-white py-1 px-6 md:py-2 md:px-12 mt-6 md:mt-10 rounded-full shadow-md hover:bg-rose-800 transition">
          <h4 className="uppercase font-ArialBold px-1 md:px-2 text-xs md:text-base">
            Order Now
          </h4>
        </button>
      </motion.div>

      {/* Imagen animada */}
      <motion.div
        className="absolute bottom-0 w-[43%] md:w-[50%] flex justify-center p-2 md:p-4 z-20"
        style={{ left: "30%", transform: "translateX(-50%)" }}
        initial={{ y: 150, scale: 1.2, rotate: -10, opacity: 0 }}
        animate={{
          y: [150, 0, 0],
          x: [0, 0, "40%"],
          rotate: [-10, -5, 60],
          scale: [1.2, 1, 1],
          opacity: [1, 1, 1],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeOut",
        }}
      >
        <img
          src={ImageCoockie}
          alt="Cookies Images"
          loading="lazy"
          className="w-full h-auto object-cover md:max-w-md"
        />
      </motion.div>
    </>
  );
};

export const ExitAnimation = () => {
  return (
    <>
      {/* Contenedor que sale hacia la izquierda (texto y botón) */}
      <motion.div
        className="absolute left-4 md:left-8 max-w-[220px] md:max-w-[960px] text-left leading-tight z-10"
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-9xl font-bold">
          Most popular at the bakery
        </h1>
        <button className="bg-rose-600 text-white py-1 px-6 md:py-2 md:px-12 mt-6 md:mt-10 rounded-full shadow-md hover:bg-rose-800 transition">
          <h4 className="uppercase font-ArialBold px-1 md:px-2 text-xs md:text-base">
            Order Now
          </h4>
        </button>
      </motion.div>

      {/* Texto que aparece desde arriba */}
      <motion.div
        className="absolute top-8 md:top-5 w-full text-center z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-white text-5xl md:text-6xl max-w-[90%] lg:text-6xl font-bold">
          Pick a warm, delicious 12-packs.
        </h1>
      </motion.div>

      {/* Botón inferior */}
      <motion.div
        className="absolute bottom-2 md:bottom-5 left-0 w-full flex justify-center z-30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
      >
        <button className="bg-rose-600 text-white py-1 px-6 md:py-2 md:px-12 rounded-full shadow-md hover:bg-rose-800 transition">
          <h4 className="uppercase font-ArialBold px-1 md:px-2 text-xs md:text-base">
            Order Now
          </h4>
        </button>
      </motion.div>

      {/* Imagen principal: rota a la izquierda y reduce tamaño */}
      <motion.div
        className="absolute bottom-0 w-[43%] md:w-[34%] left-[30%] md:left-[34%] lg:left-[33%]
         flex justify-center p-2 md:p-4 z-20"
        style={{ transform: "translateX(-50%)" }}
        initial={{ x: "40%", y: 0, rotate: 60, scale: 1, opacity: 1 }}
        animate={{ x: "0%", y: 0, rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img
          src={ImageCoockie}
          alt="Cookies Images"
          loading="lazy"
          className="w-full h-auto object-cover md:max-w-md"
        />
      </motion.div>

      {/* Imagen de fondo derecha */}
      <motion.div
        className="absolute bottom-0 w-[40%] md:w-[34%] flex justify-center p-2 md:p-4 z-10"
        style={{ left: "40%", transform: "translateX(-50%)" }}
        initial={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
        animate={{ x: "20%", rotate: 40, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
      >
        <img
          src={ImageCoockie2}
          alt="Cookies Images"
          loading="lazy"
          className="w-full h-auto object-cover md:max-w-sm"
        />
      </motion.div>

      {/* Imagen de fondo izquierda */}
      <motion.div
        className="absolute bottom-0 w-[40%] md:w-[34%] flex justify-center p-2 md:p-4 z-10"
        style={{ left: "24%", transform: "translateX(-50%)" }}
        initial={{ x: 0, y: 0, rotate: 0, scale: 0.8, opacity: 0 }}
        animate={{ x: "-20%", rotate: -40, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
      >
        <img
          src={ImageCoockie1}
          alt="Cookies Images"
          loading="lazy"
          className="w-full h-auto object-cover md:max-w-sm"
        />
      </motion.div>

      {/* Imagen de fondo derecha posterior */}
      <motion.div
        className="absolute bottom-0  w-[40%] md:w-[35%] flex justify-center p-2 md:p-4 z-5"
        style={{ left: "50%", transform: "translateX(-50%)" }}
        initial={{ x: "0%", y: 0, rotate: 0, scale: 0.7, opacity: 0 }}
        animate={{ x: "30%", rotate: 50, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
      >
        <img
          src={ImageCoockie4}
          alt="Right Image 2"
          loading="lazy"
          className="w-full h-auto object-cover md:max-w-sm"
        />
      </motion.div>

      {/* Imagen de fondo izquierda posterior */}
      <motion.div
        className="absolute bottom-0 w-[40%] md:w-[35%] flex justify-center p-2 md:p-4 z-5"
        style={{ left: "15%", transform: "translateX(-50%)" }}
        initial={{ x: "0%", y: 0, rotate: 0, scale: 0.7, opacity: 0 }}
        animate={{ x: "-30%", rotate: -50, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: "easeOut" }}
      >
        <img
          src={ImageCoockie3}
          alt="Left Image 2"
          loading="lazy"
          className="w-full h-auto object-cover md:max-w-sm"
        />
      </motion.div>
    </>
  );
};
/*    <div className="flex flex-col z-10 md:flex-row items-center bg-midnight-blue-950 min-h-[300px] md:min-h-[450px]">

        <motion.div
          className="text-center md:text-left md:ml-40 flex flex-col justify-center items-center md:items-start space-y-4 md:w-1/2 p-4 md:p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            className="text-xl md:text-4xl font-semibold text-white font-ArialRegular max-w-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Most popular at the bakery
          </motion.h1>
          <motion.h3
            className="text-xl text-center font-semibold text-white font-ArialRegular"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Pick a warm, delicious 12-packs.
          </motion.h3>
          <motion.button
            className="bg-rose-600 text-white py-2 px-12 mt-10 rounded-full shadow-md hover:bg-rose-800 transition"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h4 className="uppercase font-ArialBold px-2">Order Now</h4>
          </motion.button>
        </motion.div>

        <div className="flex justify-center md:justify-end w-full md:w-1/2 lg:w-1/2">
          <img
            src={ImageCoockie}
            alt="Cookies Images"
            loading="lazy"
            className="w-full h-auto object-cover md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>*/
