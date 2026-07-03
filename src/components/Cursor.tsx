"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/lib/gsap";
import { useLang, type L } from "@/lib/i18n";

type Mode = "default" | "view" | "drag" | "play";

const LABELS: Record<Exclude<Mode, "default">, L> = {
  view: { es: "VER ↗", en: "VIEW ↗" },
  drag: { es: "← ARRASTRA →", en: "← DRAG →" },
  play: { es: "JUGAR ▶", en: "PLAY ▶" },
};

const TRAIL_COUNT = 2;
const trailOpacity = (i: number) => 0.32 - i * 0.11;
const trailScale = (i: number) => 1 - i * 0.12;

export default function Cursor() {
  const { t } = useLang();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const trailEls = trailRefs.current.filter((el): el is HTMLDivElement => !!el);
    gsap.set(trailEls, {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: (i: number) => trailScale(i),
    });
    const trailTos = trailEls.map((el, i) => ({
      x: gsap.quickTo(el, "x", { duration: 0.12 + i * 0.045, ease: "power2.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.12 + i * 0.045, ease: "power2.out" }),
    }));

    let seen = false;
    const onMove = (e: PointerEvent) => {
      const reactive = (e.target as HTMLElement | null)?.closest<HTMLElement>(".bento-reactive");
      if (reactive) {
        const bounds = reactive.getBoundingClientRect();
        reactive.style.setProperty("--spot-x", `${e.clientX - bounds.left}px`);
        reactive.style.setProperty("--spot-y", `${e.clientY - bounds.top}px`);
      }
      if (!seen) {
        seen = true;
        gsap.set([dot, ring, ...trailEls], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
        gsap.to(trailEls, { opacity: (i: number) => trailOpacity(i), duration: 0.25 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      trailTos.forEach(({ x, y }) => {
        x(e.clientX);
        y(e.clientY);
      });
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        const m = tagged.dataset.cursor as Mode;
        setMode(m in LABELS ? m : "default");
        return;
      }
      if (t.closest("a, button, [role='button'], input, textarea, label")) {
        gsap.to(ring, { scale: 1.6, duration: 0.3 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor]")) setMode("default");
      if (t.closest("a, button, [role='button'], input, textarea, label")) {
        gsap.to(ring, { scale: 1, duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      }
    };
    const onDown = () => gsap.to([dot, ring], { scale: 0.8, duration: 0.15 });
    const onUp = () => gsap.to([dot, ring], { scale: 1, duration: 0.25 });
    const onLeave = () => {
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 });
      gsap.to(trailEls, { opacity: 0, duration: 0.2 });
    };
    const onEnter = () => {
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 });
      gsap.to(trailEls, { opacity: (i: number) => trailOpacity(i), duration: 0.2 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled]);

  // Ring morphs into a labeled pill for tagged elements
  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const trailEls = trailRefs.current.filter((el): el is HTMLDivElement => !!el);
    if (!ring || !dot) return;
    if (mode === "default") {
      gsap.to(ring, { width: 36, height: 36, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
      gsap.to(trailEls, { opacity: (i: number) => trailOpacity(i), duration: 0.25 });
    } else {
      gsap.to(ring, { width: 92, height: 92, duration: 0.35, ease: "power4.out" });
      gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      gsap.to(trailEls, { opacity: 0, duration: 0.25 });
    }
  }, [mode, enabled]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[298] rounded-full bg-paper mix-blend-difference"
          style={{ height: 14 - i * 1.5, width: 14 - i * 1.5 }}
        />
      ))}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2.5 w-2.5 rounded-full bg-paper mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[299] flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
          mode === "default"
            ? "border border-paper bg-transparent mix-blend-difference"
            : "border-0 bg-accent"
        }`}
      >
        <span
          className={`u-label whitespace-nowrap text-[10px] text-paper ${
            mode === "default" ? "hidden" : "block"
          }`}
        >
          {mode !== "default" ? t(LABELS[mode]) : ""}
        </span>
      </div>
    </>
  );
}
