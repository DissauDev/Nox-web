import React from "react";

export default function ImageSettings({ props, setProp }) {
  return (
    <>
      <input
        type="text"
        className="w-full border mb-2 p-1"
        value={props.src}
        onChange={(e) => setProp((draft) => (draft.src = e.target.value))}
      />
      <input
        type="text"
        className="w-full border mb-2 p-1"
        value={props.alt}
        onChange={(e) => setProp((draft) => (draft.alt = e.target.value))}
      />
      {/* podrías añadir control de tamaño aquí */}
    </>
  );
}
