"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { ARCHIVE, type ArchiveEntry } from "@/data/archive";
import MiniFooter from "@/components/MiniFooter";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { VerticalText } from "@/components/modular/VerticalText";

export default function ArchiveClient() {
  const { navigate } = useApp();
  const { t } = useLang();
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const main = mainRef.current;
      if (!main) return;
      const records = gsap.utils.toArray<HTMLElement>(".archive-index-record", main);

      if (prefersReducedMotion()) {
        gsap.set(records, { x: 0, y: 0, clipPath: "inset(0%)" });
        return;
      }

      gsap.fromTo(
        records,
        {
          x: (index) => (index % 2 ? 22 : -22),
          y: (index) => (index % 3 ? 12 : 28),
          clipPath: (index) => (index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)"),
        },
        {
          x: 0,
          y: 0,
          clipPath: "inset(0%)",
          duration: 0.78,
          stagger: 0.07,
          ease: "power3.out",
        }
      );
    },
    { scope: mainRef }
  );

  const openEntry = (entry: ArchiveEntry) => {
    if (entry.href) navigate(entry.href);
  };

  const recordShell = (entry: ArchiveEntry, index: number, children: ReactNode) => {
    const className = `archive-index-record archive-index-record-${index + 1} group relative overflow-hidden border border-ink ${
      index === 2 ? "bg-ink text-paper" : "bg-paper text-ink"
    }`;

    if (entry.external) {
      return (
        <a key={entry.index} href={entry.external} target="_blank" rel="noreferrer" data-cursor="view" className={className}>
          {children}
        </a>
      );
    }

    if (entry.href) {
      return (
        <a
          key={entry.index}
          href={entry.href}
          data-cursor="view"
          onClick={(event) => {
            event.preventDefault();
            openEntry(entry);
          }}
          className={className}
        >
          {children}
        </a>
      );
    }

    return <div key={entry.index} className={className}>{children}</div>;
  };

  return (
    <main ref={mainRef} className="relative pt-20 md:pt-24">
      <TechnicalGrid className="opacity-20" />

      <header className="archive-page-header relative z-10 p-3 md:p-4">
        <div className="archive-page-title border border-ink p-4 md:p-6">
          <div className="flex items-center justify-between">
            <SystemLabel>MASTER INDEX / ALANBUENDIA.DEV</SystemLabel>
            <CrossMark />
          </div>
          <h1 className="display mt-10 text-[clamp(4rem,10vw,9rem)] leading-[0.78]">
            {t({ es: "Archivo", en: "Archive" })}
          </h1>
          <p className="mt-7 max-w-[38ch] text-base font-semibold leading-snug">
            {t({
              es: "Cada sistema conserva su contexto, stack, estado y recibo de producción.",
              en: "Every system keeps its context, stack, status, and production receipt.",
            })}
          </p>
        </div>

        <div className="archive-page-count flex flex-col justify-between border border-ink bg-ink p-4 text-paper">
          <SystemLabel>FILES / TOTAL</SystemLabel>
          <span className="display text-[clamp(5rem,10vw,9rem)]">{String(ARCHIVE.length).padStart(2, "0")}</span>
          <Barcode className="text-paper" />
        </div>

        <div className="archive-page-data grid grid-cols-2 border border-ink">
          {[
            ["RANGE", "2024–2026"],
            ["FILTER", "ALL"],
            ["STATE", "MIXED"],
            ["BASE", "ORIZABA, MX"],
          ].map(([key, value]) => (
            <div key={key} className="border-b border-r border-ink p-3 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
              <SystemLabel className="opacity-85">{key}</SystemLabel>
              <p className="u-label mt-2">{value}</p>
            </div>
          ))}
        </div>

        <div className="archive-page-vertical flex items-center justify-center border border-ink">
          <VerticalText>SHIPPED / IN PROCESS / RETIRED / INDEX</VerticalText>
        </div>
      </header>

      <section className="archive-index-grid relative z-10 px-3 pb-4 md:px-4">
        {ARCHIVE.map((entry, index) => {
          const image = entry.image ? (
            <div className={`project-media relative overflow-hidden bg-ink ${index === 0 ? "min-h-56" : "min-h-40"}`}>
              <Image
                src={entry.image}
                alt={t(entry.title)}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                quality={78}
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="technical-grid pointer-events-none absolute inset-0 opacity-20" />
            </div>
          ) : null;

          if (index === 0) {
            return recordShell(entry, index, (
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-ink px-4 py-3">
                  <SystemLabel>PROJECT_{entry.index} / FEATURED</SystemLabel>
                  <SystemLabel>{entry.year}</SystemLabel>
                </div>
                <div className="grid min-h-0 flex-1 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="min-w-0 border-b border-ink md:border-b-0 md:border-r">{image}</div>
                  <div className="flex min-w-0 flex-col justify-between p-5">
                    <div>
                      <SystemLabel>{t(entry.type)}</SystemLabel>
                      <h2 className="display mt-5 text-[clamp(2.5rem,3.6vw,3.6rem)] leading-[0.82]">{t(entry.title)}</h2>
                    </div>
                    <div className="mt-8 border-t border-ink pt-4">
                      <SystemLabel>{entry.stack}</SystemLabel>
                      <span className="display mt-4 block text-3xl">OPEN ↗</span>
                    </div>
                  </div>
                </div>
              </div>
            ));
          }

          if (index === 2) {
            return recordShell(entry, index, (
              <div className="flex h-full min-h-0 flex-col">
                <div className="flex items-center justify-between border-b border-paper/40 px-4 py-3">
                  <SystemLabel>VISUAL RECORD / {entry.index}</SystemLabel>
                  <CrossMark />
                </div>
                <div className="project-media relative min-h-44 flex-1 overflow-hidden bg-paper">
                  <Image
                    src={entry.image!}
                    alt={t(entry.title)}
                    fill
                    sizes="(max-width: 767px) 100vw, 42vw"
                    quality={78}
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="technical-grid pointer-events-none absolute inset-0 opacity-15" />
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-end gap-4 border-t border-paper/40 p-4">
                  <span className="display text-5xl">{entry.index}</span>
                  <div>
                    <h2 className="display text-[clamp(1.65rem,4vw,4rem)] leading-[0.84]">{t(entry.title)}</h2>
                    <SystemLabel className="mt-2 block">{entry.stack}</SystemLabel>
                  </div>
                  <span className="text-2xl">↗</span>
                </div>
              </div>
            ));
          }

          if (index === 5) {
            return recordShell(entry, index, (
              <div className="flex h-full min-h-0 flex-col">
                <div className="flex items-center justify-between border-b border-ink px-4 py-3">
                  <SystemLabel>RETIRED / FRAME {entry.index}</SystemLabel>
                  <SystemLabel>{entry.year}</SystemLabel>
                </div>
                <div className="project-media relative flex min-h-44 flex-1 items-center justify-center overflow-hidden border-b border-ink bg-ink p-4 text-paper">
                  <span className="display text-[clamp(6rem,13vw,12rem)] leading-none">V1</span>
                  <SystemLabel className="absolute left-4 top-4">ARCHIVE / RETIRED</SystemLabel>
                  <Barcode className="absolute bottom-4 right-4 text-paper" />
                </div>
                <div className="p-4">
                  <h2 className="display text-[clamp(2rem,4vw,4rem)]">{t(entry.title)}</h2>
                  {entry.tag && <p className="u-label mt-3 max-w-[28ch] leading-relaxed">{t(entry.tag)}</p>}
                </div>
              </div>
            ));
          }

          return recordShell(entry, index, (
            <div className="flex h-full min-h-0 flex-col">
              <div className="flex items-center justify-between border-b border-current px-4 py-3">
                <SystemLabel>REC / {entry.index}</SystemLabel>
                <SystemLabel>{entry.year}</SystemLabel>
              </div>
              {image}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <SystemLabel>{t(entry.type)}</SystemLabel>
                  <h2 className="display mt-3 text-[clamp(2rem,4vw,4rem)] leading-[0.86]">{t(entry.title)}</h2>
                </div>
                <div className="mt-6 flex items-end justify-between border-t border-current pt-3">
                  <SystemLabel>{entry.stack}</SystemLabel>
                  <span className="text-2xl">↗</span>
                </div>
              </div>
            </div>
          ));
        })}
      </section>

      <MiniFooter />
    </main>
  );
}
