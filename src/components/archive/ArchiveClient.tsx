"use client";

import { useRef } from "react";
import { gsap, useGSAP, isFinePointer } from "@/lib/gsap";
import { useApp } from "@/components/AppShell";
import { useLang } from "@/lib/i18n";
import { ARCHIVE } from "@/data/archive";
import PageHeader from "@/components/PageHeader";
import MiniFooter from "@/components/MiniFooter";

export default function ArchiveClient() {
  const { navigate } = useApp();
  const { t } = useLang();
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  /* rows entrance */
  useGSAP(
    () => {
      if (!listRef.current) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".archive-row", listRef.current),
        { yPercent: 60, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: listRef.current, start: "top 85%", once: true },
        }
      );
    },
    { scope: listRef }
  );

  /* floating image preview follows the cursor (fine pointers only) */
  useGSAP(() => {
    const preview = previewRef.current;
    if (!preview || !isFinePointer()) return;

    gsap.set(preview, { xPercent: -50, yPercent: -120, autoAlpha: 0, rotate: 0 });
    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });
    const rTo = gsap.quickTo(preview, "rotate", { duration: 0.45, ease: "power2.out" });

    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rTo(gsap.utils.clamp(-7, 7, (e.clientX - lastX) * 0.6));
      lastX = e.clientX;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  });

  const showPreview = (image?: string) => {
    if (!isFinePointer() || !previewRef.current) return;
    if (image && previewImgRef.current) {
      previewImgRef.current.src = image;
      gsap.to(previewRef.current, { autoAlpha: 1, duration: 0.3 });
    } else {
      gsap.to(previewRef.current, { autoAlpha: 0, duration: 0.25 });
    }
  };
  const hidePreview = () => {
    if (previewRef.current)
      gsap.to(previewRef.current, { autoAlpha: 0, duration: 0.25 });
  };

  return (
    <main className="px-5 pt-28 md:px-8">
      <PageHeader
        kicker={{
          es: `Índice 01 — ${String(ARCHIVE.length).padStart(2, "0")}`,
          en: `Index 01 — ${String(ARCHIVE.length).padStart(2, "0")}`,
        }}
        title={{ es: "Archivo", en: "Archive" }}
        blurb={{
          es: "todo — enviado, en proceso o retirado. los case studies cuentan las historias; esta tabla guarda los recibos.",
          en: "everything — shipped, in progress or retired. the case studies tell the stories; this table keeps the receipts.",
        }}
      />

      <ul
        ref={listRef}
        className="mt-16 border-b border-line pb-0"
        onMouseLeave={hidePreview}
      >
        {ARCHIVE.map((entry) => {
          const rowInner = (
            <>
              <span className="u-label w-8 shrink-0 text-muted">{entry.index}</span>
              <span className="stack-name display text-[clamp(1.5rem,4vw,2.8rem)] leading-none">
                {t(entry.title)}
              </span>
              <span className="u-label hidden shrink-0 text-muted sm:block">
                {entry.year}
              </span>
              <span className="u-label hidden w-36 shrink-0 text-muted md:block">
                {t(entry.type)}
              </span>
              <span className="u-label hidden w-44 shrink-0 text-muted lg:block">
                {entry.stack}
              </span>
              <span className="u-label ml-auto shrink-0">
                {entry.tag ? (
                  <span className="text-muted">{t(entry.tag)}</span>
                ) : entry.external ? (
                  "↗"
                ) : (
                  "→"
                )}
              </span>
            </>
          );
          const rowClass =
            "flex w-full items-baseline gap-5 px-2 py-5 text-left md:gap-8 md:px-4";

          return (
            <li
              key={entry.index}
              className="archive-row stack-row border-t border-line"
              onMouseEnter={() => showPreview(entry.image)}
            >
              {entry.href ? (
                <a
                  href={entry.href}
                  data-cursor="view"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(entry.href!);
                  }}
                  className={rowClass}
                >
                  {rowInner}
                </a>
              ) : entry.external ? (
                <a
                  href={entry.external}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="view"
                  className={rowClass}
                >
                  {rowInner}
                </a>
              ) : (
                <div className={rowClass}>{rowInner}</div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="u-label mt-6 pb-20 text-muted">{t({
        es: "◆ las filas con preview muestran su interfaz real — pasa el cursor.",
        en: "◆ rows with a preview show their real interface — hover around.",
      })}</p>

      {/* floating preview */}
      <div
        ref={previewRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden w-[19rem] overflow-hidden border border-line bg-paper-soft shadow-xl md:block"
        aria-hidden="true"
        style={{ opacity: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={previewImgRef}
          src="/projects/restaurant-surveys/dashboard.png"
          alt=""
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>

      <div className="-mx-5 md:-mx-8">
        <MiniFooter />
      </div>
    </main>
  );
}
