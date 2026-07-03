"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { Barcode, CrossMark } from "@/components/system/TechnicalLayer";

export default function ProjectArchiveCard({
  project,
  inverted = false,
  compact = false,
  className = "",
  onOpen,
}: {
  project: Project;
  inverted?: boolean;
  compact?: boolean;
  className?: string;
  onOpen: () => void;
}) {
  const { t } = useLang();
  const cardTone = inverted
    ? "border-ink bg-ink text-paper"
    : "border-ink bg-paper text-ink";
  const ruleTone = inverted ? "border-paper/35" : "border-ink/35";

  return (
    <article
      className={`archive-card bento-reactive group flex flex-col border ${cardTone} ${className}`}
      data-cursor="view"
    >
      <a
        href={`/projects/${project.slug}`}
        onClick={(event) => {
          event.preventDefault();
          onOpen();
        }}
        className="flex flex-1 flex-col focus-visible:outline-offset-[-4px]"
      >
        <div className={`grid grid-cols-[1fr_auto] items-center border-b px-4 py-3 ${ruleTone}`}>
          <span className="u-label">
            PROJECT_{project.index} / {project.year}
          </span>
          <div className="flex items-center gap-3">
            <span className="u-label hidden sm:block">{t(project.status)}</span>
            <CrossMark className="h-2.5 w-2.5" />
          </div>
        </div>

        <div className={compact ? "flex flex-1 flex-col" : "grid flex-1 lg:grid-cols-[1.35fr_0.65fr] lg:items-start"}>
          <div className={`border-b p-3 ${compact ? "" : "lg:border-b-0 lg:border-r"} ${ruleTone}`}>
            <div className={`project-media relative overflow-hidden bg-ink ${compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
              {project.cardImage && (
                <Image
                  src={project.cardImage}
                  alt={t(project.title)}
                  fill
                  sizes={compact ? "(max-width: 1024px) 100vw, 32vw" : "(max-width: 1024px) 100vw, 64vw"}
                  quality={78}
                  className="object-cover object-top contrast-105 saturate-[1.1] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]"
                />
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-ink/10 mix-blend-multiply"
              />
              <div
                aria-hidden="true"
                className="technical-grid absolute inset-0 opacity-20"
              />
              <span className="u-label absolute bottom-3 left-3 border border-paper/50 bg-ink px-2 py-1 text-paper">
                FRAME / {project.index.padStart(4, "0")}
              </span>
            </div>
          </div>

          <div className={`flex flex-1 flex-col justify-between ${compact ? "p-4" : "p-5 md:p-7"}`}>
            <div>
              <p className="u-label opacity-65">{t(project.role)}</p>
              <h3
                className={`display mt-3 leading-[0.86] ${
                  compact ? "text-[clamp(1.6rem,3.4vw,2.6rem)]" : "mt-4 text-[clamp(2.5rem,6vw,5.7rem)]"
                }`}
              >
                {t(project.title)}
              </h3>
              {!compact && (
                <>
                  <p className="mt-5 max-w-[34ch] text-sm font-semibold leading-snug">
                    {t(project.tagline)}
                  </p>
                  <p className="mt-6 max-w-[46ch] text-sm leading-relaxed opacity-75">
                    {t(project.problem).split(".").slice(0, 1).join(".") + "."}
                  </p>
                  <div className={`mt-8 grid grid-cols-3 gap-4 border-t pt-5 ${ruleTone}`}>
                    {project.results.slice(0, 3).map((r) => (
                      <div key={r.label.en}>
                        <span className="display block text-2xl leading-none md:text-3xl">
                          {t(r.metric)}
                        </span>
                        <span className="u-label mt-2 block leading-snug opacity-60">
                          {t(r.label)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className={compact ? "mt-5" : "mt-10"}>
              <div className={`border-t pt-3 ${ruleTone}`}>
                {!compact && <span className="u-label block opacity-65">STACK / SYSTEM</span>}
                <p className="u-label mt-1 leading-relaxed opacity-80">
                  {project.tags.slice(0, compact ? 2 : undefined).join(" / ")}
                </p>
              </div>
              <div className="mt-4 flex items-end justify-between gap-5">
                <Barcode className="opacity-70" />
                <span className="u-label border border-current px-3 py-2 transition-colors duration-300 group-hover:bg-current">
                  <span className={inverted ? "group-hover:text-ink" : "group-hover:text-paper"}>
                    {compact ? t({ es: "VER ↗", en: "VIEW ↗" }) : t({ es: "ABRIR CASO ↗", en: "OPEN CASE ↗" })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
