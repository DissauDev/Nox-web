import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import menuData, { Product } from "../../utils/data/products";
import { FaChevronLeft } from "react-icons/fa";

import { IceCreamSelector } from "../../components/atoms/menu/selectors/IceCreamSelector";

import { MashoopSelector } from "../../components/atoms/menu/selectors/MashoopSelector";
import { DessertSelector } from "../../components/atoms/menu/selectors/DessertSelector";
import CartCounter from "../../components/atoms/CartCounter";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/store/features/slices/orderSlice";
import { RootState } from "@/store/store";

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

type Topping = {
  name: string;
  price: number;
};
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

  // Acceso a dispatch y al estado de la orden en el slice
  const dispatch = useDispatch();
  const orderState = useSelector((state: RootState) => state.orders);

  console.log(category + "--" + productKey);
  const product = findProduct(category, productKey);

  const navigate = useNavigate();

  // Estado local para la cantidad y precio total del producto
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<
    { name: string; price: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(product ? product.price : 0);

  const calculateTotalPrice = (
    basePrice: number,
    qty: number,
    toppings: Topping[]
  ) => {
    const toppingsTotal = toppings.reduce(
      (acc, topping) => acc + topping.price,
      0
    );
    // Si deseas que el precio de los toppings se multiplique por la cantidad, hazlo aquí:
    return Number(((basePrice + toppingsTotal) * qty).toFixed(2));
  };

  // Función para actualizar la cantidad, que además recalcula el precio total.
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);

    // Aquí podrías sumar el costo de extras si los hubiera.
    recalcPrice(newQuantity, selectedToppings);
  };

  // Función callback para recibir los toppings seleccionados desde DessertSelector
  const handleToppingsChange = (
    toppings: { name: string; price: number }[]
  ) => {
    setSelectedToppings(toppings);
    recalcPrice(quantity, toppings);
  };

  // Función para recalcular el precio total del producto
  const recalcPrice = (
    qty: number,
    toppings: { name: string; price: number }[]
  ) => {
    const toppingsTotal = toppings.reduce(
      (sum, topping) => sum + topping.price,
      0
    );
    const finaltoppins = toppingsTotal * quantity;
    const newTotal = Number((product!.price * qty + finaltoppins).toFixed(2));
    setTotalPrice(newTotal);
  };

  const { register, handleSubmit } = useForm<ProductDetailsFormInputs>();

  const onSubmit: SubmitHandler<ProductDetailsFormInputs> = (data) => {
    if (!product) return;

    // Crear el objeto que se agregará al carrito, adaptándolo a la interfaz Product del slice.
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      // Convertimos los toppings seleccionados a opciones del producto.
      options: selectedToppings.map((topping) => ({
        id: topping.name, // Se puede usar el nombre como identificador o generar otro
        name: topping.name,
        extraPrice: topping.price,
      })),
      specifications: "", // Aquí puedes agregar más detalles o especificaciones si es necesario
    };

    // Despacha la acción para agregar el producto al carrito.
    dispatch(addProduct(productToAdd));

    // Imprime en consola la información relevante:
    console.log("Producto agregado:", productToAdd);
    console.log("Orden actual:", orderState);
  };

  // Cada vez que cambie la cantidad o los toppings, actualizamos el precio total
  useEffect(() => {
    if (product) {
      setTotalPrice(
        calculateTotalPrice(product.price, quantity, selectedToppings)
      );
    }
  }, [product, quantity, selectedToppings]);

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
            {category === "Desserts" && (
              <DessertSelector onToppingsChange={handleToppingsChange} />
            )}
            {category === "Ice-cream" && (
              <IceCreamSelector onToppingsChange={handleToppingsChange} />
            )}
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
