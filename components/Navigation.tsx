'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SponsorsBar from './SponsorsBar';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-drone-soccer', label: 'About Drone Soccer' },
    { href: '/about-team', label: 'About Team' },
    { href: '/lessons', label: 'Lessons' },
    { href: '/apply', label: 'Apply' },
  ];

  const competitionLinks = [
    { href: '/competitions#class40', label: 'Class 40' },
    { href: '/competitions#class20', label: 'Class 20' },
    { href: '/competitions#racing', label: 'Drone Racing' },
  ];

  return (
    <>
      {/* Спонсорская полоса */}
      <SponsorsBar />

      {/* Основная навигация */}
      <nav className={`fixed w-full top-28 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm shadow-md'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 z-10">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-red rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-orbitron font-bold text-xl">DS</span>
              </div>
              <span className="font-orbitron text-2xl font-bold text-gradient hidden sm:block">
                DRONE SOCCER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              {/* 
                  ИСПРАВЛЕНИЕ ЗДЕСЬ:
                  1. Оставили класс 'group'
                  2. Добавили 'group-hover:...' классы в выпадающий список
                  3. Убрали зависимость от кастомного CSS для отображения
              */}
              <div className="relative group h-full flex items-center">
                <button className="nav-link flex items-center space-x-1 h-full">
                  <span>Competitions</span>
                  <svg className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                {/* Меню с логикой group-hover */}
                <div className="absolute left-0 top-full mt-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50">
                  <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
                    {competitionLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-primary-blue transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/shop" className={`nav-link ${pathname === '/shop' ? 'active' : ''}`}>
                Shop
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-primary-blue focus:outline-none z-10"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="px-4 py-4 bg-white border-t border-gray-200 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors ${pathname === link.href
                  ? 'bg-blue-50 text-primary-blue'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-blue'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Competitions Section */}
            <div className="py-2">
              <p className="text-gray-500 text-sm font-semibold mb-2 px-4">Competitions</p>
              {competitionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 pl-8 pr-4 text-gray-700 hover:text-primary-blue hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-3 px-4 rounded-lg font-medium transition-colors ${pathname === '/shop'
                ? 'bg-blue-50 text-primary-blue'
                : 'text-gray-700 hover:bg-gray-50 hover:text-primary-blue'
                }`}
            >
              Shop
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}