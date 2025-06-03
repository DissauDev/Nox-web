import React from "react";
import { ToppinsSelector } from "../ToppinsSelector";
import IceCreamFlavorSelector from "../IceCreamFlavorSelector";

type Topping = {
  name: string;
  price: number;
};

type IceCreamSelectorProps = {
  // Callback para enviar la lista de toppings y el precio total de los mismos al componente padre.
  onToppingsChange: (
    selectedToppings: Topping[],
    totalToppingsPrice: number
  ) => void;
};

export const IceCreamSelector = ({
  onToppingsChange,
}: IceCreamSelectorProps) => {
  return (
    <>
      <div>
        <label className="block font-semibold text-grape-900">Variante</label>
        <select
          /* {...register("variant")}*/
          className="border p-2 w-full text-grape-900"
        >
          <option value="">Seleccione variante</option>
          <option value="on-cookie">Sobre Cookie</option>
          <option value="on-brownie">Sobre Brownie</option>
          <option value="cup">En Copa/Tina</option>
        </select>
      </div>
      <IceCreamFlavorSelector scoop={1} />
      <IceCreamFlavorSelector scoop={2} />
    </>
  );
};
