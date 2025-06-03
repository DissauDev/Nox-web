/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { IMaskInput } from "react-imask";
import { RootState } from "@/store/store";
import { setTipPercent } from "@/store/features/slices/orderSlice";
import { useAppSelector } from "@/store/hooks";
import { useCreateOrderMutation } from "@/store/features/api/ordersApi";
import { toast } from "@/hooks/use-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const stripePromise = loadStripe(
  "pk_test_51P4caFDrtegwEnl3baIqBDl1Id2beUGIBBUQOK2UfhThO0buETVWO3RDt5WZgc00Vk4qQa7HgFIENycYkCWuw4Jq00sw8wPXAX"
);

export type CheckoutFormValues = {
  phone: string;
  name: string;
  customerEmail: string;
  note: string;
  email: string;
};

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();
  const addressState = useSelector((s: RootState) => s.address);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormValues>();
  const userAuth = useSelector((state: RootState) => state.auth.user);
  const orderState = useSelector((s: RootState) => s.orders);
  const { total, subTotal } = useAppSelector((s) => s.orders.totals);

  // Tip picker
  const [selectedTip, setSelectedTip] = useState("20");
  const [customTip, setCustomTip] = useState("");

  const handleTipSelection = (value: string) => {
    setSelectedTip(value);
    if (value !== "Custom") dispatch(setTipPercent(parseFloat(value) / 100));
  };
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTip(e.target.value);
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) dispatch(setTipPercent(val / 100));
  };

  const onSubmit = async ({
    phone,
    name,
    customerEmail,
    note,
  }: CheckoutFormValues) => {
    setIsProcessing(true);
    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    try {
      // 1️⃣ create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) throw error;

      // 2️⃣ build items payload
      const itemsPayload = orderState.products.map((p) => ({
        productId: p.id,

        quantity: p.quantity,
        price: p.price,
        options: p.options ?? [],
        specifications: p.specifications ?? "",
      }));

      // 3️⃣ full payload
      const payload = {
        items: itemsPayload,
        amount: total,
        customerEmail,
        customerPhone: phone,
        customerName: name,
        specifications: note,
        subtotal: subTotal,
        customerAddress: addressState.savedAddress.fullAddress,
        paymentMethodId: paymentMethod.id,
        userId: userAuth?.id || null,
      };
      //@ts-ignore
      const res = await createOrder(payload).unwrap();

      toast({
        className: "border-l-4 border-green-500",
        title: "✅ Payment Successful",
        description: "Your order was received",
      });

      navigate(`/ordersClient/${res.id}`);
    } catch (err) {
      toast({
        className: "border-l-4 border-red-500 ",
        title: "❌ Payment Failed",
        description: err.data.message || "Was an error to pay",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full mx-auto px-4">
        {/* Grid: 1 columna en móviles y en pantallas grandes se utiliza un grid con dos columnas, donde la primera es el doble */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-8">
          {/* Columna Izquierda: Order Details */}
          <div className="w-full">
            <div className="  text-grape-800 font-ArialBold">
              {/* Pickup & Address */}
              <div className="bg-white p-6 rounded-lg shadow border text-grape-800 mb-6">
                <div className="flex md:flex-row flex-col justify-between mb-4">
                  <div className="flex items-center">
                    <FaStore size={28} className="mr-2" />
                    <span className="font-ArialBold">
                      {addressState.savedAddress?.city}
                    </span>
                  </div>
                  {/*  <div className="flex items-center">
                    <span className="font-ArialRegular">
                      {addressState.savedAddress?.type}
                    </span>
                  </div> */}
                  <div className="flex items-center">
                    <FaMapMarkerAlt size={28} className="mr-2" />
                    <p className="line-clamp-2 max-w-[200px]">
                      {addressState.savedAddress?.fullAddress}
                    </p>
                  </div>
                </div>

                {/* Customer inputs */}
                <div className="space-y-2">
                  {/* Phone */}
                  <div>
                    <label className="block mb-1">Phone Number</label>
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Required",
                        pattern: {
                          value: /^\+1 \(\d{3}\) \d{3}-\d{4}$/,
                          message: "Invalid US phone number",
                        },
                      }}
                      render={({ field }) => (
                        <IMaskInput
                          {...field}
                          mask="+1 (000) 000-0000"
                          definitions={{ 0: /[0-9]/ }}
                          className="w-full p-2 border rounded"
                          placeholder="+1 (555) 123-4567"
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block mb-1">Name</label>
                    <input
                      defaultValue={userAuth?.name || ""}
                      {...register("name", { required: "Required" })}
                      className="w-full p-2 border rounded"
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={userAuth?.email || ""}
                      {...register("customerEmail", {
                        required: "Required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email",
                        },
                      })}
                      className="w-full p-2 border rounded"
                      placeholder="you@example.com"
                    />
                    {errors.customerEmail && (
                      <p className="text-red-500 text-sm">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* My Bag & Note */}
              <div className="bg-white p-6 rounded-lg shadow border text-grape-800">
                <h2 className="text-2xl font-ArialBold mb-4 text-pompadour-900">
                  My Bag
                </h2>
                <div className="space-y-3 border-b pb-4">
                  <textarea
                    {...register("note")}
                    className="w-full p-2 border rounded"
                    placeholder="Add a personal note to go on the box."
                  />
                  {orderState.products.map((p) => (
                    <div key={p.id}>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          <img
                            src={p.imageUrl}
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
                                <div
                                  className="mt-1 text-gray-400"
                                  key={ops.id}
                                >
                                  <p className="text-xs font-semibold">
                                    {ops.name} (${ops.extraPrice})
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                        <span className="font-ArialBold">
                          Qty: {p.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Columna Derecha: Payment Form */}
          <div className="w-full">
            <div className="flex flex-col lg:max-w-lg w-full bg-white rounded-lg shadow-lg border border-gray-300 p-6 text-grape-800 font-ArialBold">
              <h2 className="text-2xl mb-4 font-ArialBold text-pompadour-900">
                Order Details
              </h2>
              {/* Subtotal & Tip */}
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${orderState.totals.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>Tip</span>
                <span>${orderState.totals.tip.toFixed(2)}</span>
              </div>

              {/* Tip selector */}
              <div className="mb-4 flex flex-wrap">
                {["18", "20", "25", "Custom"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTipSelection(t)}
                    className={`m-1 px-4 py-2 rounded ${
                      selectedTip === t
                        ? "bg-grape-800 text-white"
                        : "bg-white border-2 hover:bg-gray-100"
                    }`}
                  >
                    {t === "Custom" ? t : ` ${t}%`}
                  </button>
                ))}
              </div>
              {selectedTip === "Custom" && (
                <input
                  type="number"
                  placeholder="Tip %"
                  value={customTip}
                  onChange={handleCustomTipChange}
                  className="w-full p-2 border rounded mb-4"
                />
              )}

              {/* Total */}
              <div className="flex justify-between font-ArialBold text-xl">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <hr className="mb-4" />

              {/* Stripe CardElement */}
              <div>
                <label className="block mb-1 font-semibold">Card details</label>
                <CardElement className="p-2 border rounded mb-4" />
              </div>

              <button
                type="submit"
                disabled={!stripe || isLoading || isProcessing}
                className="w-full py-2 bg-mustard-yellow-400 text-black-night-950 rounded font-ArialBold disabled:opacity-50"
              >
                {isLoading || isProcessing ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
