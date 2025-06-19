// src/pages/ResetPassword.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useToast } from "@/hooks/use-toast";
import { useResetPasswordMutation } from "@/store/features/api/userApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@headlessui/react";

// 1) Schema de validación
const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(32, { message: "Password cannot exceed 32 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetFormValues) => {
    try {
      await resetPassword({ token, password: values.password }).unwrap();
      toast({
        title: "Success",
        className: "border-l-4 border-green-500",
        description: "Your password has been reset. You can now log in.",
      });
      form.reset();
      setTimeout(() => navigate("/auth"), 1500);
    } catch (err) {
      toast({
        title: "Error",
        className: "border-l-4 border-red-500",
        description: err.data?.message || err.error || "Reset failed",
      });
    }
  };

  // Si no existe token en la querystring, redirigir a /forgot-password
  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-2">
      <div className="w-full max-w-md rounded-lg ">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Reset Your Passwor
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Nueva contraseña */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        {...field}
                        className="w-full p-3 rounded-full bg-transparent text-white border-gray-600 border focus:border-sapphire-600 transition-colors duration-300"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className=" absolute right-4  top-1/2 -translate-y-1/2 text-white"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Confirmar contraseña */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...field}
                        className="w-full p-3 mb-4 rounded-full bg-transparent text-white border-gray-500 border focus:outline-none focus:border-sapphire-600 transition-colors duration-300"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                    >
                      {showConfirmPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Botón de envío */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-full ${
                  isLoading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-sapphire-900 hover:bg-sapphire-800"
                } text-white font-bold transition-colors duration-300`}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
