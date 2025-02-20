import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import menuData, { Product } from "../../utils/data/products";
import { FaChevronLeft } from "react-icons/fa";

import { IceCreamSelector } from "../../components/atoms/menu/selectors/IceCreamSelector";
import { DrinksCoockiesSelector } from "../../components/atoms/menu/selectors/DrinksCoockiesSelector";
import { MashoopSelector } from "../../components/atoms/menu/selectors/MashoopSelector";
import { DessertSelector } from "../../components/atoms/menu/selectors/DessertSelector";
import CartCounter from "../../components/atoms/CartCounter";

// Definimos una interfaz para las opciones del formulario.
// Estas propiedades son opcionales y se usarán según la categoría.
interface ProductDetailsFormInputs {
  // Para Cookies y Drinks (opciones genéricas)
  nutritionalInfo?: string;
  quantity?: number;
  // Para Desserts: toppings (cada opción puede tener imagen, texto y precio extra)
  selectedToppings?: string[];
  // Para Ice Cream: variante, sabores y toppings
  variant?: string; // e.g.: "on-cookie", "on-brownie", "cup"
  selectedFlavors?: string[];
  selectedIceCreamToppings?: string[];
  // Para Mashups: selección de dos cookies y un tercer sabor
  selectedCookies?: string[];
  thirdFlavor?: string;
}

// Función actualizada para buscar el producto usando el id
// Función actualizada para buscar el producto usando solo el id
const findProduct = (
  categoryParam: string | undefined,
  productId: string | undefined
): Product | undefined => {
  if (!categoryParam || !productId) return undefined;

  // Busca la categoría
  const category = menuData.find(
    (cat) => cat.category.toLowerCase() === categoryParam.toLowerCase()
  );

  if (!category) return undefined;

  // Busca el producto por id dentro de la categoría
  return category.items.find((item) => item.id === productId);
};

const ProductDetails: React.FC = () => {
  const { category, productKey } = useParams<{
    category: string;
    productKey: string;
  }>();

  console.log(category + "--" + productKey);
  const product = findProduct(category, productKey);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ProductDetailsFormInputs>();

  const onSubmit: SubmitHandler<ProductDetailsFormInputs> = (data) => {
    console.log("Opciones seleccionadas:", data);
    // Aquí llamarías a tu función de agregar al carrito u otra acción.
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex justify-center mb-20 p-4">
      <div className="w-full  flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-10">
        {/* Imagen a la izquierda */}
        <div className="w-full flex justify-center lg:w-5/12 lg:sticky lg:top-10 py-4">
          <img
            src={product.imageLeft}
            alt={product.name}
            className="w-72 h-72 md:w-auto md:h-96 object-cover "
          />
        </div>

        {/* Contenido a la derecha con scroll en pantallas grandes */}
        <div className="w-full lg:w-7/12 lg:max-h-[80vh] px-4 lg:overflow-y-auto">
          <button
            onClick={() => navigate("/menu")}
            className="text-grape-900 flex items-center font-bold justify-start mb-4"
          >
            <FaChevronLeft className="mr-2" size={24} />
            Back to Menú
          </button>

          <h1 className="text-4xl font-bold text-grape-900 mb-2">
            {product.name}
          </h1>

          <p className="text-grape-900 text-lg">{product.description}</p>
          <p className="text-2xl text-grape-900 font-semibold mt-2">
            {product.price}
          </p>

          {/* Formulario dinámico */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {(category === "Coockies" || category === "Drinks") && <></>}
            {category === "Desserts" && <DessertSelector />}
            {category === "Ice-cream" && <IceCreamSelector />}
            {category === "Mashoops" && <MashoopSelector />}
            <div>
              <CartCounter />
              <button
                type="submit"
                className="my-8 p-3 bg-grape-950 text-white w-full font-ArialBold text-xl rounded-full transition hover:bg-grape-800"
              >
                Add to cart $5.00
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

/*import React, { useState } from "react";
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
      /*
        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
          <p className="text-lg text-gray-600 mb-2">
            <strong>Category:</strong> {productData.category}
          </p>
          <p className="text-gray-700 mb-4">{productData.description}</p>
          <p className="text-2xl font-semibold text-green-600 mb-6">
            {productData.price}
          </p>

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

export default ProductDetails;*/
