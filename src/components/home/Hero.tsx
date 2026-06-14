"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";
import HeroCanvas from "@/components/home/HeroCanvas";

export default function Hero() {
  const { ready } = useApp();
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  /* Entrance — fired the moment the preloader curtain lifts */
  useGSAP(
    () => {
      if (!ready || !sectionRef.current) return;
      const q = gsap.utils.selector(sectionRef);

      if (prefersReducedMotion()) {
        // calm mode: gentle opacity-only entrance, no char cascade, no parallax
        gsap.fromTo(
          q(".hero-line, .hero-fade"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power2.out", delay: 0.15 }
        );
        return;
      }

      // line-level clip (instead of per-char masks) so diacritics like Í
      // aren't cut off by the tight leading — the line span itself has
      // overflow-hidden with em-padding headroom above the caps.
      const split1 = new SplitText(line1Ref.current, { type: "chars" });
      const split2 = new SplitText(line2Ref.current, { type: "chars" });

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .set(q(".hero-line"), { autoAlpha: 1 })
        .fromTo(
          split1.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.045 },
          0.1
        )
        .fromTo(
          split2.chars,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.035 },
          0.32
        )
        .fromTo(
          q(".hero-fade"),
          { y: 26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 },
          0.85
        );

      /* Soft parallax out while scrolling away */
      gsap.to(q(".hero-title"), {
        yPercent: -10,
        autoAlpha: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { dependencies: [ready], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-7 pt-24 md:px-8"
    >
      <HeroCanvas />

      {/* top meta row */}
      <div className="hero-fade relative z-10 flex items-center justify-between" style={{ opacity: 0 }}>
        <span className="u-label text-muted">
          {t({ es: "Portafolio © 2026", en: "Portfolio © 2026" })}
        </span>
        <span className="u-label hidden text-muted md:block">{SITE.coords}</span>
        <span className="u-label flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full bg-accent"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          {t(SITE.availability)}
        </span>
      </div>

      {/* giant name */}
      <div className="hero-title relative z-10">
        <h1 aria-label={`${SITE.name} — ${t(SITE.role)}`}>
          <span
            ref={line1Ref}
            aria-hidden="true"
            className="hero-line display -mt-[0.15em] block overflow-hidden pt-[0.15em] text-[clamp(4.5rem,21vw,19rem)] leading-[0.85]"
            style={{ opacity: 0 }}
          >
            {SITE.heroFirst}
          </span>
          <span className="hero-fade flex items-baseline gap-[3vw] pl-[2vw]" style={{ opacity: 0 }}>
            <span className="max-w-[16rem] font-serif italic text-[clamp(1.1rem,2.4vw,1.8rem)] leading-tight text-ink-soft">
              {t({
                es: "— frontend engineer construyendo interfaces que se sienten inevitables",
                en: "— frontend engineer building interfaces that feel inevitable",
              })}
            </span>
          </span>
          <span
            ref={line2Ref}
            aria-hidden="true"
            className="hero-line display -mt-[0.15em] block overflow-hidden pt-[0.15em] text-right text-[clamp(3.4rem,15.5vw,14rem)] leading-[0.85]"
            style={{ opacity: 0 }}
          >
            BUENDÍA<span className="text-accent">◆</span>
          </span>
        </h1>
      </div>

      {/* bottom row */}
      <div className="relative z-10 flex items-end justify-between">
        <div className="hero-fade flex items-center gap-4" style={{ opacity: 0 }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line">
            <span className="animate-bounce text-sm">↓</span>
          </span>
          <span className="u-label text-muted">
            {t({ es: "Scrollea", en: "Scroll" })}
            <br />
            {t({ es: "para explorar", en: "to explore" })}
          </span>
        </div>
        <span className="hero-fade u-label hidden text-right text-muted sm:block" style={{ opacity: 0 }}>
          React · TypeScript
          <br />
          GSAP · Three.js
        </span>
      </div>
    </section>
  );
}
