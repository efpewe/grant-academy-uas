import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  // --- DEFINISI MENU ---
  const studentMenus = [
    { name: "Cari Kursus", path: "/dashboard", icon: "🔍" },
    { name: "Belajar", path: "/my-courses", icon: "📚" },
    { name: "Transaksi", path: "/transactions", icon: "💳" },
  ];

  const mentorMenus = [
    { name: "Studio Creator", path: "/mentor/dashboard", icon: "📊" },
    { name: "Buat Kursus", path: "/mentor/create-course", icon: "✍️" },
    { name: "Lihat Marketplace", path: "/dashboard", icon: "🔍" },
  ];

  const commonMenus = [
    { name: "Pengaturan Profil", path: "/profile", icon: "⚙️" },
  ];

  const menus = [
    ...(user?.role === "mentor" ? mentorMenus : studentMenus),
    ...commonMenus,
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Hamburger Button (Mobile Only) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-300
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
          <div className="flex items-center flex-1 justify-center">
            {!isCollapsed && (
              <Link
                to="/"
                className="text-2xl font-bold font-lexend text-gray-900"
              >
                <img className="w-[180px]" src={logo} alt="logo" />
              </Link>
            )}
            {isCollapsed && (
              <Link to="/" className="text-2xl font-bold text-primary">
                GA
              </Link>
            )}
          </div>

          {/* Toggle Button (Desktop) - Visible */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-8 h-8 bg-gray-100 hover:bg-primary border border-gray-200 rounded-lg items-center justify-center transition-all shadow-sm group flex-shrink-0"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg
              className={`w-4 h-4 text-gray-600 group-hover:text-white transition-all ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 pb-2">
          <div
            className={`flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 ${isCollapsed ? "justify-center" : ""}`}
          >
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.fullName || "User"}
                className="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-primary/20 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm flex-shrink-0">
                {user?.fullName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 truncate font-lexend">
                  {user?.fullName || "User"}
                </p>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    user?.role === "mentor"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {user?.role || "Student"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {!isCollapsed && (
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-lexend">
              Menu Utama
            </p>
          )}

          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-lexend transition-all duration-200 group relative
                ${isCollapsed ? "justify-center" : ""}
                ${
                  isActive(menu.path)
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
              title={isCollapsed ? menu.name : ""}
            >
              <span className="text-lg flex-shrink-0">{menu.icon}</span>

              {!isCollapsed && <span>{menu.name}</span>}

              {/* Tooltip on hover when collapsed */}
              {isCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {menu.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={logout}
            className={`
              flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-lexend group relative
              ${isCollapsed ? "justify-center" : ""}
            `}
            title={isCollapsed ? "Keluar Aplikasi" : ""}
          >
            <span className="group-hover:-translate-x-1 transition-transform flex-shrink-0">
              🚪
            </span>
            {!isCollapsed && <span>Keluar Aplikasi</span>}

            {/* Tooltip when collapsed */}
            {isCollapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Keluar Aplikasi
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
