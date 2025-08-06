import Lottie from "lottie-react";
import animationData from "../../assets/lotties/Animation - 1749432478619.json"; // o usa una URL remota

export const LoadingWithGlow = () => (
  <div className="relative flex flex-col justify-center items-center w-full h-auto p-4 space-y-4 mb-20">
    {/* Glow de fondo */}

    <div className="absolute top-10 inset-0 flex justify-center items-center pointer-events-none z-0">
      <div
        className="
            w-40 h-40 
            sm:w-56 sm:h-56 
            rounded-full 
            filter blur-3xl
          "
        style={{ backgroundColor: "rgba(255, 252, 233, 0.306)" }}
      />
    </div>

    {/* Contenido por encima */}
    <h2 className="relative z-10 font-ArialBold text-center text-4xl mt-10 text-white">
      Loading...
    </h2>
    <Lottie
      animationData={animationData}
      loop
      className="relative z-10 w-full max-w-[300px] h-auto"
    />
  </div>
);
