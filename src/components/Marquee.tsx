"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useLang, type L } from "@/lib/i18n";

/**
 * Infinite marquee whose speed and direction react to scroll velocity.
 */
export default function Marquee({
  items,
  className = "",
  baseSeconds = 22,
}: {
  items: L[];
  className?: string;
  baseSeconds?: number;
}) {
  const { t } = useLang();
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || prefersReducedMotion()) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: baseSeconds,
        ease: "none",
      });

      let factor = 1;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          factor = gsap.utils.clamp(-4, 4, v / 350);
          if (Math.abs(factor) < 1) factor = factor < 0 ? -1 : 1;
        },
      });
      const tick = () => {
        // ease the timeScale back toward cruise speed
        tween.timeScale(gsap.utils.interpolate(tween.timeScale(), factor, 0.08));
        factor = gsap.utils.interpolate(factor, factor < 0 ? -1 : 1, 0.04);
      };
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: wrapRef }
  );

  const row = [...items, ...items];

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden border-y border-line py-4 ${className}`}
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max items-center whitespace-nowrap">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="display px-6 text-[clamp(1.6rem,3.5vw,2.8rem)]">
                  {t(item)}
                </span>
                <span className="text-accent text-[clamp(1rem,2vw,1.6rem)]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
