// src/components/atoms/menu/selectors/MashoopSelector.tsx
import React, { useState, useEffect } from "react";

export type MashoopOption = {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
};

type MashoopSelectorProps = {
  groupName: string;
  minSelectable: number;
  maxSelectable: number;
  options: MashoopOption[];
  selectedCounts?: Record<string, number>;
  onChange: (counts: Record<string, number>) => void;
};

const MashoopSelector: React.FC<MashoopSelectorProps> = ({
  groupName,
  maxSelectable,
  options,
  selectedCounts = {},
  onChange,
}) => {
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    options.forEach((o) => {
      init[o.id] = selectedCounts[o.id] ?? 0;
    });
    return init;
  });

  // SOLO counts en deps, no onChange
  useEffect(() => {
    onChange(counts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts]);

  const total = Object.values(counts).reduce((sum, v) => sum + v, 0);

  const handleIncrement = (id: string) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      if (current < maxSelectable && total < maxSelectable) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const handleDecrement = (id: string) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      if (current > 0) {
        return { ...prev, [id]: current - 1 };
      }
      return prev;
    });
  };

  return (
    <div className="p-4 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-grape-950">
        Select ({maxSelectable}) {groupName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex flex-col text-grape-950 items-center p-4"
          >
            <div className="w-56 h-56 overflow-hidden">
              <img
                src={opt.imageUrl}
                alt={opt.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-4 text-center w-56 h-24">
              <h3 className="text-lg font-semibold">{opt.name}</h3>
              {opt.description && (
                <p className="text-xs text-gray-600">{opt.description}</p>
              )}
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <button
                type="button"
                onClick={() => handleDecrement(opt.id)}
                disabled={counts[opt.id] === 0}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                  counts[opt.id] === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-grape-900 hover:bg-grape-800"
                }`}
              >
                –
              </button>
              <span className="w-10 text-center font-semibold text-xl">
                {counts[opt.id]}
              </span>
              <button
                type="button"
                onClick={() => handleIncrement(opt.id)}
                disabled={
                  counts[opt.id] >= maxSelectable || total >= maxSelectable
                }
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                  counts[opt.id] >= maxSelectable || total >= maxSelectable
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-grape-900 hover:bg-grape-800"
                }`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MashoopSelector;
