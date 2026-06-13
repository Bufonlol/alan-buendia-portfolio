"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is on screen AND the tab is visible.
 * Used to pause canvas/WebGL render loops that the user can't see.
 */
export function useInView<T extends HTMLElement>(margin = "100px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin }
    );
    io.observe(el);

    const onVis = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [margin]);

  return { ref, active: inView && pageVisible };
}
