'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from './types';

interface DesktopNavProps {
  navLinks: NavLink[];
}

export function DesktopNav({ navLinks }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center space-x-2">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`
              relative px-4 py-2 text-sm font-medium
              transition-colors duration-200
              ${isActive
                ? 'text-white'
                : 'text-text-secondary hover:text-white'
              }
            `}
          >
            {link.label}
            {isActive && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-blue"
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
