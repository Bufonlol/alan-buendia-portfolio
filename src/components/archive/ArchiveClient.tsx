"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { ARCHIVE } from "@/data/archive";
import PageHeader from "@/components/PageHeader";
import MiniFooter from "@/components/MiniFooter";
import { CrossMark, TechnicalGrid } from "@/components/system/TechnicalLayer";

/* Bento spans for the six archive records — asymmetric, dense-packed. */
const BENTO_SPAN = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
];

export default function ArchiveClient() {
  const { navigate } = useApp();
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".archive-tile", gridRef.current),
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <main className="px-5 pt-28 md:px-8">
      <div className="relative">
        <TechnicalGrid className="opacity-20" />
        <div className="relative z-10">
          <PageHeader
            kicker={{
              es: `Índice 01 — ${String(ARCHIVE.length).padStart(2, "0")}`,
              en: `Index 01 — ${String(ARCHIVE.length).padStart(2, "0")}`,
            }}
            title={{ es: "Archivo", en: "Archive" }}
            blurb={{
              es: "todo — enviado, en proceso o retirado. cada ficha guarda el recibo.",
              en: "everything — shipped, in progress or retired. every tile keeps the receipt.",
            }}
          />

          <div
            ref={gridRef}
            className="mt-16 grid gap-6 pb-8 lg:auto-rows-[minmax(180px,auto)] lg:grid-cols-3 lg:items-start"
          >
            {ARCHIVE.map((entry, index) => {
              const compact = index !== 0;
              const inner = (
                <>
                  <div className="flex items-center justify-between border-b border-line px-4 py-3">
                    <span className="u-label text-muted">
                      {entry.index} / {entry.year}
                    </span>
                    <div className="flex items-center gap-3">
                      {entry.tag ? (
                        <span className="u-label text-muted">{t(entry.tag)}</span>
                      ) : (
                        <CrossMark className="h-2.5 w-2.5" />
                      )}
                    </div>
                  </div>
                  {entry.image ? (
                    <div className={`relative overflow-hidden bg-ink ${compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                      <Image
                        src={entry.image}
                        alt={t(entry.title)}
                        fill
                        sizes={compact ? "(max-width: 1024px) 100vw, 32vw" : "(max-width: 1024px) 100vw, 64vw"}
                        quality={78}
                        className="object-cover object-top contrast-105 saturate-[1.1] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]"
                      />
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/10 mix-blend-multiply" />
                      <div aria-hidden="true" className="technical-grid absolute inset-0 opacity-20" />
                    </div>
                  ) : (
                    <div className={`dot-grid flex items-center justify-center bg-paper-soft ${compact ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                      <span className="u-label text-muted">{t({ es: "SIN VISTA PREVIA", en: "NO PREVIEW" })}</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-4 md:p-5">
                    <div>
                      <span className="u-label text-muted">{t(entry.type)}</span>
                      <h3
                        className={`stack-name display mt-2 leading-none ${
                          compact ? "text-[clamp(1.5rem,3.2vw,2.3rem)]" : "text-[clamp(2.2rem,5vw,4.2rem)]"
                        }`}
                      >
                        {t(entry.title)}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
                      <span className="u-label text-muted">{entry.stack}</span>
                      <span className="u-label border border-current px-3 py-2 transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
                        {entry.href ? "→" : entry.external ? "↗" : "—"}
                      </span>
                    </div>
                  </div>
                </>
              );

              const tileClass = `archive-tile group flex flex-col border border-line ${BENTO_SPAN[index] ?? ""}`;

              if (entry.href) {
                return (
                  <a
                    key={entry.index}
                    href={entry.href}
                    data-cursor="view"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(entry.href!);
                    }}
                    className={tileClass}
                  >
                    {inner}
                  </a>
                );
              }
              if (entry.external) {
                return (
                  <a
                    key={entry.index}
                    href={entry.external}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="view"
                    className={tileClass}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <div key={entry.index} className={tileClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="-mx-5 md:-mx-8">
        <MiniFooter />
      </div>
    </main>
  );
}
