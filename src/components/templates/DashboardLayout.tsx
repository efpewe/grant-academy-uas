import { type ReactNode } from "react";
import Sidebar from "../organisms/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Sidebar (Fixed Left) */}
      <Sidebar />

      {/* Main Content Area (Responsive with Sidebar) */}
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        {/* Content with responsive padding */}
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">{children}</div>
      </main>
    </div>
  );
}
