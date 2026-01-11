import {type ReactNode, type ButtonHTMLAttributes} from 'react'

interface ButtonOutlineProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export default ({ children, className = '', ...props }: ButtonOutlineProps) => {
  return (
    <button 
      className={`
        bg-transparent text-primary text-[16px] font-semibold font-lexend 
        py-[12px] px-[40px] border-2 border-primary rounded-lg cursor-pointer 
        transition-all duration-300 hover:bg-primary hover:text-white inline-block
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}