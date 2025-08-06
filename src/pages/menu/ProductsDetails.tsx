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
import { updateItemSelectionsForGroup } from "@/store/features/slices/cartSlice";

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

    // ✅ base price con fallback a price si sellPrice no aplica
    const base =
      product.sellPrice && product.sellPrice > 0
        ? product.sellPrice
        : product.price;

    const extras: number[] = [];

    // 1) Opciones requeridas (cuenta ocurrencias)
    product.options
      .filter((o) => o.group.required)
      .forEach((opt) => {
        const sel = selectedOptions[opt.group.id] ?? [];

        // 🆕 contar ocurrencias por id
        const counts = sel.reduce<Record<string, number>>((acc, id) => {
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        }, {});

        // 🆕 por cada OptionValue, sumar extra tantas veces como se eligió
        opt.group.OptionValue.forEach((val) => {
          const times = counts[val.id] || 0;
          if (times > 0 && val.extraPrice > 0) {
            // empuja 'times' veces para mantener tu API de calculateTotalPrice(extras: number[])
            for (let i = 0; i < times; i++) {
              extras.push(val.extraPrice);
            }
          }
        });
      });

    // 2) Toppings (si cada topping es único, queda igual; si permites múltiples, aplica la misma técnica de "counts")
    selectedToppings
      .filter((t) => t.extraPrice > 0)
      .forEach((t) => extras.push(t.extraPrice));

    setTotalPrice(calculateTotalPrice(Number(base), quantity, extras));
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
      price: product.sellPrice,
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

  //desabled button to cart
  // 🆕 Helpers para deshabilitar el botón "Add to cart"
  const packMax = product?.packMaxItems ?? 0;

  const requiredGroups = React.useMemo(
    () => (product ? product.options.filter((o) => o.group.required) : []),
    [product]
  );

  const requiredCounts = React.useMemo(() => {
    const m: Record<string, number> = {};
    requiredGroups.forEach((opt) => {
      const gid = opt.group.id;
      const arr = selectedOptions[gid] ?? [];
      m[gid] = Array.isArray(arr) ? arr.length : 0;
    });
    return m;
  }, [requiredGroups, selectedOptions]);

  const totalSelectedRequired = React.useMemo(
    () => Object.values(requiredCounts).reduce((a, b) => a + b, 0),
    [requiredCounts]
  );

  const allRequiredMinsSatisfied = React.useMemo(
    () =>
      requiredGroups.every((opt) => {
        const c = requiredCounts[opt.group.id] || 0;
        return c >= opt.group.minSelectable;
      }),
    [requiredGroups, requiredCounts]
  );

  const withinMaxPerGroup = React.useMemo(
    () =>
      requiredGroups.every((opt) => {
        const c = requiredCounts[opt.group.id] || 0;
        return c <= opt.group.maxSelectable;
      }),
    [requiredGroups, requiredCounts]
  );

  // ✅ Regla de habilitación:
  // - Si hay packMaxItems > 0 ⇒ exigir exactamente esa suma y cumplir mínimos & máximos por grupo
  // - Si NO hay packMaxItems ⇒ exigir mínimos por grupo
  const isAddDisabled = React.useMemo(() => {
    if (!product) return true;
    if (packMax > 0) {
      return !(totalSelectedRequired === packMax && allRequiredMinsSatisfied);
    }
    return !allRequiredMinsSatisfied;
  }, [product, packMax, totalSelectedRequired, allRequiredMinsSatisfied]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({
      packMax,
      requiredCounts,
      totalSelectedRequired,
      allRequiredMinsSatisfied,
      withinMaxPerGroup,
      isAddDisabled,
    });
  }, [
    packMax,
    requiredCounts,
    totalSelectedRequired,
    allRequiredMinsSatisfied,
    withinMaxPerGroup,
    isAddDisabled,
  ]);
  if (isLoading || !product) return <ProductDetailsSkeleton />;

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

          {product.sellPrice !== null &&
          product.sellPrice < product.price &&
          product.sellPrice > 0 ? (
            <>
              <p className="text-2xl text-midnight-900 font-semibold line-through">
                ${product.price.toFixed(2)}
              </p>{" "}
              <p className="text-2xl text-midnight-900 font-semibold mb-6">
                ${product.sellPrice.toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-2xl text-midnight-900 font-semibold mb-6">
              ${product.price.toFixed(2)}
            </p>
          )}

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
                    onSelectionsChange={(selections) => {
                      dispatch(
                        updateItemSelectionsForGroup({
                          id: product.id, // id de la línea en el carrito
                          groupId, // id del OptionGroup que estás editando
                          selections: selections, // [{ optionId, name, count, unitExtra }]
                        })
                      );
                    }}
                    packMaxItems={product.packMaxItems}
                    // 🆕 Reserva mínima de los demás grupos (suma de minSelectable SOLO de los otros grupos requeridos)
                    otherGroupsMinRequired={
                      product.packMaxItems
                        ? product.options.reduce((sum, og) => {
                            if (og.groupId === groupId) return sum;
                            return (
                              sum +
                              (og.group?.required ? og.group.minSelectable : 0)
                            );
                          }, 0)
                        : 0
                    }
                    //Total ya seleccionado en otros grupos (para no pasarse del máximo global)
                    globalSelectedExcludingThis={Object.entries(
                      selectedOptions
                    ).reduce((sum, [gid, arr]) => {
                      if (gid === groupId) return sum;
                      const len = Array.isArray(arr) ? arr.length : 0;
                      return sum + len;
                    }, 0)}
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
                  showImages={opt.group.showImages}
                  onToppingsChange={handleToppingsChange}
                />
              ))}

            {/* Cantidad general y botón */}
            <div>
              <CartCounter
                price={product.sellPrice}
                onQuantityChange={handleQuantityChange}
              />
              <button
                type="submit"
                disabled={isAddDisabled} // 🆕
                className={`w-full mt-4 p-3 text-white font-ArialBold text-xl rounded-full transition shadow-lg
    ${
      isAddDisabled
        ? "bg-midnight-950 opacity-50 cursor-not-allowed"
        : "bg-midnight-950 hover:bg-midnight-900"
    }`} // 🆕
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
