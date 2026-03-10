'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { NavLink } from './types';

interface NavigationDropdownProps {
  label: string;
  links: NavLink[];
}

export function NavigationDropdown({ label, links }: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-blue flex items-center space-x-1 rounded-lg transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="dropdown-menu"
          role="menu"
          aria-label={label}
          className="absolute left-0 top-full mt-2 w-56 z-50 animate-fade-in"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-gray-200/50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="block px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-700 hover:text-primary-blue transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
