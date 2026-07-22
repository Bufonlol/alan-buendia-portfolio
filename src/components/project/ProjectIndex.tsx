"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { PROJECTS } from "@/data/projects";
import TLink from "@/components/ui/TLink";
import Reveal from "@/components/motion/Reveal";

/** Full project archive — an editorial index table. Hovering a row
 *  reveals its screenshot in the fixed preview panel (desktop). */
export default function ProjectIndex() {
  const { t } = useLang();
  const [hovered, setHovered] = useState<string | null>(null);
  const preview = PROJECTS.find((p) => p.slug === hovered);

  return (
    <main className="min-h-[100svh] bg-ink pb-28 pt-32 text-paper">
      <div className="frame">
        <p className="u-label text-mute">
          {t({ es: "Índice completo", en: "Complete index" })} / {PROJECTS.length}
        </p>
        <h1 className="display mt-3 text-[clamp(3rem,10vw,9rem)]">
          <Reveal type="mask-up">
            <span className="block">{t({ es: "Todos los", en: "All" })}</span>
          </Reveal>
          <Reveal type="mask-up" delay={0.1}>
            <span className="block">{t({ es: "proyectos", en: "projects" })}</span>
          </Reveal>
        </h1>

        <Reveal type="line" className="rule mt-10 text-paper" />

        <div className="relative mt-2 lg:grid lg:grid-cols-12 lg:gap-8">
          <ol className="lg:col-span-8">
            {PROJECTS.map((p, i) => (
              <li key={p.slug}>
                <TLink
                  href={`/projects/${p.slug}`}
                  data-cursor="project"
                  className="group flex items-baseline gap-5 border-b border-paper/12 py-7 transition-colors duration-300 hover:bg-paper/5 md:gap-8"
                  onMouseEnter={() => setHovered(p.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className="u-num w-8 shrink-0 text-[0.6875rem] text-mute">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="display block text-[clamp(1.8rem,4.5vw,3.4rem)] transition-transform duration-300 group-hover:translate-x-2">
                      {t(p.title)}
                    </span>
                    <span className="u-label mt-2 block text-mute">
                      {p.tags.slice(0, 3).join(" / ")}
                    </span>
                  </span>
                  <span className="u-num hidden text-[0.6875rem] text-mute sm:block">
                    {p.year}
                  </span>
                  <span className="arrow-x hidden sm:inline-block" aria-hidden="true" />
                </TLink>
              </li>
            ))}
          </ol>

          {/* hover preview — desktop only */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32 aspect-[4/3] overflow-hidden border border-paper/15 bg-ink">
              {preview?.cardImage ? (
                <Image
                  src={preview.cardImage}
                  alt=""
                  fill
                  sizes="30vw"
                  className="img-ink object-cover object-top"
                />
              ) : (
                <div className="halftone absolute inset-0 text-paper opacity-15" aria-hidden="true" />
              )}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-1.5 w-1/3 bg-acid"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
