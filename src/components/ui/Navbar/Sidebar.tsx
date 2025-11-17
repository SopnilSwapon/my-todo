"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { RiLogoutBoxRLine } from "react-icons/ri";
import Image from "next/image";
import { AiFillHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaPlus, FaUserLarge } from "react-icons/fa6";

import useGetProfileInfo from "@/hooks/useGetProfileInfo";
import { globalLogout } from "@/shared/lib/auth/logout";

export default function Sidebar() {
  const pathname = usePathname();
  const { isLoading, data } = useGetProfileInfo();

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <AiFillHome />,
    },
    {
      label: "Todos",
      href: "/dashboard/todos",
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
      <div className="py-5 px-3">
        <div className="flex justify-center flex-col items-center w-full mt-10">
          <div className="relative">
            {isLoading ? (
              <div className="w-20 h-20 rounded-full bg-gray-400 animate-pulse"></div>
            ) : (
              <div>
                {data?.profile_image ? (
                  <>
                    <Image
                      src={data.profile_image}
                      alt="profile picture"
                      height={80}
                      width={80}
                      className="rounded-full object-cover"
                    />
                  </>
                ) : (
                  <Link
                    href="/dashboard/account-information"
                    className=" inset-0 p-6 border rounded-full flex cursor-pointer justify-center items-center"
                  >
                    <FaPlus className="text-white left-20" size={22} />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* User information */}
          {isLoading ? (
            <div className="mt-3 w-24 h-4 bg-gray-400 animate-pulse rounded"></div>
          ) : (
            <h1 className="text-white text-[16px] font-semibold mt-3">
              {data?.first_name} {data?.last_name}
            </h1>
          )}

          {isLoading ? (
            <div className="mt-2 w-32 h-3 bg-gray-400 animate-pulse rounded"></div>
          ) : (
            <p className="text-[12px] text-white mt-0.5">{data?.email}</p>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
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

      {/* Bottom Logout Section */}
      <div className="mt-auto">
        <div className="p-4">
          <button
            onClick={globalLogout}
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
