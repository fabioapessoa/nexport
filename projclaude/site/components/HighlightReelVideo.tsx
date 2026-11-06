"use client";

import { useEffect, useRef } from "react";

export default function HighlightReelVideo({ label }: { label: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              /* autoplay can be blocked by the browser — poster image remains visible */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/institutional-highlights-poster-v3.jpg"
      aria-label={label}
    >
      <source src="/media/institutional-highlights-v3.mp4" type="video/mp4" />
    </video>
  );
}
