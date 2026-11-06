import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";
import Eyebrow from "@/components/Eyebrow";
import type { Dictionary } from "@/lib/dictionaries";

export default function Hero({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section id="inicio" className="relative bg-porcelain">
      <div className="relative h-[50svh] w-full overflow-hidden sm:h-[60svh] lg:h-[72svh]">
        <Image
          src="/media/hero-irrigation-pivot.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-[68%_50%] sm:object-[60%_45%] lg:object-[50%_38%]"
        />
        <div className="absolute inset-0 bg-ink/[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/10 via-35% to-transparent to-60%" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#F6F3E8_0%,rgba(246,243,232,0.9)_7%,rgba(246,243,232,0.55)_17%,rgba(246,243,232,0.2)_28%,rgba(246,243,232,0)_40%)]" />
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
