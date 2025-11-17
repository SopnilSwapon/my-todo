"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface IProfileForm {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  contact_number: string;
  birthday: string;
  bio: string;
}

export default function Page() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IProfileForm>();

  const mutation = useUpdateProfile(setError);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected?.name) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  const onSubmit = (form: IProfileForm) => {
    mutation.mutate(
      {
        ...form,
        profile_image: file,
      },
      {
        onError: (error) => {
          toast.error(error?.detail || "Something is wrong");
          reset();
        },
        onSuccess: () => {
          toast.success("Profile updated successfully");
          reset();
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6">Account Information</h2>

      {/* Profile Photo */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
          {preview ? (
            <Image src={preview} fill alt="Profile" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <label className="cursor-pointer px-5 py-2 rounded-md bg-[#5272FF] text-white flex items-center gap-2">
          Upload New Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
          />
        </label>
      </div>

      {/*Profile update form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            error={errors.first_name?.message}
            {...register("first_name", { required: "First name is required" })}
          />
          <Input
            label="Last Name"
            error={errors.last_name?.message}
            {...register("last_name", { required: "Last name is required" })}
          />
        </div>

        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          label="Address"
          error={errors.address?.message}
          {...register("address")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Contact Number"
            error={errors.contact_number?.message}
            {...register("contact_number")}
          />
          <Input
            label="Birthday"
            type="date"
            error={errors.birthday?.message}
            {...register("birthday")}
          />
        </div>

        <Input label="Bio" error={errors.bio?.message} {...register("bio")} />

        <div className="flex justify-center  gap-4 mt-6">
          <Button className="max-w-44" loading={mutation.isPending}>
            Save Changes
          </Button>

          <Button className="max-w-44 py-2 cursor-pointer rounded-md bg-[#8CA3CD]! text-black">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
