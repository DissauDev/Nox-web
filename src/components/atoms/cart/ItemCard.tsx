// src/components/organisms/ItemCards.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import {
  incrementProductQuantity,
  removeProduct,
} from "@/store/features/slices/orderSlice";

const ItemCards: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1️⃣ Obtener productos y totales del store
  const products = useSelector((state: RootState) => state.orders.products);
  const { subTotal, total } = useSelector(
    (state: RootState) => state.orders.totals
  );

  // 2️⃣ Handlers de cantidad
  const handleIncrement = (id: string) => {
    dispatch(incrementProductQuantity({ id, increment: 1 }));
  };

  const handleDecrementOrRemove = (id: string, quantity: number) => {
    if (quantity > 1) {
      dispatch(incrementProductQuantity({ id, increment: -1 }));
    } else {
      dispatch(removeProduct(id));
    }
  };

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
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        {p.options?.map((op) => (
                          <p key={op.id} className="text-xs text-gray-500">
                            {op.name} (+${op.extraPrice?.toFixed(2)})
                          </p>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 font-ArialRegular font-medium text-gray-800">
                    ${p.price.toFixed(2)}
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {p.quantity > 1 ? (
                        <button
                          onClick={() =>
                            handleDecrementOrRemove(p.id, p.quantity)
                          }
                          className="p-1 bg-grape-700 rounded hover:bg-grape-900 transition"
                        >
                          <FiMinus />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleDecrementOrRemove(p.id, p.quantity)
                          }
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

                  {/* Subtotal */}
                  <td className="px-6 py-4 text-right text-gray-800 font-ArialBold">
                    ${(p.price * p.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjeta de Totales */}
        <div className="w-full lg:w-5/12 mt-6 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-ArialBold text-grape-900 mb-4">
              Cart Totals
            </h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 font-semibold">Subtotal</span>
              <span className="text-gray-800 font-semibold">
                ${subTotal.toFixed(2)}
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
              onClick={() => navigate("/checkout")}
              className="w-full bg-mustard-yellow-400 rounded-full text-black-night-950 font-ArialBold py-2 hover:bg-mustard-yellow-500 transition"
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
