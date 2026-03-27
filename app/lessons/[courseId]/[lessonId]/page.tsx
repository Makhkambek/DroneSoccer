'use client';

import { use, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';

interface Lesson { id: string; title: string; description: string; order: number; durationSeconds: number; videoFile: string | null; courseId: string; }
interface ProgressEntry { lessonId: string; completed: boolean; watchedSeconds: number; }

export default function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const { courseId, lessonId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=/lessons/${courseId}/${lessonId}`);
    }
  }, [status, router, params]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Verify access (lessons endpoint returns 403 if not purchased)
      const [lessonsRes, progressRes] = await Promise.all([
        fetch(`/api/lessons?courseId=${courseId}`),
        fetch(`/api/progress?courseId=${courseId}`),
      ]);

      if (lessonsRes.status === 403) {
        router.push(`/lessons/${courseId}`);
        return;
      }
      if (lessonsRes.status === 401) {
        router.push('/auth/login');
        return;
      }

      const lessonsData: Lesson[] = await lessonsRes.json();
      setAllLessons(lessonsData);

      const found = lessonsData.find((l) => l.id === lessonId);
      if (!found) { router.push(`/lessons/${courseId}`); return; }

      // Check sequential access
      const idx = lessonsData.indexOf(found);
      const progressJson = await progressRes.json();
      const progressData: ProgressEntry[] = Array.isArray(progressJson) ? progressJson : [];
      setProgress(progressData);

      if (idx > 0) {
        const prevLesson = lessonsData[idx - 1];
        const prevCompleted = progressData.some((p) => p.lessonId === prevLesson.id && p.completed);
        if (!prevCompleted) { router.push(`/lessons/${courseId}`); return; }
      }

      const myProgress = progressData.find((p) => p.lessonId === found.id);
      setLessonCompleted(myProgress?.completed ?? false);
      setLesson(found);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [params, router]);

  useEffect(() => { if (status === 'authenticated') loadData(); }, [status, loadData]);

  const handleComplete = () => setLessonCompleted(true);

  const getMyProgress = () => progress.find((p) => p.lessonId === lessonId);
  const currentIdx = allLessons.findIndex((l) => l.id === lessonId);
  const nextLesson = currentIdx >= 0 && currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between text-sm text-white/50 mb-6">
          <div className="flex items-center gap-2">
            <Link href="/lessons" className="hover:text-white">Courses</Link>
            <span>/</span>
            <Link href={`/lessons/${courseId}`} className="hover:text-white">Course</Link>
            <span>/</span>
            <span className="text-white/80">Lesson {lesson.order}</span>
          </div>
          {(session?.user as any)?.id && (
            <span className="text-white/30 text-xs font-mono">ID: {(session?.user as any)?.id}</span>
          )}
        </div>

        {/* Video Player */}
        {lesson.videoFile ? (
          <VideoPlayer
            videoFile={lesson.videoFile}
            lessonId={lesson.id}
            courseId={courseId}
            initialWatchedSeconds={getMyProgress()?.watchedSeconds ?? 0}
            onComplete={handleComplete}
            userId={(session?.user as any)?.id}
          />
        ) : (
          <div className="bg-gray-800 rounded-xl p-20 text-center text-gray-500">
            Video not available yet
          </div>
        )}

        {/* Lesson info */}
        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-orbitron text-2xl font-bold text-white mb-2">{lesson.title}</h1>
            {lesson.description && <p className="text-gray-400">{lesson.description}</p>}
          </div>
          {lessonCompleted && nextLesson && (
            <Link
              href={`/lessons/${courseId}/${nextLesson.id}`}
              className="flex-shrink-0 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
            >
              Next lesson
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          )}
        </div>

        {/* Lesson list sidebar */}
        <div className="mt-8">
          <Link
            href={`/lessons/${courseId}`}
            className="text-primary-blue hover:underline text-sm font-semibold"
          >
            ← Back to all lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
