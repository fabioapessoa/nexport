"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const DWELL_MS = 5000;
const FADE_MS = 1200;

// Real operation photographs (graded for a consistent look). Each slide has its own
// object-position per breakpoint so the main subject survives the crop.
const slides = [
  {
    src: "/media/hero-irrigation-pivot.jpg",
    position:
      "object-[68%_50%] sm:object-[60%_45%] lg:object-[50%_38%]",
  },
  {
    src: "/media/hero-slide-silos.jpg",
    position: "object-[50%_55%] sm:object-[50%_52%] lg:object-[50%_58%]",
  },
  {
    src: "/media/hero-slide-fleet.jpg",
    position: "object-[38%_58%] sm:object-[45%_58%] lg:object-[50%_58%]",
  },
  {
    src: "/media/hero-slide-trucks.jpg",
    position: "object-[48%_55%] sm:object-[50%_55%] lg:object-[50%_62%]",
  },
  {
    src: "/media/hero-slide-tractor.jpg",
    position: "object-[32%_55%] sm:object-[38%_55%] lg:object-[42%_58%]",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const currentRef = useRef(0);

  const goTo = useCallback((next: number) => {
    if (next === currentRef.current) return;
    setPrevious(currentRef.current);
    currentRef.current = next;
    setCurrent(next);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Restarting on `current` gives a full dwell after manual selection too.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => goTo((currentRef.current + 1) % slides.length),
      DWELL_MS + FADE_MS,
    );
    return () => window.clearTimeout(id);
  }, [current, paused, goTo]);

  return (
    <>
      {slides.map((slide, i) => {
        const isCurrent = i === current;
        const isPrevious = i === previous;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            quality={85}
            aria-hidden="true"
            className={`object-cover ${slide.position}`}
            style={{
              opacity: isCurrent || isPrevious ? 1 : 0,
              zIndex: isCurrent ? 2 : isPrevious ? 1 : 0,
              transition: isCurrent
                ? `opacity ${FADE_MS}ms ease-in-out`
                : "none",
            }}
          />
        );
      })}

      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center sm:bottom-4">
        <div className="pointer-events-auto flex items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${slides.length}`}
              aria-current={i === current}
              className="group flex h-8 w-9 items-center justify-center"
            >
              <span
                className={`block h-[2px] rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-7 bg-bronze"
                    : "w-4 bg-ink/30 group-hover:bg-bronze/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
