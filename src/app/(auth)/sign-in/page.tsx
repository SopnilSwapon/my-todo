
"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { login } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { Heading1 } from "@/components/ui/Header1";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => router.push("/dashboard"),
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="w-1/2 bg-blue-50 flex items-center justify-center">
        <Image
          src="/images/loginLogo.png"
          width={600}
          height={400}
          alt="Login Illustration"
        />
      </div>

      {/* RIGHT FORM */}
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

            <Input
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={errors.password?.message as string}
            />

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              {/* Remember Me */}
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
