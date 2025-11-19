"use client";

import { useState } from "react";
import Sidebar from "@/components/ui/Navbar/Sidebar";
import TopBar from "@/components/ui/Navbar/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Side bar */}
      <aside
        className={`
          bg-[#0d2340]
          fixed md:static 
          h-full z-50 
          transition-all duration-300
          ${isOpen ? "w-64 left-0" : "w-0 -left-64 md:w-64"}
        `}
      >
        <Sidebar closeMobile={() => setIsOpen(false)} />
      </aside>

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white flex items-center shadow-sm">
          <TopBar openSidebar={() => setIsOpen(true)} />
        </header>

        {/* Page contend */}
        <main className="flex-1 p-4 md:p-6 bg-foreground overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
