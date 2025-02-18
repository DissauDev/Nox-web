export interface BaseProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    category: "Coockies" | "Ice cream" | "Desserts" | "Mashoops" | "Drinks";
  }
  
  // Por ejemplo, para cookies y drinks, que comparten la misma estructura extra:
  export interface CookieProduct extends BaseProduct {
    nutritionalInfo: string;
    quantity: number;
  }
  
  // Para desserts: tiene nutritionalInfo y toppings (cada topping es una opción con imagen, texto y precio extra opcional)
  export interface DessertProduct extends BaseProduct {
    nutritionalInfo: string;
    toppings: Option[];
  }
  
  // Para helados, pueden variar: aquí un ejemplo básico
  export interface IceCreamProduct extends BaseProduct {
    // Por ejemplo, para helado en tina o copa, se muestran sabores y toppings:
    flavors: Option[];
    toppings?: Option[];
    // Si es sobre cookie o brownie, se agrega la selección de la base:
    base?: Option;
  }
  
  // Tipo para opciones (ej. sabor, topping, base)
  export interface Option {
    label: string;
    image: string;
    selected: boolean;
    extraPrice?: number;
  }
  
  // Ejemplo de arreglo de productos:
  export const products: BaseProduct[] = [
    {
      id: "1",
      name: "Cookie Clásica",
      price: 2.5,
      description: "Deliciosa cookie recién horneada",
      category: "Coockies",
    },
    {
      id: "2",
      name: "Helado de Vainilla en Tina",
      price: 4.0,
      description: "Helado cremoso servido en una tina",
      category: "Ice cream",
    },
    // ...otros productos
  ];
  