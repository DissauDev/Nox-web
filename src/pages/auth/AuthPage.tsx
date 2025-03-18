import React, { useState } from "react";
import SignUpForm from "./SignUpForm";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Contenedor principal con fondo semitransparente */}
      <div className=" bg-gray-900 bg-opacity-70 border-b-8 border-r-8 border-purple-800 rounded-2xl shadow-2xl max-w-md w-full p-8 overflow-hidden">
        {/* Efecto de luz difuminada en la esquina superior izquierda */}
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/2 size-48 md:size-96 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
        {/* Efecto de luz difuminada en la esquina inferior derecha */}
        <div className="absolute bottom-0 right-0  translate-y-1/2 size-48 md:size-80 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10">
          {/* Toggle estilizado */}
          <div className="relative w-full flex items-center justify-between bg-gray-800 rounded-full p-1 mb-8">
            {/* Indicador deslizante con gradiente */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-transform duration-300 ${
                isSignUp ? "translate-x-full" : "translate-x-0"
              }`}
            ></div>
            <button
              onClick={() => setIsSignUp(false)}
              className="flex-1 text-center py-2 text-white font-semibold relative z-10 transition-colors duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className="flex-1 text-center py-2 text-white font-semibold relative z-10 transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>

          {isSignUp ? (
            <SignUpForm />
          ) : (
            <div>
              <h2 className="text-2xl text-center text-white mb-6 font-bold">
                Welcome Back
              </h2>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-4 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 mb-4"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-4 bg-transparent border border-gray-600 rounded-md placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300 mb-6"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold transition duration-300 shadow-lg"
                >
                  Sign In
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
