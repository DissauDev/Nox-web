// components/OptionsManager.tsx
"use client";

import React, { useState } from "react";
import OptionGroupsPanel, { OptionGroup } from "./OptionsGroupsPanel";

import OptionValuesPanel from "./OptionsValuesPanel";

export default function OptionsManager() {
  // 1) Mantienes la lista de grupos aquí
  const [groups, setGroups] = useState<OptionGroup[]>([]);
  // 2) Y qué grupo está “activo”
  const [selectedGroup, setSelectedGroup] = useState<OptionGroup | null>(null);

  // Si quisieras precargar desde API al montar:
  // useEffect(() => {
  //   fetch("/api/option-groups").then(r => r.json()).then(setGroups);
  // }, []);

  return (
    <div className=" flex  md:flex-row  gap-2">
      {/* — Panel de Grupos — */}
      <OptionGroupsPanel
        groups={groups} // le pasas la lista
        selectedId={selectedGroup?.id} // para marcar el activo
        onSelect={(grp) => setSelectedGroup(grp)} // al clickar un grupo
        onAdd={(name, required, min, max) => {
          // tu lógica de creación (puede ser llamada a la API)
          const newGroup: OptionGroup = {
            id: crypto.randomUUID(),
            name,
            required,
            minSelectable: min,
            maxSelectable: max,
          };
          setGroups((g) => [...g, newGroup]);
        }}
        onUpdate={(id, name, required, min, max) => {
          setGroups((g) =>
            g.map((x) =>
              x.id === id
                ? {
                    ...x,
                    name,
                    required,
                    minSelectable: min,
                    maxSelectable: max,
                  }
                : x
            )
          );
        }}
        onDelete={(id) => {
          setGroups((g) => g.filter((x) => x.id !== id));
          if (selectedGroup?.id === id) setSelectedGroup(null);
        }}
      />

      {/* — Panel de Valores — */}
      {selectedGroup ? (
        <OptionValuesPanel groupId={selectedGroup.id} />
      ) : (
        <div className="flex-1 p-4 text-gray-400 italic">
          Select a group to manage its values…
        </div>
      )}
    </div>
  );
}
