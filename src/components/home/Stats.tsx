"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { STATS } from "@/data/site";
import { TechnicalGrid } from "@/components/system/TechnicalLayer";

export default function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".metric-cell", ref.current),
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 84%", once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section aria-label={t({ es: "Métricas", en: "Metrics" })} className="relative overflow-hidden border-b border-ink">
      <TechnicalGrid className="opacity-20" />
      <div ref={ref} className="relative z-10 grid grid-cols-2 md:grid-cols-5">
        {STATS.map((stat, index) => (
          <div
            key={stat.label.en}
            className={`metric-cell bento-reactive min-h-36 border-b border-ink p-4 odd:border-r md:min-h-44 md:border-b-0 md:border-r md:p-5 md:last:border-r-0 ${
              index === 0 ? "md:col-span-2 bg-ink text-paper" : ""
            }`}
          >
            <span className="u-label opacity-70">METRIC / {String(index + 1).padStart(2, "0")}</span>
            <p
              className={`display mt-5 ${
                index === 0 ? "text-[clamp(4rem,7vw,6rem)]" : "text-[clamp(3rem,5vw,5.2rem)]"
              }`}
            >
              {stat.value}
            </p>
            <p className="u-label mt-3 max-w-[18ch] leading-relaxed opacity-80">{t(stat.label)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
