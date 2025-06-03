import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const FullscreenControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // Se agrega el control de pantalla completa solo una vez.
    if (!map.fullscreenControlAdded) {
      L.control
        .fullscreen({
          position: "topright",
          title: "Ver en pantalla completa",
          titleCancel: "Salir de pantalla completa",
          forceSeparateButton: true, // Fuerza que el botón sea independiente
        })
        .addTo(map);
      // Flag custom para evitar agregarlo nuevamente.
      // (No forma parte de la API oficial, es solo para este ejemplo)
      (map as any).fullscreenControlAdded = true;
    }
  }, [map]);

  return null;
};

export default FullscreenControl;
