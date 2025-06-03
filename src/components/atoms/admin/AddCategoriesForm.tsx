/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IoMdClose } from "react-icons/io";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Category } from "@/types/system";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/features/api/categoriesApi";

interface AddCategoryFormProps {
  onClose: () => void;
  onSave: (category: Category) => void;
  category?: Category;
}

const categorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  shortDescription: z.string().nonempty("Short desc is required"),
  longDescription: z.string().nonempty("Long desc is required"),
  onCarousel: z.boolean(),
  avaible: z.enum(["AVAILABLE", "DISABLED", "OUT_OF_STOCK"]),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function AddCategoryForm({
  onClose,
  onSave,
  category,
}: AddCategoryFormProps) {
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      imageUrl: category?.imageUrl ?? "",
      shortDescription: category?.shortDescription ?? "",
      longDescription: category?.longDescription ?? "",
      onCarousel: category?.onCarousel ?? false,
      avaible: category?.status ?? "AVAILABLE",
    },
  });

  const onSubmit = async (data: CategoryFormData) => {
    try {
      let saved: Category;
      if (category?.id) {
        // Modo edición
        //@ts-ignore
        saved = await updateCategory({ id: category.id, ...data }).unwrap();
      } else {
        // Modo creación
        saved = await createCategory(data).unwrap();
      }
      // opcional: avisar al componente padre
      onSave?.(saved);
      onClose();
    } catch (err) {
      // aquí ya RTK Query ha llenado createError o updateError
      console.error("Error saving category:", err);
    }
  };

  return (
    <>
      {/* estilos del scrollbar */}
      <style>{`
         .scroll-container::-webkit-scrollbar { width: 1px !important; height: 1px !important; }
        .scroll-container::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); }
        .scroll-container::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.5); border-radius: 2px; }
        .scroll-container { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.5) rgba(255,255,255,0.1); }
      `}</style>

      {/* Un único wrapper, que en móvil es modal y en escritorio es inline */}
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50
          md:static md:bg-transparent md:p-0 md:inset-auto md:justify-center md:items-center
        `}
      >
        <div className="scroll-container max-h-[calc(100vh-2rem)] overflow-y-auto w-full md:max-w-md flex justify-center">
          <div className="w-full bg-[#0c0014] border border-purple-800 rounded-3xl p-6 text-white overflow-x-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-ArialBold">
                {category ? "Edit Category" : "Add New Category"}
              </h2>
              <IoMdClose
                size={20}
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Category name"
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm mb-1">
                  Image URL
                </label>
                <Input
                  id="imageUrl"
                  {...register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
                  className="w-full"
                />
                {errors.imageUrl && (
                  <p className="text-red-400 text-sm">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label
                  htmlFor="shortDescription"
                  className="block text-sm mb-1"
                >
                  Short Description
                </label>
                <Textarea
                  id="shortDescription"
                  {...register("shortDescription")}
                  rows={2}
                  placeholder="Brief description"
                  className="w-full"
                />
                {errors.shortDescription && (
                  <p className="text-red-400 text-sm">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              {/* Long Description */}
              <div>
                <label htmlFor="longDescription" className="block text-sm mb-1">
                  Long Description
                </label>
                <Textarea
                  id="longDescription"
                  {...register("longDescription")}
                  rows={4}
                  placeholder="Detailed description"
                  className="w-full"
                />
                {errors.longDescription && (
                  <p className="text-red-400 text-sm">
                    {errors.longDescription.message}
                  </p>
                )}
              </div>

              {/* On Carousel */}
              <div className="flex items-center space-x-3">
                <label htmlFor="onCarousel" className="text-sm">
                  On Carousel
                </label>
                <Controller
                  name="onCarousel"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="onCarousel"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="!bg-gray-800 data-[state=checked]:!bg-pink-600"
                    />
                  )}
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="avaible" className="block text-sm mb-1">
                  Status
                </label>
                <Controller
                  name="avaible"
                  control={control}
                  defaultValue={category?.status ?? "AVAILABLE"}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="avaible" className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AVAILABLE">Available</SelectItem>
                        <SelectItem value="DISABLED">Disabled</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700"
                disabled={(isCreating || isUpdating) && true}
              >
                {isCreating || isUpdating
                  ? "...Loading"
                  : category
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
