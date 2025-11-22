"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/Navbar/Sidebar";
import TopBar from "@/components/ui/Navbar/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSmallDevices, setIsSmallDevices] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Side bar */}
      <aside
        className={`
          bg-[#0d2340]
          fixed lg:static 
          h-full z-50 
          transition-all duration-300
          ${
            isSmallDevices
              ? "w-[340px] left-0"
              : "w-0 -left-[340px] md:w-[340px]"
          }
        `}
      >
        <Sidebar smallDeviceCloseFunc={() => setIsSmallDevices(false)} />
      </aside>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top bar */}
        <header className="h-22 bg-white flex items-center shadow-sm">
          <TopBar openSidebar={() => setIsSmallDevices(true)} />
        </header>

        {/* Pages contend */}
        <main className="flex-1 p-4 md:p-6 bg-foreground overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSmallDevices && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsSmallDevices(false)}
        />
      )}
    </div>
  );
}
