'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-orbitron text-3xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-500 mt-1">Welcome to the admin panel</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Link href="/admin/dashboard/students">
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-green-400 cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Students</h3>
            <p className="text-gray-500 text-sm">Grant or revoke course access</p>
          </div>
        </Link>

        <Link href="/admin/dashboard/courses">
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-purple-400 cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Courses</h3>
            <p className="text-gray-500 text-sm">Video lessons and intro video</p>
          </div>
        </Link>

        <Link href="/admin/dashboard/shop">
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-blue-400 cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Shop</h3>
            <p className="text-gray-500 text-sm">Products and inventory</p>
          </div>
        </Link>

        <Link href="/admin/dashboard/team">
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition-all border-2 border-transparent hover:border-red-400 cursor-pointer">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">Team</h3>
            <p className="text-gray-500 text-sm">Staff and team members</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
