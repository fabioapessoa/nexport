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
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
