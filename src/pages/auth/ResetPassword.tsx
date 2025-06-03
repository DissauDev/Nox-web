import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "@/store/features/api/userApi";
import { toast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsError(true);
      return;
    }

    setIsError(false);

    try {
      await forgotPassword({ email }).unwrap();
      setIsSuccess(true);
      toast({
        title: "Form has send correctly",
        className: "border-l-4 border-green-500",
        description: "Form submitted successfully.",
      });
    } catch (error) {
      setIsError(true);
      toast({
        title: "Fail to send Link",
        className: "border-l-4 border-red-500",
        description: error.data.message,
      });
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg p-8">
          <h1 className="text-3xl font-ArialBold text-gray-900">
            Success! Password link has been sent.
          </h1>
          <p className="mt-4 text-lg text-gray-700 font-ArialRegular">
            You should receive an email within a few minutes to{" "}
            <strong>{email}</strong> with a link to reset your password.
          </p>
          <div className="my-6">
            <button
              className="text-xl text-pompadour-900 font-ArialBold underline"
              onClick={() => {
                navigate("/auth");
              }}
            >
              Continue to login
            </button>
          </div>
          <p className="text-lg text-gray-900 font-ArialRegular">
            Didn&apos;t receive the link?
          </p>
          <button
            className="bg-grape-900 w-full my-4 p-2 rounded-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <h1 className="font-ArialRegular">
              {isLoading ? "Sending..." : "Send again"}
            </h1>
          </button>
          {isError && (
            <p className="text-red-500 text-center mt-2">
              Failed to send reset link. Please try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg p-8">
        <h1 className="text-4xl font-bold text-purple-900">
          Reset your password
        </h1>
        <p className="mt-2 text-lg text-purple-900">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 relative">
          <div className="relative">
            {isError && (
              <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 h-6 w-6" />
            )}
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full max-w-xs h-12 rounded-full text-gray-800 border border-gray-500
                 focus:border-gray-500 pl-10 pr-32 mx-auto ${
                   isError ? "border-red-500" : ""
                 }`}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="absolute right-8 top-0 h-12 rounded-full bg-purple-900 px-6
              font-ArialBold text-white hover:bg-purple-800 disabled:opacity-50"
            >
              {isLoading ? "Sending" : "Submit"}
            </Button>
          </div>

          {isError && (
            <p className="mt-2 text-sm text-red-500">
              Email is not valid or request failed.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
