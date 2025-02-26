import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

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

export const DessertCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  return (
    <div className="relative flex flex-col w-full overflow-hidden px-4">
      {/* Barra de pestañas */}
      <div className="flex flex-col items-start justify-center px-4">
        <h1 className="uppercase font-ArialRegular font-medium mb-6 text-xl md:text-4xl text-mustard-yellow-400">
          Your dessert Destination
        </h1>
        <div className="w-full max-w-4xl flex gap-4 px-2 md:px-4 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setActiveIndex(index)}
              className={`pb-2 transition-all text-white ${
                activeIndex === index && "border-b-4 border-purple-500"
              }`}
            >
              <h4 className="text-xs sm:text-sm md:text-xl font-medium font-ArialRegular">
                {category.name}
              </h4>
            </button>
          ))}
        </div>
      </div>

      <div className="relative  flex flex-col items-center w-full py-8">
        {/* Contenedor del carrusel */}
        <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4">
          {/* Fondo de iluminación (solo en pantallas md en adelante) */}
          <div className="hidden md:block absolute w-2/5 max-w-[500px] h-4/5 max-h-[500px] left-20 opacity-40 blur-[40px] bg-purple-500/40 rounded-full"></div>

          {/* Contenedor de imagen con dimensiones fijas por breakpoint */}
          <div className="flex-shrink-0 w-[320px] sm:w-[260px] md:w-[390px] lg:w-[430px] h-[280px] sm:h-[260px] md:h-[360px] lg:h-[400px]">
            <img
              src={categories[activeIndex].img}
              alt={categories[activeIndex].name}
              className="w-full h-full object-cover rounded-lg shadow-purple-500 transition-all duration-500"
            />
          </div>

          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left w-full sm:w-1/2">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-CamilaFont text-affair-800">
              {categories[activeIndex].name}
            </h2>
            <p className="text-lg sm:text-lg md:text-lg font-ArialRegular min-h-[80px]">
              {categories[activeIndex].text}
            </p>
            <button className="mt-4 px-8 sm:px-10 py-2 bg-mustard-yellow-400 rounded-full text-black-night-950 font-ArialBold shadow-md hover:bg-mustard-yellow-500 transition">
              Menu
            </button>
          </div>
        </div>

        {/* Flechas de navegación */}
        <button
          className="absolute left-2 sm:left-5 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 sm:p-3 rounded-full text-white"
          onClick={prevSlide}
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          className="absolute right-2 sm:right-5 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 sm:p-3 rounded-full text-white"
          onClick={nextSlide}
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
