"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
import Image from "next/image";

export type GalleryItem = {
  type: "photo" | "video";
  src: string;
  poster?: string;
  alt: string;
  width: number;
  height: number;
  span: string;
};

type OperationsGalleryProps = {
  items: GalleryItem[];
  caption: string;
  openLabel: string;
  playLabel: string;
  closeLabel: string;
  columns?: 3 | 4;
};

export default function OperationsGallery({
  items,
  caption,
  openLabel,
  playLabel,
  closeLabel,
  columns = 3,
}: OperationsGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % items.length));
      }
      if (e.key === "ArrowLeft") {
        setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, items.length]);

  // Clicking a video thumbnail is a user gesture: start playback right away.
  // If the browser refuses sound autoplay, retry muted; controls stay available.
  useEffect(() => {
    const video = videoRef.current;
    if (activeIndex === null || !video) return;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, [activeIndex]);

  function step(direction: 1 | -1) {
    setActiveIndex((i) => (i === null ? i : (i + direction + items.length) % items.length));
  }

  function onTouchStart(e: TouchEvent) {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: TouchEvent) {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || items.length < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  }

  function close() {
    const returnIndex = activeIndex;
    setActiveIndex(null);
    if (returnIndex !== null) triggerRefs.current[returnIndex]?.focus();
  }

  const active = activeIndex !== null ? items[activeIndex] : null;

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-4 sm:gap-5 ${
          columns === 4
            ? "sm:grid-cols-4 sm:auto-rows-[160px] lg:auto-rows-[200px]"
            : "sm:grid-cols-3 sm:auto-rows-[180px] lg:auto-rows-[220px]"
        }`}
      >
        {items.map((item, i) => (
          <button
            key={item.src}
            ref={(el) => {
              triggerRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`${item.type === "video" ? playLabel : openLabel}: ${item.alt}`}
            className={`group relative aspect-[4/3] overflow-hidden rounded-2xl border border-offwhite/10 bg-graphite transition-colors duration-300 hover:border-gold/35 sm:aspect-auto ${item.span}`}
          >
            <Image
              src={item.type === "video" ? (item.poster ?? item.src) : item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
            {item.type === "video" && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-porcelain/90 text-ink shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="currentColor" />
                  </svg>
                </span>
              </span>
            )}
            <span className="absolute inset-x-0 bottom-0 px-4 py-3 text-left text-[12px] font-medium leading-snug text-offwhite/90 sm:text-[13px]">
              {item.alt}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-[11px] uppercase tracking-[0.12em] text-ink/45 sm:text-xs">
        {caption}
      </p>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-10"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label={closeLabel}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-offwhite/10 text-offwhite transition-colors hover:bg-gold/25 hover:text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
                }}
                aria-label="Previous"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-offwhite/10 text-offwhite transition-colors hover:bg-gold/25 hover:text-gold sm:left-6"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i === null ? i : (i + 1) % items.length));
                }}
                aria-label="Next"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-offwhite/10 text-offwhite transition-colors hover:bg-gold/25 hover:text-gold sm:right-6"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative flex max-h-full max-w-5xl flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {active.type === "photo" ? (
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="100vw"
                quality={85}
                priority
                className="h-auto max-h-[75vh] max-h-[75dvh] w-auto max-w-full rounded-xl object-contain"
              />
            ) : (
              <video
                key={active.src}
                ref={videoRef}
                src={active.src}
                poster={active.poster}
                controls
                playsInline
                preload="auto"
                className="max-h-[75vh] max-h-[75dvh] w-auto max-w-full rounded-xl bg-ink"
                aria-label={active.alt}
              />
            )}
            <p className="text-center text-sm text-offwhite/80">{active.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
