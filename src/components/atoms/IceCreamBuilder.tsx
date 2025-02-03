import React from "react";

interface IceCreamBuilderProps {
  base: string;
  flavors: { id: string; name: string; image: string }[];
  toppings: { id: string; name: string; image: string }[];
  selectedFlavors: string[];
  selectedToppings: string[];
}

const IceCreamBuilder: React.FC<IceCreamBuilderProps> = ({
  base,
  flavors,
  toppings,
  selectedFlavors,
  selectedToppings,
}) => {
  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square">
      {/* Base */}
      <img
        src={base}
        alt="Ice cream base"
        className="absolute inset-0 w-full h-full object-contain z-10"
      />

      {/* Sabores */}
      {selectedFlavors.map((flavorId, index) => {
        const flavor = flavors.find((f) => f.id === flavorId);
        return (
          flavor && (
            <img
              key={flavor.id}
              src={flavor.image}
              alt={flavor.name}
              className="absolute inset-0 w-3/4 h-auto mx-auto object-contain z-[20]"
              style={{
                transform: `translateY(-${index * 10}%)`,
              }}
            />
          )
        );
      })}

      {/* Toppings */}
      {selectedToppings.map((toppingId, index) => {
        const topping = toppings.find((t) => t.id === toppingId);
        return (
          topping && (
            <img
              key={topping.id}
              src={topping.image}
              alt={topping.name}
              className="absolute inset-0 w-1/4 h-auto mx-auto object-contain z-[30]"
              style={{
                zIndex: 30 + index,
                top: `${25 - index * 5}%`, // Ajusta la altura para toppings
              }}
            />
          )
        );
      })}
    </div>
  );
};

export default IceCreamBuilder;
