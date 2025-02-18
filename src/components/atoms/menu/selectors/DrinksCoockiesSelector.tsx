import React from "react";
import { useNavigate } from "react-router-dom";

export const DrinksCoockiesSelector = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          className="font-ArialBold text-grape-900"
          onClick={() => navigate("/nutritional-info")}
        >
          Info Nutricional
        </button>
      </div>
      <div>
        <label className="block font-semibold text-grape-900">Cantidad</label>
        <input
          type="number"
          /*  {...register("quantity", { valueAsNumber: true })}*/
          defaultValue={1}
          min={1}
          className="border border-grape-950 p-2 w-full"
        />
      </div>
    </>
  );
};
