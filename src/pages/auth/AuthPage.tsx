import React, { useState } from "react";
import SignUpForm from "./SignUpForm";

const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Card principal con degradado y sombra morada en la esquina superior izquierda */}
      <div className="relative bg-gradient-to-br from-gray-800 shadow-grape-900  to-gray-900 rounded-3xl shadow-xl max-w-md w-full p-8">
        {/* Sombra morada en la esquina superior izquierda */}

        <div className="relative">
          {/* Toggle moderno para cambiar entre Sign In y Sign Up */}
          <div className="relative w-full bg-gray-700 rounded-full p-1 mb-6">
            {/* Indicador deslizante */}
            <div
              className="absolute top-0 left-0 h-full w-1/2 bg-purple-600 rounded-full transition-transform duration-300"
              style={{
                transform: isSignUp ? "translateX(100%)" : "translateX(0)",
              }}
            ></div>
            <div className="relative flex">
              <button
                onClick={() => setIsSignUp(false)}
                className="flex-1 text-center py-2 rounded-full text-white font-semibold focus:outline-none"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className="flex-1 text-center py-2 rounded-full text-white font-semibold focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </div>

          {isSignUp ? (
            <SignUpForm />
          ) : (
            <div>
              <h2 className="text-2xl text-center text-white mb-6 font-bold">
                Sign In to Your Account
              </h2>
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 mb-4 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-colors duration-300"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 mb-6 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors duration-300 shadow-md"
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
