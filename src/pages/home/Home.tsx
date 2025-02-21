import { FotosSection4 } from "../../components/atoms/home/FotosSection4";
import { HomeSection5 } from "../../components/atoms/home/HomeSection5";
import Footer from "../../components/containers/Footer";

import { DessertCarousel } from "../../components/atoms/home/DessertCarousel";
import { BackgroundWithHearts } from "../../components/atoms/home/BackgroundWithHearts";
import { AppPromo } from "../../components/containers/AppPromo";
import { AddressSelector } from "../../components/atoms/home/AddressSelector";
import { Slider } from "../../components/atoms/Slider";
import { products} from "../../data/index"
import { HeroParallax } from "@/components/ui/hero-parallax";
 
export const Home = () => {
  return (
    <div className="justify-center   ">
      <AddressSelector />
      <Slider />
      <DessertCarousel />
      <BackgroundWithHearts />
      <FotosSection4 />
      <HomeSection5 />
      <div className="w-full overflow-hidden">
        <HeroParallax products={products} />
      </div>


      {/* <AppPromo />
      <Footer /> */}
    </div>
  );
};
export default Home;
