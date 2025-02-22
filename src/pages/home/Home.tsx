import { FotosSection4 } from "../../components/atoms/home/FotosSection4";
import { HomeSection5 } from "../../components/atoms/home/HomeSection5";
import { DessertCarousel } from "../../components/atoms/home/DessertCarousel";
import { BackgroundWithHearts } from "../../components/atoms/home/BackgroundWithHearts";
import { AddressSelector } from "../../components/atoms/home/AddressSelector";
import { Slider } from "../../components/atoms/Slider";
import { products } from "../../data/index";
import { HeroParallax } from "@/components/ui/hero-parallax";

export const Home = () => {
  return (
    <div className="justify-center   ">
      <Slider />
      <AddressSelector />
      <DessertCarousel />
      <BackgroundWithHearts />
      <FotosSection4 />

      <div className="w-full overflow-hidden mb-20">
        <HeroParallax products={products} />
      </div>
      <HomeSection5 />
    </div>
  );
};
export default Home;
