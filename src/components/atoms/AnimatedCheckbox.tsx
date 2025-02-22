import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

// Definimos la estructura de un topping
type Topping = {
  id: number;
  name: string;
  price: number;
};

// Lista de toppings disponibles
const toppings: Topping[] = [
  { id: 1, name: "Chocolate Chips", price: 1.5 },
  { id: 2, name: "Caramel Drizzle", price: 1.2 },
  { id: 3, name: "Whipped Cream", price: 1.0 },
  { id: 4, name: "Strawberry Sauce", price: 1.3 },
  { id: 5, name: "Chopped Nuts", price: 1.4 },
];

type AnimatedCheckboxProps = {
  checked: boolean;
  onChange: () => void;
  topping: Topping;
};

export const AnimatedCheckbox = ({
  checked,
  onChange,
  topping,
}: AnimatedCheckboxProps) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer" onClick={onChange}>
      <motion.div
        className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all ${
          checked ? "bg-grape-950 border-grape-950" : "border-gray-400"
        }`}
        whileTap={{ scale: 0.8 }}
      >
        <FaCheck
          className={`text-sm transition-all ${
            checked ? "text-white" : "text-gray-400"
          }`}
        />
      </motion.div>
      <span className="text-lg text-grape-900 font-semibold">
        {topping.name} - ${topping.price.toFixed(2)}
      </span>
    </div>
  );
};

export default function CheckboxGroup() {
  // Usamos el id del topping para controlar si está seleccionado
  const [selected, setSelected] = useState<{ [id: number]: boolean }>({});

  const handleToggle = (id: number) => {
    setSelected((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {toppings.map((top) => (
        <AnimatedCheckbox
          key={top.id}
          checked={selected[top.id] || false}
          onChange={() => handleToggle(top.id)}
          topping={top}
        />
      ))}
    </div>
  );
}
