"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/locales";

// Routes that exist in every locale. Anything else falls back to the locale home.
const SHARED_SUBROUTES = new Set(["galeria"]);

function targetPath(pathname: string, target: Locale) {
  const [, , sub] = pathname.split("/");
  return sub && SHARED_SUBROUTES.has(sub) ? `/${target}/${sub}` : `/${target}`;
}

export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`flag-clip-${locale}`}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-clip-${locale})`}>
        {locale === "es" && (
          <>
            <rect width="32" height="10.67" y="0" fill="#F7D117" />
            <rect width="32" height="10.67" y="10.67" fill="#1F3A93" />
            <rect width="32" height="10.67" y="21.33" fill="#CF142B" />
            {Array.from({ length: 8 }, (_, i) => {
              const a = (Math.PI * (200 + i * (140 / 7))) / 180;
              return (
                <circle
                  key={i}
                  cx={16 + 6.2 * Math.cos(a)}
                  cy={22 + 6.2 * Math.sin(a)}
                  r="0.95"
                  fill="#fff"
                />
              );
            })}
          </>
        )}
        {locale === "en" && (
          <>
            <rect width="32" height="32" fill="#fff" />
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={i} x="0" y={i * 4.923} width="32" height="2.4615" fill="#B22234" />
            ))}
            <rect x="0" y="0" width="18.5" height="17.23" fill="#3C3B6E" />
            {[3, 7.4, 11.8, 16].flatMap((x, c) =>
              [3, 6.6, 10.2, 13.8].map((y, r) => (
                <circle key={`${c}-${r}`} cx={x - 0.4 + (r % 2) * 1.1} cy={y} r="0.7" fill="#fff" />
              )),
            )}
          </>
        )}
        {locale === "pt" && (
          <>
            <rect width="32" height="32" fill="#009C3B" />
            <polygon points="16,4 29,16 16,28 3,16" fill="#FFDF00" />
            <circle cx="16" cy="16" r="6.2" fill="#002776" />
            <path d="M10 15.2 Q16 12.8 22 17" stroke="#fff" strokeWidth="1" fill="none" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() || `/${locale}`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(
          rootRef.current?.querySelectorAll<HTMLElement>("[data-lang-item]") ?? [],
        );
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.key === "ArrowDown" ? i + 1 : i - 1;
        items[(next + items.length) % items.length]?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-10">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`${label}: ${localeNames[locale]}`}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex h-5 w-5 items-center justify-center rounded-full ring-1 ring-gold/60 transition-shadow hover:ring-gold focus-visible:ring-2 focus-visible:ring-gold"
      >
        <Flag locale={locale} className="h-full w-full rounded-full" />
      </button>

      {open && (
        <ul className="absolute right-0 top-full mt-3 min-w-[9.5rem] overflow-hidden rounded-md border border-gold/30 bg-ink py-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.4)]">
          {locales.map((loc) => (
            <li key={loc}>
              <Link
                href={targetPath(pathname, loc)}
                data-lang-item
                lang={loc}
                hrefLang={loc}
                aria-current={loc === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2 text-[13px] transition-colors hover:bg-offwhite/5 focus-visible:bg-offwhite/10 focus-visible:outline-none ${
                  loc === locale ? "text-gold" : "text-offwhite/80 hover:text-offwhite"
                }`}
              >
                <Flag
                  locale={loc}
                  className="h-5 w-5 rounded-full ring-1 ring-gold/40"
                />
                {localeNames[loc]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
