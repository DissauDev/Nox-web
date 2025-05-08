import React from "react";

export default function TextSettings({ props, setProp }) {
  return (
    <textarea
      rows={3}
      className="w-full bg-black border-8 border-red-700 mb-2 p-1"
      value={props.content}
      onChange={(e) =>
        setProp((draft) => {
          draft.content = e.target.value;
        })
      }
    />
  );
}
