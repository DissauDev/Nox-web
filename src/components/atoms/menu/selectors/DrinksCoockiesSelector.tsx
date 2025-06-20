import React from "react";

export const DrinksCoockiesSelector = () => {
  return (
    <>
      <div></div>
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
