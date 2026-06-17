"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { UI_LIBRARIES } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";

export default function Toolkit() {
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".lib-card", gridRef.current),
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <section
      id="toolkit"
      className="relative overflow-hidden px-5 py-28 md:px-8 md:py-40"
    >
      {/* Aceternity-style grid background */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="aurora" aria-hidden="true" />

      <div className="relative z-10">
        <SectionHeader
          index="03"
          label={t({ es: "Toolkit", en: "Toolkit" })}
          title={t({ es: "Librerías de UI", en: "UI libraries" })}
          sweep
        />
        <p className="u-label mt-4 max-w-md text-muted">
          {t({
            es: "El motion y los componentes de este sitio se inspiran en estas librerías.",
            en: "The motion and components on this site are powered by these libraries.",
          })}
        </p>

        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {UI_LIBRARIES.map((lib, i) => (
            <div
              key={lib.name}
              className="lib-card spotlight-card border-beam flex flex-col gap-3 rounded-2xl border border-line bg-paper/40 p-6 backdrop-blur-sm"
              style={{ ["--beam-delay" as string]: `${i * -0.8}s` }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", ((e.clientX - r.left) / r.width) * 100 + "%");
                e.currentTarget.style.setProperty("--mouse-y", ((e.clientY - r.top) / r.height) * 100 + "%");
              }}
            >
              <div className="flex items-center justify-between">
                <span className="display text-2xl leading-none md:text-[1.9rem]">
                  {lib.name}
                </span>
                <span className="text-accent">◆</span>
              </div>
              <span className="u-label w-fit rounded-full border border-line px-2.5 py-1 text-muted">
                {t(lib.tag)}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{t(lib.note)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
