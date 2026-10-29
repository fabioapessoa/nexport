"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { locales, localeLabels, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/dictionaries";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export default function Header({ locale, nav }: HeaderProps) {
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
        className={`fixed inset-x-0 top-0 z-50 bg-porcelain/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolledShadow ? "shadow-[0_1px_0_0_rgba(11,14,20,0.08)]" : ""
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link
          href={`/${locale}#inicio`}
          className="relative z-10 flex items-center"
          aria-label="Nexport Global C.A."
        >
          <Image
            src="/media/logo-mark.png"
            alt="Nexport Global C.A."
            width={1473}
            height={841}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-[0.02em] text-ink/75 transition-colors hover:text-bronze"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-1 text-[12px] font-semibold tracking-wide text-ink/60">
            {locales.map((loc, i) => (
              <span key={loc} className="flex items-center gap-1">
                <Link
                  href={`/${loc}`}
                  className={`px-1 transition-colors hover:text-gold ${
                    loc === locale ? "text-gold" : ""
                  }`}
                  aria-current={loc === locale ? "true" : undefined}
                >
                  {localeLabels[loc]}
                </Link>
                {i < locales.length - 1 && <span className="text-ink/25">/</span>}
              </span>
            ))}
          </div>
          <a
            href={`/${locale}#contacto`}
            className="rounded-full bg-gradient-to-r from-gold to-bronze px-6 py-2.5 text-[13px] font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            {nav.ctaContact}
          </a>
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
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-ink transition-transform duration-300 ${
              menuOpen ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      </header>

      <div
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menuLabel}
        className={`fixed inset-0 z-40 bg-porcelain transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col gap-6 overflow-y-auto px-7 pb-10 pt-24">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl font-medium text-ink"
            >
              {link.label}
            </a>
          ))}

          <a
            href={`/${locale}#contacto`}
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-gold to-bronze px-7 py-3 text-sm font-semibold text-ink"
          >
            {nav.ctaContact}
          </a>

          <div className="mt-auto flex items-center gap-4 border-t border-ink/10 pt-6 text-sm font-semibold tracking-wide text-ink/60">
            {locales.map((loc) => (
              <Link
                key={loc}
                href={`/${loc}`}
                onClick={() => setMenuOpen(false)}
                className={loc === locale ? "text-bronze" : ""}
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
