import React from "react";
import ImagePuntos from "../../../assets/home/puntos.png";

export const HomeSection5 = () => {
  return (
    <div className="flex my-10 justify-center flex-col items-center">
      <img src={ImagePuntos} className="h-auto w-44" />
      <h1 className="text-center text-balance text-5xl font-ArialRegular my-5">
        Your Dessert
        <br /> Destination
      </h1>
      <img src={ImagePuntos} className="h-auto w-44" />
    </div>
  );
};
