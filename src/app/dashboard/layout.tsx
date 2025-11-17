import Sidebar from "@/components/ui/Navbar/Sidebar";
import TopBar from "@/components/ui/Navbar/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* sidebar  */}
      <aside className="w-64 bg-[#0d2340] h-full">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1">
        {/* TopBar */}
        <header className="h-16 bg-white flex items-center">
          <TopBar />
        </header>

        {/* Pages content */}
        <main className="flex-1 p-6 bg-foreground overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
