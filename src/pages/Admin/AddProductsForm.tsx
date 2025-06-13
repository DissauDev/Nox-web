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

// Definición de la interfaz para un producto.
export interface Product {
  id?: number; // opcional en caso de nuevo producto
  name: string;
  price: number;
  sellPrice?: number;
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any; // Array de ProductOption serializado
  specifications?: string;
  category: string;
  imageLeft?: { url: string; blurHash: string };
  description?: string;
  type: "Seasonal" | "Regular" | "Limited";
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
    control,
    formState: { errors },
  } = useForm<{
    name: string;
    description: string;
    price: number;
    sellPrice?: number;

    options: unknown;
    category: string;
    imageLeftUrl: string;
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
    },
  });
  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetCategoriesAvailableQuery();

  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const loading = creating || updating;

  const onSubmit = async (data: {
    name: string;
    description: string;
    price: number;
    sellPrice?: number;
    category: string;
    imageLeftUrl: string;
  }) => {
    if (product?.id) {
      // MODO EDICIÓN

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
      <div className="w-full max-w-md bg-[#0c0014] border border-purple-800 rounded-3xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <IoMdClose size={18} onClick={onClose} className="cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              {...register("name", { required: "Name is Requiered" })}
              id="name"
              type="text"
              placeholder="Product name"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
            {errors.name && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm mb-1">
              Price
            </label>
            <input
              {...register("price", {
                required: "The price is Required",
                valueAsNumber: true,
              })}
              id="price"
              step="any"
              type="number"
              placeholder="0.00"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
              required
            />
            {errors.price && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Sell Price */}
          <div>
            <label htmlFor="sellPrice" className="block text-sm mb-1">
              Sell Price (optional)
            </label>
            <input
              step="any"
              id="sellPrice"
              type="number"
              {...register("sellPrice", { valueAsNumber: true })}
              placeholder="0.00"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
            {errors.sellPrice && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.sellPrice.message}
              </span>
            )}
          </div>

          {/* Options JSON */}
          <div>
            <label htmlFor="options" className="block text-sm mb-1">
              Options ( optional)
            </label>
            {/* @ts-ignore */}
            <OptionGroupsSelector control={control} name="options" />
          </div>

          {/* Specifications */}
          <div>
            <label htmlFor="description" className="block text-sm mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={2}
              {...register("description", { required: true })}
              placeholder="e.g. Weight: 200g"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
            {errors.description && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>

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
          <div>
            <label htmlFor="imageLeftUrl" className="block text-sm mb-1">
              Image URL
            </label>
            <input
              id="imageLeftUrl"
              type="text"
              {...register("imageLeftUrl", { required: true })}
              placeholder="https://example.com/img.jpg"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
            {errors.imageLeftUrl && (
              <span className="text-sm text-red-400 font-ArialRegular">
                {errors.imageLeftUrl.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {loading
              ? "...Loading"
              : product
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
