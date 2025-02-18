import React from "react";
import { FaPlus } from "react-icons/fa6";

interface ProductCardProps {
  imageLeft: string;
  imageRight?: string;
  name: string;
  description: string;
  price: string;
  onAdd: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageLeft,
  imageRight,
  name,
  description,
  price,
  onAdd,
}) => {
  return (
    <div
      onClick={onAdd}
      role="button"
      tabIndex={0}
      className="group relative bg-white border m-6 border-[#45205d] rounded-2xl w-80 h-80 max-w-xs md:max-w-sm overflow-visible p-3 transition-all duration-300 shadow-2xl hover:shadow-pompadour-500 cursor-pointer"
    >
      <div className="flex justify-between">
        <div className="w-1"></div>
        <img
          src={imageLeft}
          alt={name}
          className="absolute -top-6 -left-6 h-48 w-auto rounded-full transition-transform duration-300 group-hover:scale-110"
        />

        {imageRight ? (
          <img
            src={imageRight}
            alt={name}
            className="w-20 h-20 object-cover rounded-full"
          />
        ) : (
          <div className="w-20 h-20" />
        )}
      </div>

      <div className="flex-wrap justify-center">
        <div className="w-1 h-28"></div>
        <div className="transition-transform duration-300 group-hover:translate-y-2">
          <h3 className="text-lg font-ArialBold text-[#45205d]">{name}</h3>
          <p className="text-sm font-ArialRegular text-grape-950">
            {description}
          </p>
          <span className="text-lg text-grape-950 font-ArialBold">{price}</span>
        </div>
      </div>

      <button className="absolute bottom-2 right-2 w-10 h-10 flex items-center justify-center bg-grape-950 text-white rounded-md">
        <FaPlus size={22} />
      </button>
    </div>
  );
};

export default ProductCard;
