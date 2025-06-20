import React from "react";
import { motion } from "framer-motion";
import NoxLogo from "../../../assets/desing/Recurso 8@2x.png";
import ImagePromo from "../../../assets/desing/sesion 4.webp";

export const HomeSection3 = () => {
  return (
    <div className="relative ">
      <motion.img
        src={ImagePromo}
        className="h-auto  w-full"
        alt="Image Promo"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      />
      {/* Efectos de luz en el fondo */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2
             w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] md:w-[440px] md:h-[440px]
             bg-[rgba(109,165,255,0.23)] rounded-full blur-3xl z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
      />

      {/* Sección inferior: Logo, título, descripción y botón */}
      <motion.div
        className="flex flex-col items-center justify-center my-10 max-w-full overflow-hidden px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.img
          src={NoxLogo}
          className="h-auto w-[30vw] max-w-[220px] mb-4"
          alt="Nox Catering Logo"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
        />
        <motion.div
          className="text-center max-w-[90%] md:max-w-[70%] lg:max-w-[60%]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1
            className="uppercase font-CamilaFont tracking-wider text-3xl md:text-4xl my-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Nox Catering
          </motion.h1>
          <motion.h3
            className="font-ArialRegular text-[14px] md:text-[16px] lg:text-xl text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            Transform every occasion into a sweet celebration. Just select your
            nearest store and schedule your order in a few clicks.
          </motion.h3>
        </motion.div>
        <motion.div
          className="flex justify-center items-center my-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <a
            href={"/menu"}
            className="bg-sapphire-800 hover:bg-sapphire-900 rounded-full
                       py-2 px-8 md:px-10 font-ArialBold font-medium text-[16px] md:text-[18px]"
          >
            Order Catering
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
