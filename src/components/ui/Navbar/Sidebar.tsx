"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/driver/book-my-mot",
    },
    {
      label: "Todos",
      href: "/driver/my-vehicles",
    },
    {
      label: "MOT Reports",
      href: "/driver/mot-reports",
    },
    {
      label: "My Bookings",
      href: "Account Information",
    },
  ];

  return (
    <div className="w-72 h-screen bg-[#0D224A] flex flex-col">
      {/* Header */}
      <div className="py-5 px-3 flex justify-between items-center mt-2">
        <div>
          {/* <h1 className="text-2xl font-bold text-[#19CA32]">simplymot.co.uk</h1> */}
        </div>
        <button
          //   onClick={onClose}
          className="p-1 rounded-full cursor-pointer hover:bg-gray-100 md:hidden"
        >
          {/* <IoClose className="h-6 w-6" /> */}
        </button>
      </div>

      {/* Navigation Menu - Takes up available space */}
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-4 px-3">
          <ul className="space-y-5">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/driver/book-my-mot"
                  ? pathname.startsWith("/driver/book-my-mot")
                  : pathname === item.href;
              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className={`flex items-center px-4 py-2 transition-colors duration-200
                                            ${
                                              isActive
                                                ? "bg-[#DDF7E0] text-[#19CA32] font-medium rounded-lg"
                                                : "text-[#8CA3CD] hover:bg-gray-100 hover:text-gray-700 rounded-lg"
                                            }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Section - Always at bottom */}
      <div className="mt-auto">
        {/* Logout button */}
        <div className="p-4">
          <button
            // onClick={handleLogout}
            className="flex items-center cursor-pointer w-full px-4 py-2 text-[#19CA32] hover:bg-[#19CA32] hover:text-white rounded-md transition-colors duration-300 group"
          >
            {/* <HiArrowRightOnRectangle className="h-5 w-5 mr-3 transition-transform duration-300 group-hover:translate-x-1" /> */}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
