"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang, type Lang } from "@/lib/i18n";
import { NAV_LINKS, SITE } from "@/data/site";

function useLocalTime() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Mexico_City",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const btn = (l: Lang) => (
    <button
      onClick={() => setLang(l)}
      aria-pressed={lang === l}
      className={`u-label transition-opacity duration-300 ${
        lang === l ? "underline underline-offset-4" : "opacity-45 hover:opacity-100"
      }`}
    >
      {l.toUpperCase()}
    </button>
  );
  return (
    <div className={`pointer-events-auto flex items-center gap-1.5 ${className}`}>
      {btn("es")}
      <span className="u-label opacity-30">/</span>
      {btn("en")}
    </div>
  );
}

export default function Navbar() {
  const { ready, lenis, navigate } = useApp();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const logoClicks = useRef<{ n: number; t: number }>({ n: 0, t: 0 });
  const time = useLocalTime();

  /* Entrance once the preloader is done */
  useGSAP(() => {
    if (!ready || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.9, delay: 0.9, ease: "power3.out" }
    );
  }, [ready]);

  /* Menu open/close timeline */
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const links = overlay.querySelectorAll<HTMLElement>(".menu-link-row");
      const meta = overlay.querySelectorAll<HTMLElement>(".menu-meta");
      tlRef.current = gsap
        .timeline({ paused: true })
        .set(overlay, { display: "flex" })
        .fromTo(
          overlay,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.7,
            ease: "power4.inOut",
          }
        )
        .fromTo(
          links,
          { yPercent: 120, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .fromTo(
          meta,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
          "-=0.4"
        );
      tlRef.current.eventCallback("onReverseComplete", () =>
        gsap.set(overlay, { display: "none" })
      );
    },
    { scope: overlayRef }
  );

  const toggle = (next: boolean) => {
    setOpen(next);
    if (next) {
      lenis?.stop();
      // no Lenis (reduced motion) → lock native scroll while the menu is open
      if (!lenis) document.documentElement.style.overflow = "hidden";
      tlRef.current?.timeScale(1).play();
    } else {
      lenis?.start();
      if (!lenis) document.documentElement.style.overflow = "";
      tlRef.current?.timeScale(1.4).reverse();
    }
  };

  const go = (href: string) => {
    toggle(false);
    setTimeout(() => navigate(href), 250);
  };

  const onLogoClick = () => {
    const now = Date.now();
    const s = logoClicks.current;
    s.n = now - s.t < 2000 ? s.n + 1 : 1;
    s.t = now;
    if (s.n >= 5) {
      s.n = 0;
      window.dispatchEvent(new CustomEvent("ab:spin")); // easter egg #2
      return;
    }
    if (open) toggle(false);
    setTimeout(() => navigate("/"), open ? 250 : 0);
  };

  return (
    <>
      <header
        ref={barRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-[90] mix-blend-difference"
        style={{ opacity: 0 }}
      >
        <nav className="flex items-center justify-between px-5 py-5 md:px-8 text-paper">
          <button
            onClick={onLogoClick}
            className="display pointer-events-auto text-xl tracking-wide"
            aria-label={t({ es: "Inicio", en: "Home" })}
          >
            AB<span className="text-accent">✳</span>
          </button>
          <div className="u-label hidden gap-8 opacity-70 md:flex">
            <span>{SITE.locationShort}</span>
            <span suppressHydrationWarning>{time} CST</span>
          </div>
          <div className="flex items-center gap-6">
            <LangToggle />
            <button
              onClick={() => toggle(!open)}
              className="u-label pointer-events-auto flex items-center gap-3"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span>
                {open
                  ? t({ es: "Cerrar", en: "Close" })
                  : t({ es: "Menú", en: "Menu" })}
              </span>
              <span className="relative block h-3 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen menu */}
      <div
        id="site-menu"
        ref={overlayRef}
        className="fixed inset-0 z-[80] hidden flex-col justify-between overflow-y-auto bg-ink px-5 pb-6 pt-20 text-paper md:px-8"
      >
        <nav className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="overflow-hidden border-b border-line-paper">
              <div className="menu-link-row">
                <button
                  onClick={() => go(link.href)}
                  className="group flex w-full items-baseline gap-5 py-2 text-left md:py-2.5"
                >
                  <span className="u-label text-accent">{link.index}</span>
                  <span className="relative overflow-hidden">
                    <span className="display block text-[clamp(1.9rem,5.6vh,3.6rem)] leading-[1.05] transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] group-hover:-translate-y-full">
                      {t(link.label)}
                    </span>
                    <span className="absolute left-0 top-full font-serif italic text-[clamp(1.8rem,5.3vh,3.4rem)] leading-[1.05] text-accent transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1)] group-hover:-translate-y-full">
                      {t(link.label).toLowerCase()}
                    </span>
                  </span>
                  <span className="u-label ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="menu-meta flex flex-col gap-1">
            <span className="u-label text-paper/50">
              {t({ es: "Escríbeme", en: "Get in touch" })}
            </span>
            <a
              href={`mailto:${SITE.email}`}
              className="link-line font-serif text-xl italic"
            >
              {SITE.email}
            </a>
          </div>
          <div className="menu-meta u-label flex items-center gap-6">
            <a href={SITE.cvUrl} target="_blank" rel="noreferrer" className="link-line">
              CV ↘
            </a>
            <LangToggle className="border-l border-line-paper pl-6" />
          </div>
          <div className="menu-meta u-label text-paper/40">
            {SITE.locationShort} — {time} CST
          </div>
        </div>
      </div>
    </>
  );
}
