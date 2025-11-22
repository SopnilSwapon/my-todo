"use client";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "../Button";
import Input from "../Input";
import { Heading1 } from "../Header1";
import { useUpdateTodo } from "@/hooks/todos/useUpdateTodo";
import { TTodo, QK_ALL_TODOS } from "@/hooks/todos/useGetAllTodos";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isOpenEditTodoModal: boolean;
  closeEditTodoModalFunc: () => void;
  todo: TTodo | null;
}

type TEditTodoForm = Omit<TTodo, "id">;

export default function EditTodoModal({
  isOpenEditTodoModal,
  closeEditTodoModalFunc,
  todo,
}: IProps) {
  const { mutate, isPending } = useUpdateTodo();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TEditTodoForm>();

  // Prefill fields by current values when opening modal
  useEffect(() => {
    if (todo) {
      setValue("title", todo.title);
      setValue("description", todo.description);
      setValue("todo_date", todo.todo_date);
      setValue("priority", todo.priority);
    }
  }, [todo, setValue]);

  const onSubmit = (data: TEditTodoForm) => {
    mutate(
      {
        id: todo!.id,
        ...data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QK_ALL_TODOS] });
          toast.success("Todo updated successfully!");
          closeEditTodoModalFunc();
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
          toast.error(err?.message || "Error updating task");
        },
      }
    );
  };

  return (
    <Transition show={isOpenEditTodoModal} as={Fragment}>
      <Dialog className="relative z-50" onClose={closeEditTodoModalFunc}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <DialogPanel className="w-full max-w-lg bg-white rounded-xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-5">
                <Heading1
                  className="text-[16px]! text-black font-semibold"
                  title="Edit Task"
                />
                <button
                  onClick={closeEditTodoModalFunc}
                  className="text-sm cursor-pointer underline text-black"
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
                  error={errors.todo_date?.message}
                  {...register("todo_date", {
                    required: "Date is required",
                  })}
                />

                {/* Priority */}
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    className="w-full border px-3 py-2 rounded-md mt-1"
                  >
                    <option value="extreme">Extreme</option>
                    <option value="moderate">Moderate</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-black">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full border rounded-md px-3 py-2 mt-1"
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <Button type="submit" loading={isPending}>
                    Update
                  </Button>

                  <Button
                    type="button"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={closeEditTodoModalFunc}
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
