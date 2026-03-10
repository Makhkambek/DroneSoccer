'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course { id: string; title: string; price: number; level: string; duration: string; published: boolean; }

export default function AdminCourses() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', duration: '', level: 'Beginner', published: false });
  const [saving, setSaving] = useState(false);

  // Intro video state
  const [introFile, setIntroFile] = useState('');
  const [introDuration, setIntroDuration] = useState(120);
  const [introSaving, setIntroSaving] = useState(false);
  const [uploadingIntro, setUploadingIntro] = useState(false);

  useEffect(() => { if (status === 'unauthenticated') router.push('/admin/login'); }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/courses').then((r) => r.json()).then(setCourses).finally(() => setLoading(false));
    fetch('/api/admin/intro-video').then((r) => r.json()).then((d) => {
      setIntroFile(d.videoFile ?? '');
      setIntroDuration(d.duration ?? 120);
    }).catch(() => {});
  }, [status]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Math.round(parseFloat(form.price) * 100) }),
      });
      const data = await res.json();
      if (res.ok) { setCourses((p) => [...p, data]); setShowForm(false); setForm({ title: '', description: '', price: '', duration: '', level: 'Beginner', published: false }); }
    } finally { setSaving(false); }
  };

  const togglePublish = async (course: Course) => {
    await fetch('/api/courses', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: course.id, published: !course.published }),
    });
    setCourses((p) => p.map((c) => c.id === course.id ? { ...c, published: !c.published } : c));
  };

  const handleIntroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIntro(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.filename) setIntroFile(data.filename);
    setUploadingIntro(false);
  };

  const saveIntroVideo = async () => {
    setIntroSaving(true);
    await fetch('/api/admin/intro-video', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoFile: introFile || null, duration: introDuration }),
    });
    setIntroSaving(false);
    alert('Intro video saved!');
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"/></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-900">← Dashboard</Link>
          <h1 className="font-orbitron text-2xl font-bold text-gray-900">Courses</h1>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + New Course
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Intro Video */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-orbitron text-lg font-bold text-gray-900 mb-4">Mandatory Intro Video</h2>
          <p className="text-sm text-gray-500 mb-4">This video plays once for every student before they can access any course. They cannot skip or pause it.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Video</label>
              <input type="file" accept="video/*" onChange={handleIntroUpload} className="block w-full text-sm text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"/>
              {uploadingIntro && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
              {introFile && <p className="text-xs text-green-600 mt-1 truncate">✓ {introFile}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (seconds, max 120)</label>
              <input type="number" min={10} max={120} value={introDuration} onChange={(e) => setIntroDuration(parseInt(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
            </div>
            <button onClick={saveIntroVideo} disabled={introSaving} className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
              {introSaving ? 'Saving...' : 'Save Intro Video'}
            </button>
          </div>
        </div>

        {/* Courses list */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow p-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.level} · {course.duration} · ${(course.price / 100).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button onClick={() => togglePublish(course)} className={`px-3 py-1 rounded-full text-xs font-semibold ${course.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {course.published ? 'Published' : 'Draft'}
                </button>
                <Link href={`/admin/dashboard/courses/${course.id}`} className="px-3 py-1 bg-blue-50 text-primary-blue rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
                  Manage Lessons
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Create form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <h2 className="font-orbitron text-xl font-bold mb-6">New Course</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                  <input required value={form.title} onChange={(e) => setForm((p) => ({...p, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea rows={3} value={form.description} onChange={(e) => setForm((p) => ({...p, description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (USD) *</label>
                    <input required type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm((p) => ({...p, price: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="49.00"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                    <input value={form.duration} onChange={(e) => setForm((p) => ({...p, duration: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="4 weeks"/>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
                    <select value={form.level} onChange={(e) => setForm((p) => ({...p, level: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({...p, published: e.target.checked}))} className="w-4 h-4"/>
                      <span className="text-sm font-semibold text-gray-700">Publish immediately</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="flex-1 py-2 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {saving ? 'Creating...' : 'Create Course'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
