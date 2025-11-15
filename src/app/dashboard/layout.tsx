import Sidebar from "@/components/ui/Navbar/Sidebar";
import TopBar from "@/components/ui/Navbar/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar full height */}
      <aside className="w-64 bg-[#0d2340] h-full">
        <Sidebar />
      </aside>

      {/* Right content area */}
      <div className="flex flex-col flex-1">
        {/* Topbar inside the content area */}
        <header className="h-16 bg-white flex items-center">
          <TopBar />
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-[#f5f6fa] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
