"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/** True when the home runs as a fullpage deck (must mirror the CSS
 *  `deck` custom variant in globals.css exactly). */
export const isDeckCapable = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
  !prefersReducedMotion();

export { gsap, useGSAP, ScrollTrigger };
