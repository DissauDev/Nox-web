// src/components/PageEditor.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Ya no necesitamos axios aquí
import SkeletonEditor from "@/components/skeletons/SkeletonEditor";
import GrapesEditor, { Section } from "@/components/admin/pages/GrapesEditor";
import { useGetPageBySlugQuery } from "@/store/features/api/pageApi";

interface PageLayout {
  sections?: Section[];
  css?: string;
}

const PageEditor: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  // Estado local para las secciones y el CSS inicial:
  const [sections, setSections] = useState<Section[]>([]);
  const [initialCss, setInitialCss] = useState<string>("");

  // 1) Llamada RTK Query:
  //    useGetPageBySlugQuery retorna { data, error, isLoading, isFetching, ... }
  const {
    data: pageData,
    error: pageError,
    isLoading,
    isFetching,
  } = useGetPageBySlugQuery(slug || "", {
    // si quisieras revalidar cada vez que slug cambie
    skip: !slug, // no se ejecuta si slug es undefined
  });

  // 2) Cuando RTK Query nos traiga la página, extraemos layout.sections y layout.css
  useEffect(() => {
    if (!pageData) return;

    // `pageData.layout` podría ser un string JSON o un objeto ya parseado
    let layoutObj: PageLayout = {};
    if (typeof pageData.layout === "string") {
      try {
        layoutObj = JSON.parse(pageData.layout as string);
      } catch {
        layoutObj = {};
      }
    } else if (pageData.layout && typeof pageData.layout === "object") {
      layoutObj = pageData.layout as PageLayout;
    }

    const secs = layoutObj.sections || [];
    if (secs.length) {
      // Limpiamos el HTML de cada sección igual que antes
      const clean = secs.map((s) => ({
        key: s.key,
        html: s.html
          .replace(/<\/?body[^>]*>/g, "")
          .replace(/\\"/g, '"')
          .trim(),
      }));
      setSections(clean);
    } else {
      // Si no hay secciones, dejarlo vacío
      setSections([]);
    }

    setInitialCss(layoutObj.css || "");
  }, [pageData]);

  // 3) Mostrar skeleton mientras carga o falló la petición
  if (isLoading || isFetching) {
    return <SkeletonEditor />;
  }
  if (pageError) {
    return (
      <div className="text-center py-12 text-red-600">
        Error al cargar la página.
        <br />
        <button onClick={() => navigate("/pages")} className="underline">
          Volver al listado
        </button>
      </div>
    );
  }

  // 4) Una vez tenemos `sections` e `initialCss`, renderizamos GrapesEditor
  return (
    <GrapesEditor
      slug={slug!}
      recordId={pageData!.id}
      sections={sections}
      initialCss={initialCss}
      onSaveSections={(updatedSections, updatedCss) => {
        // Actualiza el estado local para que GrapesEditor reciba datos frescos
        setSections(updatedSections);
        setInitialCss(updatedCss);
      }}
    />
  );
};

export default PageEditor;
