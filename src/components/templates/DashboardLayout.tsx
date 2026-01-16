import { type ReactNode } from 'react';
import Sidebar from '../organisms/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Sidebar (Fixed Left) */}
      <Sidebar />

      {/* Main Content Area (Offset Right) */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        {/* Header Mobile (Optional - bisa dikembangkan nanti) */}
        
        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}