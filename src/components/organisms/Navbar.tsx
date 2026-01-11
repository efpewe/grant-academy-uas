import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../../assets/logo.png'

export default () => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: '/about' },
    { label: 'COURSE', path: '/course' },
    { label: 'NEWS', path: '/news' },
    { label: 'SUBSCRIBE', path: '/subscribe' },
    { label: 'CONTACT', path: '/contact' },
  ]

  return (
    <header className="container relative z-50">
      <div className="flex justify-between items-center py-[25px]">
        <Link to="/" className="w-[200px] block">
          <img src={logoImg} alt="Grant Academy Logo" className="w-full" />
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden flex flex-col justify-between w-[30px] h-[24px] cursor-pointer z-[1001] relative"
        >
          <span className={`block w-full h-[4px] bg-dark rounded transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-[10px]' : ''}`}></span>
          <span className={`block w-full h-[4px] bg-dark rounded transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-full h-[4px] bg-dark rounded transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
        </button>

        <nav 
          className={`
            fixed md:static top-0 right-0 w-[80%] md:w-auto h-screen md:h-auto 
            bg-white md:bg-transparent shadow-[-5px_0_20px_rgba(0,0,0,0.1)] md:shadow-none 
            z-[1000] transition-all duration-300 ease-in-out md:translate-x-0
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <ul className="flex flex-col md:flex-row items-center gap-[30px] md:gap-[45px] pt-[100px] md:pt-0">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => `
                    text-[18px] md:text-[15px] font-medium font-inter transition-colors relative pb-[6px]
                    ${isActive 
                      ? 'text-primary font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary' 
                      : 'text-grey hover:text-primary'
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}