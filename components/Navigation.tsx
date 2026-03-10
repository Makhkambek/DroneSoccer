'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import SponsorsBar from './SponsorsBar';

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) return;
    const load = () => {
      fetch('/api/notifications')
        .then(r => r.json())
        .then(d => { setNotifications(d.notifications ?? []); setUnreadCount(d.unreadCount ?? 0); })
        .catch(() => {});
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleOpenNotif = async () => {
    setNotifOpen(prev => !prev);
    if (!notifOpen && unreadCount > 0) {
      await fetch('/api/notifications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

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

              {session ? (
                <div className="flex items-center space-x-3">
                  {/* Notification Bell */}
                  <div className="relative" ref={notifRef}>
                    <button
                      onClick={handleOpenNotif}
                      className="relative p-2 text-gray-500 hover:text-primary-blue transition-colors"
                      aria-label="Notifications"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                      </svg>
                      {unreadCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                      )}
                    </button>

                    {/* Dropdown */}
                    {notifOpen && (
                      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                          <span className="font-semibold text-gray-900 text-sm">Notifications</span>
                          {notifications.length > 0 && (
                            <Link href="/dashboard" onClick={() => setNotifOpen(false)} className="text-xs text-primary-blue hover:underline">View all</Link>
                          )}
                        </div>
                        <div className="max-h-72 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="px-4 py-6 text-center text-gray-400 text-sm">No notifications yet</div>
                          ) : (
                            notifications.slice(0, 5).map(n => (
                              <div
                                key={n.id}
                                className={`px-4 py-3 border-b border-gray-50 last:border-0 ${!n.read ? 'bg-blue-50' : ''}`}
                              >
                                {n.link ? (
                                  <Link href={n.link} onClick={() => setNotifOpen(false)}>
                                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                                  </Link>
                                ) : (
                                  <>
                                    <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                                  </>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-primary-blue transition-colors">
                    {session.user?.name || session.user?.email}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" className="btn-primary text-sm px-4 py-2">
                  Login
                </Link>
              )}
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

            {session ? (
              <div className="pt-2 border-t border-gray-200">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-blue transition-colors"
                >
                  My Dashboard
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-blue transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                  className="w-full text-left py-3 px-4 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 rounded-lg font-medium text-white bg-primary-blue hover:bg-blue-700 text-center transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}