"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { Barcode, CrossMark, SystemLabel } from "@/components/system/TechnicalLayer";
import { VerticalText } from "@/components/modular/VerticalText";

type ProjectArchiveMosaicProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
};

const RECORD_ORDER = [
  "dental-family",
  "restaurant-surveys",
  "folio",
  "cota",
  "inventory-management",
  "kybernet",
];

export default function ProjectArchiveMosaic({
  projects,
  onOpen,
}: ProjectArchiveMosaicProps) {
  const { t } = useLang();
  const records = RECORD_ORDER.map((slug) => projects.find((project) => project.slug === slug)).filter(
    (project): project is Project => Boolean(project)
  );
  const [feature, medium, blue, imageRecord, frameRecord, vertical] = records;

  const projectLink = (project: Project, className: string, children: ReactNode) => (
    <article className={`project-record archive-card bento-reactive relative overflow-hidden border border-ink ${className}`}>
      <a
        href={`/projects/${project.slug}`}
        onClick={(event) => {
          event.preventDefault();
          onOpen(project);
        }}
        data-cursor="view"
        className="group flex h-full min-h-0 flex-col focus-visible:outline-offset-[-4px]"
      >
        {children}
      </a>
    </article>
  );

  if (!feature || !medium || !blue || !imageRecord || !frameRecord || !vertical) return null;

  return (
    <div className="project-archive-mosaic">
      {projectLink(
        feature,
        "project-record-feature bg-paper text-ink",
        <>
          <div className="grid grid-cols-[1fr_auto] border-b border-ink px-4 py-3">
            <SystemLabel>PROJECT_{feature.index} / PRIMARY RECORD</SystemLabel>
            <SystemLabel>{feature.year} / {t(feature.status)}</SystemLabel>
          </div>
          <div className="grid min-h-0 flex-1 md:grid-cols-[1.45fr_0.55fr]">
            <div className="project-media relative min-h-72 overflow-hidden border-b border-ink bg-ink md:border-b-0 md:border-r">
              <Image
                src="/projects/dental-family/panel.png"
                alt={t(feature.title)}
                fill
                sizes="(max-width: 767px) 100vw, 58vw"
                quality={78}
                className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]"
              />
              <div className="technical-grid pointer-events-none absolute inset-0 opacity-20" />
              <span className="u-label absolute bottom-3 left-3 border border-paper bg-ink px-2 py-1 text-paper">
                FRAME / {feature.index.padStart(4, "0")}
              </span>
            </div>
            <div className="flex flex-col justify-between p-4 md:p-5">
              <div>
                <SystemLabel className="opacity-65">{t(feature.role)}</SystemLabel>
                <h3 className="display mt-4 text-[clamp(2.7rem,5vw,5.5rem)] leading-[0.82]">
                  {t(feature.title)}
                </h3>
                <p className="mt-5 max-w-[28ch] text-base font-semibold leading-snug">{t(feature.tagline)}</p>
              </div>
              <div className="mt-8">
                <div className="border-y border-ink">
                  {feature.results.slice(0, 3).map((result) => (
                    <div
                      key={result.label.en}
                      className="grid grid-cols-[auto_1fr] items-center gap-3 border-b border-ink p-2 last:border-b-0"
                    >
                      <span className="display block text-2xl">{t(result.metric)}</span>
                      <SystemLabel className="block leading-tight opacity-60">{t(result.label)}</SystemLabel>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <SystemLabel className="max-w-[22ch] leading-relaxed">{feature.tags.join(" / ")}</SystemLabel>
                  <span className="display text-3xl transition-transform group-hover:translate-x-1">↗</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {projectLink(
        medium,
        "project-record-medium-a bg-ink text-paper",
        <>
          <div className="flex items-center justify-between border-b border-paper/40 px-4 py-3">
            <SystemLabel>REC / {medium.index}</SystemLabel>
            <CrossMark />
          </div>
          <div className="project-media relative min-h-52 flex-1 overflow-hidden">
            <Image
              src={medium.cardImage!}
              alt={t(medium.title)}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              quality={78}
              className="object-cover object-top opacity-85 mix-blend-screen transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
            />
            <div className="technical-grid pointer-events-none absolute inset-0 opacity-25" />
          </div>
          <div className="border-t border-paper/40 p-4">
            <SystemLabel className="opacity-65">{medium.year} / {t(medium.role)}</SystemLabel>
            <div className="mt-2 flex items-end justify-between gap-4">
              <h3 className="display text-[clamp(2.1rem,4vw,4rem)] leading-[0.86]">{t(medium.title)}</h3>
              <span className="text-2xl">↗</span>
            </div>
          </div>
        </>
      )}

      {projectLink(
        blue,
        "project-record-blue bg-ink text-paper",
        <>
          <div className="flex items-center justify-between border-b border-paper/40 px-4 py-3">
            <SystemLabel>VISUAL RECORD / {blue.index}</SystemLabel>
            <SystemLabel>{blue.year}</SystemLabel>
          </div>
          <div className="project-media relative min-h-44 flex-1 overflow-hidden bg-paper">
            <Image
              src="/projects/folio/landing.png"
              alt={t(blue.title)}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              quality={78}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="technical-grid pointer-events-none absolute inset-0 opacity-15" />
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-end gap-4 border-t border-paper/40 p-4">
            <span className="display text-5xl leading-none">{blue.index}</span>
            <div>
              <h3 className="display text-[clamp(2rem,3.5vw,3.6rem)] leading-[0.84]">{t(blue.title)}</h3>
              <SystemLabel className="mt-2 block">{blue.tags.join(" / ")}</SystemLabel>
            </div>
            <span className="text-2xl">↗</span>
          </div>
        </>
      )}

      {projectLink(
        imageRecord,
        "project-record-medium-b bg-paper text-ink",
        <>
          <div className="project-media relative min-h-60 flex-1 overflow-hidden border-b border-ink bg-ink">
            <Image
              src={imageRecord.cardImage!}
              alt={t(imageRecord.title)}
              fill
              sizes="(max-width: 767px) 100vw, 42vw"
              quality={78}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <SystemLabel className="absolute left-3 top-3 border border-paper bg-ink px-2 py-1 text-paper">
              IMAGE / CROPPED / {imageRecord.index}
            </SystemLabel>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-end gap-4 p-4">
            <div>
              <SystemLabel>{imageRecord.year} / {t(imageRecord.status)}</SystemLabel>
              <h3 className="display mt-2 text-[clamp(2.3rem,4vw,4.2rem)]">{t(imageRecord.title)}</h3>
            </div>
            <span className="display text-3xl">↗</span>
          </div>
        </>
      )}

      {projectLink(
        frameRecord,
        "project-record-frame bg-paper text-ink",
        <>
          <div className="flex items-center justify-between border-b border-ink px-3 py-3">
            <SystemLabel>FRAME / {frameRecord.index.padStart(4, "0")}</SystemLabel>
            <SystemLabel>{frameRecord.year}</SystemLabel>
          </div>
          <div className="project-media relative min-h-52 flex-1 overflow-hidden border-b border-ink">
            <Image
              src={frameRecord.cardImage!}
              alt={t(frameRecord.title)}
              fill
              sizes="(max-width: 767px) 100vw, 28vw"
              quality={78}
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-4">
            <h3 className="display text-[clamp(1.8rem,3vw,3rem)] leading-[0.88]">{t(frameRecord.title)}</h3>
            <div className="mt-4 flex items-center justify-between border-t border-ink pt-3">
              <SystemLabel>{frameRecord.tags.slice(0, 2).join(" / ")}</SystemLabel>
              <span>↗</span>
            </div>
          </div>
        </>
      )}

      {projectLink(
        vertical,
        "project-record-vertical bg-paper text-ink",
        <>
          <div className="flex flex-1">
            <div className="relative min-h-56 flex-1 overflow-hidden border-r border-ink">
              <Image
                src={vertical.cardImage!}
                alt={t(vertical.title)}
                fill
                sizes="(max-width: 767px) 50vw, 24vw"
                quality={78}
                className="object-cover object-top mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.035]"
              />
            </div>
            <div className="flex w-14 items-center justify-center">
              <VerticalText>{t(vertical.title)} / {vertical.year} / VIEW ↗</VerticalText>
            </div>
          </div>
          <div className="border-t border-ink p-3">
            <SystemLabel>REC / {vertical.index} / {vertical.tags.slice(0, 2).join(" / ")}</SystemLabel>
          </div>
        </>
      )}
    </div>
  );
}
