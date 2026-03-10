'use client';

import Link from 'next/link';
import SponsorsBar from '../SponsorsBar';
import LanguageSwitcher from '../LanguageSwitcher';
import { NavigationLogo } from './NavigationLogo';
import { DesktopNav } from './DesktopNav';
import { NavigationDropdown } from './NavigationDropdown';
import { MobileNav } from './MobileNav';
import { useScrollDetection } from './useScrollDetection';

export default function NavigationNew() {
  const isScrolled = useScrollDetection(20);

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
      {/* Sponsors Bar */}
      <SponsorsBar />

      {/* Main Navigation - ORQA Style */}
      <nav
        className={`
          fixed w-full top-28 z-50 transition-all duration-300
          ${isScrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-border'
            : 'bg-black border-b border-border-dark'
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavigationLogo locale="en" />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <DesktopNav navLinks={navLinks} />

              <NavigationDropdown
                label="Competitions"
                links={competitionLinks}
              />

              <Link
                href="/shop"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-blue transition-colors duration-200 rounded-lg"
              >
                Shop
              </Link>

              <LanguageSwitcher />
            </div>

            {/* Mobile Navigation */}
            <MobileNav
              navLinks={navLinks}
              competitionLinks={competitionLinks}
              shopLabel="Shop"
              shopHref="/shop"
              competitionsLabel="Competitions"
            >
              <LanguageSwitcher />
            </MobileNav>
          </div>
        </div>
      </nav>
    </>
  );
}
