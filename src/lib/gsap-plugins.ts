"use client";

import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, Draggable, InertiaPlugin);
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  Draggable,
  InertiaPlugin,
};
