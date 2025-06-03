import Allergens_NightMode from "../../../assets/flavors/iceCream/Allergens_NightMode.png"
import CoockieDough from "../../../assets/flavors/iceCream/cookie-dough.png"
import Dreamweaver from "../../../assets/flavors/iceCream/dreamweaver.png"
import Minterstellar from "../../../assets/flavors/iceCream/minterstellar.png"
import Vainilla from "../../../assets/flavors/iceCream/vanilla.png"



interface IceCreamFlavor {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const IceCreamFlavors: IceCreamFlavor[] = [
  {
    id: 1,
    name: "Mint Chip",
    description: "Refreshing mint ice cream with delicious chocolate chips.",
    image: Allergens_NightMode, 
  },
  {
    id: 2,
    name: "Vanilla Bean",
    description: "Classic vanilla ice cream made with real vanilla beans.",
    image: Vainilla,
  },
  {
    id: 3,
    name: "Strawberry Swirl",
    description: "Creamy strawberry ice cream with a fruity swirl of strawberry sauce.",
    image: Dreamweaver,
  },
  {
    id: 4,
    name: "Chocolate Fudge",
    description: "Rich chocolate ice cream loaded with gooey fudge ribbons.",
    image: CoockieDough,
  },
  {
    id: 5,
    name: "Coffee Crunch",
    description: "Smooth coffee ice cream with crunchy bits of chocolate-covered espresso beans.",
    image: Minterstellar,
  },
 ];