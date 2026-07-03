"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import { tickLink } from "@/lib/sound";
import ProjectArchiveCard from "@/components/ProjectArchiveCard";
import { CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

/* Bento spans for the first six records — asymmetric, dense-packed. */
const BENTO_SPAN = [
  "lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-1",
];
const BENTO_COMPACT = [false, true, true, false, false, true];
/* A couple of tiles tilt off-grid, like loose sheets in a physical archive. */
const BENTO_TILT: Record<number, string> = {
  2: "[transform:rotate(-0.6deg)]",
  5: "[transform:rotate(0.7deg)]",
};

/* Feature Dental Family in the big slot; keep the rest in catalog order. */
const FEATURED_SLUG = "dental-family";
const orderProjects = <T extends { slug: string }>(projects: T[]): T[] => {
  const featured = projects.find((p) => p.slug === FEATURED_SLUG);
  if (!featured) return projects;
  return [featured, ...projects.filter((p) => p.slug !== FEATURED_SLUG)];
};

export default function FeaturedProjects() {
  const { navigate } = useApp();
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const orderedProjects = orderProjects(PROJECTS);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".archive-card", section);

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 42, clipPath: "inset(0 0 16% 0)" },
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="home-bento-section"
    >
      <TechnicalGrid className="opacity-25" />

      <div className="relative z-10">
        <div className="grid gap-8 border border-ink p-5 md:grid-cols-[1fr_1.2fr] md:items-end md:p-7">
          <div>
            <SystemLabel>SELECTED WORKS / {String(PROJECTS.length).padStart(2, "0")} CASES</SystemLabel>
            <h2 className="display mt-5 text-[clamp(3.2rem,7vw,6rem)]">
              {t({ es: "Archivo", en: "Archive" })}
              <br />
              {t({ es: "selecto", en: "selected" })}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <p className="max-w-[34ch] text-base font-semibold leading-snug">
              {t({
                es: "Sistemas reales para operaciones reales. Cada ficha documenta problema, construcción y resultado.",
                en: "Real systems for real operations. Each record documents the problem, build and outcome.",
              })}
            </p>
            <div className="u-label leading-relaxed md:text-right">
              RECORDS / {String(PROJECTS.length).padStart(2, "0")}
              <br />
              RANGE / 2024–2026
              <br />
              STATUS / SHIPPED
            </div>
          </div>
        </div>

        <div className="relative mt-3 md:mt-4">
          <CrossMark className="pointer-events-none absolute -left-1 top-1/3 z-20 hidden text-ink/50 lg:block" />
          <CrossMark className="pointer-events-none absolute -right-1 bottom-1/4 z-20 hidden text-ink/50 lg:block" />
          <div className="grid gap-3 md:gap-4 lg:auto-rows-[minmax(220px,auto)] lg:grid-cols-3 lg:[grid-auto-flow:dense]">
            {orderedProjects.map((project, index) => (
              <ProjectArchiveCard
                key={project.slug}
                project={project}
                inverted={index % 2 === 1}
                compact={BENTO_COMPACT[index] ?? true}
                className={`${BENTO_SPAN[index] ?? ""} ${BENTO_TILT[index] ?? "home-bento-panel-interactive"}`}
                onOpen={() => {
                  tickLink();
                  navigate(`/projects/${project.slug}`);
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2 md:mt-4">
          <button
            onClick={() => navigate("/archive")}
            className="u-label border border-ink px-4 py-4 text-left transition-colors hover:bg-ink hover:text-paper"
          >
            {t({ es: "ABRIR ARCHIVO COMPLETO ↗", en: "OPEN FULL ARCHIVE ↗" })}
          </button>
          <button
            onClick={() => navigate("/playground")}
            className="u-label border border-ink px-4 py-4 text-left transition-colors hover:bg-ink hover:text-paper"
          >
            {t({ es: "ENTRAR AL PLAYGROUND ↗", en: "ENTER PLAYGROUND ↗" })}
          </button>
        </div>
      </div>
    </section>
  );
}
