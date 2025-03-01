import { useNavigate } from "react-router-dom";
import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";

import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  incrementProductQuantity,
  removeProduct,
} from "@/store/features/slices/orderSlice";
import ItemCards from "@/components/atoms/cart/ItemCard";

const Cart = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state: RootState) => state.orders);
  const navigate = useNavigate();
  // Incrementa la cantidad del producto
  const handleIncrement = (id: string) => {
    dispatch(incrementProductQuantity({ id, increment: 1 }));
  };

  // Si la cantidad es mayor a 1, decrementa; si es 1, elimina el producto
  const handleDecrementOrRemove = (product: {
    id: string;
    quantity: number;
  }) => {
    if (product.quantity > 1) {
      dispatch(incrementProductQuantity({ id: product.id, increment: -1 }));
    } else {
      dispatch(removeProduct(product.id));
    }
  };

  console.log(orderState);

  return (
    <div className="mt-16 pb-20 ">
      <div className="flex justify-center mt-20 items-center font-ArialBold text-sm  md:text-xl text-grape-900 space-x-4">
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
