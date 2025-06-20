import Lottie from "lottie-react";
import animationData from "../../assets/lotties/Animation 7.json"; // o usa una URL remota

interface Props {
  title: string;
  darkTheme: boolean;
}
export const EmptyData = ({ title, darkTheme }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-auto mt-10 p-4 ">
      {darkTheme ? (
        <h2 className="font-ArialBold text-center text-2xl ">{title}</h2>
      ) : (
        <h2 className="font-ArialBold text-center text-2xl text-sapphire-900">
          {title}
        </h2>
      )}
      <Lottie
        animationData={animationData}
        loop
        className="w-full max-w-[200px] h-auto"
      />
    </div>
  );
};
