import React from "react";
import { useEditor } from "@craftjs/core";

export default function SideBarEditor() {
  const {
    query: { getEventListeners, node },
    actions: { setProp },
  } = useEditor();

  const selected = getEventListeners("selected");
  if (selected.length === 0) {
    return (
      <div className="w-80 p-4 bg-white border-l">
        <p className="text-gray-500">Haz clic en un texto para editarlo</p>
      </div>
    );
  }

  const selectedId = selected[0].id;
  const { data } = node(selectedId);
  const displayName = data.displayName;
  const currentText = data.props.text as string;

  return (
    <div className="w-80 p-4 bg-white border-l flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Editar “{displayName}”</h3>

      {/* CONTENT */}
      <textarea
        rows={6}
        className="w-full border px-2 py-1 mb-4 resize-none"
        value={currentText}
        onChange={(e) => {
          const newText = e.target.value;
          // Live preview
          setProp(selectedId, (props: any) => {
            props.text = newText;
          });
        }}
      />

      {/* GUARDAR */}
      <button
        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        onClick={() => {
          // Aquí podrías serializar y guardar en localStorage o llamar a tu API
          alert(`Guardado: ${currentText}`);
        }}
      >
        Guardar
      </button>
    </div>
  );
}
