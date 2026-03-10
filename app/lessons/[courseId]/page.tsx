'use client';

import { use, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import IntroVideoOverlay from '@/components/IntroVideoOverlay';

interface Course { id: string; title: string; description: string; price: number; currency: string; duration: string; level: string; }
interface Lesson { id: string; title: string; description: string; order: number; durationSeconds: number; videoFile: string | null; }
interface ProgressEntry { lessonId: string; completed: boolean; watchedSeconds: number; }

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [owned, setOwned] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(true);
  const [introVideo, setIntroVideo] = useState<{ videoFile: string | null; duration: number } | null>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Always load course + lessons (public)
      const [coursesRes, lessonsRes] = await Promise.all([
        fetch('/api/courses'),
        fetch(`/api/lessons?courseId=${courseId}`),
      ]);
      const courses: Course[] = await coursesRes.json();
      const found = courses.find((c) => c.id === courseId);
      if (!found) { router.push('/lessons'); return; }
      setCourse(found);

      const lessonsData: Lesson[] = await lessonsRes.json();
      setLessons(Array.isArray(lessonsData) ? lessonsData : []);

      // If logged in, check ownership and progress
      if (status === 'authenticated') {
        const ownRes = await fetch(`/api/purchases?courseId=${courseId}`);
        const ownData = await ownRes.json();
        setOwned(ownData.owned);

        if (ownData.owned) {
          const [progressRes, introConfigRes, introStatusRes] = await Promise.all([
            fetch(`/api/progress?courseId=${courseId}`),
            fetch('/api/intro-video-public').catch(() => null),
            fetch('/api/progress?type=intro'),
          ]);

          const progressData: ProgressEntry[] = await progressRes.json();
          setProgress(Array.isArray(progressData) ? progressData : []);

          if (introConfigRes?.ok) {
            const ic = await introConfigRes.json();
            setIntroVideo(ic);
            if (ic.videoFile) {
              const introStatus = await introStatusRes.json();
              setIntroCompleted(introStatus.completed);
            } else {
              setIntroCompleted(true);
            }
          } else {
            setIntroCompleted(true);
          }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [courseId, status, router]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    setShowIntro(false);
  };

  const isLessonUnlocked = (lesson: Lesson, idx: number): boolean => {
    if (idx === 0) return true;
    const prevLesson = lessons[idx - 1];
    return progress.some((p) => p.lessonId === prevLesson.id && p.completed);
  };

  const getLessonProgress = (lessonId: string) =>
    progress.find((p) => p.lessonId === lessonId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  const priceFormatted = `$${(course.price / 100).toFixed(2)}`;
  const completedCount = progress.filter((p) => p.completed).length;
  const allCompleted = lessons.length > 0 && completedCount === lessons.length;
  const totalDuration = lessons.reduce((sum, l) => sum + (l.durationSeconds || 0), 0);

  return (
    <>
      {showIntro && introVideo?.videoFile && (
        <IntroVideoOverlay
          videoFile={introVideo.videoFile}
          totalDuration={introVideo.duration}
          onComplete={handleIntroComplete}
        />
      )}

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary-blue to-blue-800 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/lessons" className="text-white/70 hover:text-white text-sm mb-4 inline-block">
              ← Back to courses
            </Link>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
            <p className="text-white/80 text-lg max-w-2xl mb-5">{course.description}</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{course.level}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{course.duration}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{lessons.length} lessons</span>
              {totalDuration > 0 && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{fmt(totalDuration)} total</span>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* Success banner */}
          {searchParams.get('success') === 'true' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 font-semibold">
              Payment successful! Your course is now unlocked.
            </div>
          )}

          {/* Certificate banner */}
          {allCompleted && (
            <div className="mb-6 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎓</span>
                <div>
                  <p className="font-bold text-gray-900">Course Completed!</p>
                  <p className="text-sm text-gray-600">Download your certificate of completion.</p>
                </div>
              </div>
              <a
                href={`/api/certificate/${courseId}`}
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-lg hover:opacity-90 transition-all flex-shrink-0 text-sm"
              >
                Download Certificate
              </a>
            </div>
          )}

          {/* Progress bar (owned users) */}
          {owned && lessons.length > 0 && (
            <div className="mb-6 p-4 bg-white rounded-xl shadow-sm flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Your progress</span>
                  <span>{completedCount}/{lessons.length} lessons</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-blue to-blue-500 transition-all duration-500"
                    style={{ width: `${lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Intro video card (owned users) */}
          {owned && introVideo?.videoFile && (
            <div className={`mb-6 bg-white rounded-xl shadow-sm border-2 ${introCompleted ? 'border-green-200' : 'border-primary-blue'}`}>
              <div className="flex items-center gap-4 p-5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${introCompleted ? 'bg-green-100' : 'bg-blue-100'}`}>
                  {introCompleted ? (
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7L8 5z"/>
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-0.5">Introduction</p>
                  <h3 className="font-semibold text-gray-900">Course Introduction Video</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {introCompleted ? 'Completed' : 'Watch this before starting the course.'}
                  </p>
                </div>
                <button
                  onClick={() => setShowIntro(true)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${introCompleted ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-primary-blue text-white hover:bg-blue-700'}`}
                >
                  {introCompleted ? 'Rewatch' : 'Watch'}
                </button>
              </div>
            </div>
          )}

          {/* Lesson list */}
          <h2 className="font-orbitron text-2xl font-bold text-gray-900 mb-4">
            Lessons <span className="text-gray-400 font-normal text-lg">({lessons.length})</span>
          </h2>

          {lessons.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center text-gray-500">
              No lessons available yet. Check back soon.
            </div>
          ) : (
            <div className="space-y-3 mb-10">
              {lessons.map((lesson, idx) => {
                const prog = getLessonProgress(lesson.id);
                const isCompleted = prog?.completed ?? false;
                const unlocked = owned && isLessonUnlocked(lesson, idx) && introCompleted;

                return (
                  <div
                    key={lesson.id}
                    className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                      isCompleted ? 'border-green-200' : unlocked ? 'border-transparent hover:border-primary-blue' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4 p-5">
                      {/* Status icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        isCompleted ? 'bg-green-100 text-green-600' : owned ? 'bg-blue-100 text-primary-blue' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        ) : (
                          lesson.order
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">Lesson {lesson.order}</p>
                        <h3 className="font-semibold text-gray-900 truncate">{lesson.title}</h3>
                        {lesson.description && (
                          <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{lesson.description}</p>
                        )}
                        {prog && !isCompleted && prog.watchedSeconds > 0 && (
                          <p className="text-xs text-blue-500 mt-1">Watched {fmt(prog.watchedSeconds)}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        {lesson.durationSeconds > 0 && (
                          <span className="text-sm text-gray-400">{fmt(lesson.durationSeconds)}</span>
                        )}
                        {owned ? (
                          unlocked && lesson.videoFile ? (
                            <Link
                              href={`/lessons/${courseId}/${lesson.id}`}
                              className="px-4 py-2 bg-primary-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              {isCompleted ? 'Rewatch' : prog?.watchedSeconds ? 'Continue' : 'Watch'}
                            </Link>
                          ) : (
                            <span className="px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg">
                              {lesson.videoFile ? 'Locked' : 'Coming soon'}
                            </span>
                          )
                        ) : (
                          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA for non-owners */}
          {!owned && (
            <div className="bg-gradient-to-r from-primary-blue to-blue-800 rounded-2xl p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8h12a2 2 0 012 2v4a2 2 0 01-2 2H3a2 2 0 01-2-2v-4a2 2 0 012-2z"/>
                </svg>
              </div>
              <h3 className="font-orbitron text-2xl font-bold mb-2">
                {priceFormatted} — Get Full Access
              </h3>
              <p className="text-white/80 mb-6">
                Unlock all {lessons.length} lessons and start learning today
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/apply"
                  className="px-8 py-3 bg-white text-primary-blue font-bold rounded-xl hover:bg-gray-100 transition-all"
                >
                  Apply Now
                </Link>
                {!session && (
                  <Link
                    href={`/auth/login?callbackUrl=/lessons/${courseId}`}
                    className="px-8 py-3 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all border border-white/40"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
