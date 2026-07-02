"use client";

import { RegistrationMark } from "@/components/art/EditorialArt";
import { SITE } from "@/data/site";

/**
 * EditorialFrame — a persistent poster-style frame that sits above the whole
 * site (every page). A hairline border insets the viewport, registration
 * marks pin the corners, and rotated labels run up the left/right margins.
 * Uses mix-blend-difference so it stays legible over both paper and ink
 * sections. Pure decoration: fixed, pointer-events-none, aria-hidden.
 */
export default function EditorialFrame() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] hidden lg:block"
      aria-hidden="true"
      style={{ mixBlendMode: "difference" }}
    >
      {/* inset hairline border (white → inverts against any background) */}
      <div className="absolute inset-5 border border-white/35" />

      {/* corner registration marks */}
      <span className="absolute left-[9px] top-[9px]">
        <RegistrationMark size={22} color="rgba(255,255,255,0.7)" spin={false} />
      </span>
      <span className="absolute right-[9px] top-[9px]">
        <RegistrationMark size={22} color="rgba(255,255,255,0.7)" spin={false} />
      </span>
      <span className="absolute bottom-[9px] left-[9px]">
        <RegistrationMark size={22} color="rgba(255,255,255,0.7)" spin={false} />
      </span>
      <span className="absolute bottom-[9px] right-[9px]">
        <RegistrationMark size={22} color="rgba(255,255,255,0.7)" spin={false} />
      </span>

      {/* rotated side labels */}
      <span
        className="u-label absolute left-[10px] top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/55"
        style={{ transform: "translate(-50%, -50%) rotate(-90deg)" }}
      >
        {SITE.name} — Frontend Engineer
      </span>
      <span
        className="u-label absolute right-[10px] top-1/2 origin-center translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-white/55"
        style={{ transform: "translate(50%, -50%) rotate(90deg)" }}
      >
        Est. Orizaba · MX — 2026
      </span>
    </div>
  );
}
