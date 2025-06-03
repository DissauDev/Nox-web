import React from "react";
import { motion } from "framer-motion";

export type FlavorOption = {
  id: string;
  name: string;
  description?: string;
  extraPrice?: number;
  imageUrl?: string;
};

type IceCreamFlavorSelectorProps = {
  /** Título para mostrar arriba (ej: "Select (1) Flavor") */
  label: string;
  /** Lista de sabores permitidos */
  options: FlavorOption[];
  /** ID del sabor actualmente seleccionado */
  selectedId: string;
  /** Callback que recibe el id del sabor al hacer click */
  onSelect: (valueId: string) => void;
};

const IceCreamFlavorSelector: React.FC<IceCreamFlavorSelectorProps> = ({
  label,
  options,
  selectedId,
  onSelect,
}) => {
  console.log("opt: " + options[0].description);
  return (
    <div className="md:p-4">
      <h2 className="text-2xl font-bold mb-6 text-grape-950">{label}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((flavor) => {
          const checked = flavor.id === selectedId;
          return (
            <div
              key={flavor.id}
              className="flex flex-row items-center text-grape-950 md:flex-col md:items-center"
            >
              <div className="w-36 h-32 md:w-56 md:h-56 overflow-hidden">
                <img
                  src={flavor.imageUrl}
                  alt={flavor.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center w-36 md:w-56 md:h-24">
                <h3 className="text-lg md:text-center font-semibold">
                  {flavor.name}
                </h3>
                {flavor.description && (
                  <p className="text-xs text-wrap md:text-center text-gray-600">
                    {flavor.description}
                  </p>
                )}
              </div>

              <div className=" justify-center items-center">
                <motion.div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all ${
                    checked
                      ? "bg-grape-900 border-grape-900"
                      : "border-gray-400"
                  }`}
                  whileTap={{ scale: 0.6 }}
                  onClick={() => onSelect(flavor.id)}
                >
                  <motion.div
                    className={`text-2xl transition-all ${
                      checked ? "text-white" : "text-gray-400"
                    }`}
                  >
                    ✓
                  </motion.div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IceCreamFlavorSelector;
