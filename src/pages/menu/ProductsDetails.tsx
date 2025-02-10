import React, { useState } from "react";
import { useParams } from "react-router-dom";
import IceCreamBuilder from "../../components/atoms/IceCreamBuilder";
import vanillaImage from "../../assets/flavors/vannilla.png";
import chocolateImage from "../../assets/flavors/chocolate.png";

import caramelImage from "../../assets/toppings/caramel.png";
import raisinsImage from "../../assets/toppings/raisins.png";
import baseImage from "../../assets/base/ice-cream-bowl.png";
const ProductDetails: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();

  // Opciones de sabores y toppings
  const flavors = [
    { id: "1", name: "Vanilla", image: vanillaImage },
    { id: "2", name: "Chocolate", image: chocolateImage },
  ];

  const toppings = [
    { id: "1", name: "Caramel", image: caramelImage },
    { id: "2", name: "Raisins", image: raisinsImage },
  ];

  // Estado para los sabores y toppings seleccionados
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  // Funciones para manejar las selecciones
  const handleFlavorChange = (flavorId: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavorId)
        ? prev.filter((id) => id !== flavorId)
        : [...prev, flavorId]
    );
  };

  const handleToppingChange = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const productData = {
    name: `Sample Product ${id}`,
    category: category,
    description: "This is a detailed description of the product.",
    price: "$10.99",
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 mt-20 flex space-x-8">
        {/* Columna izquierda: Detalles del producto */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Category:</strong> {productData.category}
          </p>
          <p className="text-gray-700 mb-4">{productData.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            {productData.price}
          </p>

          {/* Opciones de sabores */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Flavors</h2>
            {flavors.map((flavor) => (
              <label key={flavor.id} className="block mb-2">
                <input
                  type="checkbox"
                  value={flavor.id}
                  onChange={() => handleFlavorChange(flavor.id)}
                  checked={selectedFlavors.includes(flavor.id)}
                  className="mr-2"
                />
                {flavor.name}
              </label>
            ))}
          </div>

          {/* Opciones de toppings */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Toppings</h2>
            {toppings.map((topping) => (
              <label key={topping.id} className="block mb-2">
                <input
                  type="checkbox"
                  value={topping.id}
                  onChange={() => handleToppingChange(topping.id)}
                  checked={selectedToppings.includes(topping.id)}
                  className="mr-2"
                />
                {topping.name}
              </label>
            ))}
          </div>
        </div>

        {/* Columna derecha: IceCreamBuilder */}
        <div className="w-1/2">
          <IceCreamBuilder
            base={baseImage}
            flavors={flavors}
            toppings={toppings}
            selectedFlavors={selectedFlavors}
            selectedToppings={selectedToppings}
          />
        </div>
      </div>
      <div className="items-center justify-center flex">
        <button className="bg-affair-800 hover:bg-affair-900 text-white first-line: font-ArialBold p-2 rounded-full px-20">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
