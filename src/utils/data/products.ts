import IcecreamImage from "../../assets/Imnsomnia fotos/icecream.png"
import IcecreamImage2 from "../../assets/Imnsomnia fotos/iceCream1.png"
import BoxImage from "../../assets/Imnsomnia fotos/boxes.png"
import ForyouImage from "../../assets/Imnsomnia fotos/foryou.png"
import Limited from "../../assets/Imnsomnia fotos/Untitled-2.png"
import  DessertImage  from "../../assets/Imnsomnia fotos/dessert3.png"
import  DessertImage2  from "../../assets/Imnsomnia fotos/desserts2.png"
import  coockiesImages  from "../../assets/Imnsomnia fotos/coockies.png"
import  coockiesImages2  from "../../assets/Imnsomnia fotos/coockies2.png"
import  MashoopImage  from "../../assets/Imnsomnia fotos/mashups.png"
import  MashoopImage2  from "../../assets/Imnsomnia fotos/mashoops2.png"
import  DrinkImage  from "../../assets/Imnsomnia fotos/drinks.png"
import  DrinkImage2  from "../../assets/Imnsomnia fotos/drinks1.png"
import  DrinkImage3  from "../../assets/Imnsomnia fotos/drinks3.png"


// Definición de interfaces
export interface Product {
  id: string; // Identificador único para cada producto
  imageLeft: string;
  imageRight?: string;
  name: string;
  description: string;
  price: number;
}

export interface Category {
  category: string;
  shortDescription: string;
  longDescription: string;
  items: Product[];
}

// Ejemplo de data simulada proveniente de una API
const menuData: Category[] = [
  {
    category: "For-you",
    shortDescription: "Special Picks",
    longDescription: "Handpicked items for every discerning customer today",
    items: [
      {
        id: "foryou-0",
        imageLeft: BoxImage,
        imageRight: Limited,
        name: "Ultimate Cookie Combo",
        description: "A perfect mix of our best cookies.",
        price: 5.99,
      },
      {
        id: "foryou-1",
        imageLeft: ForyouImage,
        name: "Ice Cream Delight",
        description: "Creamy ice cream with a twist of flavors.",
        price: 4.99,
      },
    ],
  },
  {
    category: "Ice-cream",
    shortDescription: "Cold Delights",
    longDescription: "Refreshing frozen flavors that melt in blissful moments",
    items: [
      {
        id: "icecream-0",
        imageLeft: IcecreamImage,
        name: "Vanilla Dream",
        description: "Smooth and creamy, full of rich vanilla flavor.",
        price: 3.50,
      },
      {
        id: "icecream-1",
        imageLeft: IcecreamImage2,
        name: "Chocolate Fudge",
        description: "Decadent chocolate ice cream with fudge swirls.",
        price: 4.00,
      },
    ],
  },
  {
    category: "Desserts",
    shortDescription: "Sweet Treats",
    longDescription: "Decadent sweets crafted to satisfy your dessert cravings",
    items: [
      {
        id: "desserts-0",
        imageLeft: DessertImage,
        imageRight: "https://example.com/desserts-1-right.jpg",
        name: "Fudge Brownie",
        description: "Rich fudge brownie with a soft, moist center.",
        price: 4.50,
      },
      {
        id: "desserts-1",
        imageLeft: DessertImage2,
        name: "Strawberry Tart",
        description: "Tart filled with fresh strawberries and cream.",
        price: 5.00,
      },
    ],
  },
  {
    category: "Coockies",
    shortDescription: "Crunchy Bites",
    longDescription: "Freshly baked cookies with irresistible crunchy textures",
    items: [
      {
        id: "coockies-0",
        imageLeft: coockiesImages,
        imageRight: "https://example.com/coockies-1-right.jpg",
        name: "Choco Chip",
        description: "Crispy edges with chewy center and lots of chips.",
        price: 2.50,
      },
      {
        id: "coockies-1",
        imageLeft: coockiesImages2,
        name: "Oatmeal Raisin",
        description: "Hearty oatmeal cookie loaded with plump raisins.",
        price: 2.75,
      },
    ],
  },
  {
    category: "Mashoops",
    shortDescription: "Flavor Combos",
    longDescription: "Mashoops combine diverse tastes for unique flavor experiences",
    items: [
      {
        id: "mashoops-0",
        imageLeft: MashoopImage,
        imageRight: "https://example.com/mashoops-1-right.jpg",
        name: "Nutty Caramel",
        description: "A mashup of caramel, nuts, and buttery cookies.",
        price: 3.99,
      },
      {
        id: "mashoops-1",
        imageLeft: MashoopImage2,
        name: "Berry Blast",
        description: "Mix of fresh berries and rich vanilla ice cream.",
        price: 4.25,
      },
    ],
  },
  {
    category: "Drinks",
    shortDescription: "Refreshing Sips",
    longDescription: "Cool beverages to quench thirst and energize spirits",
    items: [
      {
        id: "drinks-0",
        imageLeft: DrinkImage,
        imageRight: "https://example.com/drinks-1-right.jpg",
        name: "Lemonade Spark",
        description: "Zesty lemonade with a sparkling twist.",
        price: 2.00,
      },
      {
        id: "drinks-1",
        imageLeft: DrinkImage2,
        name: "Iced Coffee",
        description: "Cold brew coffee with a touch of cream.",
        price: 3.00
      },
      {
        id: "drinks-2",
        imageLeft: DrinkImage3,
        name: "Coca-Cola",
        description: "Fresh Cola",
        price: 4.99,
      },
    ],
  },
];

export default menuData;


