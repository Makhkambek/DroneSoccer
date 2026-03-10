'use client';

import { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  courseIds: string[];
}

const COURSES = [
  { id: '1', title: 'General Drone Course' },
  { id: '2', title: 'Drone Racing' },
  { id: '3', title: 'Drone Soccer - Class 40' },
  { id: '4', title: 'Drone Soccer - Class 20' },
];

export default function StudentsAdmin() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    const res = await fetch('/api/admin/students');
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  }

  async function grantAccess(userId: string, courseId: string) {
    const key = `${userId}-${courseId}`;
    setActionLoading(key);
    await fetch('/api/admin/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId }),
    });
    await fetchStudents();
    setActionLoading(null);
  }

  async function revokeAccess(userId: string, courseId: string) {
    const key = `${userId}-${courseId}`;
    setActionLoading(key);
    await fetch('/api/admin/students', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId }),
    });
    await fetchStudents();
    setActionLoading(null);
  }

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-orbitron text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage course access</p>
        </div>
        <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
          {students.length} students
        </span>
      </div>

      <div className="max-w-7xl">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center text-gray-400">
            No students found.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((student) => (
              <div key={student.id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-lg">{student.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        #{student.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{student.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Joined {new Date(student.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {student.courseIds.length} / {COURSES.length} courses
                  </div>
                </div>

                {/* Course access grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {COURSES.map((course) => {
                    const hasAccess = student.courseIds.includes(course.id);
                    const key = `${student.id}-${course.id}`;
                    const isLoading = actionLoading === key;

                    return (
                      <div
                        key={course.id}
                        className={`rounded-xl border-2 p-3 flex items-center justify-between transition-all ${
                          hasAccess
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-semibold text-gray-700 leading-tight">
                            {course.title}
                          </p>
                          <span
                            className={`text-xs font-medium ${
                              hasAccess ? 'text-green-600' : 'text-gray-400'
                            }`}
                          >
                            {hasAccess ? 'Access granted' : 'No access'}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            hasAccess
                              ? revokeAccess(student.id, course.id)
                              : grantAccess(student.id, course.id)
                          }
                          disabled={isLoading}
                          className={`ml-2 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${
                            hasAccess
                              ? 'bg-red-100 hover:bg-red-200 text-red-600'
                              : 'bg-green-100 hover:bg-green-200 text-green-600'
                          }`}
                          title={hasAccess ? 'Revoke access' : 'Grant access'}
                        >
                          {isLoading ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : hasAccess ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
