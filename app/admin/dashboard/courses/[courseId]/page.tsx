'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';

interface Lesson { id: string; title: string; description: string; order: number; durationSeconds: number; videoFile: string | null; }

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function AdminCourseLessons({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [form, setForm] = useState({ title: '', description: '', order: '', durationSeconds: '', videoUrl: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/lessons?courseId=${courseId}`)
      .then((r) => r.json())
      .then((data) => setLessons(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [courseId]);

  const openCreate = () => {
    setEditingLesson(null);
    setForm({ title: '', description: '', order: String(lessons.length + 1), durationSeconds: '', videoUrl: '' });
    setShowForm(true);
  };

  const openEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setForm({
      title: lesson.title,
      description: lesson.description,
      order: String(lesson.order),
      durationSeconds: String(lesson.durationSeconds),
      videoUrl: lesson.videoFile ?? '',
    });
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...(editingLesson ? { id: editingLesson.id } : { courseId }),
        title: form.title,
        description: form.description,
        order: parseInt(form.order) || 1,
        durationSeconds: parseInt(form.durationSeconds) || 0,
        videoFile: form.videoUrl.trim() || null,
      };
      const res = await fetch('/api/lessons', {
        method: editingLesson ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        if (editingLesson) {
          setLessons((p) => p.map((l) => l.id === data.id ? data : l).sort((a, b) => a.order - b.order));
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

  const isYouTube = (url: string | null) =>
    url && (url.includes('youtube.com') || url.includes('youtu.be'));

  if (loading) {
    return <div className="p-8 flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"/></div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/courses" className="text-gray-400 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div>
            <h1 className="font-orbitron text-2xl font-bold text-gray-900">Manage Lessons</h1>
            <p className="text-sm text-gray-500">{lessons.length} lessons</p>
          </div>
        </div>
        <button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Lesson
        </button>
      </div>

      {lessons.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center text-gray-400">
          No lessons yet. Add the first one!
        </div>
      ) : (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white rounded-xl shadow p-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-gray-600 text-sm">
                  {lesson.order}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                  {lesson.description && <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{lesson.description}</p>}
                  <div className="flex items-center gap-3 mt-2 flex-wrap">
                    {lesson.durationSeconds > 0 && (
                      <span className="text-xs text-gray-400">{fmt(lesson.durationSeconds)}</span>
                    )}
                    {lesson.videoFile ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                        {isYouTube(lesson.videoFile) ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            YouTube
                          </>
                        ) : '✓ Video file'}
                      </span>
                    ) : (
                      <span className="text-xs text-orange-500 font-medium">No video</span>
                    )}
                  </div>
                  {lesson.videoFile && (
                    <p className="text-xs text-gray-400 mt-1 truncate max-w-md">{lesson.videoFile}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(lesson)} className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(lesson.id)} className="px-3 py-1.5 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors">
                    Delete
                  </button>
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
                <input required value={form.title} onChange={(e) => setForm((p) => ({...p, title: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Lesson title"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea rows={2} value={form.description} onChange={(e) => setForm((p) => ({...p, description: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Short description"/>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">YouTube URL (or video filename)</label>
                <input
                  value={form.videoUrl}
                  onChange={(e) => setForm((p) => ({...p, videoUrl: e.target.value}))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://youtu.be/... or filename.mp4"
                />
                <p className="text-xs text-gray-400 mt-1">Paste a YouTube link or enter a video filename from the server</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Order</label>
                  <input type="number" min="1" value={form.order} onChange={(e) => setForm((p) => ({...p, order: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (seconds)</label>
                  <input type="number" min="0" value={form.durationSeconds} onChange={(e) => setForm((p) => ({...p, durationSeconds: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="213"/>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save Lesson'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
