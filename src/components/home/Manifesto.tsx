"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { Barcode, CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";
import { ChaosFrame } from "@/components/modular/ChaosFrame";
import { VerticalText } from "@/components/modular/VerticalText";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const pieces = gsap.utils.toArray<HTMLElement>(".manifesto-piece", section);

      if (prefersReducedMotion()) {
        gsap.set(pieces, { autoAlpha: 1, x: 0, clipPath: "inset(0%)" });
        return;
      }

      gsap.fromTo(
        pieces,
        {
          autoAlpha: 0,
          x: (index) => (index % 2 ? 24 : -24),
          clipPath: (index) => (index % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)"),
        },
        {
          autoAlpha: 1,
          x: 0,
          clipPath: "inset(0%)",
          duration: 0.72,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="manifesto-poster relative overflow-hidden border-b border-paper bg-ink p-3 text-paper md:p-4">
      <TechnicalGrid className="opacity-20" />

      <div className="relative z-10 grid grid-cols-6 md:grid-cols-12">
        <div className="manifesto-piece col-span-6 flex items-center justify-between border border-paper p-3 md:col-span-9">
          <SystemLabel>{t({ es: "SISTEMA DE VISIÓN / 01", en: "VISION SYSTEM / 01" })}</SystemLabel>
          <SystemLabel>ALANBUENDIA.DEV / 2026</SystemLabel>
        </div>

        <div className="manifesto-piece col-span-4 border-x border-b border-paper p-4 md:col-span-3 md:border-l-0 md:border-t">
          <p className="display text-[clamp(2rem,3.5vw,3.6rem)] leading-[0.84]">CHAOS IS A SYSTEM</p>
        </div>

        <div className="manifesto-piece relative col-span-2 row-span-2 flex min-h-44 items-center justify-center overflow-hidden border-b border-r border-paper p-4 md:col-span-3 md:min-h-0 md:border-l">
          <div className="grid h-full w-full grid-rows-3 border border-paper/50">
            {["D", "C", "M"].map((letter, index) => (
              <div
                key={letter}
                className="flex items-center justify-between border-b border-paper/50 px-3 last:border-b-0"
              >
                <span className="display text-[clamp(2.5rem,5vw,5rem)] leading-none">{letter}</span>
                <SystemLabel className="opacity-85">0{index + 1}</SystemLabel>
              </div>
            ))}
          </div>
        </div>

        <div className="manifesto-piece relative col-span-6 overflow-hidden border-b border-x border-paper px-3 py-7 md:col-span-8 md:row-span-3 md:border-r-0 md:px-6 md:py-8">
          <CrossMark className="absolute right-5 top-5 opacity-50" />
          <span aria-hidden="true" className="display absolute -right-[0.04em] -top-[0.15em] text-[clamp(9rem,26vw,24rem)] leading-none text-paper opacity-[0.055]">D</span>
          <h2 className="relative z-10" aria-label="Design Code Motion">
            {["DESIGN", "CODE", "MOTION"].map((word, index) => (
              <span
                key={word}
                className={`display block text-[clamp(3.8rem,10vw,9rem)] leading-[0.76] ${index === 1 ? "pl-[8%]" : index === 2 ? "pl-[2%]" : ""}`}
              >
                {word}
              </span>
            ))}
          </h2>
          <div className="mt-8 flex items-center gap-4">
            <Barcode className="text-paper" />
            <SystemLabel className="opacity-85">FORM / FUNCTION / FEELING</SystemLabel>
          </div>
        </div>

        <div className="manifesto-piece col-span-3 hidden items-center justify-center border-r border-paper md:flex">
          <VerticalText className="text-paper">CHAOS IS A SYSTEM / CHAOS IS A SYSTEM</VerticalText>
        </div>

        <ChaosFrame className="manifesto-piece col-span-3 border-paper p-4 md:col-span-2" tone="paper">
          <SystemLabel>RULE / 001</SystemLabel>
          <p className="display mt-5 text-3xl leading-[0.88]">{t({ es: "CLARIDAD PRIMERO", en: "CLARITY FIRST" })}</p>
        </ChaosFrame>

        <div className="manifesto-piece col-span-3 flex min-h-36 flex-col justify-between border-b border-r border-paper p-4 md:col-span-2">
          <SystemLabel>NO / 02</SystemLabel>
          <SystemLabel className="max-w-[16ch] leading-relaxed opacity-85">
            {t({ es: "MOVIMIENTO SIN PROPÓSITO", en: "MOTION WITHOUT PURPOSE" })}
          </SystemLabel>
        </div>

        <div className="manifesto-piece col-span-6 grid grid-cols-3 border-x border-b border-paper md:col-span-12">
          {[
            t({ es: "SIN PLANTILLAS.", en: "NO TEMPLATES." }),
            t({ es: "SIN INTERFACES MUERTAS.", en: "NO DEAD INTERFACES." }),
            t({ es: "SIN RELLENO.", en: "NO FILLER." }),
          ].map((line, index) => (
            <div key={line} className="min-h-24 border-r border-paper p-3 last:border-r-0 md:min-h-28">
              <SystemLabel className="opacity-85">0{index + 1}</SystemLabel>
              <p className="u-label mt-5 leading-relaxed">{line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
