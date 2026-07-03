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
    <section className="home-bento-section bg-ink text-paper">
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

      <div ref={ref} className="relative z-10 mt-3 grid gap-3 md:mt-4 md:gap-4 lg:grid-cols-3 lg:[grid-auto-flow:dense]">
        {PROCESS.map((step, index) => {
          const featured = index === 1;
          const wide = index === 2;
          return (
            <article
              key={step.step}
              className={`process-record bento-reactive relative overflow-hidden border p-5 md:p-7 ${
                featured ? "border-paper bg-paper text-ink lg:col-span-2" : "border-paper/35"
              } ${wide ? "lg:col-span-3" : ""}`}
            >
              {featured && (
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-[220px] w-[220px] opacity-[0.45] mix-blend-multiply"
                  style={{
                    maskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 30%, transparent 75%)",
                    WebkitMaskImage: "radial-gradient(circle farthest-side at 50% 50%, #000 30%, transparent 75%)",
                  }}
                >
                  <Image src="/assets/process-gears.png" alt="" fill sizes="220px" className="object-contain" />
                </div>
              )}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`u-label ${featured ? "opacity-70" : ""}`}>STEP / {step.step}</span>
                <CrossMark className={featured ? "text-ink/60" : "text-paper/60"} />
              </div>
              <h3
                className={`display relative z-10 leading-none ${
                  featured
                    ? "mt-8 text-[clamp(2.8rem,6vw,5.2rem)]"
                    : "mt-10 text-[clamp(2.4rem,4vw,4rem)]"
                }`}
              >
                {t(step.name)}
              </h3>
              <p
                className={`relative z-10 mt-6 max-w-[38ch] text-sm font-medium leading-relaxed ${
                  featured ? "text-ink/75" : "text-paper/80"
                }`}
              >
                {t(step.desc)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
