"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STATS } from "@/data/site";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { VerticalText } from "@/components/modular/VerticalText";

const STAT_CLASS = ["metric-years", "metric-projects", "metric-clients", "metric-language"];

export default function Stats() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const cells = gsap.utils.toArray<HTMLElement>(".metric-cell", section);
      if (prefersReducedMotion()) {
        gsap.set(cells, { x: 0, clipPath: "inset(0%)" });
        return;
      }
      gsap.fromTo(
        cells,
        {
          x: (index) => (index % 2 ? 16 : -16),
          clipPath: (index) => (index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)"),
        },
        {
          x: 0,
          clipPath: "inset(0%)",
          duration: 0.68,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 88%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label={t({ es: "Métricas", en: "Metrics" })}
      className="metric-bridge relative overflow-hidden border-b border-ink p-3 md:p-4"
    >
      <TechnicalGrid className="opacity-20" />
      <div className="metric-mosaic relative z-10">
        {STATS.map((stat, index) => (
          <div
            key={stat.label.en}
            className={`metric-cell flex flex-col justify-between border border-ink p-4 ${STAT_CLASS[index]} ${
              index === 0 ? "bg-ink text-paper" : "bg-paper text-ink"
            }`}
          >
            <div className="flex items-center justify-between">
              <SystemLabel>OUTPUT / 0{index + 1}</SystemLabel>
              <CrossMark className="opacity-50" />
            </div>
            <p className="display text-[clamp(3.8rem,7vw,6.5rem)] leading-none">{stat.value}</p>
            <div>
              <SystemLabel className="block leading-relaxed">{t(stat.label)}</SystemLabel>
              {index === 0 && <Barcode className="mt-4 text-paper" />}
            </div>
          </div>
        ))}
        <div className="metric-vertical flex items-center justify-center border border-ink bg-paper">
          <VerticalText>MEASURED / SHIPPED / ACTIVE / VERIFIED</VerticalText>
        </div>
      </div>
    </section>
  );
}
