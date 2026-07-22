"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children?: React.ReactNode;
  /** mask-up: text slides out of a hidden container.
   *  wipe: horizontal clip reveal (images / blocks).
   *  line: a rule draws itself from the left.
   *  rise: subtle translate+fade for secondary content. */
  type?: "mask-up" | "wipe" | "line" | "rise";
  delay?: number;
  className?: string;
  /** ScrollTrigger start position */
  start?: string;
};

export default function Reveal({
  children,
  type = "mask-up",
  delay = 0,
  className = "",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const inner = el.firstElementChild as HTMLElement | null;
      if (prefersReducedMotion()) return;

      const st = { trigger: el, start, once: true };

      switch (type) {
        case "mask-up":
          if (!inner) return;
          gsap.fromTo(
            inner,
            { yPercent: 112 },
            { yPercent: 0, duration: 0.9, delay, ease: "power4.out", scrollTrigger: st }
          );
          break;
        case "wipe":
          gsap.fromTo(
            el,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1,
              delay,
              ease: "power3.inOut",
              scrollTrigger: st,
            }
          );
          break;
        case "line":
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 1, delay, ease: "power3.inOut", scrollTrigger: st }
          );
          break;
        case "rise":
          gsap.fromTo(
            el,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, delay, ease: "power3.out", scrollTrigger: st }
          );
          break;
      }
    },
    { scope: ref, dependencies: [type, delay, start] }
  );

  return (
    <div
      ref={ref}
      className={`${
        type === "mask-up" ? "-mt-[0.14em] overflow-hidden pt-[0.14em]" : ""
      } ${className}`}
    >
      {type === "mask-up" ? <div>{children}</div> : children}
    </div>
  );
}
