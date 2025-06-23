/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/GrapesEditorContainer.tsx
import React, { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import axios from "axios";
import "grapesjs/dist/css/grapes.min.css";

import EditorToolbar from "./EditorToolbar";

interface GrapesEditorContainerProps {
  slug: string;
  recordId: number;

  sections: any;
  initialCss?: string;
  onSaveSections: (sections, css: string) => void;
}

const GrapesEditorContainer: React.FC<GrapesEditorContainerProps> = ({
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
    editorRef.current?.destroy();

    const initialHtml = sections
      .map(
        (s) =>
          `<div data-section-key=\\"${s.key}\\" style=\\"margin-bottom:20px;\\">${s.html}</div>`
      )
      .join("");

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

      // 4.1️⃣ Inject Tailwind into iframe
      const linkTailwind = doc.createElement("link");
      linkTailwind.rel = "stylesheet";
      linkTailwind.href = `${window.location.origin}/tailwind.css`;
      doc.head.appendChild(linkTailwind);

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

      // 4.3️⃣ Force trait CSS to be !important, so inline edits override Tailwind
      editor.CssComposer.getAll().forEach((rule) =>
        rule.set({ important: true })
      );

      // 4.4️⃣ Override editor fonts
      const styleFontOverride = doc.createElement("style");
      styleFontOverride.innerHTML = `
          .gjs-cv-canvas, .gjs-cv-canvas * {
            font-family: ArialRegular, sans-serif !important;
          }
        `;
      doc.head.appendChild(styleFontOverride);

      // 4.5️⃣ Dark background for home
      if (slug === "home") {
        const styleBg = doc.createElement("style");
        styleBg.innerHTML = `
            body { background-color: ##15203a !important; }
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
          // Extract CSS from editor
          const css = ed.getCss();
          // PUT to backend
          await axios.put(`http://localhost:3000/api/pages/${recordId}`, {
            layout: { sections: updatedSections, css },
          });
          // callback to parent
          onSaveSections(updatedSections, css);
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

  const handleSave = () => editorRef.current?.runCommand("save-all");
  const handleBack = () => {
    /* navigate back */
  };

  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar
        slug={slug}
        saving={saving}
        onSave={handleSave}
        onBack={handleBack}
      />
      <div ref={editorContainer} className="flex-1 overflow-hidden" />
    </div>
  );
};

export default GrapesEditorContainer;
