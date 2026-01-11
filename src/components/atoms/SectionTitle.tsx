import {type ReactNode} from 'react';

interface SectionTitleProps {
  children: ReactNode;
}

export default ({ children }: SectionTitleProps) => {
  return (
    <h2 className="text-3xl md:text-4xl font-bold font-lexend text-dark text-center mb-[50px]">
      {children}
    </h2>
  );
}
