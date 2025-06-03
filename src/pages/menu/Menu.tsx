import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DessertCard from "../../components/atoms/menu/DessertCard";
import { Slider } from "../../components/atoms/Slider";
import { useGetMenuQuery } from "@/store/features/api/productsApi";

const Menu = () => {
  const navigate = useNavigate();

  // 1. Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState<string>("");

  // 2. Hacemos la petición RTK Query
  const { isLoading, data: dataMenu } = useGetMenuQuery();

  // 3. Generamos dinámicamente las secciones a partir de dataMenu (si existe)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sections: string[] = dataMenu
    ? dataMenu.map((cat) => cat.category)
    : [];

  // 4. Al tener las secciones (dataMenu), inicializamos activeTab en la primera categoría
  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0]);
    }
  }, [sections, activeTab]);

  // 5. useEffect para actualizar activeTab al hacer scroll (siempre basado en "sections")
  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const fromTop = window.scrollY;
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

  // 6. Función para desplazarse a la sección al hacer clic en la pestaña
  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 60, behavior: "smooth" });
    }
  };

  // 7. Función que llama a la ruta de detalle de producto
  const handleItemClick = (category: string, productKey: string) => {
    navigate(`/products/${category}/${productKey}`);
  };

  // 8. Mientras carga, mostramos un simple loading screen
  if (isLoading) return <h1>....Loading</h1>;

  // 9. Si dataMenu está vacío o indefinido, podemos mostrar un mensaje
  if (!dataMenu || dataMenu.length === 0)
    return <h1>No hay productos para mostrar.</h1>;

  return (
    <div className="menu-wrapper">
      <Slider />

      <div>
        <div className="border-b border-gray-300"></div>
        <div
          className="font-ArialBold z-40 py-2 transition-all bg-midnight-blue-950 text-white sticky"
          style={{ top: "var(--banner-height)" }}
        >
          {/* Contenedor de Tabs */}
          <div className="tab-container">
            <ul className="flex justify-evenly gap-4 px-4">
              {sections.map((sectionId) => (
                <li
                  key={sectionId}
                  onClick={() => handleTabClick(sectionId)}
                  className={`cursor-pointer py-2 border-b-2 transition-all ${
                    activeTab === sectionId
                      ? "border-white"
                      : "border-transparent"
                  } text-[clamp(10px,1.5vw,16px)]`}
                >
                  {sectionId.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          <style>{`
            /* Ocultar scrollbar en el contenedor de tabs */
            .tab-container::-webkit-scrollbar {
              display: none;
            }
            .tab-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
              overflow-x: auto;
            }
            /* En el rango de 1025px a 1088px, eliminar scroll horizontal */
            @media (min-width: 1025px) and (max-width: 1088px) {
              .menu-wrapper, .tab-container {
                overflow-x: hidden;
              }
            }
          `}</style>
        </div>

        {/* Secciones de productos con animaciones */}
        <div className="px-4 mt-14">
          {dataMenu.map((cat) => (
            <motion.div
              id={cat.category}
              key={cat.category}
              className="my-16 flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Título de la sección */}
              <div className="mb-7 flex items-center">
                <div className="bg-pompadour-900 h-0.5 w-[20vw] md:w-[30vw] lg:w-[34vw]" />
                <motion.div
                  className="border-pompadour-900 border-2 rounded-2xl px-8 py-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h2 className="text-2xl font-ArialBold text-center text-pompadour-900">
                    {cat.category}
                  </h2>
                </motion.div>
                <div className="bg-pompadour-900 h-0.5 w-[20vw] md:w-[30vw] lg:w-[34vw]" />
              </div>

              {/* Descripciones */}
              <motion.p
                className="text-xl font-ArialBold text-center text-pompadour-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {cat.shortDescription}
              </motion.p>
              <motion.p
                className="text-sm font-ArialBold text-center text-pompadour-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {cat.longDescription}
              </motion.p>

              {/* Grid de productos */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {cat.items.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <DessertCard
                      name={product.name}
                      description={product.description}
                      imageLeft={product.imageLeft.url}
                      imageRight={product.imageRight}
                      price={product.price}
                      onAdd={() => handleItemClick(cat.category, product.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Menu;
