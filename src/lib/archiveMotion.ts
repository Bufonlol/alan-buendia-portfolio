"use client";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Targets = gsap.TweenTarget;
type Position = gsap.Position;

/**
 * Shared motion vocabulary for BootIntro + Hero so the "system booting into
 * an archive" language stays consistent instead of every component inventing
 * its own fade/slide. Every helper collapses to an instant gsap.set() under
 * prefers-reduced-motion — callers never need to branch on it themselves.
 */

/** ASSEMBLE — modules fly in from scattered offsets/clip-paths and bolt into their grid slot. */
export function assemble(
  tl: gsap.core.Timeline,
  targets: Targets,
  opts: { position?: Position; stagger?: number; distance?: number; duration?: number } = {}
) {
  const { position = 0, stagger = 0.055, distance = 16, duration = 0.7 } = opts;

  if (prefersReducedMotion()) {
    tl.set(targets, { autoAlpha: 1, x: 0, y: 0, clipPath: "inset(0% 0% 0% 0%)" }, position);
    return tl;
  }

  tl.fromTo(
    targets,
    {
      autoAlpha: 0,
      x: (i: number) => (i % 3 === 0 ? -distance : i % 3 === 1 ? distance : 0),
      y: (i: number) => (i % 2 === 0 ? distance * 0.8 : -distance * 0.6),
      clipPath: (i: number) => (i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)"),
    },
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      duration,
      stagger,
      ease: "power3.out",
      // Leaving an inline clip-path around after the tween can leave some
      // browsers with a stale paint (element stays invisible despite
      // computed styles reporting no clip) — drop it once fully revealed.
      clearProps: "clipPath",
    },
    position
  );
  return tl;
}

/** SCAN — a hard edge sweeps across the target, revealing it via clip-path as it passes (not a fade). */
export function scanReveal(
  tl: gsap.core.Timeline,
  targets: Targets,
  opts: { position?: Position; duration?: number; from?: "left" | "top"; stagger?: number } = {}
) {
  const { position = 0, duration = 0.6, from = "left", stagger = 0 } = opts;
  const start = from === "left" ? "inset(0 100% 0 0)" : "inset(0 0 100% 0)";

  if (prefersReducedMotion()) {
    tl.set(targets, { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1 }, position);
    return tl;
  }

  tl.fromTo(
    targets,
    { clipPath: start, autoAlpha: 1 },
    { clipPath: "inset(0% 0% 0% 0%)", duration, stagger, ease: "power4.inOut", clearProps: "clipPath" },
    position
  );
  return tl;
}

/** STAMP — label lands at a slight rotation like a rubber stamp hitting paper, then settles flat. */
export function stampLabel(
  tl: gsap.core.Timeline,
  targets: Targets,
  opts: { position?: Position; stagger?: number } = {}
) {
  const { position = 0, stagger = 0.04 } = opts;

  if (prefersReducedMotion()) {
    tl.set(targets, { autoAlpha: 1, scale: 1, rotate: 0 }, position);
    return tl;
  }

  tl.fromTo(
    targets,
    { autoAlpha: 0, scale: 1.4, rotate: (i: number) => (i % 2 === 0 ? -6 : 5) },
    {
      autoAlpha: 1,
      scale: 1,
      rotate: 0,
      duration: 0.32,
      stagger,
      ease: "back.out(3)",
    },
    position
  );
  return tl;
}

/** WIPE — a solid panel slides in then out, uncovering what sits beneath it (section/screen transitions). */
export function panelWipe(
  tl: gsap.core.Timeline,
  panel: Targets,
  opts: { position?: Position; direction?: "up" | "down" | "left" | "right"; holdDuration?: number; exitDuration?: number } = {}
) {
  const { position = 0, direction = "up", holdDuration = 0.4, exitDuration = 0.5 } = opts;
  const axis = direction === "left" || direction === "right" ? "xPercent" : "yPercent";
  const enterFrom = direction === "up" || direction === "left" ? 100 : -100;
  const exitTo = direction === "up" || direction === "left" ? -100 : 100;

  if (prefersReducedMotion()) {
    tl.set(panel, { [axis]: exitTo, display: "none" }, position);
    return tl;
  }

  tl.fromTo(panel, { [axis]: enterFrom }, { [axis]: 0, duration: holdDuration, ease: "power3.inOut" }, position)
    .to(panel, { [axis]: exitTo, duration: exitDuration, ease: "power3.inOut" }, `+=0.05`);
  return tl;
}

/** DISRUPT — a very brief glitch: jittered offset + opacity flicker, then locks flat. Never loops. */
export function disrupt(
  tl: gsap.core.Timeline,
  targets: Targets,
  opts: { position?: Position } = {}
) {
  const { position = 0 } = opts;

  if (prefersReducedMotion()) {
    tl.set(targets, { x: 0, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" }, position);
    return tl;
  }

  tl.set(targets, { autoAlpha: 1 }, position)
    .to(targets, { x: -3, clipPath: "inset(0 0 0 4%)", duration: 0.045 }, position)
    .to(targets, { x: 4, clipPath: "inset(0 3% 0 0)", duration: 0.045 }, "+=0.02")
    .to(targets, { x: -2, autoAlpha: 0.6, duration: 0.04 }, "+=0.02")
    .to(targets, { x: 0, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.06, clearProps: "clipPath" }, "+=0.02");
  return tl;
}

/** LOCK — final settle: a no-overshoot snap to identity transform signalling the composition is fixed. */
export function lock(
  tl: gsap.core.Timeline,
  targets: Targets,
  opts: { position?: Position; duration?: number } = {}
) {
  const { position = 0, duration = 0.3 } = opts;

  if (prefersReducedMotion()) {
    tl.set(targets, { x: 0, y: 0, rotate: 0, scale: 1 }, position);
    return tl;
  }

  tl.to(targets, { x: 0, y: 0, rotate: 0, scale: 1, duration, ease: "power2.out" }, position);
  return tl;
}
