"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { login } from "@/lib/api/auth";
import { Heading1 } from "@/components/ui/Header1";

interface ILoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}
interface ILoginResponse {
  access: string;
  refresh: string;
}

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      // Set Error for wrong Credential
      if (
        error.message === "No active account found with the given credentials"
      ) {
        setError(
          "email",
          {
            message: "Email or password incorrect",
          },
          { shouldFocus: true }
        );
        setError("password", {
          message: "Email or password incorrect",
        });
      }
      toast.error(error.message || "Something is wrong");
    },

    onSuccess: (data: ILoginResponse) => {
      localStorage.setItem("access_token", data.access);
      router.push("/dashboard");
      toast.success("Login successful");
    },
  });

  const onSubmit = (data: ILoginFormData) => {
    const { email, password } = data;
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex">
      {/*Left side login image */}
      <div className="w-1/2 bg-blue-50 flex items-center justify-center">
        <Image
          src="/images/loginLogo.png"
          width={600}
          height={400}
          alt="Login Illustration"
        />
      </div>

      {/*Right side Login form */}
      <div className="w-1/2 flex items-center justify-center px-10">
        <div className="w-full max-w-md">
          <Heading1 title="Log in to your account" className="text-center" />

          <p className="text-gray-600 mb-9 mt-2 text-[16px] text-center">
            Start managing your tasks efficiently
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={errors.email?.message as string}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                error={errors.password?.message as string}
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute right-3 ${
                  errors.password?.message ? "top-1/2" : "top-3/5"
                }  cursor-pointer text-[#5272FF]`}
              >
                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  {...register("rememberMe")}
                  className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>

              {/* Forgot Password */}
              <Link
                href="#/"
                className="text-sm text-[#5272FF] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button loading={mutation.isPending} type="submit">
              Log In
            </Button>
          </form>

          <p className="mt-4 text-[16px] text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#5272FF] font-medium">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
