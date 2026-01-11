import {type ReactNode } from 'react';

interface StoryItemProps {
  title: string;
  children: ReactNode;
}

export default ({ title, children }: StoryItemProps) => {
  return (
    <div className="bg-white p-[30px] rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.07)] h-full">
      <h3 className="text-[24px] font-bold font-lexend text-primary mb-[15px]">
        {title}
      </h3>
      <div className="text-base text-grey font-inter leading-[1.7]">
        {children}
      </div>
    </div>
  );
};