"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { NAV_LINKS, SECTIONS, SITE } from "@/data/site";
import TLink from "@/components/ui/TLink";

export default function Header() {
  const { t, lang, setLang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* solid bar after leaving the very top */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "80px 0px 0px 0px" }
    );
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;left:0;height:1px;width:1px;";
    document.body.prepend(sentinel);
    obs.observe(sentinel);
    return () => {
      obs.disconnect();
      sentinel.remove();
    };
  }, []);

  /* active section tracking (home only): the deck announces slides;
     in scroll mode an IntersectionObserver takes over */
  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }
    const onDeckChange = (e: Event) => {
      setActive((e as CustomEvent<{ id: string }>).detail.id);
    };
    window.addEventListener("deck:change", onDeckChange);

    const obs = new IntersectionObserver(
      (entries) => {
        if (document.documentElement.dataset.deck) return;
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-38% 0px -58% 0px" }
    );
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];
    els.forEach((el) => obs.observe(el));
    return () => {
      window.removeEventListener("deck:change", onDeckChange);
      obs.disconnect();
    };
  }, [pathname]);

  /* mobile overlay open/close */
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(menu, { display: "flex" });
      if (!prefersReducedMotion()) {
        gsap.fromTo(
          menu,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power3.inOut" }
        );
        gsap.fromTo(
          menu.querySelectorAll("[data-menu-item]"),
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.7,
            stagger: 0.06,
            delay: 0.25,
            ease: "power4.out",
          }
        );
      }
    } else {
      document.body.style.overflow = "";
      if (prefersReducedMotion()) {
        gsap.set(menu, { display: "none" });
      } else {
        gsap.to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: () => gsap.set(menu, { display: "none" }),
        });
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const activeNum =
    SECTIONS.find((s) => s.id === active)?.num ?? (pathname === "/" ? "01" : "");

  // Home slides on a paper background need dark header text (the bar is
  // transparent over them, especially in fullpage deck mode).
  const PAPER_SLIDES = new Set(["work", "stack", "about"]);
  const light = pathname === "/" && !scrolled && PAPER_SLIDES.has(active);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-300 ${
          scrolled ? "bg-ink" : "bg-transparent"
        }`}
      >
        <div
          className={`frame flex h-16 items-center justify-between transition-colors duration-300 ${
            light ? "text-ink" : "text-paper"
          }`}
        >
          <TLink
            href="/"
            className="u-label tracking-[0.08em] normal-case"
            aria-label="alanbuendia.dev — inicio"
          >
            alanbuendia.dev
          </TLink>

          {/* desktop nav */}
          <nav
            aria-label={t({ es: "Navegación principal", en: "Main navigation" })}
            className="hidden items-center gap-10 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <TLink
                key={link.id}
                href={link.href}
                className={`link-nav u-label ${active === link.id ? "is-active" : ""}`}
              >
                {t(link.label)}
              </TLink>
            ))}
            <button
              type="button"
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className={`u-label transition-colors ${
                light
                  ? "text-ink/50 hover:text-ink"
                  : "text-mute hover:text-paper"
              }`}
              aria-label={
                lang === "es" ? "Switch to English" : "Cambiar a español"
              }
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <span className="flex items-center gap-2" title={t(SITE.availability)}>
              <span className="h-2 w-2 rounded-full bg-acid" aria-hidden="true" />
              <span className="sr-only">{t(SITE.availability)}</span>
            </span>
          </nav>

          {/* mobile trigger */}
          <button
            type="button"
            className="mobile-menu-trigger flex h-10 w-10 flex-col items-end justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={
              menuOpen
                ? t({ es: "Cerrar menú", en: "Close menu" })
                : t({ es: "Abrir menú", en: "Open menu" })
            }
          >
            <span
              className={`h-px bg-paper transition-all duration-300 ${
                menuOpen ? "w-7 translate-y-[3.5px] rotate-45" : "w-7"
              }`}
            />
            <span
              className={`h-px bg-paper transition-all duration-300 ${
                menuOpen ? "w-7 -translate-y-[3.5px] -rotate-45" : "w-5"
              }`}
            />
          </button>
        </div>
        {scrolled && <div className="rule text-paper" />}
      </header>

      {/* vertical section counter — desktop, home only */}
      {pathname === "/" && (
        <aside
          aria-hidden="true"
          className="fixed right-6 top-1/2 z-[110] hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
        >
          {SECTIONS.map((s) => (
            <span
              key={s.id}
              className={`u-num text-[0.625rem] transition-colors duration-300 ${
                activeNum === s.num
                  ? "text-acid"
                  : light
                    ? "text-ink/30"
                    : "text-paper/30"
              }`}
            >
              {s.num}
            </span>
          ))}
          <span
            className={`rule-v mt-1 h-10 transition-colors duration-300 ${
              light ? "text-ink" : "text-paper"
            }`}
          />
        </aside>
      )}

      {/* mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[115] hidden flex-col justify-between bg-ink pb-10 pt-24 text-paper md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav
          aria-label={t({ es: "Menú móvil", en: "Mobile menu" })}
          className="frame flex flex-col gap-2"
        >
          {NAV_LINKS.map((link, i) => (
            <div key={link.id} className="overflow-hidden border-b border-paper/15 pb-2">
              <div data-menu-item className="flex items-baseline gap-4">
                <span className="u-num text-[0.625rem] text-acid">{`0${i + 1}`}</span>
                <TLink
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="display text-[clamp(2.8rem,12vw,4.5rem)]"
                >
                  {t(link.label)}
                </TLink>
              </div>
            </div>
          ))}
        </nav>
        <div className="frame flex items-end justify-between">
          <div className="overflow-hidden">
            <div data-menu-item>
              <p className="u-label text-mute">{SITE.email}</p>
              <p className="u-label mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-acid" aria-hidden="true" />
                {t(SITE.availability)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="u-label border border-paper/30 px-3 py-2"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </div>
    </>
  );
}
