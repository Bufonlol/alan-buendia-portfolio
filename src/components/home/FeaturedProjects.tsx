"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import { tickLink } from "@/lib/sound";
import ProjectArchiveCard from "@/components/ProjectArchiveCard";
import { SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

/* Bento spans for the first six records — asymmetric, dense-packed. */
const BENTO_SPAN = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-3",
];
const BENTO_COMPACT = [false, true, true, true, false, false];

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
      className="relative overflow-hidden border-b border-ink px-4 py-24 md:px-8 md:py-36"
    >
      <TechnicalGrid className="opacity-25" />

      <div className="relative z-10">
        <div className="grid gap-8 border-y border-ink py-5 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <SystemLabel>A—02 / SELECTED WORKS</SystemLabel>
            <h2 className="display mt-5 text-[clamp(3.5rem,10vw,9rem)]">
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

        <div className="mt-8 grid gap-6 lg:auto-rows-[minmax(240px,auto)] lg:grid-cols-3 lg:items-start lg:[grid-auto-flow:dense]">
          {orderedProjects.map((project, index) => (
            <ProjectArchiveCard
              key={project.slug}
              project={project}
              inverted={index % 2 === 1}
              compact={BENTO_COMPACT[index] ?? true}
              className={BENTO_SPAN[index] ?? ""}
              onOpen={() => {
                tickLink();
                navigate(`/projects/${project.slug}`);
              }}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-3 border-t border-ink pt-5 sm:grid-cols-2">
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
