import React from "react";
import AppRouter from "./routes/AppRouter";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black-night-950">
      {/* Primera capa del patrón con opacidad baja y ajuste de color */}
      <div
        className="absolute inset-0 bg-custom-pattern bg-repeat  opacity-5 bg-[size:70%] 
                      invert-[10%] brightness-50 contrast-200"
      ></div>

      {/* Segunda capa del patrón con ajuste de color adicional */}
      <div
        className="absolute inset-0 bg-custom-pattern bg-repeat opacity-10 bg-[size:70%] 
                      invert-[10%] brightness-75 contrast-150"
      ></div>

      {/* Contenido principal */}
      <div className="relative z-10">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
