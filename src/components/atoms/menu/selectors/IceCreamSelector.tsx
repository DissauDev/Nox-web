import React from "react";
import { ToppinsSelector } from "../ToppinsSelector";
import IceCreamFlavorSelector from "../IceCreamFlavorSelector";

export const IceCreamSelector = () => {
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
      <ToppinsSelector />
    </>
  );
};
