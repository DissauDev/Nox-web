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

export const ToppinsSelector = () => {
  const [selectedToppings, setSelectedToppings] = useState<{
    [key: string]: boolean;
  }>({});

  const handleToggle = (topping: Topping) => {
    setSelectedToppings((prev) => {
      // Obtener las claves (toppings) que están seleccionadas
      const selectedKeys = Object.keys(prev).filter((key) => prev[key]);

      // Si ya hay 2 toppings seleccionados, desmarcar uno al seleccionar otro
      if (selectedKeys.length >= 2 && !prev[topping.name]) {
        // Elegir un topping a desmarcar (puedes usar el primero o cualquier otro criterio)
        const toppingToDeselect = selectedKeys[0]; // Desmarcar el primero, por ejemplo
        const newState = {
          ...prev,
          [toppingToDeselect]: false,
          [topping.name]: true,
        };
        console.log(
          `Desmarcado: ${toppingToDeselect} y seleccionado: ${
            topping.name
          } - $${topping.price.toFixed(2)}`
        );
        return newState;
      }

      // Si no hay 2 toppings seleccionados, solo marcar o desmarcar el topping
      const newState = { ...prev, [topping.name]: !prev[topping.name] };
      console.log(
        newState[topping.name]
          ? `Seleccionado: ${topping.name} - $${topping.price.toFixed(2)}`
          : `Deseleccionado: ${topping.name}`
      );
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
