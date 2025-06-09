import Lottie from "lottie-react";
import animationData from "../../assets/lotties/Animation 4.json"; // o usa una URL remota

interface Props {
  title: string;
  darkTheme: boolean;
}
export const DataError = ({ title, darkTheme }: Props) => {
  return (
    <div className="flex flex-col pt-10 justify-center items-center w-full h-auto p-4 space-y-4">
      {darkTheme ? (
        <h2 className="font-ArialBold text-center text-2xl ">{title}</h2>
      ) : (
        <h2 className="font-ArialBold text-center text-4xl text-[#DB0000]">
          {title}
        </h2>
      )}

      <Lottie
        animationData={animationData}
        loop
        color="white"
        className=" max-w-[200px] h-auto"
      />
    </div>
  );
};
