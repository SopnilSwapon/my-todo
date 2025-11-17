import Image from "next/image";
import { RiNotification3Line } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

export default function TopBar() {
  return (
    <nav className="bg-white sticky w-full px-6 md:px-8 top-0">
      <div className="py-3 md:py-4 flex items-center w-full justify-between">
        <button className="text-gray-600 cursor-pointer hover:text-gray-800">
          <Image
            src="/images/logo.png"
            height={100}
            width={100}
            alt="project logo"
          />
        </button>

        <div className="flex items-center gap-6">
          <button className="relative cursor-pointer bg-[#5272FF] h-9 w-9 rounded-[10px] flex items-center justify-center">
            <RiNotification3Line className="p-[9px] w-full h-full text-white" />
          </button>
          <button className="relative cursor-pointer bg-[#5272FF] h-9 w-9 rounded-[10px] flex items-center justify-center">
            <SlCalender className="p-[9px] w-full h-full text-white" />
          </button>

          <div>
            <p>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</p>{" "}
            <p className="text-[#oD224A]">
              {new Date().getDate().toString().padStart(2, "0") +
                "-" +
                (new Date().getMonth() + 1).toString().padStart(2, "0") +
                "-" +
                new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
