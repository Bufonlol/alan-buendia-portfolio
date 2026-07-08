"use client";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** A stubborn "x" — the window rattles as if it refuses to close, like a
    real error dialog that just won't go away. */
function refuseToClose(event: React.MouseEvent<HTMLSpanElement>) {
  if (prefersReducedMotion()) return;
  const cell = event.currentTarget.closest<HTMLElement>(".win-window, .hero-bento-cell");
  if (!cell) return;
  gsap
    .timeline()
    .to(cell, { x: -8, duration: 0.05, ease: "power1.inOut" })
    .to(cell, { x: 8, duration: 0.08, ease: "power1.inOut" })
    .to(cell, { x: -5, duration: 0.08, ease: "power1.inOut" })
    .to(cell, { x: 0, duration: 0.08, ease: "power1.inOut", clearProps: "x" });
}

/** The Windows-error-dialog title bar reused on every bordered card
    sitewide: a real filename-style label for that card's content, plus the
    three stock window-control glyphs. */
export function WinTitleBar({ label }: { label: string }) {
  return (
    <span className="win-titlebar" aria-hidden="true">
      <span>{label}</span>
      <span className="win-titlebar-controls">
        <span className="win-titlebar-btn">-</span>
        <span className="win-titlebar-btn">□</span>
        <span className="win-titlebar-btn" onClick={refuseToClose}>x</span>
      </span>
    </span>
  );
}
