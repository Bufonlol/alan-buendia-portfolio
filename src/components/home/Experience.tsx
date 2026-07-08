"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { EXPERIENCE } from "@/data/site";
import { VerticalText } from "@/components/modular/VerticalText";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";

const OUTPUTS = [
  ["CLIENTES", "04 ACTIVE"],
  ["SISTEMAS QR", "SHIPPED"],
  ["DASHBOARDS", "LIVE"],
  ["RESERVAS", "24/7"],
];

export default function Experience() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const records = gsap.utils.toArray<HTMLElement>(".experience-piece", section);
      if (prefersReducedMotion()) {
        gsap.set(records, { x: 0, clipPath: "inset(0%)" });
        return;
      }
      gsap.fromTo(
        records,
        { x: (index) => (index % 2 ? 20 : -20), clipPath: "inset(0 100% 0 0)" },
        {
          x: 0,
          clipPath: "inset(0%)",
          duration: 0.76,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="experience" className="home-bento-section">
      <TechnicalGrid className="opacity-20" />
      <div className="experience-grid relative z-10">
        <div className="experience-piece experience-title win-window win-window--ink">
          <WinTitleBar label="EXPERIENCE.SYS" />
          <div className="win-body">
            <h2 className="display text-[clamp(3rem,8vw,7.5rem)] leading-[0.8]">
              {t({ es: "Experiencia", en: "Experience" })}
            </h2>
          </div>
        </div>

        <div className="experience-piece experience-count win-window win-window--ink bg-ink text-paper">
          <WinTitleBar label="RECORDS.DAT" />
          <div className="win-body flex flex-col justify-between">
            <span className="display text-[clamp(4rem,8vw,7rem)]">02</span>
            <Barcode className="text-paper" />
          </div>
        </div>

        <div className="experience-piece experience-vertical flex items-center justify-center border border-ink">
          <VerticalText>OUTPUT / SHIPPED / CLIENT SYSTEMS</VerticalText>
        </div>

        <article className="experience-piece experience-primary win-window win-window--ink">
          <WinTitleBar label="JOB01.EXE" />
          <div className="win-body grid md:grid-cols-[5rem_0.9fr_1.1fr]">
            <div className="flex items-center justify-between border-b border-ink bg-ink p-3 text-paper md:flex-col md:border-b-0 md:border-r">
              <SystemLabel>REC / 01</SystemLabel>
              <Barcode className="text-paper" />
            </div>
            <div className="border-b border-ink p-5 md:border-b-0 md:border-r md:p-6">
              <SystemLabel>{t(EXPERIENCE[0].period)}</SystemLabel>
              <h3 className="display mt-5 text-[clamp(1.9rem,4.2vw,4.2rem)] leading-[0.84]">{t(EXPERIENCE[0].role)}</h3>
              <p className="mt-5 text-xl font-bold">{EXPERIENCE[0].company}</p>
            </div>
            <div className="grid grid-cols-2">
              {OUTPUTS.map(([label, value]) => (
                <div key={label} className="border-b border-r border-ink p-3 even:border-r-0 [&:nth-last-child(-n+2)]:border-b-0">
                  <SystemLabel className="opacity-85">{label}</SystemLabel>
                  <p className="display mt-3 text-2xl">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="experience-piece experience-secondary win-window win-window--ink bg-ink text-paper">
          <WinTitleBar label="JOB02.EXE" />
          <div className="win-body flex flex-1 flex-col justify-between">
            <SystemLabel>{t(EXPERIENCE[1].period)}</SystemLabel>
            <div className="py-8">
              <span className="display text-[clamp(4rem,7vw,6rem)]">1.1S</span>
              <h3 className="display mt-3 text-[clamp(2rem,4vw,4rem)]">{EXPERIENCE[1].company}</h3>
              <p className="mt-5 max-w-[34ch] text-base font-semibold leading-snug">{t(EXPERIENCE[1].highlight)}</p>
            </div>
            <SystemLabel>PERFORMANCE / ARCHITECTURE / THESIS</SystemLabel>
          </div>
        </article>

        <div className="experience-piece experience-asset win-window win-window--ink">
          <WinTitleBar label="COVERAGE.DAT" />
          <div className="win-body relative flex flex-1 flex-col justify-between overflow-hidden">
            <SystemLabel className="self-start border border-ink bg-paper px-2 py-1">WORK / IN PROGRESS</SystemLabel>
            <div className="grid grid-cols-4 gap-4 py-4 sm:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <CrossMark key={i} className={i % 3 === 0 ? "opacity-70" : "opacity-25"} />
              ))}
            </div>
            <div className="flex items-end justify-between">
              <SystemLabel>COVERAGE / VERIFIED</SystemLabel>
              <Barcode />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
