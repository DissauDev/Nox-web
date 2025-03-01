import React, { useState } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import IceCream from "../../../assets/Imnsomnia fotos/icecream.png";
import coockie from "../../../assets/Imnsomnia fotos/coockies.png";
// Datos iniciales de ejemplo
const productosIniciales = [
  {
    id: 1,
    name: "Ice Cream Vanilla",
    price: 2.5,
    quantity: 2,
    image: IceCream,
    options: [{ id: 1, name: "Extra Chocolate", extraPrice: 0.5 }],
  },
  {
    id: 2,
    name: "Ice Cream Chocolate",
    price: 3.0,
    quantity: 1,
    image: coockie,
    options: [],
  },
];

const ItemCards = () => {
  const [products, setProducts] = useState(productosIniciales);

  const handleIncrement = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const handleDecrementOrRemove = (product) => {
    if (product.quantity > 1) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  // Calcular totales
  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const total = subtotal; // Aquí puedes agregar impuestos o cargos extra

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row md:space-x-6">
        {/* Tabla de Productos */}
        <div className="w-full lg:w-8/12 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-grape-800">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium ">
                  Price
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p.id}>
                  {/* Columna Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        {p.options &&
                          p.options.map((op) => (
                            <p key={op.id} className="text-xs text-gray-500">
                              {op.name} (+${op.extraPrice})
                            </p>
                          ))}
                      </div>
                    </div>
                  </td>
                  {/* Columna Price */}
                  <td className="px-6 py-4 font-ArialRegular font-medium text-gray-800">
                    ${p.price.toFixed(2)}
                  </td>
                  {/* Columna Quantity */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {p.quantity > 1 ? (
                        <button
                          onClick={() => handleDecrementOrRemove(p)}
                          className="p-1 bg-grape-700 rounded hover:bg-grape-900 transition"
                        >
                          <FiMinus />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDecrementOrRemove(p)}
                          className="p-1 bg-grape-700 rounded hover:bg-grape-900 transition"
                        >
                          <FiTrash2 />
                        </button>
                      )}
                      <span className="font-semibold text-gray-800">
                        {p.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(p.id)}
                        className="p-1 bg-grape-700 rounded hover:bg-grape-900 transition"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </td>
                  {/* Columna Subtotal */}
                  <td className="px-6 py-4 text-right text-gray-800 font-ArialBold">
                    ${(p.price * p.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Tarjeta de Totales del Carrito */}
        <div className="w-full lg:w-5/12 mt-6 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-ArialBold text-grape-900 mb-4">
              Cart Totals
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 font-semibold">Subtotal</span>
              <span className="text-gray-800 font-semibold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between mb-4">
              <span className="text-gray-800 font-semibold text-lg">Total</span>
              <span className="text-gray-800 font-ArialBold text-xl">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              className="w-full bg-mustard-yellow-400 rounded-full
             text-black-night-950 font-ArialBold py-2 px-full  hover:bg-mustard-yellow-500 transition"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCards;
