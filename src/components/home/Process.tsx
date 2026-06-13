"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { PROCESS } from "@/data/site";
import SectionHeader from "@/components/SectionHeader";

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
    <section className="px-5 py-28 md:px-8 md:py-36">
      <SectionHeader
        index="03"
        label={t({ es: "Cómo trabajo", en: "How I work" })}
        title={t({ es: "El proceso", en: "The process" })}
      />
      <div ref={ref} className="mt-16 divide-y divide-line">
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
    </section>
  );
}
