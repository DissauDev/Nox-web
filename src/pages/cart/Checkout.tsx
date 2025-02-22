import React, { useState } from "react";
import {
  FaChevronLeft,
  FaExclamationTriangle,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setTipPercent } from "@/store/features/slices/orderSlice";

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

const PaymentForm = () => {
  const dispatch = useDispatch();
  // Estado local para manejar la opción de propina seleccionada y el valor custom
  const [selectedTip, setSelectedTip] = useState("20");
  const [customTip, setCustomTip] = useState("");

  const handleTipSelection = (value: string) => {
    setSelectedTip(value);
    // Si no es "Custom", actualizamos la propina inmediatamente
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

  return (
    <div
      className="max-w-md w-full bg-white shadow-lg shadow-grape-500 rounded-lg p-6 border-2 border-grape-800 text-grape-800 font-ArialBold"
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
      <div className="mb-2">
        <label className="block mb-1">Cardholder Name</label>
        <input
          type="text"
          placeholder="Enter Card Holder Name"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Cardholder Number</label>
        <input
          type="text"
          placeholder="Enter Card Number"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Experation Date</label>
        <input
          type="text"
          placeholder="MM/YY"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Postal Code</label>
        <input
          type="text"
          placeholder="Enter Postal code"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      {/* Sección de botones para seleccionar propina */}
      <div className="mb-4">
        <span className="block font-bold mb-2">Add a tip</span>
        <div className="flex gap-2">
          {["18", "20", "25", "Custom"].map((tip) => (
            <button
              key={tip}
              type="button"
              onClick={() => handleTipSelection(tip)}
              className={`px-3 py-1 border-2 rounded font-ArialBold ${
                selectedTip === tip
                  ? "bg-grape-800 text-white"
                  : "bg-white text-grape-800"
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
            className="mt-2 w-full p-2 border border-grape-800 rounded focus:outline-none"
          />
        )}
      </div>

      <button className="w-full py-2 bg-grape-800 text-white rounded font-ArialBold">
        Next
      </button>
    </div>
  );
};
const ContactDetailsForm = () => {
  return (
    <div
      className="max-w-md w-full bg-white shadow-lg shadow-grape-500 rounded-lg p-6 border-2 border-grape-800 text-grape-800 font-ArialBold"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h2 className="text-xl mb-2">Your Contact Details</h2>
      <p className="mb-4">Your Contact Information</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm">Need contact information</span>
        <div className="flex items-center">
          <FaExclamationTriangle className="text-grape-800 mr-2" />
          <FaChevronDown className="text-grape-800" />
        </div>
      </div>
      <button
        type="button"
        className="w-full py-2 bg-grape-800 text-white rounded mb-4 font-ArialBold"
      >
        Add Contact Information
      </button>
      <p className="text-xs text-gray-600 mb-4">*Indicates required fields</p>
      <div className="mb-4">
        <label className="block mb-1">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <div className="flex">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-grape-800 rounded-r focus:outline-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border border-grape-800 rounded focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <input type="checkbox" id="updates" className="mr-2" />
        <label htmlFor="updates">Receive updates about your order</label>
      </div>
    </div>
  );
};

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

      {/* Contenedor para PaymentForm, Order Summary y Contact Details en fila */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* Formulario de Pago */}
        <div className="flex-1">
          <PaymentForm />
        </div>

        {/* Order Summary */}
        <div className="flex-1">
          <div className="text-grape-900 font-ArialBold">
            <div
              className="max-w-md bg-white shadow-lg shadow-grape-500 rounded-lg p-6 text-grape-900"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <h1 className="text-2xl text-center">
                Order Sumary ({orderState.products.length})
              </h1>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg">2 Items</span>
                <button className="text-sm underline">Edit Order</button>
              </div>
              <div className="space-y-3 border-b pb-4">
                {orderState.products.map((p, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {p.quantity} {p.name}
                    </span>
                    <span>$ {p.price}</span>
                  </div>
                ))}
              </div>
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

        {/* Formulario de Contact Details */}
        <div className="flex-1">
          <ContactDetailsForm />
        </div>
      </div>
    </div>
  );
};
