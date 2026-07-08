"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import { tickLink } from "@/lib/sound";
import ProjectArchiveMosaic from "@/components/modular/ProjectArchiveMosaic";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { VerticalText } from "@/components/modular/VerticalText";

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { navigate } = useApp();
  const { t } = useLang();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const records = gsap.utils.toArray<HTMLElement>(".project-record", section);

      if (prefersReducedMotion()) {
        gsap.set(records, { x: 0, y: 0, clipPath: "inset(0%)" });
        return;
      }

      records.forEach((record, index) => {
        gsap.fromTo(
          record,
          {
            x: index % 2 ? 22 : -22,
            y: index % 3 === 0 ? 24 : -12,
            clipPath: index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
          },
          {
            x: 0,
            y: 0,
            clipPath: "inset(0%)",
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: { trigger: record, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="work" className="home-bento-section">
      <TechnicalGrid className="opacity-25" />

      <div className="relative z-10">
        <div className="archive-heading-mosaic">
          <div className="archive-heading-title border border-ink p-4 md:p-6">
            <div className="flex items-center justify-between">
              <SystemLabel>PROJECT ARCHIVE / LIVE INDEX</SystemLabel>
              <CrossMark className="opacity-50" />
            </div>
            <h2 className="display mt-8 text-[clamp(4rem,9vw,8.5rem)] leading-[0.78]">
              {t({ es: "Archivo", en: "Archive" })}
            </h2>
            <p className="mt-6 max-w-[38ch] text-base font-semibold leading-snug">
              {t({
                es: "Sistemas enviados, medidos y documentados como registros de producción.",
                en: "Systems shipped, measured, and documented as production records.",
              })}
            </p>
          </div>

          <div className="archive-heading-count flex flex-col justify-between border border-ink bg-ink p-4 text-paper">
            <SystemLabel>RECORDS / TOTAL</SystemLabel>
            <span className="display text-[clamp(5rem,10vw,9rem)] leading-none">
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
            <Barcode className="text-paper" />
          </div>

          <div className="archive-heading-meta grid grid-cols-2 border border-ink">
            {[
              ["RANGE", "2024–2026"],
              ["STATUS", "SHIPPED"],
              ["ROLE", "DESIGN / CODE"],
              ["OUTPUT", "REAL SYSTEMS"],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-r border-ink p-3 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
                <SystemLabel className="opacity-85">{label}</SystemLabel>
                <p className="u-label mt-2 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>

          <div className="archive-heading-vertical flex items-center justify-center border border-ink bg-paper">
            <VerticalText>SELECTED WORK / FRAME 002 / OPEN RECORD</VerticalText>
          </div>
        </div>

        <ProjectArchiveMosaic
          projects={PROJECTS}
          onOpen={(project) => {
            tickLink();
            navigate(`/projects/${project.slug}`);
          }}
        />

        <div className="mt-2 grid gap-2 sm:grid-cols-[1.3fr_0.7fr]">
          <button
            onClick={() => navigate("/archive")}
            className="u-label flex min-h-16 items-center justify-between border border-ink bg-ink px-4 py-4 text-left text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <span>{t({ es: "ABRIR ÍNDICE COMPLETO", en: "OPEN COMPLETE INDEX" })}</span>
            <span aria-hidden="true">↗</span>
          </button>
          <button
            onClick={() => navigate("/playground")}
            className="u-label flex min-h-16 items-center justify-between border border-ink px-4 py-4 text-left transition-colors hover:bg-ink hover:text-paper"
          >
            <span>{t({ es: "ENTRAR AL PLAYGROUND", en: "ENTER PLAYGROUND" })}</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
