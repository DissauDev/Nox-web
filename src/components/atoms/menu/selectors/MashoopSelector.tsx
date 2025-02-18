import React from "react";

export const MashoopSelector = () => {
  return (
    <>
      <div>
        <label className="block font-semibold">Cookies</label>
        {["Cookie A", "Cookie B"].map((cookie) => (
          <div key={cookie} className="flex items-center">
            <input
              type="checkbox"
              value={cookie}
              /* {...register("selectedCookies")}*/
              className="mr-2"
            />
            <span>{cookie}</span>
          </div>
        ))}
      </div>
      <div>
        <label className="block font-semibold">Tercer Sabor</label>
        <input
          type="text"
          /* {...register("thirdFlavor")}*/
          placeholder="Ingrese tercer sabor"
          className="border p-2 w-full"
        />
      </div>
    </>
  );
};
