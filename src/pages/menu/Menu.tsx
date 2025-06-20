/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DessertCard from "../../components/atoms/menu/DessertCard";
import { Slider } from "../../components/atoms/Slider";
import { useGetMenuQuery } from "@/store/features/api/productsApi";
import { DataError } from "@/components/atoms/DataError";
import { EmptyData } from "@/components/atoms/EmptyData";
import { PiStarFourFill } from "react-icons/pi";
import { LoadingWithGlow } from "@/components/atoms/LoadingWhithGlow";

const Menu = () => {
  const leftStars = [
    { size: "text-xs", top: "7%", left: "45" },
    { size: "text-xl", top: "5%", left: "5" },
    { size: "text-lg", top: "40%", left: "25" },
    { size: "text-xl", top: "75%", left: "7" },
  ];
  const rightStars = [
    { size: "text-xl", top: "10%", right: "10" },
    { size: "text-2xl", top: "35%", right: "25" },
    { size: "text-xs hidden  lg:block", top: "10%", right: "105" },
    { size: "text-sm ", top: "80%", right: "12" },
    { size: "text-xs hidden  lg:block", top: "76%", right: "40" },
    { size: "text-lg hidden  lg:block", top: "50%", right: "90" },
    { size: "text-xl hidden  lg:block", top: "7%", right: "60" },
    { size: "text-xs hidden  lg:block", top: "35%", right: "75" },
    { size: "text-xl hidden  lg:block", top: "76%", right: "65" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  // 1. Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState<string>("");

  // 2. Hacemos la petición RTK Query
  const { isLoading, data: dataMenu, isError } = useGetMenuQuery();

  // 3. Generamos dinámicamente las secciones a partir de dataMenu (si existe)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sections: string[] = dataMenu
    ? dataMenu.map((cat) => cat.category)
    : [];

  // 4. Al tener las secciones (dataMenu), inicializamos activeTab en la primera categoría
  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      const firstSlug = sections[0].trim().replace(/\s+/g, "-");
      setActiveTab(firstSlug);
    }
  }, [sections, activeTab]);
  // Al cambiar el hash en la URL, desplazamos al elemento correspondiente
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
      }
    }
  }, [location.hash]);

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
      setActiveTab(id);
    }
  };

  // 7. Función que llama a la ruta de detalle de producto
  const handleItemClick = (category: string, productKey: string) => {
    navigate(`/products/${category}/${productKey}`);
  };

  // 8. Mientras carga, mostramos un simple loading screen
  if (isLoading) return <LoadingWithGlow />;

  // 9. Si dataMenu está vacío o indefinido, podemos mostrar un mensaje
  if (dataMenu?.length === 0)
    return <EmptyData title={"No Products to show"} darkTheme={false} />;

  if (isError)
    return (
      <DataError
        title={"Error to load Menu"}
        lighting={true}
        darkTheme={true}
      />
    );
  console.log(dataMenu);

  return (
    <div className="menu-wrapper">
      <Slider />

      <div>
        <div className="border-b border-gray-300"></div>
        <div
          className="font-ArialBold z-40 py-2 transition-all bg-black-night-950 text-white sticky"
          style={{ top: "var(--banner-height)" }}
        >
          {/* Contenedor de Tabs */}
          <div className="tab-container">
            <ul className="flex justify-evenly gap-4 px-4">
              {sections.map((sectionId) => (
                <li
                  key={sectionId}
                  onClick={() =>
                    handleTabClick(sectionId.trim().replace(/\s+/g, "-"))
                  }
                  className={`cursor-pointer py-2 border-b-2 transition-all ${
                    activeTab === sectionId.trim().replace(/\s+/g, "-")
                      ? "border-white"
                      : "border-transparent"
                  } text-[clamp(10px,1.5vw,16px)]`}
                >
                  {sectionId.trim().replace(/\s+/g, "-")}
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
        <div className=" bg-[#3948a4]">
          {dataMenu?.map((cat) => (
            <motion.div
              id={cat.category.trim().replace(/\s+/g, "-")}
              key={cat.category}
              className=" flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative w-full pl-12 pr-12 px-4 py-1 md:py-4 bg-[#3f51b5] rounded-md shadow-lg flex flex-col md:flex-row items-center justify-between md:gap-4">
                {/* Estrellas dispersas izquierda */}
                {leftStars.map((star, i) => (
                  <PiStarFourFill
                    key={`l${i}`}
                    className={`${star.size} text-white absolute`}
                    style={{ top: star.top, left: star.left }}
                  />
                ))}

                {/* Categoría */}
                <motion.div
                  className="md:border-r-2 border-white pr-6 md:pr-10 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-ArialBold text-mustard-yellow-400">
                    {cat.category}
                  </h2>
                </motion.div>

                {/* Descripciones */}
                <div className="flex flex-col text-center md:text-left md:pl-6 flex-1">
                  <motion.p
                    className="text-base md:text-lg lg:text-xl font-ArialBold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {cat.shortDescription}
                  </motion.p>
                  <motion.p
                    className="text-xs md:text-sm lg:text-base  font-ArialRegular text-white mt-1"
                    initial={{ opacity: 0, y: 20 }}
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {cat.longDescription}
                  </motion.p>
                </div>

                {/* Estrellas dispersas derecha */}
                {rightStars.map((star, i) => (
                  <PiStarFourFill
                    key={`r${i}`}
                    className={`${star.size} flex  text-white absolute`}
                    style={{ top: star.top, right: star.right }}
                  />
                ))}
              </div>
              {/* Grid de productos */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8 gap-6 justify-items-center"
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
                      sellPrice={product?.sellPrice || product.price}
                      imageRight={product.imageRight}
                      price={product.price}
                      //@ts-ignore
                      product={product}
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
