"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaUserLarge } from "react-icons/fa6";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <AiFillHome />,
    },
    {
      label: "Todos",
      href: "/driver/my-vehicles",
      icon: <BiTask />,
    },
    {
      label: "Account Information",
      href: "/dashboard/account-information",
      icon: <FaUserLarge />,
    },
  ];

  return (
    <div className="w-72 h-screen bg-[#0D224A] flex justify-between flex-col">
      {/* Header */}
      <div className="py-5 px-3">
        <div className="flex justify-center flex-col items-center w-full mt-10">
          <Image
            src="/images/profile.png"
            alt="profile picture"
            height={80}
            width={80}
          />
          <h1 className="text-white text-[16px] font-semibold mt-3">amanuel</h1>
          <p className="text-[12px] text-white mt-0.5">amanuel@gmail.com</p>
        </div>
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
                      className={`flex items-center px-4 gap-3 py-2 text-[16px] font-medium
                                            ${
                                              isActive
                                                ? "bg-linear-to-r from-[#1E3576] via-[#112553] to-[#0D224A] text-white rounded-lg"
                                                : "text-[#8CA3CD] hover:bg-linear-to-r from-[#1E3576] via-[#112553] to-[#0D224A] hover:text-white rounded-lg"
                                            }`}
                    >
                      <button className="text-2xl">{item.icon}</button>
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
            className="flex items-center text-[#8CA3CD] hover:bg-linear-to-r from-[#1E3576] via-[#112553] to-[#0D224A] hover:text-white rounded-lg cursor-pointer w-full px-4 py-2 transition-colors duration-300 group"
          >
            <RiLogoutBoxRLine className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
