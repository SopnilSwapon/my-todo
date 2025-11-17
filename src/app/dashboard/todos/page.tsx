"use client";

import Button from "@/components/ui/Button";
import { Heading1 } from "@/components/ui/Header1";
import AddTodoModal from "@/components/ui/todos/AddTodoModal";
import useAllTodos from "@/hooks/useAllTask";
import Image from "next/image";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiArrowsUpDown } from "react-icons/hi2";

export default function TodosPage() {
  const [open, setOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const toggleFilter = () => setShowFilter(!showFilter);

  // const handleFilterChange = (key) => {
  //   setFilters({ ...filters, [key]: !filters[key] });
  // };

  const { data, isLoading } = useAllTodos({
    search: "",
    todo_date: "2025-11-16",
  });
  console.log(data, "check data");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <Heading1 title="Todos" />
        <Button onClick={() => setOpen(true)} className="px-4 max-w-36 py-2">
          + New Task
        </Button>
      </div>
      <div className="w-full flex flex-col items-start gap-2 p-4">
        {/* Search + Filter Row */}
        <div className="flex items-center w-full gap-2">
          <div className="flex items-center w-full bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Search your task here..."
              className="w-full outline-none text-gray-700"
            />
            <FiSearch className="text-xl" />
          </div>

          <button
            onClick={toggleFilter}
            className="flex items-center min-w-30 gap-1 bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <span className="text-gray-700">Sort By</span>
            <HiArrowsUpDown className="text-gray-600 font-bold" />
          </button>
        </div>

        {/* Dropdown Filter */}
        {showFilter && (
          <div className="bg-white border border-gray-300 rounded-lg p-3 shadow-md w-48 animate-fadeIn">
            <h4 className="font-medium text-gray-700 mb-2">Filters</h4>

            <div className="flex flex-col gap-2">
              {Object.keys(filters).map((key) => (
                <label
                  key={key}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input
                    type="checkbox"
                    // checked={filters[key]}
                    // onChange={() => handleFilterChange(key)}
                  />
                  {key.replace("option", "Option ")}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* empty placeholder */}
      <div className="mt-10 h-72 flex items-center justify-center text-gray-500">
        <Image
          src="/images/icon-noTodo.png"
          height={300}
          width={300}
          alt="empty todo icon"
        />
      </div>

      <AddTodoModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
