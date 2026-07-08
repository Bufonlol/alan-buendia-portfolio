import { SITE } from "@/data/site";

const SEGMENTS = [
  SITE.url.replace("https://", ""),
  "SYS-00",
  "FRAME / 0-01",
  SITE.locationShort,
  "UTC-6",
  "REACT · TS · GSAP",
];

export function TechStrip() {
  return (
    <div className="hero-tech-strip" aria-hidden="true">
      {SEGMENTS.map((segment) => (
        <span key={segment} className="hero-tech-strip-cell">
          {segment}
        </span>
      ))}
    </div>
  );
}
