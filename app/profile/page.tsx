'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Purchase { courseId: string; paidAt: string; }
interface CourseProgress { courseId: string; completed: number; total: number; }

const COURSE_NAMES: Record<string, string> = {
  '1': 'General Drone Course',
  '2': 'Drone Racing',
  '3': 'Drone Soccer - Class 40',
  '4': 'Drone Soccer - Class 20',
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, CourseProgress>>({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login?callbackUrl=/profile');
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/purchases')
      .then(r => r.json())
      .then(async (data: Purchase[]) => {
        if (!Array.isArray(data)) return;
        setPurchases(data);
        // Load progress for each course
        const map: Record<string, CourseProgress> = {};
        await Promise.all(data.map(async (p) => {
          const [lessonsRes, progressRes] = await Promise.all([
            fetch(`/api/lessons?courseId=${p.courseId}`),
            fetch(`/api/progress?courseId=${p.courseId}`),
          ]);
          const lessons = await lessonsRes.json();
          const progress = await progressRes.json();
          const total = Array.isArray(lessons) ? lessons.length : 0;
          const completed = Array.isArray(progress) ? progress.filter((e: any) => e.completed).length : 0;
          map[p.courseId] = { courseId: p.courseId, completed, total };
        }));
        setProgressMap(map);
      })
      .catch(() => {});
  }, [status]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);
    if (newPassword.length < 6) { setPwError('New password must be at least 6 characters.'); return; }
    if (newPassword !== confirmPassword) { setPwError('Passwords do not match.'); return; }
    setPwLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setPwError(data.error || 'Failed to change password.'); return; }
      setPwSuccess(true);
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    } catch {
      setPwError('Something went wrong. Please try again.');
    } finally {
      setPwLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user as any;
  const joinedDate = user?.id && user.id !== 'admin'
    ? null // we don't expose createdAt in session, but we show ID
    : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-red rounded-full flex items-center justify-center text-white font-orbitron font-bold text-2xl flex-shrink-0">
              {user.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div>
              <h1 className="font-orbitron text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{user.email}</p>
              {user.id && user.id !== 'admin' && (
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-primary-blue text-xs font-mono rounded">
                  Student #{user.id}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="font-orbitron text-lg font-bold text-gray-900 mb-5">My Courses</h2>
          {purchases.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-3">You haven't enrolled in any courses yet.</p>
              <Link href="/lessons" className="text-primary-blue font-semibold hover:underline text-sm">
                Browse courses →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((p) => {
                const prog = progressMap[p.courseId];
                const pct = prog && prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
                return (
                  <div key={p.courseId} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {COURSE_NAMES[p.courseId] || `Course #${p.courseId}`}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-blue to-blue-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {prog ? `${prog.completed}/${prog.total}` : '–'}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/lessons/${p.courseId}`}
                      className="px-4 py-2 bg-primary-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
                    >
                      {pct === 100 ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="font-orbitron text-lg font-bold text-gray-900 mb-5">Change Password</h2>

          {pwSuccess && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-semibold">
              Password changed successfully!
            </div>
          )}
          {pwError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{pwError}</div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                placeholder="Min. 6 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={pwLoading}
              className="w-full bg-gradient-to-r from-primary-blue to-blue-700 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {pwLoading ? 'Saving...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Sign out */}
        <div className="text-center">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Sign out
          </button>
        </div>

      </div>
    </div>
  );
}
