import React from "react";
import { motion } from "framer-motion";
import ImageCoockie from "../../assets/desing/foto dulces .png";

export const Slider = () => {
  return (
    <div className="bg-black">
      <div className="flex flex-col z-10 md:flex-row items-center bg-midnight-blue-950 min-h-[300px] md:min-h-[450px]">
        {/* Contenedor del texto y el botón con animación */}
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

        {/* Contenedor de la imagen */}
        <div className="flex justify-center md:justify-end w-full md:w-1/2 lg:w-1/2">
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
