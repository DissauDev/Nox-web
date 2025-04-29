import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@headlessui/react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSuccess } from "@/store/features/slices/authSlice";

// Esquema de validación para el formulario de Sign In
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
});

// Componente SignInForm
const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    setTimeout(() => {
      console.log("Submitting sign-in:", values);
      toast({
        title: "Sign in complete",
        description: "Form submitted successfully.",
      });
      dispatch(authSuccess({ email: values.email }));
      form.reset();
      setLoading(false);
    }, 2000);
    navigate("/dashboard");
    // navigate("/my-account");
  }

  return (
    <div>
      <h2 className="text-2xl text-center text-white mb-6 font-bold">
        Welcome Back
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="w-full p-3 mb-4 rounded-full bg-transparent text-white border-gray-500 border focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="w-full p-3 mb-4 rounded-full bg-transparent text-white border-gray-500 border focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="items-center justify-center mb-6 flex font-ArialBold text-sm">
            <button
              onClick={() => navigate("/reset-password")}
              className="text-mustard-yellow-400 text-center hover:text-mustard-yellow-500"
            >
              Forget your password ?
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
            } text-white font-bold transition-colors duration-300 shadow-lg`}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </Form>
    </div>
  );
};

// Componente principal AuthPage que alterna entre Sign In y Sign Up
const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="relative flex items-center justify-center p-6">
      <div className="max-w-md w-full p-8 overflow-hidden">
        <div className="relative z-10">
          {/* Toggle estilizado */}
          <div className="relative w-full flex items-center justify-between bg-transparent border-gray-500 border rounded-full p-1 mb-8">
            {/* Indicador deslizante con gradiente */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full transition-transform duration-300 ${
                isSignUp ? "translate-x-full" : "translate-x-0"
              }`}
            ></div>
            <button
              onClick={() => setIsSignUp(false)}
              className="flex-1 text-center py-2 text-white font-semibold relative z-10 transition-colors duration-300"
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className="flex-1 text-center py-2 text-white font-semibold relative z-10 transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>

          {isSignUp ? <SignUpForm /> : <SignInForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
