import React from "react";
import AppRouter from "./routes/AppRouter";
import Preloader from "./components/containers/Preloader";
import ImageCoockie from "../src/assets/desing/dulces (2).png";

import Pattern from "../src/assets/desing/pattern.png";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51P4caFDrtegwEnl3baIqBDl1Id2beUGIBBUQOK2UfhThO0buETVWO3RDt5WZgc00Vk4qQa7HgFIENycYkCWuw4Jq00sw8wPXAX"
);

const Images = [Pattern, ImageCoockie];

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black-night-950">
      {/* Contenido principal */}
      <div className="relative z-10">
        <Preloader imageSources={Images}>
          <Elements stripe={stripePromise}>
            <AppRouter />
          </Elements>
        </Preloader>
      </div>
    </div>
  );
};

export default App;
