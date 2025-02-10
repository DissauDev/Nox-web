import React, { useState } from "react";

import { MdDeliveryDining } from "react-icons/md";
import ImageCoockie from "../../assets/desing/foto dulces .png";
import DessertCarousel from "../../components/atoms/home/DessertCarousel";
import BackgroundWithHearts from "../../components/atoms/home/BackgroundWithHearts";
import { HomeSection3 } from "../../components/atoms/home/HomeSection3";
import { FotosSection4 } from "../../components/atoms/home/FotosSection4";
import { HomeSection5 } from "../../components/atoms/home/HomeSection5";
import Footer from "../../components/containers/Footer";
import ImageMobile from "../../assets/home/Mobile-Mockup copia .png";
import AppPromo from "../../components/containers/AppPromo";
export const Home = () => {
  const [activeDelivery, setactiveDelivery] = useState(true);
  const [activePickup, setactivePickup] = useState(false);
  const [showModal, setshowModal] = useState(false);

  const toDelivery = () => {
    setactiveDelivery(true);
  };
  const toPickUp = () => {
    setactiveDelivery(true);
  };
  return (
    <div className="justify-center   ">
      {/* <button
        className=" text-valentino-950 text-xl flex items-center gap-2 bg-green-300 p-2 justify-center "
        onClick={toDelivery}
      >
        <>
          <MdDeliveryDining size={50} className="text-pink-400 " />
          <h1 className="align-bottom"></h1>Delivery
        </>
      </button>
      <button
        className=" text-valentino-950 text-xl m-5  bg-green-300 p-2 "
        onClick={toPickUp}
      >
        <MdDeliveryDining size={50} className="text-pink-400" />
        Pickup
      </button>
      <button
        onClick={toDelivery}
        className={`flex h-20 items-center justify-center gap-2 mt-20 px-4 py-2 bg-blue-600 text-2xl text-white font-medium rounded-2xl hover:bg-blue-700 transition-all`}
      >
        {<MdDeliveryDining className="w-10 h-10 text-pink-400" />}
        <span>Pickup</span>
      </button> */}

      <div className="flex flex-col  md:flex-row items-center bg-midnight-blue-950  opacity-90 my-20  min-h-[300px] md:min-h-[450px]">
        {/* Contenedor del texto y el botón */}

        <div className="text-center md:text-left md:ml-40 flex flex-col justify-center items-center md:items-start space-y-4 md:w-1/2 p-4 md:p-8">
          <h1 className="text-2xl uppercase md:text-5xl font-bold text-white font-CamilaFont max-w-sm">
            Most Popular AT the bakery
          </h1>
          <h3 className="text-[18px] uppercase  text-white font-ArialBold">
            Pick a Warm, Delicious 12-packs.
          </h3>
          <button className="bg-rose-600  text-white py-2 px-12 mt-10 rounded-full shadow-md hover:bg-rose-800 transition">
            <h4 className="uppercase font-ArialBold px-2">Order Now</h4>
          </button>
        </div>

        {/* Contenedor de la imagen */}
        <div className="flex justify-center  md:justify-end w-full md:w-1/2 lg:w-1/2">
          <img
            src={ImageCoockie}
            alt="Cookies Images"
            className="w-full h-auto object-cover md:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>

      <DessertCarousel />
      <BackgroundWithHearts />
      <HomeSection3 />
      <FotosSection4 />
      <HomeSection5 />

      <AppPromo />
      <Footer />
    </div>
  );
};
export default Home;

/* return (
      <div className="mt-50">
        <button
          className="absolute top-6 right-6 text-valentino-950 text-3xl"
          onClick={toDelivery}
        >
          <FaTimes />
        </button>
        <button
          className="absolute top-6 right-6 text-valentino-950 text-3xl"
          onClick={toPickUp}
        >
          fdf
          <FaTimes />
        </button>
      </div>
    );
  */
