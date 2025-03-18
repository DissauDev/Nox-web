import React from "react";
import AppRouter from "./routes/AppRouter";
import Preloader from "./components/containers/Preloader";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black-night-950">
      {/* Contenido principal */}
      <div className="relative z-10">
        <Preloader>
          <AppRouter />
        </Preloader>
      </div>
    </div>
  );
};

export default App;
