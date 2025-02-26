import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Importa las imágenes correspondientes
import IceamImage from "../../../assets/Imnsomnia fotos/iceCream1.png";
import CoockiesImage from "../../../assets/Imnsomnia fotos/coockies.png";
import MashupsImage from "../../../assets/Imnsomnia fotos/mashups.png";
import DessertsImage from "../../../assets/Imnsomnia fotos/dessert3.png";
import ForYouImage from "../../../assets/Imnsomnia fotos/foryou.png";
import DrinksImage from "../../../assets/Imnsomnia fotos/drinks3.png";

const categories = [
  {
    id: "for-you",
    name: "For You",
    img: ForYouImage,
    text: "What's better than the most irresistible offers? For You. The special category that brings together the best offers, designed just for you.",
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    img: IceamImage,
    text: "What is better than a cookie and ice cream? Cookie and ice cream. All your favorite cookies mixed into premium ice cream flavors.",
  },
  {
    id: "cookies",
    name: "Cookies",
    img: CoockiesImage,
    text: "What's better than a cookie? Cookie. All your favorite cookies come together in one irresistible delight.",
  },
  {
    id: "dessert",
    name: "Dessert",
    img: DessertsImage,
    text: "What is better than an exquisite dessert? Exquisite dessert. Enjoy each bite with the perfect sweetness that captivates your palate.",
  },
  {
    id: "mashoops",
    name: "Mashoops",
    img: MashupsImage,
    text: "What's better than Mashoops? Mashoops! Immerse yourself in an explosion of flavor that transforms each bite into pure fun.",
  },
  {
    id: "drinks",
    name: "Drinks",
    img: DrinksImage,
    text: "What's better than a refreshing drink? Refreshing drink. Each sip combines your favorite flavors in a unique experience.",
  },
];

const AnimatedCategories = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  const prevCategory = () => {
    setSelectedIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const nextCategory = () => {
    setSelectedIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative p-6 "
    >
      <div className="max-w-4xl mx-auto mt-10 ">
        <h1 className="uppercase text-center font-ArialRegular  mb-6 text-xl md:text-4xl text-mustard-yellow-400 lg:ml-14 lg:text-left">
          Your Dessert Destination
        </h1>
      </div>

      {/* Carrusel de botones */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center text-center items-center gap-2 sm:gap-4 flex-wrap"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            onClick={() => setSelectedIndex(index)}
            whileHover={{ scale: 1.05 }}
            className={`cursor-pointer text-xs sm:text-sm md:text-xl lg:px-6
               flex flex-col items-center font-ArialRegular py-1 rounded transition-all ${
                 selectedIndex === index
                   ? "border-mustard-yellow-400 border-b-2 text-2xl scale-120"
                   : ""
               }`}
          >
            {category.name}
          </motion.div>
        ))}
      </motion.div>

      {/* Flechas de navegación */}
      <div className="flex mt-12  justify-between text-center items-center w-full max-w-md md:max-w-2xl md:mb-4 lg:max-w-4xl mx-auto">
        <button
          className="bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-700 transition"
          onClick={prevCategory}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className="bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-700 transition"
          onClick={nextCategory}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

      {/* Animación de contenido al hacer scroll */}
      <AnimatePresence mode="wait">
        {inView && (
          <motion.div
            key={selectedIndex}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="flex flex-col text-center md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-4 relative "
          >
            {/* Imagen animada */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full md:w-1/2  flex justify-center"
            >
              {/* Luz de fondo */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-20 sm:w-28 md:w-40 lg:w-44 h-20 sm:h-28 md:h-40 lg:h-44 bg-[rgb(89,47,255)] opacity-40 blur-3xl rounded-full"></div>
              </div>

              <img
                src={categories[selectedIndex].img}
                alt={categories[selectedIndex].name}
                className="relative w-72 sm:w-72 md:w-72 lg:w-96 h-auto object-cover rounded-lg shadow-lg transition-all duration-500"
              />
            </motion.div>

            {/* Texto y botón animados */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center md:text-left w-full md:w-1/2 p-4 flex flex-col items-center md:items-start"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-purple-800">
                {categories[selectedIndex].name}
              </h2>
              <p className="text-sm font-ArialBold sm:text-xl md:text-lg mt-2">
                {categories[selectedIndex].text}
              </p>
              <button className="mt-4 text-xl px-20 py-2 bg-mustard-yellow-400 rounded-full text-black font-ArialBold shadow-md hover:bg-mustard-yellow-500 transition">
                Menu
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedCategories;
