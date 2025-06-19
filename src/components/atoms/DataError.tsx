import Lottie from "lottie-react";
import animationData from "../../assets/lotties/Animation - 11.json";

interface Props {
  title: string;
  lighting?: boolean;
  darkTheme: boolean;
}
export const DataError = ({ title, darkTheme, lighting }: Props) => {
  return (
    <div className="flex flex-col pt-10 justify-center items-center w-full h-auto p-4 space-y-4">
      {darkTheme ? (
        <h2 className="font-ArialBold text-center text-2xl">{title}</h2>
      ) : (
        <h2 className="font-ArialBold text-center text-4xl text-[#DB0000]">
          {title}
        </h2>
      )}

      {/* Wrapper para posición relativa */}
      <div className="relative">
        {/* Glow detrás */}
        {lighting && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div
              className={`
                w-32 h-32 sm:w-44 sm:h-44 
                bg-white/30 
                rounded-full 
                filter blur-3xl 
                animate-pulse
              `}
              style={{
                backgroundColor: "rgba(255,255,255,0.25)",
              }}
            />
          </div>
        )}

        {/* El Lottie en primer plano */}
        <Lottie
          animationData={animationData}
          loop
          className="relative z-10 max-w-[200px] h-auto"
        />
      </div>
    </div>
  );
};
