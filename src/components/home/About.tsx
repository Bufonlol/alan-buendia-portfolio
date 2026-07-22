"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isDeckCapable } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { ABOUT } from "@/data/site";
import Reveal from "@/components/motion/Reveal";

/** About — no photography: big statements, a geographic locator
 *  for Orizaba and editorial data columns.
 *  Section transition: the geometry expands from its center. */
export default function About() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion() || isDeckCapable()) return;
      /* one-shot geometric explosion on enter */
      gsap.fromTo(
        ".about-geo",
        { scale: 0.35, rotate: -18, autoAlpha: 0, transformOrigin: "center" },
        {
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 72%", once: true },
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

          {/* Veracruz locator — expands from its center as the section enters */}
          <Reveal type="rise" delay={0.15} className="lg:col-span-3">
            <div className="about-geo relative mx-auto aspect-[13/15] w-full max-w-[260px] deck:max-w-[200px]">
              <svg
                viewBox="0 0 260 300"
                className="h-full w-full text-ink"
                role="img"
                aria-labelledby="veracruz-map-title veracruz-map-desc"
              >
                <title id="veracruz-map-title">Orizaba, Veracruz</title>
                <desc id="veracruz-map-desc">
                  Silueta del estado de Veracruz con la ubicación de Orizaba señalada.
                </desc>

                <circle cx="130" cy="112" r="101" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.38" />
                <circle cx="130" cy="112" r="67" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.16" strokeDasharray="3 5" />
                <path d="M18 112H242M130 0V224" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />
                <path d="M25 20h22M25 20v22M235 20h-22M235 20v22M25 204h22M25 204v-22M235 204h-22M235 204v-22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.38" />

                <image
                  href="/assets/veracruz-outline.svg"
                  x="60"
                  y="39"
                  width="140"
                  height="146"
                  preserveAspectRatio="xMidYMid meet"
                />

                <g transform="translate(105 137)">
                  <circle r="11" fill="none" stroke="#C7F000" strokeWidth="1.2" />
                  <circle className="about-geo__pulse" r="5.5" fill="#C7F000" />
                  <path d="M-18 0H18M0-18V18" stroke="#C7F000" strokeWidth="0.9" />
                </g>

                <path d="M105 148V225H80" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.32" strokeDasharray="2 4" />
                <text x="80" y="250" fill="currentColor" fontSize="12" fontFamily="monospace" letterSpacing="2.1">ORIZABA</text>
                <text x="80" y="270" fill="currentColor" fontSize="12" fontFamily="monospace" letterSpacing="2.1">VERACRUZ</text>
                <text x="214" y="270" fill="currentColor" fontSize="22" fontFamily="sans-serif" fontWeight="800" textAnchor="end">MX</text>
              </svg>
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
