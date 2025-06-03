// src/components/CouponModal.tsx
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Listbox } from "@headlessui/react";

import {
  Coupon,
  useCreateCouponMutation,
  useUpdateCouponMutation,
} from "@/store/features/api/couponsApi";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { TabType } from "@/pages/Admin/types/cupons";
import { toast } from "@/hooks/use-toast";

interface FormValues {
  code: string;
  type: "PERCENTAGE" | "AMOUNT";
  discountValue: number;
  expiresAt?: string;
  isLimited: boolean;
  usageLimit?: number;
  status: TabType;
}

interface CouponModalProps {
  coupon: Coupon | null;
  onClose: () => void;
  onSave: (c: Coupon) => void;
}

const statusOptions: { value: TabType; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "deactivated", label: "Deactivated" },
  { value: "expired", label: "Expired" },
];

const CouponModal: React.FC<CouponModalProps> = ({
  coupon,
  onClose,
  onSave,
}) => {
  const isNew = coupon === null;

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      code: coupon?.code || "",
      type: coupon?.type || "PERCENTAGE",
      discountValue: coupon?.discountValue || 0,
      expiresAt: coupon?.expiresAt?.slice(0, 10) || "",
      isLimited: coupon?.isLimited || false,
      usageLimit: coupon?.usageLimit,
      status: coupon?.status || "active",
    },
  });

  const [
    createCoupon,
    { data: created, error: createError, isLoading: creating },
  ] = useCreateCouponMutation();
  const [
    updateCoupon,
    { data: updated, error: updateError, isLoading: updating },
  ] = useUpdateCouponMutation();

  // Cuando la mutación triunfa, avisar al padre y cerrar modal
  useEffect(() => {
    const result = isNew ? created : updated;
    if (result) {
      onSave(result);
      onClose();
    }
  }, [created, updated]);

  const onSubmit = (data: FormValues) => {
    const payload = {
      code: data.code.trim(),
      type: data.type,
      discountValue: data.discountValue,
      expiresAt: data.expiresAt || null,
      isLimited: data.isLimited,
      usageLimit: data.isLimited ? data.usageLimit : null,
    };
    if (isNew) {
      try {
        createCoupon(payload);
        toast({
          title: "Successfull Created",
          content: "The cupon has been created",
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      updateCoupon({ id: coupon!.id, data: payload });
    }
  };

  const isBusy = creating || updating;
  const limited = watch("isLimited");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-gray-900 rounded-lg p-6 w-full max-w-md">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isNew ? "New Coupon" : "Edit Coupon"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <IoMdClose size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Code */}
          <div>
            <label className="block text-sm font-medium">Code</label>
            <input
              {...register("code", { required: "Code is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              disabled={isBusy}
            />
            {errors.code && (
              <p className="text-red-600 text-sm mt-1">{errors.code.message}</p>
            )}
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium">Discount Type</label>
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="mt-1 w-full border border-gray-300 rounded-md p-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="AMOUNT">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium">
              {watch("type") === "PERCENTAGE"
                ? "Discount (%)"
                : "Discount Amount"}
            </label>
            <input
              type="number"
              step="0.01"
              {...register("discountValue", {
                required: "Value is required",
                valueAsNumber: true,
                min: { value: 0.01, message: "Must be > 0" },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              disabled={isBusy}
            />
            {errors.discountValue && (
              <p className="text-red-600 text-sm mt-1">
                {errors.discountValue.message}
              </p>
            )}
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="date"
              {...register("expiresAt")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              disabled={isBusy}
            />
          </div>

          {/* Limited Use */}
          <div className="flex items-center">
            <Controller
              name="isLimited"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="checkbox"
                  id="limitedUse"
                  className="
                    h-6 w-6
                    accent-purple-800
                    border-gray-300
                    rounded
                    focus:ring-purple-800
                    transition duration-150
                  "
                  disabled={isBusy}
                />
              )}
            />
            <label htmlFor="limitedUse" className="ml-2 text-sm font-medium">
              Limited Use
            </label>
          </div>

          {/* Usage Limit */}
          {limited && (
            <div>
              <label className="block text-sm font-medium">Usage Limit</label>
              <input
                type="number"
                {...register("usageLimit", {
                  required: "Usage limit required",
                  valueAsNumber: true,
                  min: { value: 1, message: "At least 1" },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                disabled={isBusy}
              />
              {errors.usageLimit && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.usageLimit.message}
                </p>
              )}
            </div>
          )}

          {/* Status (edit only) */}
          {!isNew && (
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Listbox value={field.value} onChange={field.onChange}>
                    <Listbox.Button className="w-full border border-gray-300 rounded-md p-2 text-left">
                      {
                        statusOptions.find((o) => o.value === field.value)
                          ?.label
                      }
                    </Listbox.Button>
                    <Listbox.Options className="mt-1 border border-gray-300 rounded-md bg-white">
                      {statusOptions.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          value={option.value}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 ${
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {option.label}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Listbox>
                )}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={isBusy}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              disabled={isBusy}
            >
              {isNew
                ? creating
                  ? "Creating..."
                  : "Create"
                : updating
                ? "Saving..."
                : "Save"}
            </button>
          </div>

          {(() => {
            const err = createError || updateError;
            if (!err) return null;
            // 1) Si viene de fetchBaseQuery: err.data?.message
            const fetchErr = err.data?.message;
            if (fetchErr)
              return <p className="text-red-500 text-sm mt-2">{fetchErr}</p>;
            // 2) Si es SerializedError: err.error
            const serMsg = err.error;
            if (serMsg)
              return <p className="text-red-500 text-sm mt-2">{serMsg}</p>;
            // 3) fallback
            return <p className="text-red-500 text-sm mt-2">Fail to create</p>;
          })()}
        </form>
      </div>
    </div>
  );
};

export default CouponModal;
