"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import Image from "next/image";

import useGetProfileInfo from "@/hooks/profile/useGetProfileInfo";
import ChangePasswordModal from "@/components/ui/ChangePasswordModal"; // <-- import it
import Button from "@/components/ui/Button";

export default function Page() {
  const { data, isLoading } = useGetProfileInfo();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 animate-pulse">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200" />
          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl h-auto p-4 md:p-6 shadow-sm">
        {/* Top Section */}
        <div className="flex flex-col relative items-center md:items-start justify-end gap-6">
          <div className=" w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
            {data?.profile_image ? (
              <Image
                src={data.profile_image}
                alt="Profile Image"
                height={80}
                width={80}
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
            {!data?.profile_image && (
              <Link
                href={"/dashboard/account-information"}
                className="absolute top-21 ml-18 bg-[#5272FF] p-1.5 rounded-full text-white cursor-pointer"
              >
                <FaCamera size={14} />
              </Link>
            )}
          </div>

          <div>
            <h1 className="text-2xl text-center md:text-start font-semibold text-gray-900">
              {data?.first_name} {data?.last_name}
            </h1>
            <p className="text-gray-500 mt-1 text-center md:text-start">
              {data?.email}
            </p>

            <div className="flex gap-3 mt-4">
              <Link href="/dashboard/account-information">
                <Button className="px-5 py-2 flex items-center gap-1.5">
                  <FaUserEdit size={20} /> Edit Profile
                </Button>
              </Link>

              <button
                onClick={() => setIsPasswordModalOpen(true)}
                className="px-5 py-2 cursor-pointer rounded-md bg-[#5272FF] hover:bg-blue-600 text-white flex items-center justify-center"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoItem label="First Name" value={data?.first_name} />
          <InfoItem label="Last Name" value={data?.last_name} />
          <InfoItem label="Contact Number" value={data?.contact_number} />
          <InfoItem label="Birthday" value={data?.birthday} />
          <InfoItem label="Address" value={data?.address} />
          <InfoItem label="Bio" value={data?.bio} />
        </div>
      </div>

      <ChangePasswordModal
        isPasswordModalOpen={isPasswordModalOpen}
        closeChangePasswordModalFunc={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-foreground p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-800 font-medium mt-1">
        {value || <span className="text-gray-400">Not provided</span>}
      </p>
    </div>
  );
}
