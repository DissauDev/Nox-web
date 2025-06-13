import Lottie from "lottie-react";

import DOMPurify from "dompurify";
import animationData from "../../assets/lotties/Animation - 9.json";
import { useGetPageBySlugQuery } from "@/store/features/api/pageApi";
import { DataError } from "@/components/atoms/DataError";
import { Privacy } from "@/components/atoms/home/Privacy";

type Section = { key: string; html: string };
type Layout = { sections: Section[]; css?: string };

const PrivacyPolicy = () => {
  // 1) RTK Query para slug="terms"
  const {
    data: pageData,
    error: pageError,
    isLoading,
  } = useGetPageBySlugQuery("privacy-policy");

  // 2) Ayuda a renderizar una sección concreta
  const renderSection = (sections: Section[], key: string) => {
    const sec = sections.find((s) => s.key === key);
    if (!sec) return null;

    // a) Des-escapar comillas, barras y slashes:
    //  - \\" => "
    //  - \\\\ => \
    //  - \\/  => /
    const unescaped = sec.html
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .replace(/\\\//g, "/");

    // b) Saneamiento
    const clean = DOMPurify.sanitize(unescaped);
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  };

  // 3) Loading
  if (isLoading) {
    return (
      <div className="text-center flex flex-col justify-center items-center mt-10">
        <h1 className="my-2 text-3xl text-grape-900 font-ArialBold">
          Loading Privacy Policy
        </h1>
        <Lottie
          animationData={animationData}
          loop
          className="max-w-[400px] h-auto"
        />
      </div>
    );
  }

  // 4) Determinar si hubo error
  const hasError = Boolean(pageError);

  // 5) Extraer dinámicamente si no hubo error
  let sections: Section[] = [];
  let cssFromBackend = "";

  if (!hasError && pageData) {
    const layoutRaw = pageData.layout as string | Layout;
    let layoutObj: Layout = { sections: [] };

    if (typeof layoutRaw === "string") {
      try {
        layoutObj = JSON.parse(layoutRaw);
      } catch {
        layoutObj = { sections: [] };
      }
    } else if (typeof layoutRaw === "object") {
      layoutObj = layoutRaw;
    }

    sections = layoutObj.sections || [];
    cssFromBackend = layoutObj.css || "";
  }

  return (
    <div className="p-16 flex flex-col w-full max-w-4xl mx-auto justify-center items-center text-grape-900">
      <div className="">
        {/* 6) Inyectar CSS si existe y no hubo error */}
        {!hasError && cssFromBackend && (
          <style
            dangerouslySetInnerHTML={{
              __html: cssFromBackend.replace(/\\"/g, '"'),
            }}
          />
        )}

        <div className="flex flex-col items-center">
          {hasError ? (
            /* 7) Error: mostrar componente de error */
            <DataError
              title={"Error to load Privacy Politic"}
              darkTheme={false}
            />
          ) : (
            /* 8) Éxito: render dinámico o fallback a estático */
            <>
              {renderSection(sections, "PrivacyPolicySection6") || <Privacy />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
