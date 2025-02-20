import { useState } from "react";
import { cookieFlavors } from "../../../../utils/data/menu/coockiesFlavors";
import { IceCreamFlavors } from "../../../../utils/data/menu/iceCreamFlavors";

export const MashoopSelector = () => {
  const maxQuantity = 2; // máximo por sabor
  const minQuantity = 0;
  const maxTotal = 2; // máximo total de cookies seleccionadas

  // Estado para guardar la cantidad de cada sabor
  const [quantitiesCoockie, setQuantitiesCoockies] = useState<{
    [id: number]: number;
  }>(() => {
    const initial: { [id: number]: number } = {};
    cookieFlavors.forEach((flavor) => {
      initial[flavor.id] = 0;
    });
    return initial;
  });
  const [quantitiesIceCream, setQuantitiesIceCream] = useState<{
    [id: number]: number;
  }>(() => {
    const initial: { [id: number]: number } = {};
    cookieFlavors.forEach((flavor) => {
      initial[flavor.id] = 0;
    });
    return initial;
  });

  const handleIncrementCoockies = (id: number) => {
    setQuantitiesCoockies((prev) => {
      const current = prev[id] || 0;
      const total = Object.values(prev).reduce((sum, curr) => sum + curr, 0);
      // Permitir incrementar si:
      // 1. El sabor actual no supera su límite individual.
      // 2. El total seleccionado es menor que el máximo global.
      if (current < maxQuantity && total < maxTotal) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const handleDecrementCoockies = (id: number) => {
    setQuantitiesCoockies((prev) => {
      const current = prev[id] || 0;
      if (current > minQuantity) {
        return { ...prev, [id]: current - 1 };
      }
      return prev;
    });
  };
  const handleIncrementIceCream = (id: number) => {
    setQuantitiesIceCream((prev) => {
      const current = prev[id] || 0;
      const total = Object.values(prev).reduce((sum, curr) => sum + curr, 0);
      // Permitir incrementar si:
      // 1. El sabor actual no supera su límite individual.
      // 2. El total seleccionado es menor que el máximo global.
      if (current < maxQuantity && total < maxTotal) {
        return { ...prev, [id]: current + 1 };
      }
      return prev;
    });
  };

  const handleDecrementIceCream = (id: number) => {
    setQuantitiesIceCream((prev) => {
      const current = prev[id] || 0;
      if (current > minQuantity) {
        return { ...prev, [id]: current - 1 };
      }
      return prev;
    });
  };
  return (
    <div>
      <div className="p-4 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-grape-950">
          Select (2) Cookie Flavors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cookieFlavors.map((flavor) => (
            <div
              key={flavor.id}
              className="flex flex-col text-grape-950 items-center p-4"
            >
              {/* Imagen de la cookie (más grande) */}
              <div className="w-56 h-56 overflow-hidden">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Título y descripción con tamaño fijo */}
              <div className="mt-4 text-center w-56 h-24">
                <h3 className="text-lg font-semibold">{flavor.name}</h3>
                <p className="text-xs text-gray-600">{flavor.description}</p>
              </div>
              {/* Contador de cantidad */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleDecrementCoockies(flavor.id)}
                  disabled={quantitiesCoockie[flavor.id] === minQuantity}
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                    quantitiesCoockie[flavor.id] === minQuantity
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-grape-900 hover:bg-grape-800"
                  }`}
                >
                  –
                </button>
                <span className="w-10 text-center font-semibold text-xl">
                  {quantitiesCoockie[flavor.id]}
                </span>
                <button
                  onClick={() => handleIncrementCoockies(flavor.id)}
                  disabled={
                    quantitiesCoockie[flavor.id] === maxQuantity ||
                    Object.values(quantitiesCoockie).reduce(
                      (sum, curr) => sum + curr,
                      0
                    ) >= maxTotal
                  }
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                    quantitiesCoockie[flavor.id] === maxQuantity ||
                    Object.values(quantitiesCoockie).reduce(
                      (sum, curr) => sum + curr,
                      0
                    ) >= maxTotal
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-grape-900 hover:bg-grape-800"
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-grape-950">
          Select (2) IceCream Flavors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IceCreamFlavors.map((flavor) => (
            <div
              key={flavor.id}
              className="flex flex-col text-grape-950 items-center p-4"
            >
              {/* Imagen de la cookie (más grande) */}
              <div className="w-56 h-56 overflow-hidden">
                <img
                  src={flavor.image}
                  alt={flavor.name}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Título y descripción con tamaño fijo */}
              <div className="mt-4 text-center w-56 h-24">
                <h3 className="text-lg font-semibold">{flavor.name}</h3>
                <p className="text-xs text-gray-600">{flavor.description}</p>
              </div>
              {/* Contador de cantidad */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleDecrementIceCream(flavor.id)}
                  disabled={quantitiesIceCream[flavor.id] === minQuantity}
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                    quantitiesIceCream[flavor.id] === minQuantity
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-grape-900 hover:bg-grape-800"
                  }`}
                >
                  –
                </button>
                <span className="w-10 text-center font-semibold text-xl">
                  {quantitiesIceCream[flavor.id]}
                </span>
                <button
                  onClick={() => handleIncrementIceCream(flavor.id)}
                  disabled={
                    quantitiesIceCream[flavor.id] === maxQuantity ||
                    Object.values(quantitiesIceCream).reduce(
                      (sum, curr) => sum + curr,
                      0
                    ) >= maxTotal
                  }
                  className={`w-12 h-12 flex items-center justify-center rounded-full text-white font-bold text-2xl transition ${
                    quantitiesIceCream[flavor.id] === maxQuantity ||
                    Object.values(quantitiesIceCream).reduce(
                      (sum, curr) => sum + curr,
                      0
                    ) >= maxTotal
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-grape-900 hover:bg-grape-800"
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MashoopSelector;
