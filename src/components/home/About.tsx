"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { ABOUT, SITE } from "@/data/site";
import Reveal from "@/components/motion/Reveal";

/** About — no photography: big statements, an abstract map of
 *  Orizaba coordinates and editorial data columns.
 *  Section transition: the geometry expands from its center. */
export default function About() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion() || isDeckCapable()) return;
      /* scrubbed geometric expansion tied to the section's entry */
      gsap.fromTo(
        ".about-geo",
        { scale: 0.35, rotate: -18, autoAlpha: 0, transformOrigin: "center" },
        {
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 35%",
            scrub: 0.4,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      className="border-t border-ink/15 bg-paper py-28 text-ink md:py-36 deck:flex deck:h-full deck:flex-col deck:justify-center deck:border-t-0 deck:py-0"
    >
      <div className="frame">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display text-[clamp(2.6rem,7.5vw,6.5rem)]">
            <Reveal type="mask-up">
              <span className="block">{t({ es: "Sobre mí", en: "About me" })}</span>
            </Reveal>
          </h2>
          <span className="u-num text-ink/40">{SITE.coords}</span>
        </div>

        <Reveal type="line" className="rule mt-10 deck:mt-5" />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 deck:mt-8 deck:gap-8">
          {/* statements */}
          <div className="lg:col-span-5">
            <Reveal type="rise">
              <p className="display text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.08]">
                {t(ABOUT.lineOne)}
              </p>
            </Reveal>
            <Reveal type="rise" delay={0.1}>
              <p className="display mt-8 max-w-[24ch] text-[clamp(1.1rem,1.9vw,1.55rem)] leading-[1.12] text-ink/70">
                {t(ABOUT.lineTwo)}
              </p>
            </Reveal>
          </div>

          {/* abstract map — expands from its center as the section enters */}
          <Reveal type="rise" delay={0.15} className="lg:col-span-3">
            <div className="about-geo relative mx-auto aspect-square max-w-[260px] deck:max-w-[200px]">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full text-ink"
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.75" fill="none" opacity="0.2" strokeDasharray="3 4" />
                <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
                {/* simplified silhouette of Veracruz state: a long crescent
                    running NW→SE along the Gulf, with the Tuxtlas bulge south */}
                <path
                  d="M62 26
                     Q74 28 80 38
                     Q88 50 92 64
                     Q97 80 102 94
                     Q107 108 114 120
                     Q122 132 136 140
                     Q150 146 157 155
                     Q161 165 152 172
                     Q142 178 134 172
                     Q124 162 112 150
                     Q100 138 92 124
                     Q83 108 76 90
                     Q68 70 60 50
                     Q56 36 62 26 Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  fill="currentColor"
                  fillOpacity="0.06"
                  opacity="0.6"
                  strokeLinejoin="round"
                />
                <circle cx="86" cy="104" r="4" fill="#C7F000" />
                <circle cx="86" cy="104" r="9" stroke="#C7F000" strokeWidth="1" fill="none" opacity="0.6" />
              </svg>
              <p className="u-label absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-ink/60">
                Orizaba
                <br />
                Veracruz
              </p>
            </div>
          </Reveal>

          {/* data columns */}
          <Reveal type="rise" delay={0.2} className="lg:col-span-4">
            <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <DataBlock
                label={t({ es: "Disponibilidad", en: "Availability" })}
                items={ABOUT.availability.map(t)}
              />
              <DataBlock
                label={t({ es: "Idiomas", en: "Languages" })}
                items={ABOUT.languages.map(t)}
              />
              <DataBlock
                label={t({ es: "Intereses", en: "Interests" })}
                items={ABOUT.interests.map(t)}
              />
              <div>
                <dt className="u-label border-b border-ink/20 pb-2 text-ink/50">
                  {t({ es: "Filosofía", en: "Philosophy" })}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-ink/80">
                  {t(ABOUT.philosophy)}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DataBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="u-label border-b border-ink/20 pb-2 text-ink/50">{label}</dt>
      <dd className="mt-3">
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li key={item} className="text-sm text-ink/80">
              {item}
            </li>
          ))}
        </ul>
      </dd>
    </div>
  );
}
