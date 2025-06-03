// src/components/EditorToolbar.tsx
import React from "react";
import { LoadingSVG } from "@/components/svg/LoadingSVG";

interface EditorToolbarProps {
  slug: string;
  saving: boolean;
  onSave: () => void;
  onBack: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({
  slug,
  saving,
  onSave,
  onBack,
}) => (
  <div className="flex flex-col">
    {/* Breadcrumb / back button */}
    <div className="flex items-center p-2 mb-4">
      <button
        onClick={onBack}
        className="flex items-center font-ArialBold text-xl text-white hover:text-gray-300"
      >
        <i className="fa fa-chevron-left mr-2" />
        Pages List
      </button>
      <span className="ml-4 font-ArialBold text-xl tracking-wide text-white">
        Editor
      </span>
    </div>

    {/* Header with Save */}
    <header className="flex items-center justify-between font-ArialBold text-xl bg-gray-900 rounded-t-lg text-white p-2">
      <h3 className="font-semibold">{slug}</h3>
      <button
        onClick={onSave}
        disabled={saving}
        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
      >
        {saving && <LoadingSVG />}
        <i className="fa fa-save" />
      </button>
    </header>
  </div>
);

export default EditorToolbar;
