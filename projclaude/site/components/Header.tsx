"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  groupBadge: Dictionary["groupBadge"];
};

export default function Header({ locale, nav, groupBadge }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  const primaryLinks = [
    { href: `/${locale}#nexport`, label: nav.about },
    { href: `/${locale}#experiencia`, label: nav.experienceAreas },
    { href: `/${locale}#nuestro-grupo`, label: nav.group },
    { href: `/${locale}/galeria`, label: nav.gallery },
    { href: `/${locale}#contacto`, label: nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, trap focus inside the panel, close on Escape,
  // make background content inert, and return focus to the trigger on close.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const main = document.getElementById("site-main");
    const footer = document.getElementById("site-footer");

    if (!menuOpen) {
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      if (wasOpenRef.current) triggerRef.current?.focus();
      wasOpenRef.current = false;
      return;
    }

    wasOpenRef.current = true;
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : [];
    focusables[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen]);

  const scrolledShadow = scrolled || menuOpen;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md transition-colors duration-300 ${
          scrolledShadow
            ? "bg-ink/97 shadow-[0_1px_0_0_rgba(0,0,0,0.25)]"
            : "bg-ink/80"
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4">
        <Link
          href={`/${locale}#inicio`}
          className="relative z-10 flex items-center gap-3.5"
          aria-label="Nexport Global C.A."
        >
          <Image
            src="/media/logo-icon-official.png"
            alt=""
            width={202}
            height={207}
            priority
            className="h-11 w-auto sm:h-12 lg:h-14"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[17px] font-semibold tracking-[0.07em] text-offwhite lg:text-[19px]">
              NEXPORT GLOBAL
            </span>
            <span className="mt-1 text-[11px] font-medium tracking-[0.3em] text-gold/90">
              C.A.
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[13px] font-medium tracking-[0.03em] text-offwhite/75 transition-colors hover:text-offwhite"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1 text-[12px] font-semibold tracking-wide text-offwhite/50 lg:flex">
          {locales.map((loc, i) => (
            <span key={loc} className="flex items-center gap-1">
              <Link
                href={`/${loc}`}
                className={`relative px-1 pb-1 transition-colors hover:text-gold ${
                  loc === locale ? "text-gold" : ""
                }`}
                aria-current={loc === locale ? "true" : undefined}
              >
                {localeLabels[loc]}
                {loc === locale && (
                  <span className="absolute inset-x-1 -bottom-0.5 h-px bg-gold" />
                )}
              </Link>
              {i < locales.length - 1 && <span className="text-offwhite/20">/</span>}
            </span>
          ))}
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-panel"
        >
          <span
            className={`h-px w-6 bg-offwhite transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-offwhite transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-offwhite transition-transform duration-300 ${
              menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div className="border-t border-offwhite/8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-1.5 sm:px-8">
          <Image
            src="/media/logo-ouro-branco-icon.png"
            alt=""
            width={400}
            height={400}
            className="h-[15px] w-auto sm:h-[17px]"
          />
          <p className="text-[10px] uppercase tracking-[0.1em] text-offwhite/45 sm:text-[11px] sm:tracking-[0.12em]">
            <span className="hidden sm:inline">{groupBadge.line} · </span>
            <span className="font-semibold text-gold/75">{groupBadge.name}</span>
          </p>
        </div>
      </div>
      </header>

      <div
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menuLabel}
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col gap-6 overflow-y-auto px-7 pb-10 pt-24">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl font-medium text-offwhite"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-auto flex items-center gap-4 border-t border-offwhite/10 pt-6 text-sm font-semibold tracking-wide text-offwhite/55">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                onClick={() => setMenuOpen(false)}
                className={loc === locale ? "text-gold" : ""}
              >
                {localeLabels[loc]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
