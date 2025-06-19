import React from "react";
import { FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { useUpdateUserMutation } from "@/store/features/api/userApi";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { updateUserName } from "@/store/features/slices/authSlice";

interface FormValues {
  name: string;
}

export const AccountDetails: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
    },
  });
  const onSubmit = async (data: FormValues) => {
    if (!user?.id) return;

    try {
      await updateUser({ id: user.id, data }).unwrap();
      toast({
        title: "Success",
        description: "Your display name has been updated.",
        className: "border-l-4 border-green-500",
      });
      dispatch(updateUserName(data.name));
    } catch (err) {
      toast({
        title: "Update Failed",
        description: err?.data?.message || err?.error || "An error occurred.",
        className: "border-l-4 border-red-500",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center mb-8 text-gray-800">
        <FiUser className="w-8 h-8 text-gray-400 mr-3" />
        <h2 className="text-2xl font-semibold">Account Details</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Display Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Display Name
          </label>
          <Input
            id="name"
            {...register("name", {
              required: "Display name is required",

              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            className="w-full border border-gray-300 rounded px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sapphire-600"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 font-ArialRegular">
              {errors.name.message}
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            This will be how your name will be displayed in the account section
            and in reviews.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-sapphire-950 text-white rounded hover:bg-sapphire-900 transition font-ArialBold"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Change Password Section */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Want to change your password?
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          You can update your password anytime by visiting the password change
          page.
        </p>
        <button
          onClick={() => navigate("/reset-password")}
          className="text-sapphire-900 font-medium hover:underline"
        >
          Change Password →
        </button>
      </div>
    </div>
  );
};
