import { useGetOptionGroupsQuery } from "@/store/features/api/optionGroupApi";
import React from "react";
import { Controller, Control } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

interface OptionGroupsSelectorProps {
  control: Control;
  name: string;
}

export default function OptionGroupsSelector({
  control,
  name,
}: OptionGroupsSelectorProps) {
  const { data: groups, isLoading, isError } = useGetOptionGroupsQuery();

  return (
    <div className="space-y-2">
      {isLoading && <p>Loading options…</p>}
      {isError && <p className="text-red-400">Error to load options</p>}
      {!isLoading && !isError && groups?.length === 0 && (
        <p>No options to show</p>
      )}

      {!isLoading && !isError && groups?.length > 0 && (
        <Controller
          name={name}
          control={control}
          defaultValue={[]}
          render={({ field, fieldState: { error } }) => {
            const selectedIds: string[] = field.value;
            const available = groups.filter((g) => !selectedIds.includes(g.id));

            return (
              <div className="border border-gray-700 rounded-md p-3 text-white">
                {/* Parte superior: disponibles */}
                <div className="flex flex-wrap gap-2">
                  {available.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => field.onChange([...selectedIds, g.id])}
                      className="px-3 py-1 bg-transparent border border-gray-700 rounded-full hover:bg-gray-800 transition"
                    >
                      {g.name}
                    </button>
                  ))}
                </div>

                {/* Línea suspendida */}
                <div className="border-t border-dashed border-gray-700 my-3"></div>

                {/* Parte inferior: seleccionadas */}
                <div className="flex flex-wrap gap-2">
                  {selectedIds.map((id) => {
                    const g = groups.find((x) => x.id === id);
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-1 px-3 py-1 bg-transparent border border-gray-700 rounded-full"
                      >
                        <span>{g?.name}</span>
                        <IoMdClose
                          size={16}
                          className="cursor-pointer hover:text-red-400"
                          onClick={() =>
                            field.onChange(selectedIds.filter((x) => x !== id))
                          }
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Error de validación */}
                {error && (
                  <p className="text-sm text-red-400 mt-2">
                    {error.message as string}
                  </p>
                )}
              </div>
            );
          }}
        />
      )}
    </div>
  );
}
