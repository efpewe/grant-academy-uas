import { type ReactNode } from "react";
import Sidebar from "../organisms/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Sidebar />

      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
