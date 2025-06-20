import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";
import { FaMapMarkerAlt, FaStore } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

import { Controller } from "react-hook-form";
import { CheckoutFormValues } from "./PaymentForm";

export const CheckOutOrderDetails: React.FC = () => {
  const addressState = useSelector((s: RootState) => s.address);
  const orderState = useSelector((s: RootState) => s.orders);
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="space-y-8">
      {/* Pickup & Address */}
      <div className="bg-white p-6 rounded-lg shadow border text-sapphire-900">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <FaStore size={28} className="mr-2" />
            <span className="font-ArialBold">
              {addressState.savedAddress?.city}
            </span>
          </div>
          <div className="flex items-center">
            <MdAccessTime size={28} className="mr-2" />
            <span className="font-ArialRegular">
              Today — {addressState.savedAddress?.type}
            </span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt size={28} className="mr-2" />
            <p className="line-clamp-2 max-w-[200px]">
              {addressState.savedAddress?.fullAddress}
            </p>
          </div>
        </div>

        {/* Datos del cliente */}
        <div className="space-y-2">
          <div>
            <label className="block mb-1">Phone Number</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Required",
                pattern: {
                  // opcional: validación extra contra el regex
                  value: /^\+1 \(\d{3}\) \d{3}-\d{4}$/,
                  message: "Invalid US phone number",
                },
              }}
              render={({ field }) => (
                <InputMask mask="+1 (999) 999-9999" {...field}>
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      type="tel"
                      className="w-full p-2 border rounded"
                      placeholder="+1 (555) 123-4567"
                    />
                  )}
                </InputMask>
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Name</label>
            <input
              {...register("name", { required: "Required" })}
              className="w-full p-2 border rounded"
              defaultValue={""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mi Bolsa */}
      <div className="bg-white p-6 rounded-lg shadow border text-sapphire-900">
        <h2 className="text-2xl font-ArialBold mb-4 text-sapphire-600">
          My Bag
        </h2>
        <div className="space-y-3 border-b pb-4">
          <textarea
            {...register("note")}
            className="w-full p-2 border rounded"
            placeholder="Add a personal note to go on the box."
          />
          {orderState.products.map((p) => (
            <div key={p.id}>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="size-20 object-cover mr-2 rounded-full "
                  />
                  <div>
                    <p className="font-ArialBold">{p.name}</p>
                    <p className="text-xs font-bold text-gray-700">
                      ${p.price}
                    </p>
                    {p.options &&
                      p.options.map((ops) => (
                        <div className="mt-1 text-gray-400">
                          <p key={ops.id} className="text-xs font-semibold">
                            {ops.name} (${ops.extraPrice})
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <span className="font-ArialBold">Qty: {p.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
