import {
  Product,
  toggleWishlist,
} from "@/store/features/slices/whishlistSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsInWishlist } from "@/store/whishlistSelector";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaPlus } from "react-icons/fa6";

import { HiOutlineHeart, HiHeart } from "react-icons/hi";

interface ProductCardProps {
  imageLeft: string;
  imageRight?: string;
  name: string;
  description: string;
  price: number;
  sellPrice?: number;
  onAdd: () => void;
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageLeft,
  imageRight,
  name,
  description,
  price,
  sellPrice,
  product,
  onAdd,
}) => {
  const dispatch = useAppDispatch();
  const inWishlist = useAppSelector(selectIsInWishlist(product.id));
  const [showHeartBurst, setShowHeartBurst] = React.useState(false);
  // Evita que el click en el corazón dispare otros handlers (e.g. onAdd)
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!inWishlist) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 600); // durará 600ms
    }

    dispatch(toggleWishlist(product));
  };

  return (
    <div
      onClick={onAdd}
      role="button"
      tabIndex={0}
      className="group relative bg-[#15203a] border-2 m-6 border-[#92b1dd] rounded-2xl w-80 h-80 max-w-xs md:max-w-sm overflow-visible p-3 transition-all duration-300 shadow-2xl hover:shadow-[#92b1dd] cursor-pointer"
    >
      <button
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 w-9 h-9 flex items-center justify-center
           border-2 border-[#92b1dd] bg-[#15203a] rounded-full shadow-lg hover:shadow-[#92b1dd]
           hover:scale-110 transition-all duration-300 z-20 overflow-visible"
      >
        <AnimatePresence>
          {showHeartBurst && (
            <>
              <motion.div
                className="absolute"
                initial={{ opacity: 1, scale: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, y: -20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HiHeart className="text-mustard-yellow-500" size={12} />
              </motion.div>

              <motion.div
                className="absolute"
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: -10, y: -15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HiHeart className="text-mustard-yellow-500" size={10} />
              </motion.div>

              <motion.div
                className="absolute"
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 1.5, x: 10, y: -15 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HiHeart className="text-mustard-yellow-500" size={10} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {inWishlist ? (
          <HiHeart size={20} className="text-mustard-yellow-500" />
        ) : (
          <HiOutlineHeart size={20} className="text-[#92b1dd]" />
        )}
      </button>

      <div className="flex justify-between">
        <div className="w-1"></div>
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
               w-40 h-40 bg-[#92b1dd] rounded-full blur-2xl opacity-30 z-0"
        />
        <img
          src={imageLeft}
          alt={name}
          className="absolute z-10 h-52 -top-10 left-12 w-auto rounded-full transition-transform duration-300 group-hover:scale-110"
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
          <h3 className="text-lg font-ArialBold text-mustard-yellow-400">
            {name}
          </h3>
          <p className="text-sm font-ArialRegular text-[#92b1dd]">
            {description}
          </p>
          {sellPrice && sellPrice > price ? (
            <span className="text-lg text-white font-ArialBold">
              $ ? `$ {sellPrice.toFixed(2)}`
            </span>
          ) : null}

          <span className="text-lg text-white font-ArialBold"> $ {price}</span>
        </div>
      </div>

      <button className="absolute bottom-2 right-2 w-10 h-10 flex items-center justify-center bg-[#92b1dd] text-[#15203a] rounded-md">
        <FaPlus size={22} />
      </button>
    </div>
  );
};

export default ProductCard;
