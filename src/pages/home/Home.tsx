// Home.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { Slider } from "@/components/atoms/Slider";
import { AddressSelector } from "@/components/atoms/home/AddressSelector";
import AnimatedCategories from "@/components/atoms/home/AnimatedCategories";

type Section = { key: string; html: string };

export const Home: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ layout: { sections: Section[] } }>(
        "https://nox-backend-3luc.onrender.com/api/pages/home"
      )
      .then((res) => setSections(res.data.layout.sections))
      .catch(() => setError("Error al cargar la página."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Cargando...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  const renderSection = (key: string) => {
    const sec = sections.find((s) => s.key === key);
    if (!sec) return null;

    // 1) Desescapamos las comillas y barras invertidas
    const unescaped = sec.html
      .replace(/\\"/g, '"') // \" → "
      .replace(/\\\\/g, "\\"); // \\ → \

    // 2) Saneamos
    const clean = DOMPurify.sanitize(unescaped);

    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  };

  return (
    <div className="justify-center">
      <Slider />
      <AddressSelector />
      <AnimatedCategories />
      <div className="flex flex-col items-center">
        {/* …tus otros componentes estáticos… */}
        {renderSection("HomeSection3")}
        {renderSection("FotosSection4")}
      </div>
    </div>
  );
};

export default Home;
