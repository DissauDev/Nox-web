import React from "react";
import { useEditor } from "@craftjs/core";

const availableWidgets = [
  { type: "text", label: "Texto" },
  { type: "image", label: "Imagen" },
  { type: "button", label: "Botón" },
  { type: "spacer", label: "Espaciador" },
];

export default function AddWidgetPanel() {
  const { actions } = useEditor();

  const add = (type: string) => {
    // Crea el nodo y lo añade al lienzo raíz
    actions.add({
      type,
      // props iniciales según el widget
      ...(type === "text" && { content: "Nuevo texto" }),
      ...(type === "image" && { src: "/placeholder.svg", alt: "" }),
      ...(type === "button" && { text: "Click me", link: "#" }),
      ...(type === "spacer" && { size: "md" }),
    });
  };

  return (
    <div className="w-80 bg-white border-l p-4">
      <h3 className="font-semibold mb-4">Añadir elemento</h3>
      {availableWidgets.map((w) => (
        <button
          key={w.type}
          onClick={() => add(w.type)}
          className="w-full mb-2 py-2 border rounded hover:bg-gray-100"
        >
          {w.label}
        </button>
      ))}
    </div>
  );
}
