"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Heading1 } from "./Header1";
import Input from "./Input";
import Button from "./Button";
import { useChangePassword } from "@/hooks/profile/useChangePassword";

interface IProps {
  isPasswordModalOpen: boolean;
  closeChangePasswordModalFunc: () => void;
}

interface IChangePasswordPayload {
  old_password: string;
  new_password: string;
}

export default function ChangePasswordModal({
  isPasswordModalOpen,
  closeChangePasswordModalFunc,
}: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IChangePasswordPayload>();

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: IChangePasswordPayload) => {
    const { old_password, new_password } = data;
    if (old_password === new_password) {
      setError("new_password", {
        type: "manual",
        message: "New password must be different from old password",
      });
      return;
    } else if (new_password.length < 6) {
      setError("new_password", {
        type: "manual",
        message: "New password must be at least 6 characters",
      });
      return;
    }

    mutate(
      { old_password, new_password },
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          if (
            error.detail === "Old password is incorrect. (field: old_password)"
          ) {
            setError("old_password", {
              type: "server",
              message: "Old password is incorrect.",
            });
            toast.error(error?.detail || "Something went wrong");
            return;
          }
          toast.error(error?.details || "Something went wrong");
        },
        onSuccess: () => {
          toast.success("Password changed successfully!");
          reset();
          closeChangePasswordModalFunc();
        },
      }
    );
  };

  return (
    <Transition appear show={isPasswordModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={closeChangePasswordModalFunc}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <Heading1
                  className="text-[16px] text-black font-semibold"
                  title="Change Password"
                />
                <button
                  onClick={closeChangePasswordModalFunc}
                  className="text-sm cursor-pointer underline font-semibold text-gray-700"
                >
                  Go Back
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Old Password"
                  type="password"
                  error={errors.old_password?.message}
                  {...register("old_password", {
                    required: "Old password is required",
                  })}
                />

                <Input
                  label="New Password"
                  type="password"
                  error={errors.new_password?.message}
                  {...register("new_password", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <div className="flex gap-3 mt-5">
                  <Button type="submit" loading={isPending}>
                    Change Password
                  </Button>

                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={closeChangePasswordModalFunc}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
