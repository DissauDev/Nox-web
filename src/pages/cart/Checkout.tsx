import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { products } from "../../data/index";

const sugestedDataDummy = [
  {
    img: IceCreamIMg,
    precio: 6.25,
    title: "Ice Cream in a Cup",
  },
  {
    img: IceCreamIMg,
    precio: 6.25,
    title: "Ice Cream in a Cup",
  },
  {
    img: IceCreamIMg,
    precio: 6.25,
    title: "Ice Cream in a Cup",
  },
];

export const Checkout = () => {
  const navigate = useNavigate();
  const orderState = useSelector((state: RootState) => state.orders);

  console.log(orderState);
  return (
    <div className="mt-16 p-6">
      <button
        onClick={() => navigate("/Cart")}
        className="text-grape-900 flex items-center font-bold justify-start mb-4"
      >
        <FaChevronLeft className="mr-2" size={24} />
        Edit Cart
      </button>
      <div className="section-padding overflow-hidden">
        <h3 className="text-grape-700 font-ArialBold text-xl">
          Suggested Items
        </h3>
        <div className="mt-4 flex px-4 items-center gap-8 overflow-x-scroll no-scrollbar pb-6">
          {sugestedDataDummy.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-2 border-grape-700 rounded-lg min-w-[18rem] shadow-purple-500 hover:shadow-lg hover:shadow-purple-500 relative"
            >
              <img
                src={item.img}
                alt={item.title}
                className="size-24 object-cover rounded-full absolute -left-4 -top-2"
              />
              <div className="flex flex-col items-start w-full py-4 pl-24 gap-2">
                <p className="text-grape-700 font-bold">
                  ${item.precio.toFixed(2)}
                </p>
                <h4 className="font-bold line-clamp-2 text-grape-700">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-grape-900 font-ArialBold ">
        <div
          className="max-w-md mx-auto bg-white shadow-lg shadow-grape-500 rounded-lg p-6 text-grape-900"
          style={{ fontFamily: "Arial, sans-serif" }}
        >
          {/* Header con cantidad de ítems y opción para editar */}
          <h1 className="text-2xl text-center">
            Order Sumary ({orderState.products.length})
          </h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">2 Items</span>
            <button className="text-sm underline">Edit Order</button>
          </div>
          {/* Lista de productos */}
          <div className="space-y-3 border-b pb-4">
            {orderState.products.map((p) => (
              <div className="flex justify-between">
                <span>
                  {p.quantity} {p.name}
                </span>
                <span>$ {p.price}</span>
              </div>
            ))}
            {/*  <div className="flex justify-between">
          
              <span>1 Chocolate Chip Brownie</span>
              <span>$</span>
            </div> */}
          </div>
          {/* Detalles del pedido */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>${orderState.totals.subTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Extended Delivery</span>
              <span>$ {orderState.deliveryCost}</span>
            </div>
            <div className="flex justify-between">
              <span>Tip</span>
              <span>$ {orderState.totals.tip}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${orderState.totals.tax}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>${orderState.totals.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
