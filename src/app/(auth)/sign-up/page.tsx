"use client";

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { signup } from "@/lib/api/auth";
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
    mutationFn: signup,
    onSuccess: () => router.push("/sign-in"),
  });

  const onSubmit = (data: any) => mutation.mutate(data);

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
          <Heading1 title="Create your account" className="text-center"/>
          <p className="text-gray-600 mb-9 mt-2 text-[16px] text-center">Start managing your tasks efficiently</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="First Name" 
                {...register("firstName", { required: "Please enter a valid name format." })} 
                error={errors.firstName?.message as string} 
              />
              <Input 
                label="Last Name" 
                {...register("lastName", { required: "Please enter a valid name format." })} 
                error={errors.lastName?.message as string} 
              />
            </div>

            <Input 
              label="Email"
              type="email"
              {...register("email", { required: "Please enter a valid email format." })}
              error={errors.email?.message as string}
            />

            <Input 
              label="Password"
              type="password"
              {...register("password", { required: "4 characters minimum." })}
              error={errors.password?.message as string}
            />

            <Input 
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", { required: "Confirm your password" })}
              error={errors.confirmPassword?.message as string}
            />

            <Button loading={mutation.isPending} type="submit">
              Sign Up
            </Button>
          </form>

          <p className="mt-4 text-[16px] text-center">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#5272FF] font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
