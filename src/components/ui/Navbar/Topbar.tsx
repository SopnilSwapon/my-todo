"use client";

import Image from "next/image";
import { RiNotification3Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

export default function TopBar({ openSidebar }: { openSidebar?: () => void }) {
  const today = new Date();

  return (
    <nav className="bg-white w-full px-4 md:px-8">
      <div className="py-4 flex items-center justify-between">
        <button
          className="md:hidden text-gray-700 text-3xl"
          onClick={openSidebar}
        >
          <HiOutlineMenuAlt2 />
        </button>

        <button className="cursor-pointer">
          <Image
            src="/images/logo.png"
            height={60}
            width={60}
            alt="logo"
            className="object-contain"
          />
        </button>

        <div className="flex items-center gap-4 md:gap-6">
          <button className="relative cursor-pointer bg-[#5272FF] h-9 w-9 rounded-lg flex items-center justify-center">
            <RiNotification3Line className="text-white w-5 h-5" />
          </button>

          <button className="relative cursor-pointer bg-[#5272FF] h-9 w-9 rounded-lg flex items-center justify-center">
            <SlCalender className="text-white w-5 h-5" />
          </button>

          <div className="hidden sm:block text-sm">
            <p>{today.toLocaleDateString("en-US", { weekday: "long" })}</p>
            <p className="text-[#0D224A]">
              {today.getDate().toString().padStart(2, "0")}-
              {(today.getMonth() + 1).toString().padStart(2, "0")}-
              {today.getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
