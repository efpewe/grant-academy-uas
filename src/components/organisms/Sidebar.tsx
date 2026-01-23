import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  // Helper untuk cek menu aktif
  const isActive = (path: string) => pathname === path;

  // --- DEFINISI MENU ---

  // 1. Menu Khusus Student
  const studentMenus = [
    { name: "Cari Kursus", path: "/dashboard", icon: "🔍" },
    { name: "Belajar", path: "/my-courses", icon: "📚" },
    { name: "Transaksi", path: "/transactions", icon: "💳" },
  ];

  // 2. Menu Khusus Mentor
  const mentorMenus = [
    { name: "Studio Creator", path: "/mentor/dashboard", icon: "📊" },
    { name: "Buat Kursus", path: "/mentor/create-course", icon: "✍️" },
    // Mentor juga boleh intip marketplace
    { name: "Lihat Marketplace", path: "/dashboard", icon: "🔍" },
  ];

  // 3. Menu Umum (Selalu muncul di paling bawah)
  const commonMenus = [
    { name: "Pengaturan Profil", path: "/profile", icon: "⚙️" },
  ];

  // --- LOGIC PEMILIHAN MENU ---
  // Jika role mentor, pakai mentorMenus. Jika student/lainnya, pakai studentMenus.
  const menus = [
    ...(user?.role === "mentor" ? mentorMenus : studentMenus),
    ...commonMenus,
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50 transition-all">
      {/* 1. AREA LOGO */}
      <div className="h-20 flex items-center px-8 border-b border-gray-100">
        <Link to="/" className="text-2xl font-bold font-lexend text-gray-900">
          <img className="w-20 h-20" src={logo} alt="logo" />
        </Link>
      </div>

      {/* 2. AREA USER PROFILE (MINI) */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          {/* Tampilkan foto profil dari database jika ada, jika tidak gunakan inisial */}
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.fullName || "User"}
              className="w-10 h-10 rounded-full object-cover shadow-sm border-2 border-primary/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shadow-sm">
              {/* Ambil inisial nama depan */}
              {user?.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
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
        </div>
      </div>

      {/* 3. MENU NAVIGATION */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 font-lexend">
          Menu Utama
        </p>

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium font-lexend transition-all duration-200
              ${
                isActive(menu.path)
                  ? "bg-primary text-white shadow-lg shadow-primary/30 translate-x-1"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <span className="text-lg">{menu.icon}</span>
            {menu.name}
          </Link>
        ))}
      </nav>

      {/* 4. LOGOUT BUTTON */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all font-lexend group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            🚪
          </span>
          Keluar Aplikasi
        </button>
      </div>
    </aside>
  );
}
