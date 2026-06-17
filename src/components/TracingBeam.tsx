"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Aceternity-inspired tracing beam. Drop it as the first child of a
 * `position: relative` container with left padding — it draws a vertical
 * spine whose accent fill + glowing head follow the scroll through the
 * parent element.
 */
export default function TracingBeam() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const parent = wrapRef.current?.parentElement;
    if (!parent) return;
    const trigger = {
      trigger: parent,
      start: "top 78%",
      end: "bottom 55%",
      scrub: true,
    } as const;

    gsap.fromTo(
      fillRef.current,
      { scaleY: 0 },
      { scaleY: 1, ease: "none", scrollTrigger: trigger }
    );
    gsap.fromTo(
      headRef.current,
      { top: "0%", autoAlpha: 0 },
      { top: "100%", autoAlpha: 1, ease: "none", scrollTrigger: trigger }
    );
  }, {});

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 top-0 w-px"
    >
      <div className="absolute inset-0 bg-line" />
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top scale-y-0 bg-accent"
      />
      <div
        ref={headRef}
        className="absolute -left-[3.5px] top-0 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
        style={{ boxShadow: "0 0 12px 2px rgba(221, 74, 18, 0.7)" }}
      />
    </div>
  );
}
