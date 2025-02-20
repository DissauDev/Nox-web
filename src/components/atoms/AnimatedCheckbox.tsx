import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
};

// Lista de toppings disponibles
const toppings: Topping[] = [
  { id: 1, name: "Chocolate Chips", price: 1.5 },
  { id: 2, name: "Caramel Drizzle", price: 1.2 },
  { id: 3, name: "Whipped Cream", price: 1.0 },
  { id: 4, name: "Strawberry Sauce", price: 1.3 },
  { id: 5, name: "Chopped Nuts", price: 1.4 },
];

// Definimos la estructura de un topping
type Topping = {
  id: number;
  name: string;
  price: number;
};

export const AnimatedCheckbox = ({ checked, onChange }: CheckboxProps) => {
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
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (index: number) => {
    setSelected((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex gap-4">
      {[0].map((index) => (
        <AnimatedCheckbox
          key={index}
          checked={selected[index] || false}
          onChange={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
