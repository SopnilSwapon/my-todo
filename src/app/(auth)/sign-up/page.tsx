"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Heading1 } from "@/components/ui/Header1";
import { signup } from "@/shared/lib/auth/signup";
import { TFetchError } from "@/shared/lib/Fetch";

interface ISignUpForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export default function Page() {
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const mutation = useMutation({
    mutationFn: signup,
    onError: (error: TFetchError) => {
      if (
        error.detail === "user with this email already exists. (field: email)"
      ) {
        setError(
          "email",
          { message: "User with this email already exists." },
          { shouldFocus: true }
        );
      }
    },

    onSuccess: () => {
      router.push("/sign-in");
      toast.success("Sign up successful");
    },
  });

  const onSubmit = (data: ISignUpForm) => {
    if (!emailRegex.test(data.email)) {
      setError("email", { message: "Invalid email address" });
      return;
    }

    if (data.password.length < 6) {
      setError("password", {
        message: "Password must be at least 6 characters",
      });
      return;
    }

    if (data.password !== data.confirm_password) {
      setError("password", { message: "Passwords do not match" });
      setError("confirm_password", { message: "Passwords do not match" });
      return;
    }

    mutation.mutate({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side image hidden on medium size and below size screen */}

      <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
        <Image
          src="/images/signUpLogo3.png"
          width={600}
          height={400}
          alt="Signup Illustration"
          className="object-contain"
        />
      </div>

      {/* Right side sign up  form contend */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 sm:px-10 py-10">
        <div className="w-full max-w-md">
          <Heading1 title="Create your account" className="text-center" />

          <p className="text-gray-600 mb-9 mt-2 text-[16px] text-center">
            Start managing your tasks efficiently
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* First & last name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register("first_name", {
                  required: "Please enter your first name.",
                })}
                error={errors.first_name?.message}
              />

              <Input
                label="Last Name"
                {...register("last_name", {
                  required: "Please enter your last name.",
                })}
                error={errors.last_name?.message}
              />
            </div>

            <Input
              label="Email"
              type="email"
              {...register("email", { required: "Please enter your email." })}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type="password"
              {...register("password", { required: "6 characters minimum." })}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register("confirm_password", {
                required: "Confirm your password",
              })}
              error={errors.confirm_password?.message}
            />

            <Button loading={mutation.isPending} type="submit">
              Sign Up
            </Button>
          </form>

          <p className="mt-4 text-[16px] text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#5272FF] font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
