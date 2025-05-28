import type { ReactNode } from 'react';
import HeaderComponent from '../HeaderComponent';
import FooterComponent from '../FooterComponent';

const SystemLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="top-0 z-50 px">
        <HeaderComponent />
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-auto">
        <FooterComponent />
      </footer>
    </div>
  );
};

export default SystemLayout;
