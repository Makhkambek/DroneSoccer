'use client';

import { use, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import IntroVideoOverlay from '@/components/IntroVideoOverlay';

interface Course { id: string; title: string; description: string; price: number; currency: string; duration: string; level: string; }
interface Lesson { id: string; title: string; description: string; order: number; durationSeconds: number; videoFile: string | null; }
interface ProgressEntry { lessonId: string; completed: boolean; watchedSeconds: number; }

export default function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<ProgressEntry[]>([]);
  const [owned, setOwned] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(true); // assume true until we know
  const [introVideo, setIntroVideo] = useState<{ videoFile: string | null; duration: number } | null>(null);
  const [showIntro, setShowIntro] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/auth/login?callbackUrl=/lessons/${courseId}`);
    }
  }, [status, router, courseId]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Load course info (public)
      const coursesRes = await fetch('/api/courses');
      const courses: Course[] = await coursesRes.json();
      const found = courses.find((c) => c.id === courseId);
      if (!found) { router.push('/lessons'); return; }
      setCourse(found);

      if (status !== 'authenticated') return;

      // Check ownership
      const ownRes = await fetch(`/api/purchases?courseId=${courseId}`);
      const ownData = await ownRes.json();
      setOwned(ownData.owned);

      if (ownData.owned) {
        // Load lessons and progress
        const [lessonsRes, progressRes, introRes, introStatusRes] = await Promise.all([
          fetch(`/api/lessons?courseId=${courseId}`),
          fetch(`/api/progress?courseId=${courseId}`),
          fetch('/api/admin/intro-video').catch(() => null), // admin endpoint — will 401 for students
          fetch('/api/progress?type=intro'),
        ]);

        const lessonsData: Lesson[] = await lessonsRes.json();
        setLessons(lessonsData);

        const progressData: ProgressEntry[] = await progressRes.json();
        setProgress(Array.isArray(progressData) ? progressData : []);

        // Get intro video config — for students use public endpoint
        const introConfigRes = await fetch('/api/intro-video-public').catch(() => null);
        if (introConfigRes?.ok) {
          const ic = await introConfigRes.json();
          setIntroVideo(ic);
          // Only require intro if a video is actually configured
          if (ic.videoFile) {
            const introStatus = await introStatusRes.json();
            setIntroCompleted(introStatus.completed);
            // Don't auto-show — user clicks "Watch Introduction" button
          } else {
            setIntroCompleted(true);
          }
        } else {
          setIntroCompleted(true);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [courseId, status, router]);

  useEffect(() => { if (status === 'authenticated') loadData(); }, [status, loadData]);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const res = await fetch('/api/purchases/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: courseId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      alert('Payment initiation failed. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleIntroComplete = () => {
    setIntroCompleted(true);
    setShowIntro(false);
  };

  const isLessonUnlocked = (lesson: Lesson, idx: number): boolean => {
    if (idx === 0) return true; // first lesson always unlocked
    const prevLesson = lessons[idx - 1];
    return progress.some((p) => p.lessonId === prevLesson.id && p.completed);
  };

  const getLessonProgress = (lessonId: string) =>
    progress.find((p) => p.lessonId === lessonId);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  if (status === 'loading' || loading) {
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
            <p className="text-white/80 text-lg max-w-2xl">{course.description}</p>
            <div className="flex gap-4 mt-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{course.level}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{course.duration}</span>
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

          {!owned ? (
            /* Paywall */
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h2 className="font-orbitron text-3xl font-bold text-gray-900 mb-2">{priceFormatted}</h2>
              <p className="text-gray-600 mb-8">Purchase this course to access all video lessons</p>
              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="px-10 py-4 bg-gradient-to-r from-primary-blue to-blue-700 text-white font-bold rounded-xl hover:opacity-90 transition-all text-lg disabled:opacity-50"
              >
                {purchasing ? 'Redirecting to payment...' : `Buy for ${priceFormatted}`}
              </button>
            </div>
          ) : (
            /* Lesson list */
            <div>
              {/* Progress summary */}
              {lessons.length > 0 && (
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

              {/* Introduction card */}
              {introVideo?.videoFile && (
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
                        {introCompleted ? 'You have completed the introduction.' : 'Watch this before starting the course.'}
                      </p>
                    </div>
                    <div>
                      {introCompleted ? (
                        <button
                          onClick={() => setShowIntro(true)}
                          className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Rewatch
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowIntro(true)}
                          className="px-4 py-2 bg-primary-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Watch
                        </button>
                      )}
                    </div>
                  </div>
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

              <h2 className="font-orbitron text-2xl font-bold text-gray-900 mb-4">Lessons</h2>

              {lessons.length === 0 ? (
                <div className="bg-white rounded-xl p-10 text-center text-gray-500">
                  No lessons available yet. Check back soon.
                </div>
              ) : (
                <div className="space-y-3">
                  {lessons.map((lesson, idx) => {
                    const unlocked = isLessonUnlocked(lesson, idx) && introCompleted;
                    const prog = getLessonProgress(lesson.id);
                    const isCompleted = prog?.completed ?? false;

                    return (
                      <div
                        key={lesson.id}
                        className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                          isCompleted ? 'border-green-200' : unlocked ? 'border-transparent hover:border-primary-blue' : 'border-transparent opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-4 p-5">
                          {/* Status icon */}
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCompleted ? 'bg-green-100' : unlocked ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            {isCompleted ? (
                              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                            ) : unlocked ? (
                              <svg className="w-5 h-5 text-primary-blue" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7L8 5z"/>
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                              </svg>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 mb-0.5">Lesson {lesson.order}</p>
                            <h3 className="font-semibold text-gray-900 truncate">{lesson.title}</h3>
                            {lesson.description && (
                              <p className="text-sm text-gray-500 truncate mt-0.5">{lesson.description}</p>
                            )}
                            {prog && !isCompleted && prog.watchedSeconds > 0 && (
                              <p className="text-xs text-blue-500 mt-1">Watched {fmt(prog.watchedSeconds)}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-3 flex-shrink-0">
                            {lesson.durationSeconds > 0 && (
                              <span className="text-sm text-gray-400">{fmt(lesson.durationSeconds)}</span>
                            )}
                            {unlocked && lesson.videoFile ? (
                              <Link
                                href={`/lessons/${courseId}/${lesson.id}`}
                                className="px-4 py-2 bg-primary-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                {isCompleted ? 'Rewatch' : prog?.watchedSeconds ? 'Continue' : 'Watch'}
                              </Link>
                            ) : !unlocked ? (
                              <span className="px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg">Locked</span>
                            ) : (
                              <span className="px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg">Coming soon</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
