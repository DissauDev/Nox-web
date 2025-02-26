import { FotosSection4 } from "../../components/atoms/home/FotosSection4";
import { AddressSelector } from "../../components/atoms/home/AddressSelector";
import { Slider } from "../../components/atoms/Slider";
import { HomeSection3 } from "@/components/atoms/home/HomeSection3";
import AnimatedCategories from "@/components/atoms/home/AnimatedCategories";

export const Home = () => {
  return (
    <div className="justify-center   ">
      <Slider />
      <AddressSelector />
      <AnimatedCategories />
      <HomeSection3 />
      <FotosSection4 />
    </div>
  );
};
export default Home;
