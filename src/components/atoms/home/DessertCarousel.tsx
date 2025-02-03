import { useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import IceamImage from "../../../assets/Imnsomnia fotos/iceCream1.png";
import CoockiesImage from "../../../assets/Imnsomnia fotos/coockies.png";
import MashupsImage from "../../../assets/Imnsomnia fotos/mashups.png";
import DessertsImage from "../../../assets/Imnsomnia fotos/desserts.png";
import ForYouImage from "../../../assets/Imnsomnia fotos/for-you.png";
import DrinksImage from "../../../assets/Imnsomnia fotos/for-you.png";

const categories = [
  {
    id: "for-you",
    name: "For You",
    img: ForYouImage,
    text: "Discover personalized treats!",
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    img: IceamImage,
    text: "What is better than a coockie and ice cream? Coockie and Ice cream . All your favorite coockies mixed into premium ice cream flavors",
  },
  {
    id: "cookies",
    name: "Cookies",
    img: CoockiesImage,
    text: "What is better than a coockie and ice cream? Coockie and Ice cream . All your favorite coockies mixed into premium ice cream flavors",
  },
  {
    id: "dessert",
    name: "Dessert",
    img: DessertsImage,
    text: "Indulge in sweet magic!",
  },
  {
    id: "mashoops",
    name: "Mashoops",
    img: MashupsImage,
    text: "Refreshing and tasty!",
  },
  {
    id: "drinks",
    name: "Drinks",
    img: DrinksImage,
    text: "Refreshing and tasty!",
  },
];

const DessertCarousel = () => {
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
    <div className="relative flex flex-col h-screen w-full overflow-hidden  px-4">
      {/* Barra de pestañas */}
      <div className=" items-start justify-center flex flex-col px-4">
        <h1 className="uppercase font-CamilaFont md:ml-24 mb-6 text-xl md:text-3xl text-mustard-yellow-400 text-left">
          Your dessert Detination
        </h1>

        <div className="w-full max-w-4xl flex gap-4   px-2 md:px-24 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category.id}
              className={`pb-2 text-white  transition-all ${
                activeIndex === index &&
                "border-b-4 border-purple-500 text-white"
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <h4 className="text-[12px] md:text-xl font-ArialRegular">
                {category.name}
              </h4>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {/* Contenido del carrusel */}
        <div className="relative flex flex-col  justify-around w-full max-w-4xl h-full">
          {/* Fondo de iluminación */}

          <div className="absolute w-[40%] max-w-[500px] h-[80%] max-h-[500px] left-20 md:left-40 opacity-40 blur-[40px] bg-purple-500/40 rounded-full"></div>

          {/* Imagen y Texto */}
          <div className="relative flex items-center justify-center w-full max-w-4xl px-4">
            <img
              src={categories[activeIndex].img}
              alt={categories[activeIndex].name}
              className="w-[60vw] max-w-[400px] h-auto object-cover rounded-lg shadow-purple-500 transition-all duration-500"
            />
            <div className="w-20" />
            <div className="ml-6  text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-CamilaFont text-affair-800">
                {categories[activeIndex].name}
              </h2>
              <p className="text-sm md:text-lg font-ArialRegular ">
                {categories[activeIndex].text}
              </p>
              <button
                className="mt-4 
               px-12 py-2 bg-mustard-yellow-400  rounded-full text-black-night-950 font-ArialBold shadow-md
                hover:bg-mustard-yellow-500 transition"
              >
                Menu
              </button>
            </div>
          </div>
        </div>

        {/* Flechas de navegación */}
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-3 md:mx-20 rounded-full text-white"
          onClick={prevSlide}
        >
          <FaChevronLeft size={32} />
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-3 md:mx-20 rounded-full text-white"
          onClick={nextSlide}
        >
          <FaChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default DessertCarousel;
