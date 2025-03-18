import React from "react";
import AppRouter from "./routes/AppRouter";
import Preloader from "./components/containers/Preloader";

import ImageCoockie from "./assets/cookie.png";
import ImageCoockie1 from "./assets/FOTOS NOX CATERING/cookie2.png";
import ImageCoockie2 from "./assets/FOTOS NOX CATERING/cookie11.png";
import ImageCoockie3 from "./assets/FOTOS NOX CATERING/cookie6.png";
import ImageCoockie4 from "./assets/FOTOS NOX CATERING/cookie8.png";

// Importa las imágenes correspondientes
import IceamImage from "./assets/Imnsomnia fotos/carrousel/categorias/icecream.png";
import CoockiesImage from "./assets/Imnsomnia fotos/carrousel/categorias/cookies.png";
import MashupsImage from "./assets/Imnsomnia fotos/carrousel/categorias/mashups.png";
import DessertsImage from "./assets/Imnsomnia fotos/carrousel/categorias/dessert.png";
import ForYouImage from "./assets/Imnsomnia fotos/carrousel/categorias/foryou.png";
import DrinksImage from "./assets/Imnsomnia fotos/carrousel/categorias/drink.png";

const Images = [
  IceamImage,
  CoockiesImage,
  MashupsImage,
  DessertsImage,
  ForYouImage,
  DrinksImage,
  ImageCoockie,
  ImageCoockie1,
  ImageCoockie2,
  ImageCoockie3,
  ImageCoockie4,
];

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black-night-950">
      {/* Contenido principal */}
      <div className="relative z-10">
        <Preloader imageSources={Images}>
          <AppRouter />
        </Preloader>
      </div>
    </div>
  );
};

export default App;
