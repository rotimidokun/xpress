import { Bell } from "lucide-react";
import UserDropdown from "@/components/UserDropdown";

interface DashboardHeaderProps {
  title: string;
  count: number;
}

export function DashboardHeader({ title, count }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <h1 className="text-xl font-semibold text-gray-800 pl-14 lg:pl-4">
            {title}
          </h1>
          <div className="ml-2 px-2 py-1 bg-[#F2FAFF] rounded-full text-xs text-xpress-blue font-normal">
            {count}
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
