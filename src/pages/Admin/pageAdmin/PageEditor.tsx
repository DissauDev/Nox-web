// src/components/PageEditor.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

interface Section {
  key: string;
  html: string;
}
interface PageResponse {
  id: number;
  slug: string;
  layout?: string | { sections?: Section[] };
}

const PageEditor: React.FC = () => {
  const navigate = useNavigate();
  const slug = "home";
  const recordId = 5;

  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // refs para contenedores y editores
  const containersRef = useRef<HTMLDivElement[]>([]);
  const editorsRef = useRef<Editor[]>([]);

  // 1) Carga inicial de las secciones
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<PageResponse>(
          `https://nox-backend-3luc.onrender.com/api/pages/${slug}`
        );
        let obj: { sections?: Section[] } = {};
        if (typeof data.layout === "string") obj = JSON.parse(data.layout);
        else if (data.layout) obj = data.layout;
        const secs = obj.sections || [];
        if (!secs.length) throw new Error("layout.sections vacío");

        // Limpieza de cada sección
        const clean = secs.map((s) => {
          const noBody = s.html.replace(/<\/?body[^>]*>/g, "");
          const unesc = noBody.replace(/\\"/g, `"`).trim();
          return { key: s.key, html: unesc };
        });
        setSections(clean);
      } catch (e) {
        console.error("Error cargando página:", e);
        setError("No se pudo cargar la página.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // 2) Inicialización de un editor por sección
  useEffect(() => {
    if (loading || error) return;

    // Destruye instancias anteriores
    editorsRef.current.forEach((ed) => ed.destroy());
    editorsRef.current = [];

    // Crear uno por cada sección
    sections.forEach((sec, idx) => {
      const container = containersRef.current[idx];
      if (!container) return;

      // Inyectar el HTML inicial en el contenedor
      container.innerHTML = sec.html;

      const editor = grapesjs.init({
        container,
        fromElement: true, // lee el innerHTML
        height: "600px",
        storageManager: { autoload: false, autosave: false },
        canvas: { styles: [`${window.location.origin}/tailwind.css`] },
      });

      // Inyectar Tailwind en el iframe
      editor.on("load", () => {
        const doc = editor.Canvas.getDocument();
        const link = doc.createElement("link");
        link.rel = "stylesheet";
        link.href = `${window.location.origin}/tailwind.css`;
        doc.head.appendChild(link);
      });

      // Botón “Guardar esta sección”
      editor.Panels.addButton("options", [
        {
          id: `save-${sec.key}`,
          label: "Save",
          command: `save-${sec.key}`,
          attributes: { title: `Guardar ${sec.key}` },
        },
      ]);

      // Comando para guardar sólo esta sección
      editor.Commands.add(`save-${sec.key}`, {
        run: async (ed: Editor) => {
          setSaving(true);
          try {
            const html = ed.getHtml();
            const updated = sections.map((s) =>
              s.key === sec.key ? { ...s, html } : s
            );
            console.log("Guardando sección:", sec.key, html);
            await axios.put(
              `https://nox-backend-3luc.onrender.com/api/pages/${recordId}`,
              {
                layout: { sections: updated },
              }
            );
            setSections(updated);
            alert(`Sección ${sec.key} guardada`);
          } catch (err) {
            console.error("Error guardando sección:", err);
            alert("Error al guardar. Mira la consola.");
          } finally {
            setSaving(false);
          }
        },
      });

      editorsRef.current[idx] = editor;
    });

    return () => {
      editorsRef.current.forEach((ed) => ed.destroy());
      editorsRef.current = [];
    };
  }, [loading, error, sections]);

  // 3) Guardar todas las secciones de golpe
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const updated = sections.map((sec, idx) => ({
        key: sec.key,
        html: editorsRef.current[idx]?.getHtml() || sec.html,
      }));
      console.log("Guardando todas las secciones:", updated);
      await axios.put(
        `https://nox-backend-3luc.onrender.com/api/pages/${recordId}`,
        {
          layout: { sections: updated },
        }
      );
      setSections(updated);
      alert("Todas las secciones guardadas");
    } catch (err) {
      console.error("Error guardando todas:", err);
      alert("Error al guardar. Revisa la consola.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12">Cargando página…</div>;
  if (error)
    return (
      <div className="text-center py-12 text-red-600">
        {error}
        <br />
        <button onClick={() => navigate("/pages")}>Volver</button>
      </div>
    );

  return (
    <div className="space-y-6 p-4">
      {sections.map((sec, idx) => (
        <div key={sec.key} className="border p-2">
          <h3 className="font-semibold mb-2">{sec.key}</h3>
          <div
            ref={(el) => (containersRef.current[idx] = el!)}
            className="bg-white"
          />
        </div>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className={`px-4 py-2 rounded text-white ${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Guardando..." : "Guardar Todo"}
        </button>
      </div>
    </div>
  );
};

export default PageEditor;
