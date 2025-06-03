// src/components/organisms/MissingSomething.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Blurhash } from "react-blurhash";
import { RootState } from "@/store/store";
// ajusta la ruta si es necesario
import { addProduct } from "@/store/features/slices/orderSlice";
import { useGetProductSuggestionsQuery } from "@/store/features/api/productsApi";

export function MissingSomething() {
  const dispatch = useDispatch();
  const cartItems = useSelector((s: RootState) => s.orders.products);
  const firstProductId = cartItems[0]?.id;
  // Sólo llama al endpoint si tenemos un producto
  const {
    data: suggestions = [],
    isLoading,
    isError,
  } = useGetProductSuggestionsQuery(firstProductId!, {
    skip: !firstProductId,
  });

  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const handleAdd = (item: (typeof suggestions)[0]) => {
    dispatch(
      addProduct({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        blurHashImage: item.imageLeft.blurHash,
        imageUrl: item.imageLeft.url,
        categoryId: item.categoryId,
        options: [], // o los que quieras pasar
        specifications: "",
      })
    );
  };

  if (!firstProductId || isError || (!isLoading && suggestions.length === 0)) {
    return null;
  }

  // Skeleton mientras carga
  if (isLoading) {
    return (
      <div className="mt-4">
        <p className="font-ArialBold text-pompadour-900 text-xl mb-4">
          Missing Something?
        </p>
        <div className="flex space-x-4">
          {[1, 2].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse" />
              <div className="h-4 w-12 bg-gray-300 rounded mt-2 animate-pulse" />
              <div className="h-4 w-8 bg-gray-300 rounded mt-1 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render final
  return (
    <div className="mt-4">
      <p className="font-ArialBold text-pompadour-900 text-xl mb-4">
        Missing Something?
      </p>
      <div className="flex flex-wrap">
        {suggestions.map((item) => {
          const blur = item.imageLeft.blurHash || "";
          const url = item.imageLeft.url;
          const isImgLoaded = loaded[item.id];

          return (
            <div className="relative m-2" key={item.id}>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  {!isImgLoaded && blur && (
                    <Blurhash
                      hash={blur}
                      width={64}
                      height={64}
                      resolutionX={32}
                      resolutionY={32}
                      punch={1}
                    />
                  )}
                  <img
                    src={url}
                    alt={item.name}
                    className={`w-16 h-16 object-cover rounded-full ${
                      isImgLoaded ? "" : "hidden"
                    }`}
                    onLoad={() =>
                      setLoaded((prev) => ({ ...prev, [item.id]: true }))
                    }
                  />
                </div>
                <span className="text-sm font-ArialBold">{item.name}</span>
                <span className="text-sm font-ArialRegular">
                  ${item.price.toFixed(2)}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleAdd(item)}
                className="absolute -top-3 right-0 bg-grape-900 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
              >
                +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
