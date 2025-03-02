import React, { useState } from "react";
import { FaChevronLeft, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setTipPercent } from "@/store/features/slices/orderSlice";

import { MdAccessTime } from "react-icons/md";

import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";
import {
  CheckoutForm,
  stripePromise,
} from "@/components/atoms/cart/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { FaChevronRight } from "react-icons/fa6";
// ------------------- PaymentForm ------------------- //
const PaymentForm = () => {
  const dispatch = useDispatch();
  const [selectedTip, setSelectedTip] = useState("20");
  const [customTip, setCustomTip] = useState("");

  const handleTipSelection = (value: string) => {
    setSelectedTip(value);
    if (value !== "Custom") {
      dispatch(setTipPercent(parseFloat(value) / 100));
    }
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      dispatch(setTipPercent(val / 100));
    }
  };
  const orderState = useSelector((state: RootState) => state.orders);

  return (
    <div
      className="flex flex-col lg:max-w-lg w-full bg-white rounded-lg shadow-lg border border-gray-300 p-6  text-grape-800 font-ArialBold"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h2 className="text-2xl mb-4 font-ArialBold text-pompadour-900">
        Order Details
      </h2>
      <div className="flex flex-col">
        <div
          className="flex w-full  font-ArialRegular font-semibold
         justify-between mb-2"
        >
          <h3 className="">subTotal</h3>
          <h3>${orderState.totals.subTotal}</h3>
        </div>
        <div className="flex font-ArialRegular text-gray-600 w-full justify-between mb-4">
          <h3>Tip</h3>
          <h3 className=" font-extralight text-gray-600">
            ${orderState.totals.tip}
          </h3>
        </div>
      </div>
      {/* Sección de propina */}
      <div className="mb-8">
        <div className="flex-wrap  ">
          {["18", "20", "25", "Custom"].map((tip) => (
            <button
              key={tip}
              type="button"
              onClick={() => handleTipSelection(tip)}
              className={`px-4 m-1 md:px-4 py-3 font-ArialBold  rounded transition-colors duration-200 ${
                selectedTip === tip
                  ? "bg-grape-800 shadow-md shadow-purple-500 text-white"
                  : "bg-white text-grape-800  border-2  hover:bg-grape-100"
              }`}
            >
              {tip === "Custom" ? tip : `${tip}%`}
            </button>
          ))}
        </div>

        {selectedTip === "Custom" && (
          <input
            placeholder="Enter tip %"
            value={customTip}
            onChange={handleCustomTipChange}
            className="mt-6 w-full p-2 border border-grape-800 rounded focus:outline-none focus:ring-2 focus:ring-grape-200"
          />
        )}
      </div>
      <div className="flex font-ArialBold text-xl w-full justify-between mb-4">
        <h3>Total</h3>
        <h3 className=" ">${orderState.totals.total}</h3>
      </div>
      <hr className="mb-4" />
      <h1 className="mb-4 font-ArialBold text-2xl">Payment</h1>
      <CheckoutForm />
    </div>
  );
};

// ------------------- OrderDetails ------------------- //
const OrderDetails = () => {
  const addressState = useSelector((state: RootState) => state.address);
  const orderState = useSelector((state: RootState) => state.orders);
  console.log(orderState.products);
  return (
    <div className="space-y-8">
      {/* Pickup & Address Details */}
      <div className="bg-white p-6  w-full rounded-lg shadow-lg border border-gray-300 text-grape-800">
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center mb-4">
            <FaStore className=" mr-2 " size={28} />
            <span className="text-lg font-ArialBold ">
              {addressState.savedAddress ? addressState.savedAddress.city : ""}
            </span>
          </div>
          <div className="flex mb-2 items-center">
            <MdAccessTime className="mr-2 " size={28} />
            <div>
              <div className="flex items-center">
                <span className="mr-2 font-ArialBold">Today</span>
                <span className="text-sm text-grape-950 font-ArialRegular">
                  - 11:20 am
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">
                  {addressState.savedAddress.type}
                </span>
                <span className="text-sm text-grape-950 font-ArialRegular">
                  Ready in 2 min
                </span>
              </div>
            </div>
          </div>
          <div className=" flex mb-2 items-center">
            <FaMapMarkerAlt className="" size={28} />
            <p className="text-md mx-2 text-wrap  font-medium line-clamp-2 max-w-[220px]">
              {addressState.savedAddress.fullAddress}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
      </div>

      {/* My Bag Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 text-grape-800">
        <h2 className="text-2xl font-ArialBold mb-4 text-pompadour-900">
          My Bag
        </h2>

        <div className="space-y-3 border-b pb-4">
          <hr />
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Ordering for someone special? Add a personal note to go on the box."
            ></textarea>
          </div>
          {/* Ejemplo de item en la orden */}
          {orderState.products.map((p) => (
            <div key={p.id}>
              <hr />
              <div
                className="flex justify-between items-center mt-2"
                key={p.id}
              >
                <div className="flex items-center">
                  <img
                    src={IceCreamIMg}
                    alt={p.name}
                    className="size-20 object-cover mr-2 rounded-full "
                  />
                  <div>
                    <p className="font-ArialBold">{p.name}</p>
                    <p className="text-xs font-bold text-gray-700">
                      ${p.price}
                    </p>
                    {p.options &&
                      p.options.map((ops) => (
                        <div className="mt-1 text-gray-400">
                          <p key={ops.id} className="text-xs font-semibold">
                            {ops.name} (${ops.extraPrice})
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="text-sm font-ArialBold">Qty: {p.quantity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ------------------- Checkout ------------------- //
export const Checkout = () => {
  const navigate = useNavigate();

  return (
    <Elements stripe={stripePromise}>
      <div className=" p-6 mt-16">
        <div className="flex justify-center mt-2 mb-12 items-center font-ArialBold text-sm  md:text-xl text-grape-900 space-x-4">
          <button onClick={() => navigate("/cart")}>Shopping Cart</button>
          <FaChevronRight />
          <button className="">Checkout</button>
          <FaChevronRight />
          <button className="text-gray-500  hover:text-grape-900">
            Order Complete
          </button>
        </div>

        <div className="w-full mx-auto px-4">
          {/* Grid: 1 columna en móviles y en pantallas grandes se utiliza un grid con dos columnas, donde la primera es el doble */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
            {/* Columna Izquierda: Order Details */}
            <div className="w-full">
              <OrderDetails />
            </div>
            {/* Columna Derecha: Payment Form */}
            <div className="w-full">
              <PaymentForm />
              {/* Botón fijo (sticky) en pantallas medianas */}
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;
