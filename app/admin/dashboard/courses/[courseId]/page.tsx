'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Lesson { id: string; title: string; description: string; order: number; durationSeconds: number; videoFile: string | null; }

export default function AdminCourseLessons({ params }: { params: { courseId: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [form, setForm] = useState({ title: '', description: '', order: '', durationSeconds: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null); // lessonId being uploaded

  useEffect(() => { if (status === 'unauthenticated') router.push('/admin/login'); }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch(`/api/lessons?courseId=${params.courseId}`)
      .then((r) => r.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [status, params.courseId]);

  const openCreate = () => {
    setEditingLesson(null);
    setForm({ title: '', description: '', order: String(lessons.length + 1), durationSeconds: '' });
    setShowForm(true);
  };

  const openEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setForm({ title: lesson.title, description: lesson.description, order: String(lesson.order), durationSeconds: String(lesson.durationSeconds) });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...(editingLesson ? { id: editingLesson.id } : { courseId: params.courseId }),
        title: form.title,
        description: form.description,
        order: parseInt(form.order) || 1,
        durationSeconds: parseInt(form.durationSeconds) || 0,
      };
      const res = await fetch('/api/lessons', {
        method: editingLesson ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        if (editingLesson) {
          setLessons((p) => p.map((l) => l.id === data.id ? data : l));
        } else {
          setLessons((p) => [...p, data].sort((a, b) => a.order - b.order));
        }
        setShowForm(false);
      }
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this lesson?')) return;
    await fetch(`/api/lessons?id=${id}`, { method: 'DELETE' });
    setLessons((p) => p.filter((l) => l.id !== id));
  };

  const handleVideoUpload = async (lessonId: string, file: File) => {
    setUploading(lessonId);
    const fd = new FormData();
    fd.append('file', file);
    const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const { filename } = await uploadRes.json();
    if (filename) {
      await fetch('/api/lessons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lessonId, videoFile: filename }),
      });
      setLessons((p) => p.map((l) => l.id === lessonId ? { ...l, videoFile: filename } : l));
    }
    setUploading(null);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin"/></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard/courses" className="text-gray-500 hover:text-gray-900">← Courses</Link>
          <h1 className="font-orbitron text-2xl font-bold text-gray-900">Manage Lessons</h1>
        </div>
        <button onClick={openCreate} className="px-4 py-2 bg-primary-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Lesson
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {lessons.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center text-gray-500">No lessons yet. Add the first one!</div>
        ) : (
          <div className="space-y-3">
            {lessons.sort((a, b) => a.order - b.order).map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-xl shadow p-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-gray-600 text-sm">
                    {lesson.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                    {lesson.description && <p className="text-sm text-gray-500 mt-0.5">{lesson.description}</p>}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      {lesson.durationSeconds > 0 && (
                        <span className="text-xs text-gray-400">{fmt(lesson.durationSeconds)}</span>
                      )}
                      {lesson.videoFile ? (
                        <span className="text-xs text-green-600 font-semibold">✓ Video uploaded</span>
                      ) : (
                        <span className="text-xs text-orange-500">No video</span>
                      )}
                      {/* Video upload */}
                      <label className="cursor-pointer text-xs text-primary-blue font-semibold hover:underline">
                        {uploading === lesson.id ? 'Uploading...' : lesson.videoFile ? 'Replace video' : 'Upload video'}
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          disabled={uploading !== null}
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleVideoUpload(lesson.id, f); }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => openEdit(lesson)} className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">Edit</button>
                    <button onClick={() => handleDelete(lesson.id)} className="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
              <h2 className="font-orbitron text-xl font-bold mb-6">{editingLesson ? 'Edit Lesson' : 'New Lesson'}</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                  <input required value={form.title} onChange={(e) => setForm((p) => ({...p, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                  <textarea rows={2} value={form.description} onChange={(e) => setForm((p) => ({...p, description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Order</label>
                    <input type="number" min="1" value={form.order} onChange={(e) => setForm((p) => ({...p, order: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (seconds)</label>
                    <input type="number" min="0" value={form.durationSeconds} onChange={(e) => setForm((p) => ({...p, durationSeconds: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="900"/>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="flex-1 py-2 bg-primary-blue text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
