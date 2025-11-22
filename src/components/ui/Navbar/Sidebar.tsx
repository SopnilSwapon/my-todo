"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { FaCamera, FaUserLarge } from "react-icons/fa6";

import useGetProfileInfo from "@/hooks/profile/useGetProfileInfo";
import { globalLogout } from "@/shared/lib/auth/logout";

export default function Sidebar({
  smallDeviceCloseFunc,
}: {
  smallDeviceCloseFunc?: () => void;
}) {
  const pathname = usePathname();
  const { data, isLoading } = useGetProfileInfo();

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <AiFillHome /> },
    { label: "Todos", href: "/dashboard/todos", icon: <BiTask /> },
    {
      label: "Account Information",
      href: "/dashboard/account-information",
      icon: <FaUserLarge />,
    },
  ];

  return (
    <div className="w-[340px] h-full bg-[#0D224A] flex flex-col">
      {/* Avatar & User Info */}
      <div className="py-5 px-3">
        <div className="flex flex-col items-center mt-10">
          <div className="relative">
            {isLoading ? (
              <div className="w-20 h-20 rounded-full bg-gray-400 animate-pulse" />
            ) : data?.profile_image ? (
              <Link href={"/dashboard"}>
                <Image
                  src={data.profile_image}
                  height={80}
                  width={80}
                  alt="profile"
                  className="rounded-full w-20 h-20 object-cover"
                />
              </Link>
            ) : (
              <div className="w-24 h-24 border border-white rounded-full flex items-center justify-center">
                <p className="text-white">No image</p>
                <Link
                  href={"/dashboard/account-information"}
                  className="absolute top-16 ml-18 bg-[#5272FF] p-1.5 rounded-full text-white cursor-pointer"
                >
                  {!data?.profile_image && <FaCamera size={14} />}
                </Link>
              </div>
            )}
          </div>
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
            <p className="text-[12px] text-white">{data?.email}</p>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 mt-4">
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} onClick={smallDeviceCloseFunc}>
                  <span
                    className={`flex items-center px-4 gap-3 py-2 text-[16px] font-medium rounded-lg transition
                      ${
                        isActive
                          ? "bg-[#1E3576] text-white"
                          : "text-[#8CA3CD] hover:bg-[#1E3576] hover:text-white"
                      }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          onClick={globalLogout}
          className="flex items-center w-full px-4 py-2 text-[#8CA3CD] hover:text-white hover:bg-[#1E3576] rounded-lg"
        >
          <RiLogoutBoxRLine className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
