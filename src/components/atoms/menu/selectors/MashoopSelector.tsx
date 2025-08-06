// src/components/atoms/menu/selectors/MashoopSelector.tsx
import React, { useState, useEffect } from "react";
import ImageEmpty from "../../../../assets/base/illustration-gallery-icon.png";

export type MashoopOption = {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  extraPrice?: number; // 🆕 recargo por unidad
};

type MashoopSelectorProps = {
  groupName: string;
  minSelectable: number;
  maxSelectable: number;
  options: MashoopOption[];
  selectedCounts?: Record<string, number>;
  onChange: (counts: Record<string, number>) => void;
  // 🆕 límites globales (packs)
  packMaxItems?: number; // p.ej. 12; si undefined => sin límite global
  otherGroupsMinRequired?: number; // suma de minSelectable de otros grupos (p.ej. 1 si desserts min=1)
  globalSelectedExcludingThis?: number; // total ya elegido en otros grupos
  // 🆕 recibe callback opcional para enviar selecciones con extra
  onSelectionsChange?: (
    selections: {
      optionId: string;
      name: string;
      count: number;
      unitExtra: number;
    }[]
  ) => void;
};

const MashoopSelector: React.FC<MashoopSelectorProps> = ({
  groupName,
  maxSelectable,
  options,
  selectedCounts = {},
  onChange,
  packMaxItems,
  otherGroupsMinRequired,
  globalSelectedExcludingThis,
  onSelectionsChange,
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
    // 🆕 construir selecciones con extra y notificar arriba
    if (onSelectionsChange) {
      const selections = Object.entries(counts)
        .map(([id, count]) => {
          const opt = options.find((o) => o.id === id);
          return {
            optionId: id,
            name: opt?.name ?? "",
            count: Number(count) || 0,
            unitExtra: Number(opt?.extraPrice) || 0,
          };
        })
        .filter((s) => s.count > 0);

      onSelectionsChange(selections);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts]);

  const total = Object.values(counts).reduce((sum, v) => sum + v, 0);
  // 🆕 máximo efectivo para este grupo considerando el pack y otros grupos
  const effectiveMax = React.useMemo(() => {
    if (!packMaxItems || packMaxItems <= 0) return maxSelectable;
    const reserve = otherGroupsMinRequired ?? 0;
    const already = globalSelectedExcludingThis ?? 0;

    // ✅ No restes ambos; reserva el MAYOR de ambos para no "doble descontar"
    const mustKeepForOthers = Math.max(reserve, already);

    return Math.max(0, packMaxItems - mustKeepForOthers);
  }, [
    packMaxItems,
    otherGroupsMinRequired,
    globalSelectedExcludingThis,
    maxSelectable,
  ]);

  console.log("packMaxItems");
  console.log(packMaxItems);
  console.log(otherGroupsMinRequired + globalSelectedExcludingThis);

  const handleIncrement = (id: string) => {
    setCounts((prev) => {
      const current = prev[id] ?? 0;
      const prevTotal = Object.values(prev).reduce((sum, v) => sum + v, 0); // 🆕
      if (current < effectiveMax && prevTotal < effectiveMax) {
        // 🆕
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
      <h2 className="text-2xl font-bold mb-6 text-sapphire-950">
        Select ({effectiveMax}) {groupName}{" "}
        {/* 🆕 antes mostrabas maxSelectable */}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((opt) => (
          <div
            key={opt.id}
            className="flex flex-col text-sapphire-950 items-center p-4"
          >
            <div className="w-56 h-56 overflow-hidden">
              <img
                src={opt.imageUrl.length ? opt.imageUrl : ImageEmpty}
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
                    : "bg-sapphire-950 hover:bg-sapphire-900"
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
                  counts[opt.id] >= effectiveMax || total >= effectiveMax
                }
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                  counts[opt.id] >= effectiveMax || total >= effectiveMax
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-sapphire-950 hover:bg-sapphire-900"
                }`}
              >
                +
              </button>
            </div>
            {/* 🆕 debajo de los botones */}
            {(Number(opt.extraPrice) || 0) > 0 && (
              <div className="mt-1 text-xs text-gray-600">
                (+${Number(opt.extraPrice).toFixed(2)} each)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MashoopSelector;
