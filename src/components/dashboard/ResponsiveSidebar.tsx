import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { MobileSidebar } from "./MobileSidebar";

export function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed z-20 left-4 top-2 p-2 rounded-md bg-white shadow-md text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop sidebar - always visible on large screens */}
      <aside className="hidden lg:block w-56 bg-white border-r border-gray-200 h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar component */}
      <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
