import {type ReactNode } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default ({ children }: MainLayoutProps) => {
  return (
    <div className="font-inter bg-bg min-h-screen flex flex-col overflow-x-hidden text-foreground">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}