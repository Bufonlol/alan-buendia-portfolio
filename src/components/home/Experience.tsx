"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { EXPERIENCE } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

export default function Experience() {
  const { t } = useLang();
  const lineWrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current || !lineWrapRef.current) return;
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineWrapRef.current,
            start: "top 75%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    },
    { scope: lineWrapRef }
  );

  return (
    <section
      id="experience"
      className="grid gap-12 px-5 py-28 md:px-8 md:py-40 lg:grid-cols-[1fr_1.5fr] lg:gap-20"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeader
          index="03"
          label={t({ es: "Experiencia", en: "Experience" })}
          title={t({ es: "Dónde he construido", en: "Where I've built" })}
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-[26rem] font-serif text-xl italic text-ink-soft">
            {t({
              es: "de las trincheras freelance a la escala retail — cada línea lanzada a gente que de verdad la usa.",
              en: "from freelance trenches to retail scale — every line of it shipped to people who actually use it.",
            })}
          </p>
        </Reveal>
      </div>

      <div ref={lineWrapRef} className="relative pl-8 md:pl-12">
        {/* growing timeline spine */}
        <div className="absolute bottom-0 left-0 top-0 w-px bg-line">
          <div
            ref={lineRef}
            className="h-full w-px origin-top scale-y-0 bg-accent"
          />
        </div>

        <ol className="flex flex-col gap-16">
          {EXPERIENCE.map((job, i) => (
            <li key={job.company} className="relative">
              <span
                className="absolute -left-8 top-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent md:-left-12"
                aria-hidden="true"
              />
              <Reveal delay={i * 0.05}>
                <p className="u-label text-muted">{t(job.period)}</p>
                <h3 className="display mt-3 text-[clamp(1.7rem,4vw,3rem)] leading-none">
                  {t(job.role)}
                </h3>
                <p className="mt-2 font-serif text-xl italic text-accent">
                  {job.company}
                </p>
                <p className="mt-4 max-w-[34rem] leading-relaxed text-ink-soft">
                  {t(job.summary)}
                </p>
                <p className="pill u-label mt-5 text-muted">
                  <span className="text-accent">✳</span> {t(job.highlight)}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
