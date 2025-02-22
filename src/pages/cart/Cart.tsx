import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import IceCreamIMg from "../../assets/imagenMuestra IceCream.png";
import ItemCard from "../../components/atoms/cart/ItemCard";

import { Articulo } from "../../types/system";

const sugestedDataDummy = [
  {
    img: IceCreamIMg,
    precio: 6.25,
    title: "Ice Cream in a Cup",
  },
  {
    img: IceCreamIMg,
    precio: 6.25,
    title: "Ice Cream in a Cup",
  },
  {
    img: IceCreamIMg,
    precio: 6.25,
    title: "Ice Cream in a Cup",
  },
];
const itemsDataDummy: Articulo[] = [
  {
    name: "Red Velvet",
    price: 6.25,
    amount: 1,
  },
  {
    name: "Red Velvet",
    price: 6.25,
    amount: 1,
  },
  {
    name: "Red Velvet",
    price: 6.25,
    amount: 1,
  },
  {
    name: "Red Velvet",
    price: 6.25,
    amount: 1,
  },
  {
    name: "Red Velvet",
    price: 6.25,
    amount: 1,
  },
];

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 pb-20 ">
      <div className="section-padding">
        <div className="flex justify-between items-center mt-2">
          <button
            className="font-bold font-ArialBold flex items-center sm:text-2xl text-grape-700"
            onClick={() => {
              navigate("/menu");
            }}
          >
            <ChevronLeft />
            Back to Menu
          </button>
          <button
            className="bg-grape-700 text-white px-4 py-2 rounded-3xl font-semibold hover:bg-purple-600"
            onClick={() => {
              // Navegacion a Checkout Page
            }}
          >
            Go to Checkout
          </button>
        </div>
        {/* Añadir direccion al p una vez se haga la funcionalidad de direccion */}
        <p className="mt-2  sm:text-[14px] text-grape-700">
          Delivering to 220 Academy Street
        </p>
      </div>
      <div className="section-padding overflow-hidden">
        <h3 className="text-grape-700 font-ArialBold text-xl">
          Suggested Items
        </h3>
        <div className="mt-4 flex px-4 items-center gap-8 overflow-x-scroll no-scrollbar pb-6">
          {sugestedDataDummy.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-2 border-grape-700 rounded-lg min-w-[18rem] shadow-purple-500 hover:shadow-lg hover:shadow-grape-950 relative"
            >
              <img
                src={item.img}
                alt={item.title}
                className="size-24 object-cover rounded-full absolute -left-4 -top-2"
              />
              <div className="flex flex-col items-start w-full py-4 pl-24 gap-2">
                <p className="text-grape-700 font-bold">
                  ${item.precio.toFixed(2)}
                </p>
                <h4 className="font-bold line-clamp-2 text-grape-700">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-padding pb-16">
        <h4 className="text-grape-700">{itemsDataDummy.length} Item Order</h4>
        <div className="flex flex-col gap-4 mt-4 mb-16">
          {itemsDataDummy.map((item, index) => (
            // Sustituir key por id cuando se tengan los datos reales
            <ItemCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
