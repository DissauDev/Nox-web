import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    window.scrollTo(0, 0); // Mueve el scroll al inicio cuando se monta el componente
  }, []);

  const { category, productKey } = useParams<{
    category: string;
    productKey: string;
  }>();

  console.log(category + "--" + productKey);
  const product = findProduct(category, productKey);

  const navigate = useNavigate();

  // Estado local para la cantidad y precio total del producto
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);

  // Función para actualizar la cantidad, que además recalcula el precio total.
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    if (product) {
      // Aquí podrías sumar el costo de extras si los hubiera.
      setTotalPrice(Number((product.price * newQuantity).toFixed(2)));
    }
  };

  const { register, handleSubmit } = useForm<ProductDetailsFormInputs>();

  const onSubmit: SubmitHandler<ProductDetailsFormInputs> = (data) => {
    console.log("Opciones seleccionadas:", data);
    // Aquí llamarías a tu función de agregar al carrito u otra acción.
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex justify-center mb-20 p-4 ">
      <div className="w-full  flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-10">
        {/* Imagen a la izquierda */}
        <div className="w-full flex justify-center lg:w-5/12  lg:top-10 py-4">
          <img
            src={product.imageLeft}
            alt={product.name}
            className="w-72 h-72 md:w-auto md:h-96 object-cover "
          />
        </div>

        {/* Contenido a la derecha con scroll en pantallas grandes */}
        <div className="w-full lg:w-7/12 px-4 ">
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
            $ {product.price}
          </p>

          {/* Formulario dinámico */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            {(category === "Coockies" || category === "Drinks") && <></>}
            {category === "Desserts" && <DessertSelector />}
            {category === "Ice-cream" && <IceCreamSelector />}
            {category === "Mashoops" && <MashoopSelector />}
            <div>
              <CartCounter
                price={product.price}
                onQuantityChange={handleQuantityChange}
              />
              <div className="w-full bottom-4 left-0  flex justify-center p-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-grape-950 text-white font-ArialBold text-xl rounded-full transition hover:bg-grape-800 shadow-lg"
                >
                  Add to cart $ {totalPrice}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
