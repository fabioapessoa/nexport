import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import Eyebrow from "@/components/Eyebrow";
import type { Dictionary } from "@/lib/dictionaries";

export default function Hero({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section id="inicio" className="relative bg-porcelain">
      <div className="relative h-[50svh] w-full overflow-hidden sm:h-[60svh] lg:h-[72svh]">
        <Image
          src="/media/hero-cranes-sunset.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-porcelain via-transparent to-transparent" />
      </div>

      <div className="relative bg-porcelain px-5 pb-16 pt-11 sm:px-8 sm:pb-20 sm:pt-14 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <RevealOnScroll className="max-w-3xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
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
