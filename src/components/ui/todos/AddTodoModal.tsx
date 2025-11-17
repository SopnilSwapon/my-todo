"use client";

import { IAddTodoPayload, useAddTodo } from "@/hooks/useAddTodo";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import { Heading1 } from "../Header1";
import { toast } from "react-toastify";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export default function AddTodoModal({ open, onClose }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IAddTodoPayload>();

  const { mutate, isPending } = useAddTodo(setError);

  const onSubmit = (data: IAddTodoPayload) => {
    const { title, date, description } = data;

    mutate(
      { title, date, description, priority: data.priority[0] },
      {
        onError: (error) => {
          toast.error(error.message || "Something went wrong");
        },
        onSuccess: () => {
          toast.success("Todo created successful!");
          reset();
          onClose();
        },
      }
    );
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
            <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <Heading1
                  className="text-[16px]! text-black! font-semibold!"
                  title="Add New Task"
                />
                <button
                  onClick={onClose}
                  className="text-sm text-black! cursor-pointer underline font-semibold"
                >
                  Go Back
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Title"
                  error={errors.title?.message}
                  {...register("title", { required: "Title is required" })}
                />

                <Input
                  label="Date"
                  type="date"
                  error={errors.date?.message}
                  {...register("date", { required: "Date is required" })}
                />

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <div className="flex gap-5 mt-2">
                    <label className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-red-500">Extreme</span>
                      <input
                        type="checkbox"
                        value="extreme"
                        {...register("priority")}
                      />
                    </label>

                    <label className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>

                      <span className="text-green-600">Moderate</span>
                      <input
                        type="checkbox"
                        value="moderate"
                        {...register("priority")}
                      />
                    </label>

                    <label className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>

                      <span className="text-yellow-500">Low</span>
                      <input
                        type="checkbox"
                        value="low"
                        {...register("priority")}
                      />
                    </label>
                  </div>
                  {errors.priority && (
                    <p className="text-xs text-[#EE0039] mt-1">
                      {errors.priority.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-black font-medium">
                    Task Description
                  </label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    required
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    placeholder="Start writing here..."
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <Button className="w-22!" type="submit" loading={isPending}>
                    Done
                  </Button>

                  <Button
                    type="button"
                    className="bg-red-500 w-22! hover:bg-red-600"
                    onClick={onClose}
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
