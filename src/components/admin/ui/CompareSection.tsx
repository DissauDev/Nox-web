// /components/date-range/CompareSection.tsx
import React from "react";
import { CompareType } from "./types";

interface CompareSectionProps {
  compareType: CompareType;
  onChangeCompare: (compareType: CompareType) => void;
}

const CompareSection: React.FC<CompareSectionProps> = ({
  compareType,
  onChangeCompare,
}) => {
  const handleCompareClick = (type: CompareType) => {
    // Desactivar si se hace clic en el tipo ya activo
    if (type === compareType) {
      onChangeCompare("none");
    } else {
      onChangeCompare(type);
    }
  };

  return (
    <div className="compare-section mt-4">
      <span className="mr-2 text-sm font-medium text-gray-700">Comparar:</span>
      <button
        type="button"
        onClick={() => handleCompareClick("previous_period")}
        className={`px-3 py-1 mr-2 rounded ${
          compareType === "previous_period"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        Periodo anterior
      </button>
      <button
        type="button"
        onClick={() => handleCompareClick("previous_year")}
        className={`px-3 py-1 rounded ${
          compareType === "previous_year"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
      >
        Año anterior
      </button>
    </div>
  );
};

export default CompareSection;
