import React from "react";

export const IceCreamSelector = () => {
  return (
    <>
      <div>
        <label className="block font-semibold">Variante</label>
        <select
          /* {...register("variant")}*/
          className="border p-2 w-full"
        >
          <option value="">Seleccione variante</option>
          <option value="on-cookie">Sobre Cookie</option>
          <option value="on-brownie">Sobre Brownie</option>
          <option value="cup">En Copa/Tina</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Sabores</label>
        {["Vanilla", "Chocolate", "Strawberry"].map((flavor) => (
          <div key={flavor} className="flex items-center">
            <input
              type="checkbox"
              value={flavor}
              /* {...register("selectedFlavors")}*/
              className="mr-2"
            />
            <span>{flavor}</span>
          </div>
        ))}
      </div>
      <div>
        <label className="block font-semibold">Toppings</label>
        {["Nuts", "Caramel", "Sprinkles"].map((topping) => (
          <div key={topping} className="flex items-center">
            <input
              type="checkbox"
              value={topping}
              /*   {...register("selectedIceCreamToppings")}*/
              className="mr-2"
            />
            <span>{topping} (+$0.75)</span>
          </div>
        ))}
      </div>
    </>
  );
};
