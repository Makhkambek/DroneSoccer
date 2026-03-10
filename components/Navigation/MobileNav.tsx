'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavLink } from './types';

interface MobileNavProps {
  navLinks: NavLink[];
  competitionLinks: NavLink[];
  shopLabel: string;
  shopHref: string;
  competitionsLabel: string;
  children?: React.ReactNode;
}

export function MobileNav({
  navLinks,
  competitionLinks,
  shopLabel,
  shopHref,
  competitionsLabel,
  children,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-gray-700 hover:text-primary-blue focus:outline-none z-10 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={isOpen ? 'Close mobile menu' : 'Open mobile menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className="lg:hidden absolute left-0 right-0 top-full bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 shadow-lg animate-fade-in"
        >
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block py-3 px-4 rounded-lg font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-primary-blue shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-blue'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Competitions Section */}
            <div className="py-2">
              <p className="text-gray-500 text-sm font-semibold mb-2 px-4">
                {competitionsLabel}
              </p>
              {competitionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 pl-8 pr-4 text-gray-700 hover:text-primary-blue hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Shop Link */}
            <Link
              href={shopHref}
              onClick={() => setIsOpen(false)}
              className={`
                block py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${pathname === shopHref
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-primary-blue shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-primary-blue'
                }
              `}
            >
              {shopLabel}
            </Link>

            {/* Language Switcher */}
            {children && (
              <div className="pt-4 border-t border-gray-200">
                {children}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
