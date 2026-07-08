"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { PROCESS } from "@/data/site";
import { VerticalText } from "@/components/modular/VerticalText";
import { CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { WinTitleBar } from "@/components/system/WinTitleBar";

export default function Process() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const steps = [
    PROCESS[0],
    {
      step: "02",
      name: { es: "Mapear", en: "Map" },
      desc: {
        es: "Convierto reglas, excepciones y recorridos reales en una arquitectura que el equipo puede discutir.",
        en: "I turn real rules, exceptions, and journeys into an architecture the team can discuss.",
      },
    },
    { ...PROCESS[1], step: "03" },
    { ...PROCESS[2], step: "04" },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const nodes = gsap.utils.toArray<HTMLElement>(".process-node", section);

      if (prefersReducedMotion()) {
        gsap.set(nodes, { scale: 1, clipPath: "inset(0%)" });
        return;
      }

      gsap.fromTo(
        nodes,
        { scale: 0.96, clipPath: "inset(50% 0 50% 0)" },
        {
          scale: 1,
          clipPath: "inset(0%)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 76%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="process" className="home-bento-section bg-ink text-paper">
      <TechnicalGrid className="opacity-20" />

      <header className="process-heading relative z-10">
        <div className="process-heading-title win-window win-window--paper">
          <WinTitleBar label="METHOD.SYS" />
          <div className="win-body">
            <div className="flex items-center justify-between">
              <SystemLabel>WORKING PROTOCOL / CLOSED LOOP</SystemLabel>
              <CrossMark />
            </div>
            <h2 className="display mt-8 text-[clamp(3.8rem,8vw,7.5rem)] leading-[0.8]">
              {t({ es: "Método", en: "Method" })}
            </h2>
            <p className="mt-6 max-w-[38ch] text-base font-semibold leading-snug">
              {t({
                es: "El sistema avanza por decisiones verificables, no por entregas aisladas.",
                en: "The system advances through verifiable decisions, not isolated handoffs.",
              })}
            </p>
          </div>
        </div>
        <div className="process-heading-number win-window win-window--paper bg-paper text-ink">
          <WinTitleBar label="LOOP.DAT" />
          <div className="win-body flex flex-col justify-between">
            <span className="display text-[clamp(4.5rem,9vw,8rem)]">04</span>
            <SystemLabel>INPUT → OUTPUT</SystemLabel>
          </div>
        </div>
        <div className="process-heading-vertical flex items-center justify-center border border-paper">
          <VerticalText>LISTEN / MAP / BUILD / SHIP</VerticalText>
        </div>
      </header>

      <div className="process-diagram relative z-10 mt-2">
        <span aria-hidden="true" className="process-connector process-connector-top">→</span>
        <span aria-hidden="true" className="process-connector process-connector-left">↓</span>
        <span aria-hidden="true" className="process-connector process-connector-right">↓</span>
        <span aria-hidden="true" className="process-connector process-connector-bottom">→</span>

        {steps.map((step, index) => (
          <article
            key={`${step.step}-${step.name.en}`}
            className={`process-node process-step-${index + 1} win-window win-window--paper ${
              index === 1 ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            <WinTitleBar label={`${t(step.name).toUpperCase()}.EXE`} />
            <div className="win-body flex flex-1 flex-col justify-between">
              <div className="flex items-center justify-between">
                <SystemLabel>STEP / {step.step}</SystemLabel>
                <CrossMark className="opacity-50" />
              </div>
              <div className="mt-8">
                <span className="display text-[clamp(3.8rem,7vw,6rem)] leading-none">{step.step}</span>
                <h3 className="display mt-2 text-[clamp(2rem,4vw,4rem)] leading-[0.86]">{t(step.name)}</h3>
                <p className="mt-5 max-w-[42ch] text-sm font-semibold leading-relaxed opacity-85">{t(step.desc)}</p>
              </div>
            </div>
          </article>
        ))}

        <div className="process-node process-loop win-window win-window--paper bg-paper text-ink">
          <WinTitleBar label="LOOP.EXE" />
          <div className="win-body relative flex-1 overflow-hidden">
            <div className="grid h-full grid-cols-2 grid-rows-2 border border-ink">
              {[
                ["01", "LISTEN"],
                ["02", "MAP"],
                ["04", "SHIP"],
                ["03", "BUILD"],
              ].map(([number, label], index) => (
                <div
                  key={number}
                  className={`flex flex-col justify-between p-3 ${
                    index % 2 === 0 ? "border-r border-ink" : ""
                  } ${index < 2 ? "border-b border-ink" : ""}`}
                >
                  <SystemLabel>{number}</SystemLabel>
                  <span className="display text-[clamp(1.1rem,2vw,2rem)]">{label}</span>
                </div>
              ))}
            </div>
            <span className="display absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-ink bg-paper text-3xl">
              ↻
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
