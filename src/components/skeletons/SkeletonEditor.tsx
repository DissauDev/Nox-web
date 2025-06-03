import React from "react";

const SkeletonEditor: React.FC = () => (
  <div className="h-screen flex flex-col p-4 animate-pulse">
    {/* Cabecera simulada */}
    <div className="h-12 bg-gray-700 rounded mb-4" />
    {/* Canvas simulado */}
    <div className="flex-1 bg-gray-300 rounded" />
  </div>
);

export default SkeletonEditor;
