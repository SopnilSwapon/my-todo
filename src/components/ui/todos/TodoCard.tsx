"use client";

import { useState } from "react";
import { ITodo } from "@/hooks/useAllTask";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteTodoModal from "./DeleteTodoModal";
import EditTodoModal from "./EditTodoModal";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { toast } from "react-toastify";

type TPriority = "high" | "extreme" | "moderate" | "low";

export default function TodoCard({ todo }: { todo: ITodo }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { mutate: deleteTodo } = useDeleteTodo();

  const priorityColors: Record<TPriority, string> = {
    high: "bg-red-100 text-red-600",
    extreme: "bg-red-100 text-red-600",
    moderate: "bg-green-100 text-green-600",
    low: "bg-yellow-100 text-yellow-700",
  };

  const handleDelete = () => {
    deleteTodo(todo.id, {
      onSuccess: () => {
        toast.success("Todo deleted successfully");
        setOpenDelete(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err: any) => {
        toast.error(err?.message || "Failed to delete task");
      },
    });
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-5 relative w-full">
        {/* Priority */}
        {todo.priority && (
          <span
            className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-md ${
              priorityColors[todo.priority as TPriority] ??
              "bg-gray-100 text-gray-700"
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
              : "No due date"}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenEdit(true)}
              className="bg-foreground cursor-pointer p-1.5 rounded-lg text-[#4F46E5]"
            >
              <LuPencilLine size={20} />
            </button>

            <button
              onClick={() => setOpenDelete(true)}
              className="bg-foreground cursor-pointer p-1.5 rounded-lg text-[#DC2626]"
            >
              <MdOutlineDeleteOutline size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteTodoModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />

      {/* Edit Modal */}
      <EditTodoModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        todo={todo}
      />
    </>
  );
}
