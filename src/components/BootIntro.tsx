"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { assemble, disrupt, lock, scanReveal, stampLabel } from "@/lib/archiveMotion";
import { SystemLabel, TechnicalGrid } from "@/components/system/TechnicalLayer";

const SEEN_KEY = "ab-boot-seen";

/** Labels reused verbatim in Hero's own modules — the panels "become" the Hero grid. */
const PANEL_LABELS = ["SYS-00", "PORTFOLIO 2026", "STATUS / ONLINE", "AB", "FRAME / A–01", "BUILD / 2026"];
const PANEL_EXIT: { x: number; y: number }[] = [
  { x: -110, y: -110 },
  { x: 0, y: -130 },
  { x: 110, y: -110 },
  { x: -110, y: 110 },
  { x: 0, y: 130 },
  { x: 110, y: 110 },
];

export default function BootIntro() {
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s3Ref = useRef<HTMLDivElement>(null);
  const s4Ref = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const scanTweenRef = useRef<gsap.core.Tween | null>(null);
  const skippedRef = useRef(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (seen || prefersReducedMotion()) {
      sessionStorage.setItem(SEEN_KEY, "1");
      return;
    }
    setActive(true);
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, "1");
    scanTweenRef.current?.kill();
    setActive(false);
  }, []);

  const skip = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    finish();
  }, [finish]);

  useEffect(() => {
    if (!active) return;
    skipBtnRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, skip]);

  useGSAP(
    () => {
      if (!active) return;
      const root = rootRef.current;
      const s1 = s1Ref.current;
      const s2 = s2Ref.current;
      const s3 = s3Ref.current;
      const s4 = s4Ref.current;
      const panels = panelsRef.current;
      if (!root || !s1 || !s2 || !s3 || !s4 || !panels) return;

      const s1Lines = gsap.utils.toArray<HTMLElement>(".boot-line", s1);
      const s2Lines = gsap.utils.toArray<HTMLElement>(".boot-line", s2);
      const s3Lines = gsap.utils.toArray<HTMLElement>(".boot-line", s3);
      const s4Words = gsap.utils.toArray<HTMLElement>(".boot-word", s4);
      const enterLabel = s4.querySelector<HTMLElement>(".boot-enter");
      const panelPieces = gsap.utils.toArray<HTMLElement>(".boot-panel", panels);

      if (scanRef.current && !prefersReducedMotion()) {
        scanTweenRef.current = gsap.fromTo(
          scanRef.current,
          { top: "0%", autoAlpha: 1 },
          { top: "100%", duration: 3.6, ease: "none", repeat: 1 }
        );
      }

      const tl = gsap.timeline({ onComplete: finish });

      tl.set([s2, s3, s4, panels], { autoAlpha: 0 });
      tl.set(panelPieces, { xPercent: 0, yPercent: 0 });

      // Screen 1 — AB SYSTEM / BOOT SEQUENCE
      assemble(tl, s1Lines, { position: 0, duration: 0.35, stagger: 0.05 });
      tl.to(s1, { clipPath: "inset(0 0 100% 0)", duration: 0.16, ease: "power3.in" }, "+=0.15");
      tl.set(s1, { autoAlpha: 0 });

      // Screen 2 — INITIALIZING INTERFACE / LOADING MODULES
      tl.set(s2, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" });
      scanReveal(tl, s2Lines, { position: "<", duration: 0.35, stagger: 0.05 });
      tl.to(s2, { clipPath: "inset(0 100% 0 0)", duration: 0.16, ease: "power3.in" }, "+=0.15");
      tl.set(s2, { autoAlpha: 0, clipPath: "inset(0% 0% 0% 0%)" });

      // Screen 3 — SIGNAL FOUND / LOCATION / STATUS / MOTION
      tl.set(s3, { autoAlpha: 1 });
      assemble(tl, s3Lines, { position: "<", duration: 0.35, stagger: 0.05 });
      tl.to(s3, { clipPath: "inset(100% 0 0 0)", duration: 0.16, ease: "power3.in" }, "+=0.15");
      tl.set(s3, { autoAlpha: 0, clipPath: "inset(0% 0% 0% 0%)" });

      // Screen 4 — DESIGN / CODE / MOTION (micro glitch) + ENTER SYSTEM
      tl.set(s4, { autoAlpha: 1 });
      stampLabel(tl, s4Words, { position: "<", stagger: 0.06 });
      disrupt(tl, s4Words, { position: "+=0.08" });
      if (enterLabel) stampLabel(tl, enterLabel, { position: "+=0.12" });
      tl.to({}, { duration: 0.18 });
      tl.set(s4, { autoAlpha: 0 });

      // Panels stamp in, lock, then explode outward to reveal the Hero beneath
      tl.set(panels, { autoAlpha: 1 });
      stampLabel(tl, panelPieces, { position: "<", stagger: 0.02 });
      lock(tl, panelPieces, { position: "+=0.04", duration: 0.1 });
      tl.to(
        panelPieces,
        {
          xPercent: (i: number) => PANEL_EXIT[i].x,
          yPercent: (i: number) => PANEL_EXIT[i].y,
          duration: 0.45,
          stagger: 0.02,
          ease: "power3.in",
        },
        "+=0.06"
      );

      return () => {
        tl.kill();
        scanTweenRef.current?.kill();
      };
    },
    { scope: rootRef, dependencies: [active] }
  );

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] overflow-hidden bg-ink text-paper"
      aria-label="AB System boot sequence"
    >
      <TechnicalGrid className="opacity-20" />
      <span
        ref={scanRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 h-px bg-paper/70 shadow-[0_0_12px_2px_rgba(247,246,239,0.4)]"
        style={{ top: "0%" }}
      />

      <p className="sr-only" role="status">
        System boot sequence playing. Press Escape or Enter to skip.
      </p>
      <button
        ref={skipBtnRef}
        onClick={skip}
        className="u-label absolute right-4 top-4 z-10 border border-paper/50 px-3 py-2 transition-colors hover:bg-paper hover:text-ink md:right-6 md:top-6"
      >
        SKIP
      </button>

      {/* Screen 01 */}
      <div ref={s1Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="boot-line display text-[clamp(2.5rem,9vw,6rem)] leading-none">AB SYSTEM</span>
        <span className="boot-line u-label opacity-85">BOOT SEQUENCE / 2026</span>
      </div>

      {/* Screen 02 */}
      <div ref={s2Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="boot-line u-label text-base">INITIALIZING INTERFACE</span>
        <span className="boot-line u-label text-base">LOADING MODULES</span>
        <span className="boot-line u-label opacity-85">REACT / TYPESCRIPT / GSAP</span>
        <span className="boot-line u-label opacity-85">NEXT.JS / THREE.JS</span>
      </div>

      {/* Screen 03 */}
      <div ref={s3Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="boot-line display text-[clamp(2rem,6vw,4rem)] leading-none">SIGNAL FOUND</span>
        <span className="boot-line u-label opacity-85">LOCATION / ORIZABA, MX</span>
        <span className="boot-line u-label opacity-85">STATUS / ONLINE</span>
        <span className="boot-line u-label opacity-85">MOTION / ACTIVE</span>
      </div>

      {/* Screen 04 */}
      <div ref={s4Ref} className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="boot-word display block text-[clamp(2rem,7vw,4.5rem)] leading-[0.95]">DESIGN</span>
        <span className="boot-word display block text-[clamp(2rem,7vw,4.5rem)] leading-[0.95]">CODE</span>
        <span className="boot-word display block text-[clamp(2rem,7vw,4.5rem)] leading-[0.95]">MOTION</span>
        <span className="boot-enter u-label mt-6 border border-paper/60 px-4 py-2">ENTER SYSTEM</span>
      </div>

      {/* Panel grid — becomes the Hero's own modules once it explodes outward */}
      <div ref={panelsRef} className="absolute inset-0 grid grid-cols-3 grid-rows-2">
        {PANEL_LABELS.map((label) => (
          <div
            key={label}
            className="boot-panel flex items-center justify-center border border-paper/40 bg-ink"
          >
            <SystemLabel>{label}</SystemLabel>
          </div>
        ))}
      </div>
    </div>
  );
}
