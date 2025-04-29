import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import { Toast } from "@radix-ui/react-toast";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";

export const stripePromise = loadStripe(
  "pk_test_51P4caFDrtegwEnl3baIqBDl1Id2beUGIBBUQOK2UfhThO0buETVWO3RDt5WZgc00Vk4qQa7HgFIENycYkCWuw4Jq00sw8wPXAX"
);
const url = "http://localhost:3000/api/orders";

export const CheckoutForm = () => {
  const navigate = useNavigate(); // Hook para navegar
  const totalAmont = useAppSelector((state) => state.orders.totals.total);
  const stripe = useStripe();

  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;
    setLoading(true);

    try {
      // Crear el método de pago
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Error al crear PaymentMethod:", error);
        return;
      }

      console.log("PaymentMethod creado:", paymentMethod);

      // Datos de prueba para la orden
      const orderData = {
        items: [
          {
            productId: "06f32369-1f16-475c-9f7f-097ea895d74c",
            quantity: 2,
            price: 10,
            options: "Chocolate",
            specifications: "Sin azúcar",
          },
        ],
        amount: totalAmont,
        customerEmail: "cliente@example.com",
        paymentMethodId: paymentMethod.id,
      };

      const response = await axios.post(url, orderData);

      if (response.data.success) {
        console.log("Orden creada:", response.data.order);
        navigate("/orders");
      } else {
        console.error("Error al crear la orden:", response.data.message);
      }
    } catch (err) {
      console.error("Error general:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="  rounded  w-full" onSubmit={handleSubmit}>
      <CardElement className="p-2 py-3  border rounded " />

      <button
        type="submit"
        className="mt-4 w-full bg-mustard-yellow-400 font-ArialBold text-black-night-950 py-2 rounded disabled:opacity-50"
        disabled={!stripe || loading}
      >
        {loading ? "Procesando..." : "Order Place"}
      </button>
    </form>
  );
};
