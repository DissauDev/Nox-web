import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
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
import { MdOutlineDone } from "react-icons/md";
import { loginSuccess } from "@/store/features/slices/authSlice";
import { useDispatch } from "react-redux";
import { useCreateUserMutation } from "@/store/features/api/userApi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "name must be at least 2 characters long." })
    .max(20, { message: "name cannot exceed 20 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  subscribeEmails: z.boolean().default(false),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeTerms: false,
      subscribeEmails: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      const data = { ...values, role: "USER" };
      const { user, accessToken, refreshToken } = await createUser(
        data
      ).unwrap();

      toast({
        title: "User register complete",
        className: "border-l-4 border-green-500",
        description: "Form submitted successfully.",
      });
      dispatch(
        loginSuccess({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          accessToken,
          refreshToken,
        })
      );
      form.reset();
      navigate("/account");
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        className: "border-l-4 border-red-500",
        variant: "destructive",
        description: err.data?.message || err.error || "Registration failed.",
      });
    }
  }

  return (
    <div>
      <h2 className="text-2xl text-center text-white mb-6 font-bold">
        Create an Account
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    placeholder="name"
                    {...field}
                    className="w-full p-3 mb-4 rounded-full bg-transparent text-white border-gray-500
                    border  focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="w-full p-3 mb-4 rounded-full bg-transparent text-white border-gray-500
                     border  focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className="w-full p-3 mb-4 rounded-full bg-transparent text-white border-gray-500
                    border  focus:outline-none focus:border-purple-500 transition-colors duration-300"
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
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="mb-4 flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  {/* Input oculto para manejar el estado */}
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="hidden"
                  />
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`w-6 h-6 flex-shrink-0 border-2 rounded transition-all duration-200 flex justify-center items-center ${
                      field.value
                        ? "bg-purple-500 border-purple-500"
                        : "bg-transparent border-gray-500"
                    }`}
                  >
                    {field.value && (
                      <MdOutlineDone className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                  <span className="text-white text-sm">
                    By checking this box, I acknowledge that I have read and
                    agree to the{" "}
                    <strong
                      onClick={() => navigate("/terms")}
                      className="hover:cursor-pointer hover:text-gray-300 underline"
                    >
                      Nox Terms and Conditions
                    </strong>
                    .
                  </span>
                </label>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscribeEmails"
            render={({ field }) => (
              <FormItem className="mb-4 flex items-center space-x-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  {/* Input oculto para manejar el estado */}
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className="hidden"
                  />
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`w-6 h-6 flex-shrink-0 border-2 rounded transition-all duration-200 flex justify-center items-center ${
                      field.value
                        ? "bg-purple-500 border-purple-500"
                        : "bg-transparent border-gray-500"
                    }`}
                  >
                    {field.value && (
                      <MdOutlineDone className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                  <span className="text-white text-sm">
                    I would like to subscribe to emails to receive the latest
                    news and offers.
                  </span>
                </label>
              </FormItem>
            )}
          />

          {/* Botón de Envío con Estado de Carga */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-full ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold transition "
            } text-white font-ArialBold transition-colors duration-300 shadow-md`}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <div className="flex items-center justify-center mt-6">
            <a
              onClick={() => navigate("/privacy-policy")}
              className="text-gray-300  text-center hover:cursor-pointer text-sm underline"
            >
              Privacy Policy
            </a>
            <a className="text-gray-300  text-center mx-1">&</a>
            <a
              onClick={() => navigate("/terms")}
              className="text-gray-300  hover:cursor-pointer text-center underline"
            >
              Terms & Conditions
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
