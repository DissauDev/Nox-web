// src/pages/Home.tsx
import React from "react";
import DOMPurify from "dompurify";

import { Slider } from "@/components/atoms/Slider";
// import { AddressSelector } from "@/components/atoms/home/AddressSelector";
import AnimatedCategories from "@/components/atoms/home/AnimatedCategories";
import { HomeSection3 } from "@/components/atoms/home/HomeSection3";
import { FotosSection4 } from "@/components/atoms/home/FotosSection4";
import { useGetPageBySlugQuery } from "@/store/features/api/pageApi";

type Section = { key: string; html: string };
type Layout = { sections: Section[]; css?: string };

export const Home: React.FC = () => {
  // 1) Llamada RTK Query para slug="home"
  const {
    data: pageData,
    error: pageError,
    isLoading,
  } = useGetPageBySlugQuery("home");

  // 2) Función auxiliar para renderizar una sección concreta si existe
  const renderSection = (sections: Section[], key: string) => {
    const sec = sections.find((s) => s.key === key);
    if (!sec) return null;

    // a) Des-escapar barras y comillas
    const unescaped = sec.html.replace(/\\"/g, '"').replace(/\\\\/g, "\\");

    // b) Saneamiento
    const clean = DOMPurify.sanitize(unescaped);
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  };

  // 3) Mientras carga, mostramos un indicador simple
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // 4) Si hay error, NO salimos: mostramos los componentes estáticos por defecto
  const hasError = Boolean(pageError);

  // 5) Si la petición fue exitosa, extraemos layout.sections y layout.css
  let sections: Section[] = [];
  let cssFromBackend = "";

  if (!hasError && pageData) {
    const layout = pageData.layout as unknown;
    let layoutObj: Layout = { sections: [] };

    if (typeof layout === "string") {
      try {
        layoutObj = JSON.parse(layout);
      } catch {
        layoutObj = { sections: [] };
      }
    } else if (layout && typeof layout === "object") {
      layoutObj = layout as Layout;
    }

    sections = layoutObj.sections || [];
    cssFromBackend = layoutObj.css || "";
  }

  return (
    <div className="justify-center lg:pt-6">
      {/* 6) Inyectamos CSS si existe y no hubo error */}
      {!hasError && cssFromBackend && (
        <style
          dangerouslySetInnerHTML={{
            __html: cssFromBackend.replace(/\\"/g, '"'),
          }}
        />
      )}

      <Slider />
      {/* <AddressSelector /> */}
      <AnimatedCategories />

      <div className="flex flex-col items-center">
        {hasError ? (
          // 7) En caso de error, siempre renderizamos las secciones por defecto
          <>
            <HomeSection3 />
            <FotosSection4 />
          </>
        ) : (
          // 8) Si no hay error, intentamos renderizar dinámicamente desde el backend
          <>
            <div className=" pb-10">
              {/*renderSection(sections, "HomeSection3") || */ <HomeSection3 />}
              {
                /*renderSection(sections, "FotosSection4") || */ <FotosSection4 />
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
