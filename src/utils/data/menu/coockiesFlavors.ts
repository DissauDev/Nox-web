 import ChocoChunk from "../../../assets/flavors/coockies/Chocolate Chunk.png"
 import DoubleChocoChunk from "../../../assets/flavors/coockies/Double Chocolate Chunk.png"
 import Peanuts from "../../../assets/flavors/coockies/peanuts.png"
 import DoubleChocletMint from "../../../assets/flavors/coockies/Double Chocolate Mint.png"
 import Raisin from "../../../assets/flavors/coockies/Oatmeal Raisin.png"


 interface CookieFlavor {
   id: number;
   name: string;
   description: string;
   image: string;
 }
 
 export const cookieFlavors: CookieFlavor[] = [
    {
        id: 1,
        name: "Chocolate Chunk",
        description:
          "Everything you ever dreamed a cookie would be: ooey, gooey and chocolate-y.",
        image: ChocoChunk,
      },
      {
        id: 2,
        name: "Oatmeal Raisin",
        description:
          "A classic cookie flavor with a hearty texture and a touch of cinnamon.",
        image: Raisin,
      },
      {
        id: 3,
        name: "Peanut Butter",
        description:
          "Rich, creamy and full of peanut butter flavor for a delicious treat.",
        image:Peanuts,
      },
      {
        id: 4,
        name: "Sugar Cookie",
        description:
          "Simple, sweet and perfect for decorating with your favorite toppings.",
        image: DoubleChocletMint,
      },
      {
        id: 5,
        name: "Snickerdoodle",
        description:
          "Soft, chewy cookies with a cinnamon-sugar coating.",
        image: DoubleChocletMint,
      },
      {
        id: 6,
        name: "Double Chocolate",
        description:
          "For the chocolate lovers! A double dose of chocolate in every bite.",
        image: DoubleChocoChunk,
      },
    // Puedes agregar más sabores aquí
  ];