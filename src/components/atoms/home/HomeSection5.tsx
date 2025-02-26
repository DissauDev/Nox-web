import React from "react";
import ImagePuntos from "../../../assets/home/puntos.png";

export const HomeSection5 = () => {
  return (
    <div className="flex my-10 justify-center flex-col items-center">
      <img src={ImagePuntos} className="h-auto w-40" />
      <h1 className="text-center text-balance text-4xl font-ArialBold my-5">
        Your Dessert
        <br /> Destination
      </h1>
      <img src={ImagePuntos} className="h-auto w-40" />
    </div>
  );
};
