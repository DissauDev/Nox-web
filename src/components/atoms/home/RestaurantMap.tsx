/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.fullscreen/Control.FullScreen.css";
import "leaflet.fullscreen";
import FullscreenControl from "./FullScreenControl";

const RestaurantMap: React.FC = () => {
  const position: [number, number] = [37.2869301, -121.9425607]; // Coordenadas de Nox Cookie Bar

  return (
    <div className="relative z-0 w-full h-[400px] border border-grape-800 rounded-lg overflow-hidden shadow-lg">
      {/*@ts-ignore */}
      <MapContainer center={position} zoom={15} className="w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            📍 <b>Nox Cookie Bar</b>
            <br /> Downtown Campbell, California.
          </Popup>
        </Marker>
        <FullscreenControl />
      </MapContainer>
    </div>
  );
};

export default RestaurantMap;
