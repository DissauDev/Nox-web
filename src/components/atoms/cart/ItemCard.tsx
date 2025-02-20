import React from "react";

const ItemCard = ({ item: { name, amount, price } }) => {
  return (
    <div className="w-full border border-grape-700 p-8 rounded-2xl flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h5 className="text-xl text-purple-700 font-semibold">{name}</h5>
        <button
          className="text-sm text-purple-800 font-medium"
          onClick={() => {
            //Logica para remover del carrito
          }}
        >
          Remove
        </button>
      </div>
      <div className="flex justify-end">
        <div className="flex flex-col gap-4">
          <p className="text-purple-800 font-bold text-end relative">
            {amount} <span className="before:content-[''] before:absolute before:size-2 before:rounded-full before:bg-mustard-yellow-400 before:bottom-[6px] before:right-[38px] px-2"></span>{price}
          </p>
          <button
          className="text-sm text-purple-800 font-medium"
          onClick={() => {
            //Logica para modificar
          }}
        >
          Modify Order
        </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
