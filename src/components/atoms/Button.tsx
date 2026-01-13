import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isLoading?: boolean;
}

export default ({ children, className = '', isLoading = false, ...props }: ButtonProps) => {
  return (
    <button 
      disabled={isLoading || props.disabled}
      className={`
        bg-primary text-white text-[17px] font-semibold font-lexend 
        py-[15px] px-[45px] rounded-lg cursor-pointer inline-block border-none
        shadow-[0_4px_20px_rgba(194,87,128,0.4)] 
        
        /* Hover effects (hanya jika tidak disabled/loading) */
        ${!isLoading && !props.disabled ? 'hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_6px_25px_rgba(194,87,128,0.5)]' : ''}
        
        transition-all duration-300 ease-in-out
        
        /* Style saat Disabled / Loading */
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
        
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </button>
  );
}