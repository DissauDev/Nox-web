import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useGetCategoriesAvailableOnCarouselQuery } from "@/store/features/api/categoriesApi";
import { useNavigate } from "react-router-dom";
import { DataError } from "../DataError";
import { EmptyData } from "../EmptyData";
import { encode } from "blurhash";

import Lottie from "lottie-react";
import animationData from "../../../assets/lotties/Animation - 10.json";
const AnimatedCategories = () => {
  const [loaded, setLoaded] = useState<boolean[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const navigate = useNavigate();
  // 1) Llamada RTK Query para traer únicamente categorías AVAILABLE y onCarousel=true
  const {
    data: categories,
    isLoading,
    isError,
  } = useGetCategoriesAvailableOnCarouselQuery();

  // 2) Estados de carga y error

  useEffect(() => {
    if (!categories) return;
    const hashes = new Array(categories.length).fill("");
    const loadedFlags = new Array(categories.length).fill(false);
    setLoaded(loadedFlags);
    categories.forEach((cat, idx) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = cat.imageUrl;
      img.onload = () => {
        const width = 32;
        const height = Math.round((img.height / img.width) * 32);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        hashes[idx] = encode(
          imageData.data,
          width,
          height,
          4, // X components
          4 // Y components
        );
      };
    });
  }, [categories]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Lottie
          animationData={animationData}
          loop
          className="max-w-[400px] h-auto"
        />
      </div>
    );
  }

  if (isError || !categories) {
    return (
      <DataError
        title="Error to load Categories"
        darkTheme={true}
        lighting={true}
      />
    );
  }

  // 3) Si la API devolvió un array vacío, mostramos mensaje
  if (categories.length === 0) {
    return <EmptyData title="No Categories to load" darkTheme={true} />;
  }

  // 4) Controladores de navegación entre categorías
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
      className="relative p-6 bg-black-night-950"
    >
      <div className="max-w-4xl mx-auto mt-10">
        <h1 className="uppercase text-center font-CamilaFont tracking-wider mb-6 text-xl md:text-3xl text-mustard-yellow-400 lg:ml-14 lg:text-left">
          Your Dessert Destination
        </h1>
      </div>

      {/* Carrusel de botones con indicador */}
      <div className="relative w-full justify-center items-center flex mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-around items-center gap-2 sm:gap-4 flex-wrap relative"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              onClick={() => setSelectedIndex(index)}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer text-xs sm:text-sm md:text-xl lg:px-6 flex flex-col items-center font-ArialRegular py-1 transition-all ${
                selectedIndex === index ? "text-2xl scale-120" : ""
              }`}
            >
              {category.name}
            </motion.div>
          ))}

          {/* Línea de fondo */}
          <div className="absolute bottom-0 left-0 w-full border-b-2 border-[#15203a]" />

          {/* Indicador activo */}
          <motion.div
            className="absolute bottom-0 border-b-4 border-[#3948a4]"
            style={{
              width: `${100 / categories.length}%`,
              left: `${(selectedIndex * 100) / categories.length}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </motion.div>
      </div>

      {/* Contenido animado */}
      {inView && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto px-4 relative"
        >
          {/* Contenedor de la imagen */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full md:w-1/2 flex justify-center"
          >
            {/* Flecha izquierda */}
            <button
              onClick={prevCategory}
              className="absolute -left-0 z-10 md:-left-6 top-1/2 transform -translate-y-1/2 bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <FiChevronLeft size={24} />
            </button>

            {/* Flecha derecha (solo en pantallas pequeñas) */}
            <button
              onClick={nextCategory}
              className="absolute right-0 top-1/2 z-10 transform -translate-y-1/2 bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-700 transition md:hidden"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Luz de fondo */}
            <div className="absolute inset-0 z-0 md:left-6 flex justify-center items-center">
              <div className="w-32 h-24 md:min-w-32 md:h-32 bg-[#3948a4] blur-3xl rounded-full" />
            </div>

            {/* Imagen dinámica proveniente de category.imageUrl */}
            <img
              src={categories[selectedIndex].imageUrl}
              alt={categories[selectedIndex].name}
              onLoad={() => {
                const flags = [...loaded];
                flags[selectedIndex] = true;
                setLoaded(flags);
              }}
              style={{ display: loaded[selectedIndex] && "block" }}
              className="relative w-52 md:w-72 lg:w-96 h-auto object-cover rounded-lg shadow-lg transition-all duration-500"
            />
          </motion.div>

          {/* Contenedor de texto y botón */}
          <div className="relative text-center md:text-left w-full md:w-1/2 flex flex-col items-center md:items-start">
            <h2 className="text-2xl sm:text-2xl tracking-wider md:text-2xl font-CamilaFont text-[#92b1dd]">
              {categories[selectedIndex].name}
            </h2>
            <p className="text-sm font-ArialRegular md:w-5/6 sm:text-lg md:text-lg mt-2">
              {categories[selectedIndex].longDescription}
            </p>
            <button
              onClick={() =>
                navigate(
                  `/menu#${categories[selectedIndex].name.replace(/\s+/g, "-")}`
                )
              }
              className="mt-4 text-xl px-20 py-2 bg-mustard-yellow-400 rounded-full text-black font-ArialBold shadow-md hover:bg-mustard-yellow-500 transition"
            >
              Menu
            </button>

            {/* Flecha derecha (pantallas medianas y grandes) */}
            <button
              onClick={nextCategory}
              className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 bg-gray-900 p-2 rounded-full shadow-md hover:bg-gray-700 transition"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedCategories;
