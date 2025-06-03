// src/components/GrapesEditor.tsx
import React, { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import axios from "axios";
import "grapesjs/dist/css/grapes.min.css";
import { LoadingSVG } from "@/components/svg/LoadingSVG";
import { useNavigate } from "react-router-dom";

export interface Section {
  key: string;
  html: string;
}

interface GrapesEditorProps {
  slug: string;
  recordId: number;
  sections: Section[];
  initialCss?: string;
  onSaveSections: (sections: Section[], css: string) => void;
}

const GrapesEditor: React.FC<GrapesEditorProps> = ({
  slug,
  recordId,
  sections,
  initialCss = "",
  onSaveSections,
}) => {
  const editorContainer = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editorContainer.current) return;
    // 1️⃣ Destroy any existing instance
    editorRef.current?.destroy();

    // 2️⃣ Build the initial HTML from sections
    const initialHtml = sections
      .map(
        (s) =>
          `<div data-section-key="${s.key}" style="margin-bottom:20px;">${s.html}</div>`
      )
      .join("");

    // 3️⃣ Initialize GrapesJS
    const editor = grapesjs.init({
      container: editorContainer.current,
      fromElement: false,
      height: "100%",
      storageManager: { autoload: false, autosave: false },
      canvas: {
        styles: [
          `${window.location.origin}/tailwind.css`,
          `${window.location.origin}/index.css`,
        ],
      },
      style: initialCss, // load previously saved CSS
      plugins: [gjsPresetWebpage],
      pluginsOpts: { "gjs-preset-webpage": {} },
      components: initialHtml,
    });

    // 4️⃣ On load: inject styles, override trait CSS, load fonts etc.
    editor.on("load", () => {
      const doc = editor.Canvas.getDocument();
      // 4.x️⃣ Inyectar @font-face para que el iframe reconozca tus fuentes
      const fontFaceCSS = `
        @font-face {
          font-family: 'ArialBold';
          src: url('${window.location.origin}/src/assets/fonts/ARIALROUNDEDMTEXTRABOLD.TTF') format('truetype');
          font-weight: bold;
        }
        @font-face {
          font-family: 'ArialRegular';
          src: url('${window.location.origin}/src/assets/fonts/ARIALROUNDEDMT.TTF') format('truetype');
          font-weight: 400;
        }
        @font-face {
          font-family: 'CamilaFont';
          src: url('${window.location.origin}/src/assets/fonts/Camila.ttf') format('truetype');
        }
      `;
      const styleFontFace = doc.createElement("style");
      styleFontFace.innerHTML = fontFaceCSS;
      doc.head.appendChild(styleFontFace);

      // 4.1️⃣ Inject Tailwind into iframe
      const linkTailwind = doc.createElement("link");
      linkTailwind.rel = "stylesheet";
      linkTailwind.href = `${window.location.origin}/tailwind.css`;
      doc.head.appendChild(linkTailwind);

      // si usas initialCss, conviértelo en un style tag aquí
      if (initialCss) {
        const s = doc.createElement("style");
        s.innerHTML = initialCss;
        doc.head.appendChild(s);
      }

      // 4.2️⃣ Placeholder styling for image blocks
      const stylePlaceholder = doc.createElement("style");
      stylePlaceholder.innerHTML = `
        .gjs-cv-canvas .no-image,
        .gjs-cv-canvas img[data-gjs-type="image"][src=""] {
          background-color: #facc15 !important;
          border: 2px dashed #000 !important;
        }
        .gjs-block-image .gjs-block__preview .no-image,
        .gjs-block-image .gjs-block__preview img[src=""] {
          background-color: #facc15 !important;
          border: 2px dashed #000 !important;
        }
      `;
      doc.head.appendChild(stylePlaceholder);

      // 4.5️⃣ Dark background for home
      if (slug === "home") {
        const styleBg = doc.createElement("style");
        styleBg.innerHTML = `
          body { background-color: #06060a !important; }
        `;
        doc.head.appendChild(styleBg);
      }

      // 4.6️⃣ Register custom blocks
      const bm = editor.BlockManager;
      // Layout
      bm.add("container", {
        category: "Layout",
        label: "Container",
        content: `<div class="container mx-auto p-4">Container</div>`,
      });
      bm.add("grid", {
        category: "Layout",
        label: "Grid",
        content: `<div class="grid grid-cols-3 gap-4">Grid</div>`,
      });
      // Basic
      bm.add("text", {
        category: "Basic",
        label: "Text",
        content: `<p>Editable text</p>`,
      });
      bm.add("image", {
        category: "Basic",
        label: "Image",
        content: `<img alt="" />`,
      });
      bm.add("video", {
        category: "Basic",
        label: "Video",
        content: `<video controls src="https://www.w3schools.com/html/mov_bbb.mp4"></video>`,
      });
      bm.add("button", {
        category: "Basic",
        label: "Button",
        content: `<button class="px-4 py-2 bg-blue-600 text-white rounded">Button</button>`,
      });
      bm.add("divider", {
        category: "Basic",
        label: "Divider",
        content: `<hr />`,
      });
      bm.add("spacer", {
        category: "Basic",
        label: "Spacer",
        content: `<div style="padding:16px 0"></div>`,
      });
      bm.add("maps", {
        category: "Basic",
        label: "Google Maps",
        content: `<iframe src="https://maps.google.com/maps?q=New+York&amp;output=embed"></iframe>`,
      });
      bm.add("icon", {
        category: "Basic",
        label: "Icon",
        content: `<i class="fas fa-star"></i>`,
      });
      // General
      bm.add("article", {
        category: "General",
        label: "Article",
        content: `<article><h2>Title</h2><p>Content...</p></article>`,
      });
    });

    // 5️⃣ Panels: add + button for blocks
    editor.Panels.addButton("views", [
      {
        id: "open-blocks",
        className: "fa fa-plus",
        command: "open-blocks",
        attributes: { title: "Añadir widget" },
      },
    ]);

    // 6️⃣ Panels: add Save button
    editor.Panels.addButton("options", [
      {
        id: "save-all",
        className: "fa fa-save",
        command: "save-all",
        attributes: { title: "Guardar todas las secciones" },
      },
    ]);

    // 7️⃣ Command: save-all (HTML + CSS)
    editor.Commands.add("save-all", {
      run: async (ed: Editor) => {
        setSaving(true);
        try {
          // Extract updated sections
          const wrapper = document.createElement("div");
          wrapper.innerHTML = ed.getHtml();
          const updatedSections = sections.map((s) => {
            const el = wrapper.querySelector(`[data-section-key="${s.key}"]`);
            return { key: s.key, html: el ? el.innerHTML : s.html };
          });

          let rawCss = ed.getCss();
          rawCss = rawCss
            .replace(/\bcolor\s*:\s*white\b/gi, "color:#ffffff")
            .replace(/\bcolor\s*:\s*black\b/gi, "color:#000000");
          const rules = new Set(
            rawCss
              .split("}")
              .map((r) => r.trim() + "}")
              .filter((r) => {
                return (
                  !r.startsWith("*{box-sizing") && !r.startsWith("body{margin")
                );
              })
          );
          const cleanCss = Array.from(rules).join("");

          // PUT to backend
          await axios.put(`http://localhost:3000/api/pages/${recordId}`, {
            layout: { sections: updatedSections, css: cleanCss },
          });
          // callback to parent
          onSaveSections(updatedSections, cleanCss);
          alert("Guardado con éxito");
        } catch (err) {
          console.error("Error guardando:", err);
          alert("Error guardando");
        } finally {
          setSaving(false);
        }
      },
    });

    editorRef.current = editor;
    return () => {
      editor.destroy();
      editorRef.current = undefined;
    };
  }, [sections, slug, recordId, initialCss, onSaveSections]);
  const navigation = useNavigate();
  return (
    <div className=" h-screen flex flex-col py-10 px-2">
      {/* Breadcrumb / back button */}
      <div className="flex items-center p-2 mb-4">
        <button
          onClick={() => navigation("/dashboard/pages")}
          className="flex items-center font-ArialBold text-xl text-white hover:text-gray-300"
        >
          <i className="fa fa-chevron-left mr-2" />
          Pages List
        </button>
        <i className="fa fa-chevron-left ml-4" />
        <span className="ml-4 font-CamilaFont text-xl tracking-wide text-whi">
          Editor
        </span>
      </div>

      {/* Header with Save */}
      <div className="flex items-center justify-between font-ArialBold text-xl bg-neutral-800 rounded-t-lg text-white p-2">
        <h3 className="font-semibold">{slug}</h3>
        <button
          onClick={() => editorRef.current?.runCommand("save-all")}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded disabled:opacity-50"
        >
          {saving ? <LoadingSVG /> : <i className="fa fa-save" />}
        </button>
      </div>

      <div
        ref={editorContainer}
        className={`
        w-full overflow-auto border-l-4 border-r-4 border-neutral-800
        ${slug === "home" ? "bg-[#06060a]" : ""}
      `}
        style={{
          height: "calc(100vh - 2.5rem - 2.5rem - 2.5rem)",
          // Ajusta los 2.5rem si tus header/breadcrumb/footer tienen otra altura
        }}
      />

      {/* Footer */}
      <div className="flex items-center justify-between bg-neutral-800 rounded-b-lg text-white p-2" />
    </div>
  );
};

export default GrapesEditor;
