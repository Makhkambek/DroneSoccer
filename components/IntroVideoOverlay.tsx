'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { VideoWatermark } from './VideoPlayer';

interface IntroVideoOverlayProps {
  videoFile: string;
  totalDuration: number; // seconds
  onComplete: () => void;
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

export default function IntroVideoOverlay({ videoFile, totalDuration, onComplete, userId }: IntroVideoOverlayProps) {
  const youtubeId = getYouTubeId(videoFile);

  if (youtubeId) {
    return <YouTubeIntroOverlay videoId={youtubeId} totalDuration={totalDuration} onComplete={onComplete} userId={userId} />;
  }

  return <LocalIntroOverlay videoFile={videoFile} totalDuration={totalDuration} onComplete={onComplete} userId={userId} />;
}

// ─── YouTube Intro (no-skip via elapsed-time tracking) ────────────────────────

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function YouTubeIntroOverlay({ videoId, totalDuration, onComplete, userId }: {
  videoId: string;
  totalDuration: number;
  onComplete: () => void;
  userId?: string;
}) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [saving, setSaving] = useState(false);
  const completedRef = useRef(false);

  const handleComplete = useCallback(async () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setSaving(true);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'intro', watchedSeconds: totalDuration, completed: true }),
    }).catch(() => {});
    onComplete();
  }, [totalDuration, onComplete]);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
      if (elapsedRef.current >= totalDuration) {
        handleComplete();
      }
    }, 1000);
  }, [totalDuration, handleComplete]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // Block tab close
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'You must watch the introduction video before accessing the course.';
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    // Block keyboard shortcuts
    const onKey = (e: KeyboardEvent) => {
      const blocked = ['Escape', ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'k', 'j', 'l', 'f', 'm'];
      if (blocked.includes(e.key)) e.preventDefault();
    };
    window.addEventListener('keydown', onKey, true);

    // Load YouTube IFrame API
    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        width: '100%',
        height: '100%',
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,        // hide controls
          disablekb: 1,       // disable keyboard
          fs: 0,              // disable fullscreen
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            e.target.playVideo();
            startTimer();
          },
          onStateChange: (e: any) => {
            const YT = window.YT.PlayerState;
            if (e.data === YT.PLAYING) {
              startTimer();
            } else if (e.data === YT.PAUSED) {
              stopTimer();
              // Force resume after short delay
              setTimeout(() => {
                if (playerRef.current && !completedRef.current) {
                  playerRef.current.playVideo();
                }
              }, 300);
            } else if (e.data === YT.ENDED) {
              // Replay if elapsed not reached yet
              if (!completedRef.current) {
                playerRef.current.seekTo(0);
                playerRef.current.playVideo();
              }
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('keydown', onKey, true);
      stopTimer();
      if (playerRef.current) playerRef.current.destroy?.();
    };
  }, [videoId, startTimer, stopTimer]);

  const percent = Math.min(100, (elapsed / totalDuration) * 100);
  const remaining = Math.max(0, totalDuration - elapsed);
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col select-none">
      {/* Header */}
      <div className="px-6 py-3 text-center flex-shrink-0">
        <p className="font-orbitron text-white text-lg font-bold mb-1">Welcome to Drone Soccer</p>
        <p className="text-white/70 text-sm">Please watch this introduction video completely before accessing the course.</p>
      </div>

      {/* Video container — fills remaining space */}
      <div className="flex-1 relative min-h-0 [&_iframe]:!w-full [&_iframe]:!h-full">
        <div ref={containerRef} className="absolute inset-0" />
        <VideoWatermark userId={userId} />
        <div
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Progress bar */}
      <div className="px-6 py-3 flex-shrink-0">
        <div className="flex justify-between text-white/60 text-xs mb-1">
          <span>Progress</span>
          <span>{mm}:{ss} remaining</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-1000"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-white/40 text-xs text-center mt-2">
          The course will unlock automatically when the video finishes.
        </p>
      </div>

      {saving && <div className="mt-4 text-white/80 text-sm">Saving progress...</div>}
    </div>
  );
}

// ─── Local video Intro (full anti-skip) ───────────────────────────────────────

function LocalIntroOverlay({ videoFile, totalDuration, onComplete, userId }: IntroVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastValidTimeRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'You must watch the introduction video before accessing the course.';
    };
    window.addEventListener('beforeunload', onBeforeUnload);

    const onKey = (e: KeyboardEvent) => {
      const blocked = ['Escape', ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
      if (blocked.includes(e.key)) e.preventDefault();
    };
    window.addEventListener('keydown', onKey, true);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      window.removeEventListener('keydown', onKey, true);
    };
  }, []);

  const handleComplete = useCallback(async () => {
    setSaving(true);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'intro', watchedSeconds: totalDuration, completed: true }),
    }).catch(() => {});
    onComplete();
  }, [totalDuration, onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const onTimeUpdate = () => {
      if (video.currentTime > lastValidTimeRef.current + 2) {
        video.currentTime = lastValidTimeRef.current;
      } else {
        lastValidTimeRef.current = video.currentTime;
        setCurrentTime(video.currentTime);
      }
    };

    const onEnded = () => handleComplete();
    const onPause = () => { if (!video.ended) video.play().catch(() => {}); };

    const heartbeat = setInterval(async () => {
      if (!video.paused && lastValidTimeRef.current > 0) {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'intro', watchedSeconds: Math.floor(lastValidTimeRef.current), completed: false }),
        }).catch(() => {});
      }
    }, 5000);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('pause', onPause);

    return () => {
      clearInterval(heartbeat);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('pause', onPause);
    };
  }, [handleComplete]);

  const percent = totalDuration > 0 ? Math.min(100, (currentTime / totalDuration) * 100) : 0;
  const remaining = Math.max(0, Math.ceil(totalDuration - currentTime));
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      <div className="px-6 py-3 text-center flex-shrink-0">
        <p className="font-orbitron text-white text-lg font-bold mb-1">Welcome to Drone Soccer</p>
        <p className="text-white/70 text-sm">Please watch this introduction video completely before accessing the course.</p>
      </div>
      <div className="flex-1 relative min-h-0">
        <video
          ref={videoRef}
          src={`/api/videos/${videoFile}`}
          className="absolute inset-0 w-full h-full object-contain"
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
        />
        <VideoWatermark userId={userId} />
      </div>
      <div className="px-6 py-3 flex-shrink-0">
        <div className="flex justify-between text-white/60 text-xs mb-1">
          <span>Progress</span>
          <span>{mm}:{ss} remaining</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-blue to-primary-red transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-white/40 text-xs text-center mt-2">The course will unlock automatically when the video finishes.</p>
      </div>
      {saving && <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/80 text-sm">Saving progress...</div>}
    </div>
  );
}
