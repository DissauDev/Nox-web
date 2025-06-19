/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/pages/ProductDetails.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductQuery } from "@/store/features/api/productsApi";
import CartCounter from "@/components/atoms/CartCounter";

import { addProduct, Product } from "@/store/features/slices/orderSlice";
import { RootState } from "@/store/store";
import { FaChevronLeft } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import ToppinsSelector, {
  ToppingOption,
} from "@/components/atoms/menu/ToppinsSelector";

import MashoopSelector from "@/components/atoms/menu/selectors/MashoopSelector";
import IceCreamFlavorSelector from "@/components/atoms/menu/IceCreamFlavorSelector";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";

const ProductDetails: React.FC = () => {
  const { toast } = useToast();
  const { productKey } = useParams<{ productKey: string }>();
  const { data: product, isLoading } = useGetProductQuery(productKey!);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderState = useSelector((state: RootState) => state.orders);

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (newQty: number) => {
    setQuantity(newQty);
  };
  function calculateTotalPrice(
    basePrice: number,
    qty: number,
    extras: number[]
  ) {
    const totalExtras = extras.reduce((sum, e) => sum + e, 0);
    return Number(((basePrice + totalExtras) * qty).toFixed(2));
  }

  const handleRequiredChange = (
    groupId: string,
    valueId: string,
    checked: boolean
  ) => {
    setSelectedOptions((prev) => {
      const prevGroup = prev[groupId] || [];
      const nextGroup = checked
        ? [...prevGroup, valueId]
        : prevGroup.filter((id) => id !== valueId);
      return { ...prev, [groupId]: nextGroup };
    });
  };

  const handleToppingsChange = (selected: ToppingOption[]) => {
    setSelectedToppings(selected);
  };

  useEffect(() => {
    if (!product) return;
    //  Reúne todos los extraPrice: requeridos + toppings
    const extras: number[] = [];

    // 1) Opciones requeridas
    product.options
      .filter((o) => o.group.required)
      .forEach((opt) => {
        const sel = selectedOptions[opt.group.id] ?? [];
        opt.group.OptionValue.forEach((val) => {
          if (sel.includes(val.id) && val.extraPrice > 0) {
            extras.push(val.extraPrice);
          }
        });
      });

    // 2) Opciones toppings
    selectedToppings
      .filter((t) => t.extraPrice > 0)
      .forEach((t) => extras.push(t.extraPrice));

    setTotalPrice(calculateTotalPrice(product.price, quantity, extras));
  }, [product, quantity, selectedOptions, selectedToppings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    // 1) Opciones requeridas con groupName y quantity
    const optionsRequired = product.options
      .filter((o) => o.group.required)
      .flatMap((opt) => {
        const sel = selectedOptions[opt.group.id] || [];
        const counts = sel.reduce<Record<string, number>>((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});
        return Object.entries(counts).map(([valId, qty]) => {
          const val = opt.group.OptionValue.find((v) => v.id === valId)!;
          return {
            id: val.id,
            name: val.name,
            extraPrice: val.extraPrice,
            groupName: opt.group.name,
            quantity: qty,
            imageUrl: val.imageUrl,
          };
        });
      });

    // 2) Toppings con groupName y quantity=1
    const optionsToppings = selectedToppings.map((t) => ({
      id: t.id,
      name: t.name,
      extraPrice: t.extraPrice,
      groupName: product.options.find((o) =>
        o.group.OptionValue.some((v) => v.id === t.id)
      )!.group.name,
      quantity: 1,
    }));

    const productToAdd: Product = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      categoryId: product.categoryId,
      imageUrl: product.imageLeft.url,
      blurHashImage: product.imageLeft.blurHash,
      //@ts-ignore
      options: [...optionsRequired, ...optionsToppings],
      specifications: product.specifications ?? "",
    };

    dispatch(addProduct(productToAdd));
    console.log(productToAdd);
    console.log(orderState.products);
    toast({
      className:
        "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
      title: "✅ Good Choice!",
      description: "Item added to cart 🛒",
    });
  };

  if (isLoading || !product) return <ProductDetailsSkeleton />;
  console.log(product.sellPrice);
  return (
    <div className="flex justify-center mb-20 p-4">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-10">
        {/* Imagen */}
        <div className="w-full lg:w-5/12 flex justify-center py-4">
          <img
            src={product.imageLeft.url}
            alt={product.name}
            className="w-72 h-72 md:w-auto md:h-96 object-cover rounded"
          />
        </div>

        {/* Detalles y formulario */}
        <div className="w-full lg:w-7/12 px-4">
          <button
            onClick={() => navigate("/menu")}
            className="text-midnight-900 flex items-center font-bold mb-4"
          >
            <FaChevronLeft className="mr-2" size={24} />
            Back to Menu
          </button>

          <h1 className="text-4xl font-bold text-midnight-900 mb-2">
            {product.name}
          </h1>
          <p className="text-midnight-900 text-lg mb-2">
            {product.description}
          </p>
          <p className="text-2xl text-midnight-900 font-semibold  line-through">
            {product?.sellPrice && product?.sellPrice > product.price
              ? ` $${product.sellPrice.toFixed(2)}`
              : null}
          </p>
          <p className="text-2xl text-midnight-900 font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Opciones requeridas */}
            {product.options
              .filter((opt) => opt.group.required)
              .map((opt) => {
                const {
                  id: groupId,
                  name,
                  minSelectable,
                  maxSelectable,
                } = opt.group;
                const options = opt.group.OptionValue.map((val) => ({
                  id: val.id,
                  name: val.name,
                  description: val.description, // si lo tienes
                  extraPrice: val.extraPrice,
                  imageUrl: val.imageUrl,
                }));

                // Caso: un único sabor → usamos IceCreamFlavorSelector
                if (maxSelectable === 1) {
                  const selectedId = selectedOptions[groupId]?.[0] ?? "";
                  return (
                    <IceCreamFlavorSelector
                      key={groupId}
                      label={`Select (${minSelectable}) ${name}`}
                      //@ts-ignore
                      options={options}
                      selectedId={selectedId}
                      onSelect={(valueId) =>
                        handleRequiredChange(groupId, valueId, true)
                      }
                    />
                  );
                }

                // Caso: múltiples selecciones (mashoop, scoops ≥2) → MashoopSelector
                return (
                  <MashoopSelector
                    key={groupId}
                    groupName={name}
                    minSelectable={minSelectable}
                    maxSelectable={maxSelectable}
                    //@ts-ignore
                    options={options}
                    //@ts-ignore
                    selectedCounts={selectedOptions[groupId] || []}
                    onChange={(counts) => {
                      // aplana counts { id: qty } a lista de ids repetidos
                      const flattened = Object.entries(counts).flatMap(
                        ([id, qty]) => Array(qty).fill(id)
                      );
                      setSelectedOptions((prev) => ({
                        ...prev,
                        [groupId]: flattened,
                      }));
                    }}
                  />
                );
              })}

            {/* Opciones opcionales (toppings) */}
            {product.options
              .filter((opt) => !opt.group.required)
              .map((opt) => (
                <ToppinsSelector
                  key={opt.group.id}
                  groupName={opt.group.name}
                  minSelectable={opt.group.minSelectable}
                  maxSelectable={opt.group.maxSelectable}
                  options={opt.group.OptionValue.map((val) => ({
                    id: val.id,
                    name: val.name,
                    extraPrice: val.extraPrice,
                    imageUrl: val.imageUrl,
                  }))}
                  onToppingsChange={handleToppingsChange}
                />
              ))}

            {/* Cantidad general y botón */}
            <div>
              <CartCounter
                price={product.price}
                onQuantityChange={handleQuantityChange}
              />
              <button
                type="submit"
                className="w-full mt-4 p-3 bg-midnight-950 text-white font-ArialBold text-xl rounded-full transition hover:bg-midnight-900 shadow-lg"
              >
                Add to cart ${totalPrice.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
