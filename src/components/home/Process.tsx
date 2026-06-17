"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { PROCESS } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";
import TracingBeam from "@/components/TracingBeam";

export default function Process() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".process-step", ref.current),
        { x: -30, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-8 md:py-36">
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_85%_65%_at_50%_50%,black_30%,transparent_100%)]"
      />
      <div className="relative z-10">
        <SectionHeader
          index="03"
          label={t({ es: "Cómo trabajo", en: "How I work" })}
          title={t({ es: "El proceso", en: "The process" })}
          sweep
        />
      </div>
      <div ref={ref} className="relative z-10 mt-16 pl-8 md:pl-12">
        <TracingBeam />
        <div className="divide-y divide-line">
          {PROCESS.map((p) => (
            <div
              key={p.step}
              className="process-step grid grid-cols-[3rem_1fr] gap-x-8 py-10 md:grid-cols-[4rem_18rem_1fr] md:gap-x-12"
            >
              <span className="u-label pt-1 text-accent">{p.step}</span>
              <h3 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-none">
                {t(p.name)}
              </h3>
              <p className="col-start-2 mt-4 max-w-[38rem] leading-relaxed text-ink-soft md:col-start-3 md:mt-0">
                {t(p.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
