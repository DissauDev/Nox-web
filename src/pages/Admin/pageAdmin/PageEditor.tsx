// src/components/PageEditor.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Ya no necesitamos axios aquí
import SkeletonEditor from "@/components/skeletons/SkeletonEditor";
import GrapesEditor, { Section } from "@/components/admin/pages/GrapesEditor";
import { useGetPageBySlugQuery } from "@/store/features/api/pageApi";
import { DataError } from "@/components/atoms/DataError";

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

    let layoutObj: PageLayout = {};
    if (typeof pageData.layout === "string") {
      try {
        layoutObj = JSON.parse(pageData.layout);
      } catch {
        layoutObj = {};
      }
    } else {
      layoutObj = pageData.layout as PageLayout;
    }

    const clean = (layoutObj.sections || []).map((s) => {
      // Des-escapa sólo lo que hace Home.tsx:
      const unescaped = (s.html as string)
        .replace(/\\"/g, '"') // \" → "
        .replace(/\\\\/g, "\\"); // \\ → \

      return { key: s.key, html: unescaped.trim() };
    });

    console.log("→ secciones limpias (igual que Home):", clean);
    setSections(clean);
    setInitialCss(layoutObj.css || "");
  }, [pageData]);
  // 3) Mostrar skeleton mientras carga o falló la petición
  if (isLoading || isFetching) {
    return <SkeletonEditor />;
  }
  if (pageError) {
    return (
      <div className="text-center py-12 text-red-600 font-ArialBold text-xl">
        <DataError title={"Error to load page"} darkTheme={true} />
        <button
          onClick={() => navigate("/dashboard/pages")}
          className="underline font-ArialBold"
        >
          Back to List
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
