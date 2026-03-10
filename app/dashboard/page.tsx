'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CourseData {
  courseId: string;
  title: string;
  level: string;
  totalLessons: number;
  completedLessons: number;
  paidAt: string;
  amount: number;
  currency: string;
  lastLesson: { id: string; title: string } | null;
}

interface DashboardData {
  user: { name: string; email: string; id: string };
  courses: CourseData[];
}

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login?callbackUrl=/dashboard');
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/student/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session || !data) return null;

  const totalLessons = data.courses.reduce((s, c) => s + c.totalLessons, 0);
  const completedLessons = data.courses.reduce((s, c) => s + c.completedLessons, 0);
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const totalSpent = data.courses.reduce((s, c) => s + (c.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* Welcome header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-orbitron text-2xl font-bold text-gray-900">
              Welcome back, {data.user.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Here's your learning overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="text-sm text-primary-blue font-semibold hover:underline"
            >
              Profile
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Courses Enrolled',
              value: data.courses.length,
              color: 'bg-blue-50 text-blue-600',
              icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
            },
            {
              label: 'Lessons Done',
              value: completedLessons,
              color: 'bg-green-50 text-green-600',
              icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            },
            {
              label: 'Overall Progress',
              value: `${overallPct}%`,
              color: 'bg-purple-50 text-purple-600',
              icon: 'M13 10V3L4 14h7v7l9-11h-7z',
            },
            {
              label: 'Total Lessons',
              value: totalLessons,
              color: 'bg-orange-50 text-orange-600',
              icon: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z',
            },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl shadow-sm p-5">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.icon} />
                </svg>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* My courses */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-orbitron text-lg font-bold text-gray-900 mb-5">My Courses</h2>

          {data.courses.length === 0 ? (
            <div className="text-center py-10">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-gray-500 mb-3">No courses yet. Start learning today!</p>
              <Link
                href="/lessons"
                className="inline-block px-5 py-2.5 bg-primary-blue text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {data.courses.map((course) => {
                const pct = course.totalLessons > 0
                  ? Math.round((course.completedLessons / course.totalLessons) * 100)
                  : 0;
                const isDone = pct === 100;

                return (
                  <div key={course.courseId} className="border border-gray-100 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900">{course.title}</h3>
                          {course.level && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{course.level}</span>
                          )}
                          {isDone && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-semibold rounded-full">Completed</span>
                          )}
                        </div>
                        {course.lastLesson && (
                          <p className="text-xs text-gray-400 mt-1">
                            Last watched: <span className="text-gray-600">{course.lastLesson.title}</span>
                          </p>
                        )}
                      </div>
                      <Link
                        href={`/lessons/${course.courseId}`}
                        className="flex-shrink-0 px-4 py-2 bg-primary-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {isDone ? 'Review' : 'Continue'}
                      </Link>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isDone ? 'bg-green-500' : 'bg-gradient-to-r from-primary-blue to-blue-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 flex-shrink-0 w-10 text-right">{pct}%</span>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {course.completedLessons}/{course.totalLessons}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Purchase history */}
        {data.courses.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-orbitron text-lg font-bold text-gray-900 mb-5">Purchase History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-500 font-medium pb-3">Course</th>
                    <th className="text-left text-gray-500 font-medium pb-3">Date</th>
                    <th className="text-right text-gray-500 font-medium pb-3">Amount</th>
                    <th className="text-right text-gray-500 font-medium pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {data.courses.map((course) => (
                    <tr key={course.courseId}>
                      <td className="py-3 font-medium text-gray-900">{course.title}</td>
                      <td className="py-3 text-gray-500">
                        {course.paidAt ? new Date(course.paidAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        }) : '—'}
                      </td>
                      <td className="py-3 text-right text-gray-900">
                        {course.amount > 0
                          ? `${(course.amount / 100).toFixed(2)} ${(course.currency || 'USD').toUpperCase()}`
                          : <span className="text-green-600 font-semibold">Free Access</span>
                        }
                      </td>
                      <td className="py-3 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {totalSpent > 0 && (
                  <tfoot>
                    <tr className="border-t border-gray-200">
                      <td colSpan={2} className="pt-3 font-semibold text-gray-700">Total spent</td>
                      <td className="pt-3 text-right font-bold text-gray-900">
                        ${(totalSpent / 100).toFixed(2)}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
