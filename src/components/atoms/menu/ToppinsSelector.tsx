import { motion } from "framer-motion";
import React, { useState } from "react";

type Topping = {
  name: string;
  price: number;
};

const toppingsList: Topping[] = [
  { name: "Extra Chocolate", price: 0.5 },
  { name: "Sprinkles", price: 0.25 },
  { name: "Whipped Cream", price: 0.8 },
];

type ToppinsSelectorProps = {
  // Callback para enviar la lista de toppings y el precio total de los mismos al componente padre.
  onToppingsChange: (
    selectedToppings: Topping[],
    totalToppingsPrice: number
  ) => void;
};
export const ToppinsSelector = ({ onToppingsChange }: ToppinsSelectorProps) => {
  const [selectedToppings, setSelectedToppings] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggle = (topping: Topping) => {
    setSelectedToppings((prev) => {
      // Copia del estado actual
      const newState = { ...prev };
      // Si el topping ya estaba seleccionado, se desmarca, si no, se marca.
      if (newState[topping.name]) {
        newState[topping.name] = false;
      } else {
        // Ejemplo: permitir máximo 2 toppings, desmarcando el primero si ya hay dos seleccionados
        const selectedKeys = Object.keys(newState).filter(
          (key) => newState[key]
        );
        if (selectedKeys.length >= 2) {
          newState[selectedKeys[0]] = false;
        }
        newState[topping.name] = true;
      }
      // Obtener el arreglo de toppings seleccionados
      const selectedArray = Object.entries(newState)
        .filter(([key, value]) => value)
        .map(([name]) => toppingsList.find((t) => t.name === name))
        .filter((topping): topping is Topping => topping !== undefined);

      const totalToppingsPrice = selectedArray.reduce(
        (acc, t) => acc + t.price,
        0
      );

      // Se comunica la selección actual al componente padre.
      onToppingsChange(selectedArray, totalToppingsPrice);
      return newState;
    });
  };

  return (
    <>
      <div className="mt-4">
        <label className="block font-ArialBold  text-grape-800 my-4">
          Toppings
        </label>
        <div className="flex flex-wrap gap-4">
          {toppingsList.map((topping) => (
            <div
              key={topping.name}
              className="flex items-center justify-between w-full"
            >
              <div className="flex flex-row  items-center">
                <motion.div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all ${
                    selectedToppings[topping.name]
                      ? "bg-grape-950 border-grape-950"
                      : "border-gray-400"
                  }`}
                  whileTap={{ scale: 0.6 }}
                  onClick={() => handleToggle(topping)}
                >
                  <motion.div
                    className={`text-xl transition-all ${
                      selectedToppings[topping.name]
                        ? "text-white"
                        : "text-gray-400"
                    }`}
                  >
                    ✓
                  </motion.div>
                </motion.div>
                <span className="text-grape-900 mx-4">{topping.name}</span>
              </div>

              <span className="text-grape-900">
                (+${topping.price.toFixed(2)})
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
