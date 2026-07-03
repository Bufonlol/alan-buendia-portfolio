"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

const WORDS = ["DESIGN", "CODE", "MOTION"];

export default function Manifesto() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".manifesto-word", ref.current),
        { xPercent: -6, autoAlpha: 0 },
        {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section className="home-bento-section bg-ink text-paper">
      <TechnicalGrid className="opacity-20" />
      <CrossMark className="pointer-events-none absolute left-[8%] top-6 hidden text-paper/40 md:block" />
      <CrossMark className="pointer-events-none absolute bottom-6 right-[6%] hidden text-paper/40 md:block" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px bg-paper/15 md:block"
      />

      <div ref={ref} className="relative z-10 border border-paper/30 p-5 md:p-8">
        <div className="flex items-center justify-between border-b border-paper/30 pb-4">
          <SystemLabel className="opacity-70">{t({ es: "SISTEMA DE VISIÓN", en: "VISION SYSTEM" })}</SystemLabel>
          <SystemLabel className="opacity-50">SYS-01</SystemLabel>
        </div>

        <h2 aria-label={WORDS.join(" ")} className="mt-6 md:mt-8">
          {WORDS.map((word) => (
            <span key={word} className="block overflow-hidden">
              <span
                className="manifesto-word display block text-[clamp(3.2rem,13vw,10.5rem)] leading-[0.86]"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-paper/30 pt-5 md:mt-10">
          <SystemLabel className="opacity-75">
            {t({ es: "SIN PLANTILLAS.", en: "NO TEMPLATES." })}
          </SystemLabel>
          <SystemLabel className="opacity-75">
            {t({ es: "SIN INTERFACES MUERTAS.", en: "NO DEAD INTERFACES." })}
          </SystemLabel>
          <SystemLabel className="opacity-75">
            {t({ es: "SIN MOVIMIENTO VACÍO.", en: "NO EMPTY MOTION." })}
          </SystemLabel>
        </div>
      </div>
    </section>
  );
}
