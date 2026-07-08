"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Generic scroll-reveal: children rise + fade in when entering the viewport.
 */
export default function Reveal({
  children,
  y = 40,
  delay = 0,
  className = "",
  start = "top 85%",
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (prefersReducedMotion()) {
        gsap.set(ref.current, { y: 0, autoAlpha: 1 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { y, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
