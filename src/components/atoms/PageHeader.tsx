import { type ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

export default ({ children }: PageHeaderProps) => {
  return (
    <section className="bg-[linear-gradient(110deg,#f7f5f7_50%,#fdf9fb_100%)] py-[40px] mb-[60px] border-b border-[#eee]">
      <div className="w-[90%] max-w-[1140px] mx-auto text-center md:text-left">
        <h1 className="text-[30px] md:text-[36px] font-bold font-lexend text-dark">
          {children}
        </h1>
      </div>
    </section>
  );
};
