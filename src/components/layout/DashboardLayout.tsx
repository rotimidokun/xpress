import { ReactNode } from "react";
import { ResponsiveSidebar } from "@/components/dashboard/ResponsiveSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  count: number;
}

export function DashboardLayout({
  children,
  title,
  count,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <ResponsiveSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full">
        <DashboardHeader title={title} count={count} />

        <div className="flex-1 overflow-hidden">
          <div className="h-full p-4 md:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
