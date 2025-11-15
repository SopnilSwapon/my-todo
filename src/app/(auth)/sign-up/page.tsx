"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { signup } from "@/lib/api/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Heading1 } from "@/components/ui/Header1";

interface ISignUpForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface IAPIError {
  message?: string;
  detail?: string;
}

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignUpForm>();

  const mutation = useMutation({
    mutationFn: signup,
    onError: (error: IAPIError) => {
      // Set error if current email already registered
      if (
        error.detail === "user with this email already exists. (field: email)"
      ) {
        setError(
          "email",
          {
            message: "User with this email already exists.",
          },
          { shouldFocus: true }
        );
      }
    },
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  const onSubmit = (data: ISignUpForm) => {
    // valid email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setError("email", { message: "Invalid email address" });
      return;
    }

    // password length check
    if (data.password.length < 6) {
      setError("password", {
        message: "Password must be at least 6 characters",
      });
      return;
    }

    // passwords match
    if (data.password !== data.confirm_password) {
      setError(
        "password",
        {
          message: "Passwords do not match.",
        },
        { shouldFocus: true }
      );
      setError("confirm_password", {
        message: "Passwords do not match.",
      });
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
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="w-1/2 bg-blue-50 flex items-center justify-center">
        <Image
          src="/images/signUpLogo3.png"
          width={600}
          height={400}
          alt="Signup Illustration"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-1/2 flex items-center justify-center px-10">
        <div className="w-full max-w-md">
          <Heading1 title="Create your account" className="text-center" />
          <p className="text-gray-600 mb-9 mt-2 text-[16px] text-center">
            Start managing your tasks efficiently
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register("first_name", {
                  required: "Please enter a valid name format.",
                })}
                error={errors.first_name?.message as string}
              />
              <Input
                label="Last Name"
                {...register("last_name", {
                  required: "Please enter a valid name format.",
                })}
                error={errors.last_name?.message as string}
              />
            </div>

            <Input
              label="Email"
              type="email"
              {...register("email", {
                required: "Please enter a valid email format.",
              })}
              error={errors.email?.message as string}
            />

            <Input
              label="Password"
              type="password"
              {...register("password", { required: "6 characters minimum." })}
              error={errors.password?.message as string}
            />

            <Input
              label="Confirm Password"
              type="password"
              {...register("confirm_password", {
                required: "Confirm your password",
              })}
              error={errors.confirm_password?.message as string}
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
