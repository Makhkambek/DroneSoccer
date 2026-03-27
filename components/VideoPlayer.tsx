'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface VideoPlayerProps {
  videoFile: string;
  lessonId: string;
  courseId: string;
  initialWatchedSeconds?: number;
  onComplete?: () => void;
  userId?: string;
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// ─── Watermark positions (4 marks moving independently) ──────────────────────
const MARK_CONFIGS = [
  { x: 10, y: 10, dx: 0.35, dy: 0.25 },
  { x: 60, y: 55, dx: -0.28, dy: 0.32 },
  { x: 40, y: 25, dx: 0.22, dy: -0.3 },
  { x: 15, y: 65, dx: 0.3, dy: -0.22 },
];

export function VideoWatermark({ userId, onTamper }: { userId?: string; onTamper?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(MARK_CONFIGS.map(c => ({ x: c.x, y: c.y })));
  const dirsRef = useRef(MARK_CONFIGS.map(c => ({ x: c.dx, y: c.dy })));

  // Move watermarks
  useEffect(() => {
    if (!userId) return;
    const interval = setInterval(() => {
      setPositions(prev => prev.map((pos, i) => {
        const maxX = 82, maxY = 78, minX = 3, minY = 3;
        let nx = pos.x + dirsRef.current[i].x;
        let ny = pos.y + dirsRef.current[i].y;
        if (nx >= maxX || nx <= minX) { dirsRef.current[i].x *= -1; nx = Math.max(minX, Math.min(maxX, nx)); }
        if (ny >= maxY || ny <= minY) { dirsRef.current[i].y *= -1; ny = Math.max(minY, Math.min(maxY, ny)); }
        return { x: nx, y: ny };
      }));
    }, 50);
    return () => clearInterval(interval);
  }, [userId]);

  // Tamper detection: watch for style/attribute/removal changes
  useEffect(() => {
    if (!userId || !containerRef.current || !onTamper) return;
    const el = containerRef.current;

    const observer = new MutationObserver(() => {
      // Check if container or any child is hidden
      const style = window.getComputedStyle(el);
      if (
        el.style.display === 'none' ||
        el.style.visibility === 'hidden' ||
        el.style.opacity === '0' ||
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        parseFloat(style.opacity) < 0.05
      ) {
        onTamper();
      }
    });

    observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'], subtree: true, childList: true });

    // Also watch if the element is removed from DOM
    const parentObserver = new MutationObserver(() => {
      if (!document.contains(el)) onTamper();
    });
    if (el.parentElement) {
      parentObserver.observe(el.parentElement, { childList: true });
    }

    return () => { observer.disconnect(); parentObserver.disconnect(); };
  }, [userId, onTamper]);

  if (!userId) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden">
      {positions.map((pos, i) => (
        <span
          key={i}
          className="absolute font-mono text-white text-xs font-bold"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            opacity: 0.13,
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            letterSpacing: '0.08em',
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
        >
          #{userId}
        </span>
      ))}
    </div>
  );
}

export default function VideoPlayer({
  videoFile,
  lessonId,
  courseId,
  initialWatchedSeconds = 0,
  onComplete,
  userId,
}: VideoPlayerProps) {
  const youtubeId = getYouTubeId(videoFile);

  if (youtubeId) {
    return (
      <YouTubePlayer
        videoId={youtubeId}
        lessonId={lessonId}
        courseId={courseId}
        onComplete={onComplete}
        userId={userId}
      />
    );
  }

  return (
    <LocalVideoPlayer
      videoFile={videoFile}
      lessonId={lessonId}
      courseId={courseId}
      initialWatchedSeconds={initialWatchedSeconds}
      onComplete={onComplete}
      userId={userId}
    />
  );
}

function YouTubePlayer({
  videoId,
  lessonId,
  courseId,
  onComplete,
  userId,
}: {
  videoId: string;
  lessonId: string;
  courseId: string;
  onComplete?: () => void;
  userId?: string;
}) {
  const [completed, setCompleted] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const markComplete = useCallback(async () => {
    if (completed) return;
    setCompleted(true);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'lesson', lessonId, courseId, watchedSeconds: 0, completed: true }),
    }).catch(() => {});
    onComplete?.();
  }, [completed, lessonId, courseId, onComplete]);

  const handleTamper = useCallback(() => setBlocked(true), []);

  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <VideoWatermark userId={userId} onTamper={handleTamper} />
        {blocked && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
            <svg className="w-12 h-12 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <p className="text-white font-semibold text-lg">Playback blocked</p>
            <p className="text-white/50 text-sm mt-1">Watermark protection was triggered.</p>
            <button onClick={() => setBlocked(false)} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
              Resume
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
        <span className="text-white/50 text-sm">YouTube video</span>
        {completed ? (
          <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Completed
          </span>
        ) : (
          <button
            onClick={markComplete}
            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Mark as Complete
          </button>
        )}
      </div>
    </div>
  );
}

function LocalVideoPlayer({
  videoFile,
  lessonId,
  courseId,
  initialWatchedSeconds = 0,
  onComplete,
  userId,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const didSeekToInitial = useRef(false);
  const lastSavedTime = useRef(0);

  const saveProgress = useCallback(async (watchedSeconds: number, done: boolean) => {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'lesson', lessonId, courseId, watchedSeconds: Math.floor(watchedSeconds), completed: done }),
    }).catch(() => {});
  }, [lessonId, courseId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      if (!didSeekToInitial.current && initialWatchedSeconds > 10) {
        video.currentTime = Math.min(initialWatchedSeconds, video.duration - 1);
        didSeekToInitial.current = true;
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.currentTime - lastSavedTime.current >= 10) {
        lastSavedTime.current = video.currentTime;
        saveProgress(video.currentTime, false);
      }
      if (!completed && video.duration > 0 && video.currentTime / video.duration >= 0.95) {
        setCompleted(true);
        saveProgress(video.currentTime, true);
        onComplete?.();
      }
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => { setPlaying(false); saveProgress(video.currentTime, false); };
    const onEnded = () => { setPlaying(false); saveProgress(video.duration, true); onComplete?.(); };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [completed, saveProgress, onComplete, initialWatchedSeconds]);

  const handleTamper = useCallback(() => {
    setBlocked(true);
    videoRef.current?.pause();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || blocked) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
      <div className="relative">
        <video
          ref={videoRef}
          src={`/api/videos/${videoFile}`}
          className="w-full"
          playsInline
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
        />
        <VideoWatermark userId={userId} onTamper={handleTamper} />
        {blocked && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-20">
            <svg className="w-12 h-12 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
            <p className="text-white font-semibold text-lg">Playback blocked</p>
            <p className="text-white/50 text-sm mt-1">Watermark protection was triggered.</p>
            <button onClick={() => setBlocked(false)} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
              Resume
            </button>
          </div>
        )}
      </div>
      <div className="bg-gray-900 px-4 py-3">
        <input
          type="range" min={0} max={duration || 0} step={0.5} value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 mb-3 accent-primary-blue cursor-pointer"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-blue hover:bg-blue-700 transition-colors">
              {playing ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
              ) : (
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z"/></svg>
              )}
            </button>
            <span className="text-white/70 text-sm tabular-nums">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>
          {completed && (
            <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
