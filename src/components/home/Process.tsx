"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { PROCESS } from "@/data/site";
import { CrossMark, SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".process-record", ref.current),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="process" className="home-bento-section bg-ink text-paper">
      <TechnicalGrid className="opacity-20" />
      <div className="relative z-10 grid gap-8 border border-paper/35 p-5 md:grid-cols-2 md:items-end md:p-7">
        <div>
          <SystemLabel>WORKING METHOD</SystemLabel>
          <h2 className="display mt-5 text-[clamp(3.2rem,7vw,6rem)]">
            {t({ es: "Protocolo", en: "Working" })}
            <br />
            {t({ es: "de trabajo", en: "protocol" })}
          </h2>
        </div>
        <p className="max-w-[38ch] text-base font-semibold leading-snug md:justify-self-end">
          {t({
            es: "Tres movimientos claros: entender el sistema, construirlo con feedback real y acompañarlo en producción.",
            en: "Three clear moves: understand the system, build with real feedback and support it in production.",
          })}
        </p>
      </div>

      <div
        ref={ref}
        className="relative z-10 mt-3 overflow-hidden border border-paper/35 md:mt-4"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-[240px] w-[240px] opacity-[0.35] mix-blend-multiply md:h-[300px] md:w-[300px]"
          style={{
            maskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 30%, transparent 75%)",
          }}
        >
          <Image src="/assets/process-gears.png" alt="" fill sizes="300px" className="object-contain" />
        </div>

        {PROCESS.map((step, index) => {
          const featured = index === 1;
          return (
            <div
              key={step.step}
              className={`process-record group relative grid grid-cols-[3rem_1fr] gap-4 border-b border-paper/35 p-5 last:border-b-0 md:grid-cols-[4rem_14rem_1fr] md:items-center md:gap-8 md:p-6 ${
                featured ? "bg-paper text-ink" : ""
              }`}
            >
              <span className="display text-3xl leading-none opacity-50 md:text-4xl">
                {step.step}
              </span>
              <div className="flex items-center gap-3">
                <CrossMark className={featured ? "text-ink/50" : "text-paper/50"} />
                <h3 className="display text-[clamp(1.6rem,3vw,2.4rem)] leading-none">
                  {t(step.name)}
                </h3>
              </div>
              <p
                className={`col-span-2 mt-2 max-w-[46ch] text-sm font-medium leading-relaxed md:col-span-1 md:mt-0 ${
                  featured ? "text-ink/75" : "text-paper/75"
                }`}
              >
                {t(step.desc)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
