import React, { useState } from "react";
import { motion } from "framer-motion";
import { IceCreamFlavors } from "@/utils/data/menu/iceCreamFlavors";

interface IceCreamFlavorSelectorProps {
  scoop: number;
}

export const IceCreamFlavorSelector: React.FC<IceCreamFlavorSelectorProps> = ({
  scoop,
}) => {
  // Solo se permite un sabor seleccionado por scoop
  const [selectedFlavorId, setSelectedFlavorId] = useState<number | null>(null);

  const handleSelect = (flavorId: number) => {
    setSelectedFlavorId(flavorId);
    const selectedFlavor = IceCreamFlavors.find((f) => f.id === flavorId);
    console.log(`Scoop #${scoop} selected: ${selectedFlavor?.name}`);
  };

  return (
    <div className="md:p-4">
      <h2 className="text-2xl font-bold mb-6 text-grape-950">
        Select (1) Flavor for Scoop #{scoop}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {IceCreamFlavors.map((flavor) => (
          <div
            key={flavor.id}
            className="flex flex-row items-center  text-grape-950 md:flex-col md:items-center"
          >
            {/* Imagen del helado */}
            <div className="w-36 h-32 md:w-56 md:h-56 overflow-hidden">
              <img
                src={flavor.image}
                alt={flavor.name}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Contenedor de textos y checkbox */}
            <div className="ml-2 flex flex-col items-center mt-4 md:ml-0 md:mt-4 md:items-center">
              {/* Título y descripción con ancho y alto fijos */}
              <div className="w-36 md:w-56 md:h-24">
                <h3 className="text-lg md:text-center font-semibold">
                  {flavor.name}
                </h3>
                <p className="text-xs text-wrap md:text-center text-gray-600">
                  {flavor.description}
                </p>
              </div>
              {/* Checkbox animado */}
              <div className=" justify-center items-center">
                <motion.div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all ${
                    selectedFlavorId === flavor.id
                      ? "bg-grape-900 border-grape-900"
                      : "border-gray-400"
                  }`}
                  whileTap={{ scale: 0.6 }}
                  onClick={() => handleSelect(flavor.id)}
                >
                  <motion.div
                    className={`text-2xl transition-all ${
                      selectedFlavorId === flavor.id
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    ✓
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IceCreamFlavorSelector;
