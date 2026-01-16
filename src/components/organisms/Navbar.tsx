import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logoImg from '../../assets/logo.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth(); // Hapus 'logout' dan 'useNavigate' karena tidak dipakai di sini lagi

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'COURSE', path: '/course' },
    { label: 'NEWS', path: '/news' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="w-full relative z-50 transition-all duration-300 fixed top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO --- */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="block w-[140px] md:w-[180px]">
              <img src={logoImg} alt="Grant Academy Logo" className="w-full h-auto object-contain" />
            </Link>
          </div>

          {/* --- MOBILE TOGGLE BUTTON --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 cursor-pointer z-[1001]"
            aria-label="Toggle Menu"
          >
            <span className={`block w-full h-[3px] bg-gray-900 rounded transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
            <span className={`block w-full h-[3px] bg-gray-900 rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-[3px] bg-gray-900 rounded transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
          </button>

          {/* --- NAVIGATION MENU --- */}
          <nav 
            className={`
              fixed inset-y-0 right-0 w-[80%] bg-white shadow-2xl z-[1000]
              transform transition-transform duration-300 ease-in-out
              flex flex-col pt-24 pl-8
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}

              md:static md:w-auto md:h-auto md:bg-transparent md:shadow-none
              md:flex md:flex-row md:items-center md:pt-0 md:pl-0 md:translate-x-0
            `}
          >
            <ul className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              
              {/* Menu Links */}
              {navItems.map((item) => (
                <li key={item.label}>
                  <NavLink 
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `
                      text-[16px] md:text-[14px] lg:text-[15px] font-medium font-lexend transition-colors relative pb-1
                      ${isActive 
                        ? 'text-primary font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary' 
                        : 'text-gray-500 hover:text-primary'
                      }
                    `}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className="hidden md:block w-[1px] h-[24px] bg-gray-200 mx-2"></li>

              {/* --- AUTH BUTTONS LOGIC --- */}
              {isAuthenticated ? (
                // JIKA SUDAH LOGIN: Tampilkan Tombol Dashboard
                <li className="flex flex-col md:flex-row md:items-center gap-4 md:gap-4 mt-4 md:mt-0">
                   {/* Info User (Hanya tampil di Desktop) */}
                   <div className="hidden lg:block text-right mr-2">
                      <span className="block text-xs text-gray-400 font-lexend">Halo,</span>
                      <span className="block text-sm font-bold text-gray-900 font-lexend max-w-[100px] truncate">
                        {user?.fullName?.split(' ')[0]}
                      </span>
                   </div>

                  <Link 
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-primary text-white rounded-full text-[15px] font-bold font-lexend hover:bg-primary-dark transition-all shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:shadow-[0_6px_20px_rgba(0,118,255,0.23)] hover:-translate-y-0.5 flex items-center gap-2"
                  >
                    <span>Dashboard</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </li>
              ) : (
                // JIKA BELUM LOGIN: Tampilkan Login & Register
                <li className="flex flex-col md:flex-row gap-4 md:gap-4 items-start md:items-center mt-4 md:mt-0">
                  <NavLink 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-[15px] font-medium font-lexend text-gray-700 hover:text-primary transition-colors px-5 py-2 border border-gray-300 rounded-full hover:border-primary"
                  >
                    Login
                  </NavLink>
                  
                  <NavLink 
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 bg-gray-900 text-white rounded-full text-[15px] font-medium font-lexend hover:bg-primary transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Register
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>

          {/* Overlay Mobile */}
          {isOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-[900] md:hidden backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            ></div>
          )}

        </div>
      </div>
    </header>
  );
}