import { useNavigate } from "react-router-dom";

import { FaChevronRight } from "react-icons/fa";

import { RootState } from "@/store/store";

import ItemCards from "@/components/atoms/cart/ItemCard";
import { useSelector } from "react-redux";

const Cart = () => {
  const orderState = useSelector((state: RootState) => state.orders);
  const navigate = useNavigate();
  // Incrementa la cantidad del producto

  console.log(orderState);

  return (
    <div className="mt-16 pb-20 ">
      <div className="flex justify-center mt-24 items-center font-ArialBold text-sm  md:text-xl text-grape-900 space-x-4">
        <a>Shopping Cart</a>
        <FaChevronRight className="text-gray-500" />
        <button
          className="text-gray-500 hover:text-grape-900"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
        <FaChevronRight className="text-gray-500" />
        <button className="text-gray-500">Order Complete</button>
      </div>
      <div className="section-padding pb-16">
        <ItemCards />
      </div>
    </div>
  );
};

export default Cart;
