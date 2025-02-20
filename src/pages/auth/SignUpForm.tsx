import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@headlessui/react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must contain at least 2 characters long." })
    .max(20, { message: "Username cannot exceed 20 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters" }),
});

const SignUpForm = () => {
  const { toast } = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
        title: "User register complete",
        description: "Friday, February 10, 2023 at 5:57 PM",
    })
    console.log("Submiting sign-up");
    console.log(values);
    form.reset();
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    className="w-full p-3 mb-4 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage className="pb-2 pl-4" />
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
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="w-full p-3 mb-4 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage className="pb-2 pl-4" />
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
                    className="w-full p-3 mb-4 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-transparent focus:outline-none focus:border-purple-500 transition-colors duration-300"
                  />
                </FormControl>
                <FormMessage className="pb-2 pl-4" />
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
