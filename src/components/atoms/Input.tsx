import {type InputHTMLAttributes} from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default ({ hasError, className = '', ...props }: InputProps) => {
  return (
    <input
      className={`
        w-full px-[25px] py-[15px] 
        text-[15px] font-lexend text-gray-700
        bg-gray-50 border rounded-lg outline-none
        transition-all duration-300 ease-in-out
        focus:bg-white focus:shadow-[0_4px_15px_rgba(0,0,0,0.05)]
        ${hasError 
          ? 'border-red-400 focus:border-red-400 bg-red-50' 
          : 'border-gray-200 focus:border-primary'}
        ${className}
      `}
      {...props}
    />
  );
}