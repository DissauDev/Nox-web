import React from "react";
import NoxLogo from "../../../assets/desing/Recurso 8@2x.png";

export const HomeSection3 = () => {
  return (
    <div className="flex flex-col items-center justify-center my-10 max-w-full overflow-hidden px-4">
      <img
        src={NoxLogo}
        className="h-auto w-[30vw] max-w-[220px] mb-4"
        alt="Nox Catering Logo"
      />
      <div className="text-center max-w-[90%] md:max-w-[70%] lg:max-w-[60%]">
        <h1 className="uppercase font-CamilaFont text-4xl md:text-5xl my-4">
          Nox Catering
        </h1>
        <h3 className="font-ArialRegular text-[14px] md:text-[16px] lg:text-[20px] text-balance">
          Transform every occasion into a sweet celebration. Just select your
          nearest store and schedule your order in a few clicks.
        </h3>
      </div>
      <div className="flex justify-center items-center my-10">
        <button className="bg-affair-800 hover:bg-affair-900 rounded-full py-2 px-8 md:px-10 font-ArialBold text-[16px] md:text-[18px]">
          Order Catering
        </button>
      </div>
    </div>
  );
};
