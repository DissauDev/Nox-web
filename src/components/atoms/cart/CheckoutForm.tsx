import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export const stripePromise = loadStripe(
  "pk_test_51P4caFDrtegwEnl3baIqBDl1Id2beUGIBBUQOK2UfhThO0buETVWO3RDt5WZgc00Vk4qQa7HgFIENycYkCWuw4Jq00sw8wPXAX"
);

export const CheckoutForm = () => {
  const navigate = useNavigate(); // Hook para navegar

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    // Llama a tu endpoint que crea una sesión de Checkout en Stripe
    const response = await fetch(
      "https://tu-backend.com/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          /* datos necesarios, p.ej. items, email, etc. */
        }),
      }
    );

    const { sessionUrl } = await response.json();
    // Redirige al usuario a la URL de la sesión de Checkout
    window.location.href = sessionUrl;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message || "Error al procesar el pago");
      setLoading(false);
    } else {
      console.log("PaymentMethod creado:", paymentMethod);
      // Aquí puedes enviar el `paymentMethod.id` a tu backend para procesar el pago
      setLoading(false);
      navigate("/orders");
    }
  };

  return (
    <form className="  rounded  w-full">
      <CardElement className="p-2 py-3  border rounded " />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleCheckout}
        //  type="submit"
        className="mt-4 w-full bg-mustard-yellow-400 font-ArialBold text-black-night-950 py-2 rounded disabled:opacity-50"
        disabled={!stripe || loading}
      >
        {loading ? "Procesando..." : "Order Place"}
      </button>
    </form>
  );
};
