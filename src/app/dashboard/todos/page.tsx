"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@/components/ui/Button";
import { Heading1 } from "@/components/ui/Header1";
import AddTodoModal from "@/components/ui/todos/AddTodoModal";
import TodoCard from "@/components/ui/todos/TodoCard";
import TodoSkeleton from "@/components/ui/todos/TodoSkeloton";
import useAllTodos, { TTodo } from "@/hooks/todos/useGetAllTodos";

function SortableTodoCard({ todo }: { todo: TTodo }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TodoCard todo={todo} dragProps={{ ...attributes, ...listeners }} />
    </div>
  );
}

export default function TodosPage() {
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useAllTodos({ search: debouncedSearch });

  const todosFromApi = data?.results ?? [];
  const [todoList, setTodoList] = useState<TTodo[]>(todosFromApi);

  useEffect(() => {
    if (!data?.results) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodoList(data.results);
  }, [data?.results]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active?.id || !over?.id || active.id === over.id) return;

    setTodoList((items) => {
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading1 title="Todos" />
        <Button
          onClick={() => setIsAddTodoModalOpen(true)}
          className="px-4 max-w-36 py-2"
        >
          + New Task
        </Button>
      </div>

      {/* Search */}
      <div className="w-full flex flex-col gap-2 mt-4">
        <div className="flex items-center w-full gap-2">
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

          <button className="flex items-center min-w-30 gap-1 bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <span className="text-gray-700">Sort By</span>
            <HiArrowsUpDown className="text-gray-600 font-bold" />
          </button>
        </div>
      </div>

      {todoList.length > 0 && (
        <h2 className="text-[18px] text-black font-semibold mt-4">Your Task</h2>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todoList}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && [...Array(6)].map((_, i) => <TodoSkeleton key={i} />)}

            {!isLoading &&
              todoList.map((todo) => (
                <SortableTodoCard key={todo.id} todo={todo} />
              ))}

            {!isLoading && todoList.length === 0 && (
              <div className="col-span-full row-span-full h-auto pt-26 flex flex-col items-center justify-center text-gray-500">
                <Image
                  src="/images/icon-noTodo.png"
                  onClick={() => setIsAddTodoModalOpen(true)}
                  height={200}
                  width={200}
                  className="cursor-pointer"
                  alt="No todos"
                />
                <h1 className="text-xl mt-4 md:text-2xl text-[#201F1E]">
                  No Todos Yet
                </h1>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      <AddTodoModal
        isAddTodoModalOpen={isAddTodoModalOpen}
        closeAddTodoModalFunc={() => setIsAddTodoModalOpen(false)}
      />
    </div>
  );
}
