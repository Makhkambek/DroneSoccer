'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith('/auth') || pathname?.startsWith('/admin');

  return (
    <>
      {!hideChrome && <Navigation />}
      <main>{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}
