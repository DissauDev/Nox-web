import React, { useState } from "react";
import {
  FaChevronLeft,
  FaExclamationTriangle,
  FaChevronDown,
  FaStore,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setTipPercent } from "@/store/features/slices/orderSlice";
import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";
import { OrderState } from "../../store/features/slices/orderSlice";
import { MdAccessTime } from "react-icons/md";
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
      className="flex flex-col max-w-lg w-full bg-white shadow-lg rounded-lg p-6 border-2 border-grape-800 text-grape-800 font-ArialBold"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h2 className="text-xl mb-4">Credit / Debit Card</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaExclamationTriangle className="text-grape-800" />
          <span className="ml-2">Payment Information Required</span>
        </div>
        <FaChevronDown className="text-grape-800" />
      </div>
      <div className="flex flex-col">
        <div className="flex w-full justify-between mb-2">
          <h3>subTotal</h3>
          <h3>{orderState.totals.subTotal}</h3>
        </div>
        <div className="flex w-full justify-between mb-4">
          <h3>Total</h3>
          <h3>{orderState.totals.total}</h3>
        </div>
      </div>
      <div className="mb-2">
        <label className="block mb-1">Cardholder Number</label>
        <input
          type="text"
          placeholder="Enter Card Number"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none focus:ring-2 focus:ring-grape-200"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Experation Date</label>
        <input
          type="text"
          placeholder="MM/YY"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none focus:ring-2 focus:ring-grape-200"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Postal Code</label>
        <input
          type="text"
          placeholder="Enter Postal code"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none focus:ring-2 focus:ring-grape-200"
        />
      </div>
      {/* Sección de propina */}
      <div className="mb-4">
        <span className="block font-bold mb-2">Add a tip</span>
        <div className="flex gap-2">
          {["18", "20", "25", "Custom"].map((tip) => (
            <button
              key={tip}
              type="button"
              onClick={() => handleTipSelection(tip)}
              className={`px-3 py-1 border-2 rounded transition-colors duration-200 ${
                selectedTip === tip
                  ? "bg-grape-800 text-white"
                  : "bg-white text-grape-800 hover:bg-grape-100"
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
            className="mt-2 w-full p-2 border border-grape-800 rounded focus:outline-none focus:ring-2 focus:ring-grape-200"
          />
        )}
      </div>

      <button className="w-full py-2 bg-grape-800 text-white rounded font-ArialBold transition-colors duration-200 hover:bg-grape-700">
        Next
      </button>
    </div>
  );
};

// ------------------- OrderDetails ------------------- //
const OrderDetails = () => {
  const addressState = useSelector((state: RootState) => state.address);
  console.log(addressState);
  return (
    <div className="space-y-8">
      {/* Pickup & Address Details */}
      <div className="bg-white p-6  w-full rounded-lg shadow-lg border border-gray-300 text-grape-800">
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center mb-4">
            <FaStore className=" mr-2 text-pink-500" size={28} />
            <span className="text-lg font-bold">
              {addressState.savedAddress ? addressState.savedAddress.city : ""}
            </span>
          </div>
          <div className="flex mb-2 items-center">
            <MdAccessTime className="mr-2 text-pink-500" size={28} />
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
            <FaMapMarkerAlt className="text-pink-500" size={28} />
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
        <h2 className="text-xl font-bold mb-4">My Bag</h2>
        <div className="space-y-3 border-b pb-4">
          {/* Ejemplo de item en la orden */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Box of Cookies</p>
              <p className="text-sm">Single</p>
            </div>
            <div className="text-sm">$4.99</div>
            <div className="text-sm">Qty: 1</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Butter Cake</p>
              <p className="text-sm">+ $0.99 ea.</p>
            </div>
            <div className="text-sm">$X.XX</div>
            <div className="text-sm">Qty: 1</div>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="Ordering for someone special? Add a personal note to go on the box."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

// ------------------- Checkout ------------------- //
export const Checkout = () => {
  const navigate = useNavigate();
  const orderState = useSelector((state: RootState) => state.orders);

  return (
    <div className="mt-16 p-6">
      <button
        onClick={() => navigate("/Cart")}
        className="text-grape-900 flex items-center font-bold justify-start mb-4"
      >
        <FaChevronLeft className="mr-2" size={24} />
        Edit Cart
      </button>

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
            <div className="md:hidden sticky bottom-4 bg-white p-4 shadow-lg rounded-lg mt-4">
              <button className="w-full py-2 bg-grape-800 text-white rounded font-ArialBold transition-colors duration-200 hover:bg-grape-700">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
