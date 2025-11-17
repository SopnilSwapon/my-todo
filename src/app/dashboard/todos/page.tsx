"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

import Button from "@/components/ui/Button";
import { Heading1 } from "@/components/ui/Header1";
import AddTodoModal from "@/components/ui/todos/AddTodoModal";
import TodoCard from "@/components/ui/todos/TodoCard";
import TodoSkeleton from "@/components/ui/todos/TodoSkeloton";
import useAllTodos from "@/hooks/useAllTask";

export default function TodosPage() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  //  Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useAllTodos({
    search: debouncedSearch,
  });

  const todos = data?.results ?? [];
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <Heading1 title="Todos" />
        <Button onClick={() => setOpen(true)} className="px-4 max-w-36 py-2">
          + New Task
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="w-full flex flex-col items-start gap-2 mt-4">
        <div className="flex items-center w-full gap-2">
          {/* Search */}
          <div className="flex items-center w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Search your task here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-gray-700"
            />
            <FiSearch className="text-xl" />
          </div>

          {/* Filter */}
          <button className="flex items-center min-w-30 gap-1 bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <span className="text-gray-700">Sort By</span>
            <HiArrowsUpDown className="text-gray-600 font-bold" />
          </button>
        </div>
      </div>

      {/* Main List */}
      {todos.length > 0 && (
        <h2 className="text-[18px] text-black font-semibold mt-4">Your Task</h2>
      )}

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && [...Array(6)].map((_, i) => <TodoSkeleton key={i} />)}

        {!isLoading &&
          todos.length > 0 &&
          todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)}

        {!isLoading && todos.length === 0 && (
          <div
            onClick={() => setOpen(true)}
            className="col-span-full cursor-pointer h-72 pt-10 flex items-center justify-center text-gray-500"
          >
            <Image
              src="/images/icon-noTodo.png"
              height={200}
              width={200}
              alt="No todos"
            />
          </div>
        )}
      </div>

      <AddTodoModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
