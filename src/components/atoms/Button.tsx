import {type ButtonHTMLAttributes, type ReactNode} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button 
      className={`
        bg-primary text-white text-[17px] font-semibold font-lexend 
        py-[15px] px-[45px] rounded-lg cursor-pointer inline-block border-none
        shadow-[0_4px_20px_rgba(194,87,128,0.4)] 
        hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(194,87,128,0.5)] 
        transition-all duration-300 ease-in-out
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}