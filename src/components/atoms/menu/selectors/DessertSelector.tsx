import React from "react";

export const DessertSelector = () => {
  return (
    <>
      <div>
        <label className="block font-semibold">Info Nutricional</label>
        <input
          type="text"
          /* {...register("nutritionalInfo")}*/
          placeholder="Ingrese info nutricional"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block font-semibold text-grape-800">Toppings</label>
        {/* Se asume que los toppings vienen definidos (ejemplo estático) */}
        {["Extra Chocolate", "Sprinkles", "Whipped Cream"].map((topping) => (
          <div key={topping} className="flex items-center text-grape-900">
            <input
              type="checkbox"
              value={topping}
              /*  {...register("selectedToppings")}*/
              className="mr-2"
            />
            <span>{topping} (+$0.50)</span>
          </div>
        ))}
      </div>
    </>
  );
};
