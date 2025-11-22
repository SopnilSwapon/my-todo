"use client";

import { useState } from "react";
import type { HTMLAttributes } from "react";
import { TTodo, QK_ALL_TODOS } from "@/hooks/todos/useGetAllTodos";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";

import DeleteTodoModal from "./DeleteTodoModal";
import EditTodoModal from "./EditTodoModal";
import { toast } from "react-toastify";
import { useDeleteTodo } from "@/hooks/todos/useDeleteTodo";
import { useQueryClient } from "@tanstack/react-query";

type TPriority = "high" | "extreme" | "moderate" | "low";
export default function TodoCard({
  todo,
  dragProps,
}: {
  todo: TTodo;
  dragProps?: HTMLAttributes<HTMLDivElement>;
}) {
  const [isOpenTodoDeleteModal, setIsOpenTodoDeleteModal] = useState(false);
  const [isOpenEditTodoModal, setIsOpenEditTodoModal] = useState(false);

  const { mutate: todoDeleteMutate } = useDeleteTodo();
  const queryClient = useQueryClient();

  const priorityColors: Record<TPriority, string> = {
    high: "bg-red-100 text-red-600",
    extreme: "bg-red-100 text-red-600",
    moderate: "bg-green-100 text-green-600",
    low: "bg-yellow-100 text-yellow-700",
  };

  const handleTodoDelete = () => {
    todoDeleteMutate(todo.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QK_ALL_TODOS] });

        toast.success("Todo deleted successfully");
        setIsOpenTodoDeleteModal(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err?.message || "Failed to delete task");
      },
    });
  };

  return (
    <>
      <div
        {...dragProps}
        className="bg-white border border-gray-200 rounded-xl p-5 relative w-full cursor-grab active:cursor-grabbing select-none"
      >
        {/* Priority */}
        {todo.priority && (
          <span
            className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-md ${
              priorityColors[todo.priority as TPriority]
            }`}
          >
            {todo.priority}
          </span>
        )}

        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {todo.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {todo.description}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-gray-700 text-sm font-medium">
            {todo.todo_date
              ? `Due ${new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(todo.todo_date))}`
              : `Due ${new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(todo.updated_at))}`}
          </p>

          <div className="flex items-center gap-3">
            {/* Stop PROPAGATION so drag doesn't effect to open delete & edit modal opening */}
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setIsOpenEditTodoModal(true)}
              className="bg-gray-50 p-1.5 cursor-pointer rounded-lg text-[#4F46E5]"
            >
              <LuPencilLine size={20} />
            </button>

            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setIsOpenTodoDeleteModal(true)}
              className="bg-gray-50 p-1.5 cursor-pointer rounded-lg text-[#DC2626]"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteTodoModal
        isOpenTodoDeleteModal={isOpenTodoDeleteModal}
        closeTodoDeleteModalFunc={() => setIsOpenTodoDeleteModal(false)}
        todoDeleteConfirmFunc={handleTodoDelete}
      />

      {/* Edit Modal */}
      <EditTodoModal
        isOpenEditTodoModal={isOpenEditTodoModal}
        closeEditTodoModalFunc={() => setIsOpenEditTodoModal(false)}
        todo={todo}
      />
    </>
  );
}
