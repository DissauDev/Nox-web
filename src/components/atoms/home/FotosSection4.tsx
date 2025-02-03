import React from "react";
import Image1 from "../../../assets/home/img 1.webp";
import Image2 from "../../../assets/home/img 2.webp";
import Image3 from "../../../assets/home/img 3.webp";
export const FotosSection4 = () => {
  return (
    <>
      <div className="items-center justify-center flex flex-col">
        <img src={Image1} className="w-4/5 mb-10 h-auto" />

        <div>
          <h1 className="font-CamilaFont text-2xl md:text-3xl text-center">
            Order Today, Enjoy This Week
          </h1>
          <h3 className="font-ArialRegular text-xs md:text-xl mx-10 mb-10 md:p-4  md:w-[50vw] text-center text-balance">
            Place an order today and choose your favorite Mini or Large coockies
            in either a 48-Pack o 96-Pack. Enjoy your delicious treats, ready
            for pickup in as little as 90 minutes
          </h3>
        </div>
      </div>
      <div className="items-center justify-center flex flex-col">
        <img src={Image2} className="w-4/5 mb-10 h-auto" />

        <div>
          <h1 className="font-CamilaFont text-2xl md:text-3xl text-center">
            Choose Your Flavors
          </h1>
          <h3 className="font-ArialRegular text-xs md:text-xl mx-10 mb-10 md:p-4  md:w-[50vw] text-center text-balance">
            Treat your guests to a delectable assortment from our weekly menu!
            Choose from our rotating flavors of Mini or Large cookies. Starting
            with orders of 48, you can add increments of 12 to customize your
            selection perfectly
          </h3>
        </div>
      </div>
      <div className="items-center justify-center flex flex-col">
        <img src={Image3} className="w-4/5 mb-10 h-auto" />

        <div>
          <h1 className="font-CamilaFont text-2xl md:text-3xl text-center">
            Planning Something Big?
          </h1>
          <h3 className="font-ArialRegular text-xs md:text-xl mx-10 mb-10 md:p-4  md:w-[50vw] text-center text-balance">
            Need more cookies? Place an order in advance and make your event a
            hit! Whether it's a birthday bash, corporate event, or family
            reunion, we've got you covered with a variety of flavor options
            tailored for your gatherings.
          </h3>
        </div>
      </div>
    </>
  );
};
