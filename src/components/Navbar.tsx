"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang, type Lang } from "@/lib/i18n";
import { NAV_LINKS, SITE } from "@/data/site";
import { isSoundEnabled, setSoundEnabled, tickLink } from "@/lib/sound";
import { Barcode, CrossMark } from "@/components/system/TechnicalLayer";

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
  const button = (value: Lang) => (
    <button
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={`u-label px-1 py-1 transition-opacity duration-300 ${
        lang === value ? "underline underline-offset-4" : "opacity-50 hover:opacity-100"
      }`}
    >
      {value.toUpperCase()}
    </button>
  );

  return (
    <div className={`pointer-events-auto flex items-center gap-1 ${className}`}>
      {button("es")}
      <span className="u-label opacity-40">/</span>
      {button("en")}
    </div>
  );
}

function SoundToggle({ className = "" }: { className?: string }) {
  const { t } = useLang();
  const [on, setOn] = useState(false);

  useEffect(() => setOn(isSoundEnabled()), []);

  return (
    <button
      onClick={() => {
        const next = !on;
        setSoundEnabled(next);
        setOn(next);
      }}
      aria-pressed={on}
      aria-label={t({ es: "Sonido", en: "Sound" })}
      className={`u-label pointer-events-auto px-1 py-1 transition-opacity duration-300 ${
        on ? "underline underline-offset-4" : "opacity-50 hover:opacity-100"
      } ${className}`}
    >
      {on ? t({ es: "SONIDO ON", en: "SOUND ON" }) : t({ es: "SONIDO OFF", en: "SOUND OFF" })}
    </button>
  );
}

export default function Navbar() {
  const { ready, navigate } = useApp();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const time = useLocalTime();

  useGSAP(() => {
    if (!ready || !barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { y: -20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.55, ease: "power3.out" }
    );
  }, [ready]);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      const duration = prefersReducedMotion() ? 0.01 : 0.68;
      const links = overlay.querySelectorAll<HTMLElement>(".menu-link-row");
      const meta = overlay.querySelectorAll<HTMLElement>(".menu-meta");

      tlRef.current = gsap
        .timeline({ paused: true })
        .set(overlay, { display: "flex" })
        .fromTo(
          overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration, ease: "power4.inOut" }
        )
        .fromTo(
          links,
          { yPercent: 105, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: duration * 0.9,
            stagger: prefersReducedMotion() ? 0 : 0.045,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .fromTo(
          meta,
          { y: 14, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: duration * 0.7,
            stagger: prefersReducedMotion() ? 0 : 0.04,
          },
          "-=0.3"
        );

      tlRef.current.eventCallback("onReverseComplete", () => {
        gsap.set(overlay, { display: "none" });
      });
    },
    { scope: overlayRef }
  );

  const toggle = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) {
        document.documentElement.style.overflow = "hidden";
        tlRef.current?.timeScale(1).play();
      } else {
        document.documentElement.style.overflow = "";
        tlRef.current?.timeScale(1.5).reverse();
      }
    },
    []
  );

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const focusTimer = window.setTimeout(() => {
      overlay.querySelector<HTMLElement>("button, a")?.focus();
    }, prefersReducedMotion() ? 10 : 520);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        toggle(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("aria-hidden"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, toggle]);

  useEffect(
    () => () => {
      document.documentElement.style.overflow = "";
    },
    []
  );

  const go = (href: string) => {
    tickLink();
    toggle(false);
    window.setTimeout(() => navigate(href), prefersReducedMotion() ? 20 : 240);
  };

  return (
    <>
      <div
        className="scroll-progress fixed inset-x-0 top-0 z-[100] h-[2px] origin-left scale-x-0 bg-ink"
      />

      <header
        ref={barRef}
        className={`pointer-events-none fixed inset-x-0 top-0 z-[90] border-b transition-colors duration-300 ${
          open ? "border-paper/30 bg-ink text-paper" : "border-ink/35 bg-paper/95 text-ink"
        }`}
        style={{ opacity: 0 }}
      >
        <nav
          aria-label={t({ es: "Navegación principal", en: "Primary navigation" })}
          className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:px-8"
        >
          <button
            onClick={() => navigate("/")}
            className="display pointer-events-auto flex items-center gap-2 text-xl tracking-[-0.06em]"
            aria-label={t({ es: "Inicio", en: "Home" })}
          >
            AB
            <CrossMark className="h-2.5 w-2.5" />
          </button>

          <div className="u-label hidden items-center justify-center gap-8 md:flex">
            <span>{SITE.locationShort}</span>
            <span suppressHydrationWarning>{time} CST</span>
            <span>SYSTEM / ONLINE</span>
          </div>

          <div className="flex items-center justify-end gap-3 md:gap-5">
            <SoundToggle className="hidden sm:block" />
            <LangToggle />
            <button
              ref={menuButtonRef}
              onClick={() => toggle(!open)}
              className="u-label pointer-events-auto flex min-h-9 items-center gap-3 border border-current px-3"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span>{open ? t({ es: "CERRAR", en: "CLOSE" }) : t({ es: "ÍNDICE", en: "INDEX" })}</span>
              <span className="relative block h-3 w-5" aria-hidden="true">
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

      <div
        id="site-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label={t({ es: "Índice del sitio", en: "Site index" })}
        aria-hidden={!open}
        className="fixed inset-0 z-[80] hidden flex-col justify-between overflow-y-auto bg-ink px-4 pb-5 pt-20 text-paper md:px-8 md:pb-7 md:pt-24"
      >
        <div className="technical-grid pointer-events-none absolute inset-0 opacity-20" />

        <nav className="relative grid md:grid-cols-2">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="overflow-hidden border-b border-paper/30 md:odd:border-r">
              <div className="menu-link-row">
                <button
                  onClick={() => go(link.href)}
                  className="group flex w-full items-center gap-4 px-2 py-2 text-left md:px-4 md:py-3"
                >
                  <span className="u-label w-7 text-paper/55">{link.index}</span>
                  <span className="display text-[clamp(1.8rem,5.2vh,4.2rem)] leading-none transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">
                    {t(link.label)}
                  </span>
                  <span className="u-label ml-auto opacity-50">↗</span>
                </button>
              </div>
            </div>
          ))}
        </nav>

        <div className="relative grid gap-6 border-t border-paper/30 pt-5 md:grid-cols-[1fr_auto_auto] md:items-end">
          <div className="menu-meta">
            <span className="u-label block text-paper/55">TRANSMISSION / CONTACT</span>
            <a href={`mailto:${SITE.email}`} className="mt-2 block text-lg font-bold">
              {SITE.email}
            </a>
          </div>
          <Barcode className="menu-meta hidden text-paper md:block" />
          <div className="menu-meta u-label flex flex-wrap items-center gap-5">
            <a href={SITE.cvUrl} target="_blank" rel="noreferrer" className="link-line">
              CV ↗
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer" className="link-line">
              GITHUB ↗
            </a>
            <SoundToggle />
            <span className="text-paper/55">{time} / UTC−6</span>
          </div>
        </div>
      </div>
    </>
  );
}
