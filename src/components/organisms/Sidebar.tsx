import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Sidebar() {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();

  const menus = [
    { name: 'All Courses', path: '/dashboard', icon: '📚' },
    { name: 'My Learning', path: '/my-courses', icon: '🎓' },
    { name: 'Transactions', path: '/transactions', icon: '💳' },
    { name: 'Profile Settings', path: '/profile', icon: '⚙️' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
      {/* LOGO AREA */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <span className="text-xl font-bold font-lexend text-gray-900">
          Grant<span className="text-primary">Academy</span>
        </span>
      </div>

      {/* USER INFO MINI */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">{user?.fullName}</p>
            <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium font-lexend transition-all duration-200
              ${isActive(menu.path) 
                ? 'bg-primary/5 text-primary' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <span className="text-lg">{menu.icon}</span>
            {menu.name}
          </Link>
        ))}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all font-lexend"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}