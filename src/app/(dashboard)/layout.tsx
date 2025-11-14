import Sidebar from "@/components/ui/Navbar/Sidebar";
import React from "react";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
