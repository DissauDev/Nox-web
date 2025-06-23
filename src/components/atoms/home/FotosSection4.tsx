import React from "react";
import { motion } from "framer-motion";
import Image1 from "../../../assets/desing/foto chica copy.webp";
import Image2 from "../../../assets/desing/foto galletas copy.webp";
import Image3 from "../../../assets/desing/a-home-baker-scoops-cookie-dough-onto-parchment-pa-2024-11-25-12-45-38-utc copy 2.webp";
import { HomeSection5 } from "./HomeSection5";

export const FotosSection4 = () => {
  return (
    <div className="relative ">
      {/* SECCIÓN 1: Primera imagen con dos efectos de luz alrededor */}
      <motion.div
        className="relative flex flex-col items-center justify-center mt-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Luz en la esquina superior derecha de la imagen 1 */}
        <div
          className="absolute top-0 right-0 transform -translate-y-1/4
                     w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] md:w-[440px] md:h-[440px]
             bg-[rgba(109,165,255,0.23)] rounded-full blur-3xl z-0 pointer-events-none"
        />
        {/* Luz en la esquina inferior izquierda de la imagen 1 */}
        <div
          className="absolute bottom-0 left-0 transform translate-y-1/4
                      w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] md:w-[440px] md:h-[440px]
             bg-[rgba(109,165,255,0.23)] rounded-full blur-3xl z-0 pointer-events-none"
        />
        <img
          src={Image1}
          alt="Imagen 1"
          className="w-full max-w-[80vw] mb-10 h-auto object-cover max-h-[68vh] rounded-[120px] relative z-10"
        />
        <div className="px-4 text-center">
          <h1 className="font-CamilaFont tracking-wider text-2xl md:text-4xl">
            Order Today, Enjoy This Week
          </h1>
          <h3 className="font-ArialRegular text-xs md:text-xl mx-10 mb-10 md:p-4 md:w-[70vw] text-balance">
            Place an order today and choose your favorite Mini or Large cookies
            in either a 48-Pack or 96-Pack. Enjoy your delicious treats, ready
            for pickup in as little as 90 minutes
          </h3>
        </div>
      </motion.div>

      {/* SECCIÓN 2: Segunda imagen sin efectos de luz */}
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <img
          src={Image2}
          alt="Imagen 2"
          className="w-full max-w-[80vw] mb-10 h-auto object-cover max-h-[68vh] relative z-10 rounded-[120px] "
        />
        <div className="px-4 text-center">
          <h1 className="font-CamilaFont tracking-wider text-2xl md:text-3xl">
            Choose Your Flavors
          </h1>
          <h3 className="font-ArialRegular text-xs md:text-xl mx-10 mb-10 md:p-4  md:w-[70vw] text-balance">
            Treat your guests to a delectable assortment from our weekly menu!
            Choose from our rotating flavors of Mini or Large cookies. Starting
            with orders of 48, you can add increments of 12 to customize your
            selection perfectly
          </h3>
        </div>
      </motion.div>

      {/* SECCIÓN 3: Tercera imagen con efectos de luz */}
      <motion.div
        className="relative flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Luz en la esquina superior derecha de la imagen 3 */}
        <div
          className="absolute top-0 right-0 transform -translate-y-1/4
                 w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] md:w-[440px] md:h-[440px]
             bg-[rgba(109,165,255,0.23)] rounded-full blur-3xl z-0 pointer-events-none"
        />
        <img
          src={Image3}
          alt="Imagen 3"
          className="w-full max-w-[80vw] mb-10 h-auto object-cover max-h-[68vh] rounded-[120px] relative z-10"
        />
        <div className="px-4 text-center">
          <h1 className="font-CamilaFont tracking-wider text-2xl md:text-3xl">
            Planning Something Big?
          </h1>
          <h3 className="font-ArialRegular text-xs md:text-xl mx-10 mb-10 md:p-4 md:w-[70vw] text-balance">
            Need more cookies? Place an order in advance and make your event a
            hit! Whether it's a birthday bash, corporate event, or family
            reunion, we've got you covered with a variety of flavor options
            tailored for your gatherings.
          </h3>
        </div>
        <div className="relative z-10 pb-10">
          <HomeSection5 />
        </div>
        {/* Efecto de luz detrás de HomeSection5 */}
        <div className="absolute top-2/3 inset-0 bott flex items-center justify-center pointer-events-none z-0">
          <div
            className="  w-[350px] h-[350px] sm:w-[440px] sm:h-[440px] md:w-[440px] md:h-[440px]
             bg-[rgba(109,165,255,0.23)] rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </div>
  );
};
