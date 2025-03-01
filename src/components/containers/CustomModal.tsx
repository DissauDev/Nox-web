import { RootState } from "@/store/store";
import { FaTimes } from "react-icons/fa";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";
import drinksIMg from "../../assets/Imnsomnia fotos/drinks1.png";
import drinksIMg2 from "../../assets/Imnsomnia fotos/drinks3.png";
import {
  addProduct,
  incrementProductQuantity,
  removeProduct,
} from "@/store/features/slices/orderSlice";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface MissingItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  /** Si es "checkout" se muestra el modal de My Bag, sino se muestra el modal por defecto */
  modalType?: "checkout" | "order" | "address";
}

// Items iniciales para la sección Missing Something?
const initialMissingItems: MissingItem[] = [
  {
    id: 1,
    name: "check milk",
    price: 4.9,
    image: drinksIMg,
  },
  {
    id: 2,
    name: "cocal-cola",
    price: 2.95,
    image: drinksIMg2,
  },
];

export default function CustomModal({ isOpen, setIsOpen, modalType }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderState = useSelector((state: RootState) => state.orders);
  const [localMissingItems, setLocalMissingItems] =
    useState<MissingItem[]>(initialMissingItems);

  // Deshabilitar el scroll del body cuando el modal esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Al desmontar, nos aseguramos de restablecer el overflow
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Incrementa la cantidad del producto
  const handleIncrement = (id: string) => {
    dispatch(incrementProductQuantity({ id, increment: 1 }));
  };

  // Si la cantidad es mayor a 1, decrementa; si es 1, elimina el producto
  const handleDecrementOrRemove = (product: {
    id: string;
    quantity: number;
  }) => {
    if (product.quantity > 1) {
      dispatch(incrementProductQuantity({ id: product.id, increment: -1 }));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  // Agrega el item missing al carrito y lo remueve de la lista de missing items
  const handleAddMissingItem = (item: MissingItem) => {
    const exists = orderState.products.find((p) => p.id === item.id.toString());
    if (exists) {
      dispatch(incrementProductQuantity({ id: exists.id, increment: 1 }));
    } else {
      dispatch(
        addProduct({
          id: item.id.toString(),
          name: item.name,
          price: item.price,
          quantity: 1,
        })
      );
    }
    setLocalMissingItems((prev) => prev.filter((mi) => mi.id !== item.id));
  };

  const handlecheckout = () => {
    setIsOpen(false);
    // Navega a checkout únicamente al presionar el botón
    navigate("/checkout");
  };
  const handleCart = () => {
    setIsOpen(false);
    // Navega a checkout únicamente al presionar el botón
    navigate("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay que bloquea la pantalla exterior y cierra el modal al hacer click */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />

          {modalType === "checkout" ? (
            <motion.div
              key="checkout-modal"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[400px] mb-4 rounded-xl bg-white text-grape-950 shadow-xl z-50 flex flex-col"
            >
              {/* Encabezado con "My Bag" y botón de cerrar */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-3xl font-ArialBold text-pompadour-900">
                  My Bag
                </h2>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes size={24} />
                </button>
              </div>
              {/* Contenedor de productos con scroll vertical */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3 border-b pb-4">
                  {orderState.products.map((p) => (
                    <div key={p.id}>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <img
                            src={IceCreamIMg}
                            alt={p.name}
                            className="size-20 object-cover mr-2 rounded-full"
                          />
                          <div>
                            <p className="font-ArialBold text-md">{p.name}</p>
                            <p className="text-sm font-ArialRegular">
                              ${p.price}
                            </p>
                            {p.options &&
                              p.options.map((ops) => (
                                <div
                                  key={ops.id}
                                  className="mt-1 text-gray-400"
                                >
                                  <p className="text-xs font-semibold">
                                    {ops.name} (${ops.extraPrice})
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                        {/* Botones para modificar la cantidad */}
                        <div className="flex items-center space-x-2">
                          {p.quantity > 1 ? (
                            <button
                              onClick={() => handleDecrementOrRemove(p)}
                              className="p-1 bg-gray-200 rounded"
                            >
                              <FiMinus />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDecrementOrRemove(p)}
                              className="p-1 bg-gray-200 rounded"
                            >
                              <FiTrash2 />
                            </button>
                          )}
                          <span className="text-md p-2 font-ArialBold">
                            {p.quantity}
                          </span>
                          <button
                            onClick={() => handleIncrement(p.id)}
                            className="p-1 bg-gray-200 rounded"
                          >
                            <FiPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Sección Missing Something? */}
                {localMissingItems.length > 0 && (
                  <div className="mt-4">
                    <p className=" font-ArialBold text-pompadour-900 text-xl mb-4">
                      Missing Something?
                    </p>
                    <div className="flex ">
                      {localMissingItems.map((item) => (
                        <div className="relative m-2" key={item.id}>
                          <button
                            onClick={() => handleAddMissingItem(item)}
                            className="flex  flex-col items-center"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="size-16 object-cover rounded-full"
                            />
                            <span className="text-sm font-ArialBold">
                              {item.name}
                            </span>
                            <span className="text-sm font-ArialRegular">
                              ${item.price}
                            </span>
                          </button>
                          <button
                            onClick={() => console.log("Añadir nuevo")}
                            className="absolute -top-3 right-0 bg-grape-900 text-white p-1 rounded-full size-6 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Botón de Checkout fijo al fondo */}
              <div className="p-4 border-t">
                <button
                  onClick={handleCart}
                  className="w-full py-3 bg-mustard-yellow-400 text-black-night-950 font-ArialBold rounded-full hover:bg-mustard-yellow-500"
                >
                  Shopping Cart
                </button>
                <button
                  onClick={handlecheckout}
                  className="w-full py-3 bg-mustard-yellow-400 text-black-night-950 font-ArialBold rounded-full hover:bg-mustard-yellow-500"
                >
                  Checkout ${orderState.totals.subTotal}
                </button>
              </div>
            </motion.div>
          ) : (
            // Modal por defecto centrado en la pantalla
            <motion.div
              key={modalType}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="relative bg-white p-6 rounded-lg shadow-xl border-2 border-gray-300">
                <div className="absolute -right-2 -bottom-2 w-full h-full border-r-8 border-b-8 border-mustard-yellow-500 rounded-lg pointer-events-none"></div>
                <div className="flex justify-between">
                  <h2 className="text-base font-ArialBold text-grape-950">
                    {modalType === "address"
                      ? "Address Required to Add Items to Cart"
                      : "Add Items to Cart"}
                  </h2>
                  <FaTimes
                    size={24}
                    className="text-grape-950 p-1 rounded-full"
                    onClick={() => setIsOpen(false)}
                  />
                </div>

                <p className="mt-2 text-grape-900 text-sm font-ArialRegular max-w-lg">
                  {modalType === "address"
                    ? "Please add your address to see available items from your nearest store. Once you add some deliciousness to your cart, you can proceed to the checkout page."
                    : "You do not have any items in your cart. Please add an item to proceed to checkout."}
                </p>
                <div className="flex justify-between">
                  <div></div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-4 py-2 text-pompadour-900 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
