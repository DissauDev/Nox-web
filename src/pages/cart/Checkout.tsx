import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa6";

import PaymentForm from "./PaymentForm";

export const stripePromise = loadStripe(
  "pk_test_51P4caFDrtegwEnl3baIqBDl1Id2beUGIBBUQOK2UfhThO0buETVWO3RDt5WZgc00Vk4qQa7HgFIENycYkCWuw4Jq00sw8wPXAX"
);

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

        <PaymentForm />
      </div>
    </Elements>
  );
};

export default Checkout;
