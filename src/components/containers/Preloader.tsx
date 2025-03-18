import React, { useState, useEffect } from "react";

const Preloader = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Se asume que window.onload se dispara cuando todas las imágenes y recursos están cargados
    const handleLoad = () => {
      setLoaded(true);
    };

    if (document.readyState === "complete") {
      setLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <p>Cargando...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Preloader;
