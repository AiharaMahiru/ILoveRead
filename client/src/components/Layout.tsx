// Layout Component
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-neo-primary border-b-4 border-neo-border p-4 flex justify-between items-center shadow-neo-shadow">
        <h1 className="text-3xl font-bold uppercase tracking-tighter">I Love Read</h1>
        <nav>
          {/* Nav items will go here */}
        </nav>
      </header>
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t-4 border-neo-border bg-white p-4 text-center font-bold">
        &copy; 2024 ILOVEREAD
      </footer>
    </div>
  );
};

export default Layout;
