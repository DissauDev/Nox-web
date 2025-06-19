import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";

interface cartCounterProps {
  price: number;
  onQuantityChange: (quantity: number) => void;
}

const CartCounter = ({ onQuantityChange }: cartCounterProps) => {
  const maxCount = 50;
  const minCount = 1;

  // Valor confirmado (número) y valor editable (string)
  const [count, setCount] = useState(1);
  const [inputValue, setInputValue] = useState("1");
  // Controla el estado de foco del input
  const [isFocused, setIsFocused] = useState(false);
  // Estado para activar la animación del texto
  const [animate, setAnimate] = useState(false);

  // Cada vez que 'count' cambia, activamos la animación
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [count]);

  // Cada vez que count cambie, informamos al padre.
  useEffect(() => {
    onQuantityChange(count);
  }, [count, onQuantityChange, inputValue]);

  const handleIncrement = () => {
    if (count < maxCount) {
      const newCount = count + 1;

      setCount(newCount);
      setInputValue(newCount.toString());
    }
  };

  const handleDecrement = () => {
    if (count > minCount) {
      const newCount = count - 1;
      setCount(newCount);
      setInputValue(newCount.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite cualquier valor mientras se edita
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    // Al salir del foco, se valida y se corrige el valor
    let value = parseInt(inputValue, 10);
    if (isNaN(value)) value = minCount;
    if (value > maxCount) value = maxCount;
    if (value < minCount) value = minCount;
    setCount(value);
    setInputValue(value.toString());
  };

  const resetvalue = () => {
    setCount(1);
    setInputValue("1");
  };
  return (
    <div className="flex flex-row w-full items-center justify-between my-8">
      <div className="">
        <h3 className="text-midnight-900 text-xl font-ArialBold">
          {" "}
          How Many ?
        </h3>
        <button
          type="button"
          onClick={resetvalue}
          className="text-sapphire-600 font-ArialRegular text-lg"
        >
          Clear Section
        </button>
      </div>
      <div className="flex items-center space-x-4">
        {/* Botón de decremento */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={count === minCount}
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold transition text-lg ${
            count === minCount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-midnight-950 hover:bg-midnight-900"
          }`}
        >
          <FaMinus />
        </button>

        {/* Input editable con animación sobre el número */}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              handleInputBlur();
            }}
            className="w-20 text-center font-ArialBold text-xl border border-midnight-950 text-midnight-900 rounded-md py-2"
          />
          {/* Sobreponer el texto animado solo cuando no se esté editando */}
          <AnimatePresence>
            {!isFocused && animate && (
              <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0, y: -20, rotate: -15 }}
                animate={{
                  scale: [1.5, 1],
                  opacity: [0, 1],
                  y: [-20, 0],
                  rotate: [15, 0],
                }}
                exit={{ scale: 0.5, opacity: 0, y: 20, rotate: 15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-midnight-950 font-bold"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Botón de incremento */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={count === maxCount}
          className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold transition text-lg ${
            count === maxCount
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-midnight-950 hover:bg-midnight-900"
          }`}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartCounter;
