import { ToppinsSelector } from "../ToppinsSelector";

export interface Topping {
  name: string;
  price: number;
}
type DessertSelectorProps = {
  // Callback para enviar la lista de toppings y el precio total de los mismos al componente padre.
  onToppingsChange: (
    selectedToppings: Topping[],
    totalToppingsPrice: number
  ) => void;
};

export const DessertSelector = ({ onToppingsChange }: DessertSelectorProps) => {
  return (
    <>
      <ToppinsSelector onToppingsChange={onToppingsChange} />
    </>
  );
};
