import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { Dictionary } from "@/lib/dictionaries";

export default function Hero({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section id="inicio" className="relative bg-porcelain">
      <div className="relative h-[46svh] w-full overflow-hidden sm:h-[56svh] lg:h-[68svh]">
        <Image
          src="/media/hero-cranes-sunset.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-porcelain via-transparent to-ink/10" />

        <span className="absolute right-4 top-24 rounded bg-ink/35 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-offwhite/90 backdrop-blur-sm sm:right-6 sm:top-28">
          {hero.imageNote}
        </span>

        <svg
          className="absolute inset-x-0 bottom-0 h-10 w-full text-porcelain sm:h-14"
          viewBox="0 0 1200 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 56 L1200 20 L1200 56 Z" fill="currentColor" opacity="0.0" />
          <line x1="0" y1="2" x2="1200" y2="2" stroke="var(--color-gold)" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="140" cy="2" r="3.5" fill="var(--color-gold)" />
          <circle cx="600" cy="2" r="3.5" fill="var(--color-gold)" />
          <circle cx="1060" cy="2" r="3.5" fill="var(--color-gold)" />
        </svg>
      </div>

      <div className="relative bg-porcelain px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-bronze" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-bronze">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-offwhite transition-colors hover:bg-graphite"
              >
                {hero.ctaPrimary}
              </a>
              <a
                href="#divisiones"
                className="inline-flex items-center justify-center rounded-full border border-ink/20 px-8 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors hover:border-bronze hover:text-bronze"
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
