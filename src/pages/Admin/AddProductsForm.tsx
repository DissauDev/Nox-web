/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesAvailableQuery } from "@/store/features/api/categoriesApi";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/store/features/api/productsApi";
import { Controller, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import OptionGroupsSelector from "./OptionGroupsSelector";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LuImagePlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import { ModalImages } from "@/components/atoms/admin/ModalImages";
import { useGetImagesQuery } from "@/store/features/api/uploadApi";
import { InputNumber } from "@/components/ui/InputNumber";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

// Definición de la interfaz para un producto.
export interface Product {
  packOptionSurcharge: number;
  isOptionItem: boolean;
  id?: number; // opcional en caso de nuevo producto
  name: string;
  price: number;
  sellPrice?: number;
  isCustomizable: boolean;
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any; // Array de ProductOption serializado
  specifications?: string;
  category: string;
  imageLeft?: { url: string; blurHash: string };
  description?: string;
  type: "Seasonal" | "Regular" | "Limited";
  packMaxItems?: number; // máximo de ítems que puede contener el pack (opcional)
}

interface AddProductsFormProps {
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

export default function AddProductsForm({
  onClose,
  product,
}: AddProductsFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
    description: string;
    price: number;
    sellPrice?: number;
    packMaxItems?: number;
    options: unknown;
    category: string;
    imageLeftUrl: string;
    isOptionItem?: boolean;
    packOptionSurcharge?: number;
  }>({
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      sellPrice: product?.sellPrice,
      //@ts-ignore
      category: product?.category.name ?? "",

      imageLeftUrl: product?.imageLeft?.url ?? "",
      options: product?.options?.map((o) => o.groupId) ?? [],

      isOptionItem: product?.isOptionItem ?? false,
      packOptionSurcharge: product?.packOptionSurcharge ?? 0,
      packMaxItems: product?.packMaxItems ?? undefined,
    },
  });

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const { data, isLoading: isLoadingImages } = useGetImagesQuery();
  const images = data?.images ?? [];
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesAvailableQuery();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedServerImage, setSelectedServerImage] = useState<string>("");

  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const loading = creating || updating;

  const [isImageSelectorOpen, setIsImageSelectorOpen] = useState(false);

  const isOption = watch("isOptionItem");
  const packMaxItems = watch("packMaxItems");
  const hasPackMaxItems = packMaxItems !== undefined && packMaxItems !== null;
  // 🆕 Si es opción, limpiar packMaxItems
  useEffect(() => {
    if (isOption) setValue("packMaxItems", undefined);
  }, [isOption, setValue]);

  useEffect(() => {
    if (packMaxItems !== undefined && packMaxItems !== null) {
      setValue("isOptionItem", false);
    }
  }, [packMaxItems, setValue]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name ?? "",
        description: product.description ?? "",
        price: product.price ?? 0,
        sellPrice: product.sellPrice,
        //@ts-ignore
        category: product.category?.name ?? "",
        imageLeftUrl: product.imageLeft?.url ?? "",
        options: product.options?.map((o) => o.groupId) ?? [],
        isOptionItem: product.isOptionItem || false,
        packOptionSurcharge: product.packOptionSurcharge || 0,
        packMaxItems: product.packMaxItems ?? undefined,
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        sellPrice: undefined,
        category: "",
        imageLeftUrl: "",
        options: [],
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: {
    name: string;
    description: string;
    price: number;
    sellPrice?: number;
    category: string;
    imageLeftUrl: string;
    isOptionItem?: boolean;
    packOptionSurcharge?: number;
    packMaxItems?: number;
  }) => {
    if (product?.id) {
      try {
        //@ts-ignore
        await updateProduct({ id: product.id, ...data }).unwrap();
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "✅ Success",
          description: "Save Successfully",
        });
      } catch (err) {
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "❌ Error",
          description: err.message || "error to save product",
        });
      }
    } else {
      // MODO CREACIÓN

      try {
        //@ts-ignore
        await createProduct(data).unwrap();
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "✅ Success",
          description: "Product created successfully",
        });
      } catch (err) {
        toast({
          className:
            "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg p-4",
          title: "❌ Error",
          description: err.message || "error to create product",
        });
      }
    }
    onClose();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-[#15203a] border border-sapphire-700 rounded-3xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <IoMdClose size={18} onClick={onClose} className="cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-1 font-ArialRegular"
            >
              Name
            </label>
            <Input
              {...register("name", { required: "Name is Requiered" })}
              id="name"
              type="text"
              placeholder="Product name"
              className="w-full bg-transparent border border-sapphire-200 rounded-md p-2 text-white"
            />

            {errors.name && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-row w-full space-x-2">
            <div className="w-1/2">
              <label
                htmlFor="price"
                className="block text-sm mb-1 font-ArialRegular"
              >
                Regular price
              </label>
              <Controller
                control={control}
                name="price"
                rules={{ required: "The regular price is Required" }}
                render={({ field }) => (
                  <InputNumber
                    variant="price"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="0.00"
                    className="w-full border p-2 border-sapphire-200 rounded-md text-white"
                  />
                )}
              />

              {errors.price && (
                <span className="text-sm text-red-400 font-ArialRegular">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="w-1/2">
              <label
                htmlFor="sellPrice"
                className="block text-sm mb-1 font-ArialRegular"
              >
                Sell price
              </label>
              <Controller
                control={control}
                name="sellPrice"
                rules={{ required: "The sell price is Required" }}
                render={({ field }) => (
                  <InputNumber
                    variant="price"
                    value={field.value ?? 0}
                    onChange={field.onChange}
                    placeholder="0.00"
                    className="w-full border p-2 border-sapphire-200 rounded-md text-white"
                  />
                )}
              />

              {errors.sellPrice && (
                <span className="text-sm text-red-400 font-ArialRegular">
                  {errors.sellPrice.message}
                </span>
              )}
            </div>
          </div>

          {/* Options JSON */}
          <div>
            <label
              htmlFor="options"
              className="block text-sm mb-1 font-ArialRegular"
            >
              Options ( optional)
            </label>
            {/* @ts-ignore */}
            <OptionGroupsSelector control={control} name="options" />
          </div>

          {/* Specifications */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm mb-1 font-ArialRegular"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={2}
              {...register("description", { required: true })}
              placeholder="e.g. Weight: 200g"
              className="w-full bg-transparent border border-sapphire-200 rounded-md p-2 text-white"
            />
            {errors.description && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.description.message}
              </span>
            )}
          </div>
          {/* 🆕 Usar este producto como opción (checkbox/switch) */}
          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <label className="text-sm font-ArialRegular">
                Use as option (for packs)
              </label>
              <span className="text-xs text-gray-400">
                If enabled, this product can be selected inside boxes/packs.
              </span>
            </div>

            <Controller
              name="isOptionItem"
              control={control}
              render={({ field }) => (
                <Switch
                  className="!bg-gray-800 data-[state=checked]:!bg-sapphire-600"
                  checked={!!field.value}
                  onCheckedChange={(v) => field.onChange(v)}
                />
              )}
            />
          </div>
          {/* 🆕 Switch para habilitar el límite máximo de items */}
          {!isOption && (
            <div className="">
              <div className="flex items-center justify-between">
                <div className="gap-x-3">
                  <label className="text-sm font-ArialRegular">
                    Enable max items for pack
                  </label>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Only for packs/boxes. It limits how many items the pack can
                    contain. It does not limit how many units of this product a
                    customer can buy.
                  </p>
                </div>
                <Switch
                  className="!bg-gray-800 data-[state=checked]:!bg-sapphire-600"
                  checked={hasPackMaxItems}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      // Si no hay valor aún, inicia en 0 para que el input aparezca
                      setValue(
                        "packMaxItems",
                        Number.isFinite(packMaxItems as number)
                          ? packMaxItems
                          : 0,
                        { shouldValidate: true }
                      );
                    } else {
                      // Limpia para deshabilitar el límite
                      setValue("packMaxItems", undefined, {
                        shouldValidate: true,
                      });
                    }
                  }}
                />
              </div>

              {/* Mostrar el input solo si el switch está activo */}
              {hasPackMaxItems && (
                <div className="mt-2">
                  <label className="block text-sm mb-1 font-ArialRegular">
                    Pack max items
                  </label>
                  <Controller
                    control={control}
                    name="packMaxItems"
                    rules={{ min: { value: 1, message: "Must be ≥ 1" } }}
                    render={({ field }) => (
                      <InputNumber
                        variant="integer"
                        value={field.value ?? 0}
                        onChange={(val) => field.onChange(Number(val))}
                        placeholder="e.g. 12"
                        className="w-full border p-2 border-sapphire-200 rounded-md text-white"
                      />
                    )}
                  />
                  {errors.packMaxItems && (
                    <span className="text-sm text-red-400 font-ArialRegular">
                      {errors.packMaxItems.message}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 🆕 Precio para la caja (recargo) — visible solo si está habilitado */}
          {isOption && (
            <div className="mt-2">
              <label className="block text-sm mb-1 font-ArialRegular">
                Pack surcharge (optional)
              </label>
              <Controller
                control={control}
                name="packOptionSurcharge"
                rules={{
                  min: { value: 0, message: "Must be ≥ 0" },
                }}
                render={({ field }) => (
                  <InputNumber
                    variant="price"
                    value={field.value ?? 0}
                    onChange={(val) => field.onChange(val)}
                    placeholder="0.00"
                    className="w-full border p-2 border-sapphire-200 rounded-md text-white"
                  />
                )}
              />
              {errors.packOptionSurcharge && (
                <span className="text-sm text-red-400 font-ArialRegular">
                  {errors.packOptionSurcharge.message}
                </span>
              )}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm mb-1 font-ArialRegular">
              Category
            </label>

            {categoriesLoading && <p>Loading categories...</p>}
            {categoriesError && (
              <p className="text-red-400">Error to load categories</p>
            )}
            {!categoriesLoading &&
              !categoriesError &&
              categories?.length === 0 && <p>No categories to show</p>}

            {!categoriesLoading &&
              !categoriesError &&
              categories?.length > 0 && (
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Selecciona una categoría" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              )}
            {errors.category && (
              <p className="text-sm text-red-400 mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Image Left URL & BlurHash */}
          <div className="flex flex-row w-full space-x-2 justify-between items-center">
            <div className="w-full">
              <label
                htmlFor="imageLeftUrl"
                className="block text-sm mb-1 font-ArialRegular"
              >
                Image URL
              </label>
              <Input
                id="imageLeftUrl"
                type="text"
                {...register("imageLeftUrl", { required: true })}
                placeholder="https://example.com/img.jpg"
                className="w-full bg-transparent border  border-sapphire-200 rounded-md p-2 text-white"
              />
              {errors.imageLeftUrl && (
                <span className="text-sm text-red-400 font-ArialRegular">
                  {errors.imageLeftUrl.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="imageLeftUrl"
                className="block text-sm mb-1 font-ArialRegular "
              >
                Select
              </label>
              <Button
                type="button"
                variant="outline"
                className="flex items-center justify-center w-14 text-sapphire-900 hover:text-sapphire-800"
                onClick={() => setIsImageSelectorOpen(true)}
              >
                <LuImagePlus />
              </Button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-sapphire-500 hover:bg-sapphire-400 font-ArialRegular text-white py-2 px-4 rounded-md transition duration-200"
          >
            {loading
              ? "...Loading"
              : product
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
        <ModalImages
          isOpen={isImageSelectorOpen}
          onClose={() => {
            setIsImageSelectorOpen(false);
            setSelectedServerImage("");
          }}
          images={images}
          loading={isLoadingImages}
          onSelect={(url) => {
            setValue("imageLeftUrl", url, { shouldValidate: true });
            setIsImageSelectorOpen(false);
          }}
        />
      </div>
    </div>
  );
}
