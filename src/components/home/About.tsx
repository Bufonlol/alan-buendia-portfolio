"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { ABOUT, SITE } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function About() {
  const { lang, t } = useLang();
  const pRef = useRef<HTMLParagraphElement>(null);

  /* word-by-word ink-in while scrolling through the paragraph */
  useGSAP(
    () => {
      const el = pRef.current;
      if (!el || prefersReducedMotion()) return;
      const split = new SplitText(el, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    },
    { dependencies: [lang], scope: pRef }
  );

  return (
    <section id="about" className="px-5 py-28 md:px-8 md:py-40">
      <SectionHeader
        index="04"
        label={t({ es: "Sobre mí", en: "About" })}
        title={t({ es: "En corto", en: "In short" })}
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <p
          ref={pRef}
          className="max-w-[52rem] text-[clamp(1.4rem,2.8vw,2.3rem)] font-medium leading-[1.35] tracking-tight"
        >
          {t(ABOUT.paragraph)}
        </p>

        <div className="flex flex-col items-start gap-8 lg:items-end">
          <Reveal delay={0.1}>
            {/* rotating stamp — photo-optional corner, swap for a portrait anytime */}
            <div className="relative h-36 w-36">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full"
                style={{ animation: "spin-slow 18s linear infinite" }}
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="stamp-circle"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text className="u-label fill-ink" style={{ fontSize: "9.5px" }}>
                  <textPath href="#stamp-circle">
                    {t({
                      es: "Frontend Developer · Orizaba MX · Desde 2022 ·",
                      en: "Frontend Developer · Orizaba MX · Est. 2022 ·",
                    })}
                  </textPath>
                </text>
              </svg>
              <span className="display absolute inset-0 flex items-center justify-center text-3xl text-accent">
                ◆
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col gap-2 lg:items-end">
            <p className="font-serif text-xl italic">{SITE.fullName}</p>
            <div className="flex flex-wrap gap-2">
              {ABOUT.facts.map((f) => (
                <span key={f.en} className="pill u-label text-muted">
                  {t(f)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
