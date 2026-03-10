'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  students: number;
  purchases: number;
  applications: number;
  products: number;
  recentApplications: { name: string; course: string; date: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the admin panel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Students', value: stats?.students, color: 'bg-blue-50 text-blue-600', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
          { label: 'Purchases', value: stats?.purchases, color: 'bg-green-50 text-green-600', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
          { label: 'Applications', value: stats?.applications, color: 'bg-purple-50 text-purple-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
          { label: 'Products', value: stats?.products, color: 'bg-orange-50 text-orange-600', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow p-5">
            <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon}/>
              </svg>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats ? s.value : <span className="w-8 h-6 bg-gray-200 rounded animate-pulse inline-block"/>}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Nav Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {[
          { href: '/admin/dashboard/students', label: 'Students', desc: 'Grant or revoke course access', color: 'hover:border-green-400', bg: 'bg-green-100', icon: 'text-green-600', path: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
          { href: '/admin/dashboard/courses', label: 'Courses', desc: 'Video lessons and intro video', color: 'hover:border-purple-400', bg: 'bg-purple-100', icon: 'text-purple-600', path: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z' },
          { href: '/admin/dashboard/shop', label: 'Shop', desc: 'Products and inventory', color: 'hover:border-blue-400', bg: 'bg-blue-100', icon: 'text-blue-600', path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
          { href: '/admin/dashboard/team', label: 'Team', desc: 'Staff and team members', color: 'hover:border-red-400', bg: 'bg-red-100', icon: 'text-red-600', path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        ].map((card) => (
          <Link key={card.href} href={card.href}>
            <div className={`bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all border-2 border-transparent ${card.color} cursor-pointer`}>
              <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                <svg className={`w-6 h-6 ${card.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={card.path}/>
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{card.label}</h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Applications */}
      {stats && stats.recentApplications.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-orbitron text-lg font-bold text-gray-900 mb-4">Recent Applications</h2>
          <div className="space-y-3">
            {stats.recentApplications.map((app, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{app.name}</p>
                  <p className="text-xs text-gray-400">{app.course}</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(app.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
