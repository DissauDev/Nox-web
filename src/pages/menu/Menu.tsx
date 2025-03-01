import React, { useRef, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DessertCard from "../../components/atoms/menu/DessertCard";
import { Slider } from "../../components/atoms/Slider";

import menuData from "../../utils/data/products";

const Menu = () => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("For you");
  const navigate = useNavigate();

  // Generamos las secciones a partir de la data
  const sections = menuData.map((cat) => cat.category);

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY;

      // Determinamos la sección visible en el scroll
      const currentSection = sections.find((id) => {
        const element = document.getElementById(id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          return fromTop >= offsetTop - 100 && fromTop < offsetBottom - 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveTab(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 60, behavior: "smooth" });
    }
  };

  const handleItemClick = (category: string, productKey: string) => {
    navigate(`/products/${category}/${productKey}`);
  };

  return (
    <div>
      <Slider />
      <div className="">
        <div className="border-b border-gray-300"></div> {/* Línea divisoria */}
        {/* Tabs de navegación */}
        <div
          ref={tabsRef}
          className="font-ArialBold lg:top-[70px] top-[70px] md:top-[48px] z-40 py-2 transition-all bg-midnight-blue-950 text-white sticky"
        >
          <div className="overflow-x-auto no-scrollbar">
            <ul className="flex whitespace-nowrap justify-evenly gap-4 px-4">
              {sections.map((sectionId) => (
                <li
                  key={sectionId}
                  onClick={() => handleTabClick(sectionId)}
                  className={`
                    cursor-pointer 
                    py-2 
                    flex-shrink-0 
                    border-b-2 
                    transition-all
                    ${
                      activeTab === sectionId
                        ? "border-white"
                        : "border-transparent"
                    }
                    text-[clamp(10px,1.5vw,16px)]
                  `}
                >
                  {sectionId.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
          {/* Ocultar la scrollbar */}
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
        {/* Secciones de productos */}
        <div className="px-4 mt-14">
          {menuData.map((cat) => (
            <div
              id={cat.category}
              key={cat.category}
              className="my-8 flex flex-col items-center"
            >
              <div className=" mb-7 flex items-center">
                <div className="bg-pompadour-900 h-0.5 w-[20vw] md:w-[30vw] lg:w-[34vw]" />
                <div className="border-pompadour-900 border-2 rounded-2xl px-8 py-2">
                  <h2 className="text-2xl font-ArialBold text-center text-pompadour-900">
                    {cat.category}
                  </h2>
                </div>
                <div className="bg-pompadour-900 h-0.5 w-[20vw] md:w-[30vw] lg:w-[34vw]" />
              </div>

              {/* Mostrar la descripción corta y larga */}
              <p className="text-xl font-ArialBold text-center text-pompadour-900">
                {cat.shortDescription}
              </p>
              <p className="text-sm font-ArialBold text-center text-pompadour-900 mb-4">
                {cat.longDescription}
              </p>
              {/* Grid de tarjetas de producto */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {cat.items.map((product) => (
                  <DessertCard
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    imageLeft={product.imageLeft}
                    imageRight={product.imageRight} // Se muestra solo si existe
                    price={product.price}
                    onAdd={() => handleItemClick(cat.category, product.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
