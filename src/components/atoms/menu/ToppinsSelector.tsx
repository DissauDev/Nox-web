// src/components/atoms/menu/selectors/ToppinsSelector.tsx
import { motion } from "framer-motion";
import React, { useState } from "react";

export type ToppingOption = {
  id: string;
  name: string;
  extraPrice: number;
  imageUrl?: string;
};

type ToppinsSelectorProps = {
  groupName: string;
  minSelectable: number;
  maxSelectable: number;
  options: ToppingOption[];
  onToppingsChange: (
    selectedToppings: ToppingOption[],
    totalToppingsPrice: number
  ) => void;
};

export const ToppinsSelector: React.FC<ToppinsSelectorProps> = ({
  groupName,
  maxSelectable,
  options,
  onToppingsChange,
}) => {
  const [selectedMap, setSelectedMap] = useState<Record<string, boolean>>({});

  const handleToggle = (opt: ToppingOption) => {
    setSelectedMap((prev) => {
      const newState = { ...prev };
      const selectedKeys = Object.keys(newState).filter((k) => newState[k]);

      if (newState[opt.id]) {
        // deselect
        newState[opt.id] = false;
      } else {
        // select, respecting maxSelectable
        if (selectedKeys.length >= maxSelectable) {
          newState[selectedKeys[0]] = false;
        }
        newState[opt.id] = true;
      }

      // build selected array
      const selectedArray = Object.entries(newState)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, v]) => v)
        .map(([id]) => options.find((o) => o.id === id)!)
        .filter(Boolean);

      const totalToppingsPrice = selectedArray.reduce(
        (acc, t) => acc + t.extraPrice,
        0
      );
      onToppingsChange(selectedArray, totalToppingsPrice);

      return newState;
    });
  };

  return (
    <div className="mt-4">
      <label className="block font-ArialBold text-sapphire-900 my-4">
        {groupName}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => {
          const checked = !!selectedMap[opt.id];
          return (
            <div
              key={opt.id}
              className="flex items-center justify-between w-full"
            >
              <div className="flex flex-row items-center">
                <motion.div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all ${
                    checked
                      ? "bg-sapphire-900 border-sapphire-900"
                      : "border-gray-400"
                  }`}
                  whileTap={{ scale: 0.6 }}
                  onClick={() => handleToggle(opt)}
                >
                  <motion.div
                    className={`text-xl transition-all ${
                      checked ? "text-white" : "text-gray-400"
                    }`}
                  >
                    ✓
                  </motion.div>
                </motion.div>
                <span className="text-sapphire-950 mx-4 font-ArialBold">
                  {opt.name}
                </span>
              </div>
              <span className="text-sapphire-950 font-ArialBold">
                (+${opt.extraPrice.toFixed(2)})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToppinsSelector;
