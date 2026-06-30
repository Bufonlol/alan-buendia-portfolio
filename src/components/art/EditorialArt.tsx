/**
 * EditorialArt — a small library of hand-built, deterministic SVG art pieces
 * in the paper / ink / orange system. Print-proof aesthetic: topographic
 * contours, crop & registration marks, a process color bar, and ornaments.
 *
 * Everything is pure SVG (no raster), pointer-events-none and aria-hidden,
 * so it layers behind content as pure decoration. Generated geometry is
 * deterministic (seeded) so server and client markup match — no hydration
 * drift. Motion is CSS-only and gated behind prefers-reduced-motion in
 * globals.css (see `.art-*` rules).
 */

/* ---- deterministic RNG (mulberry32) so SSR === CSR ---------------------- */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Build a smooth closed "blob" path through `points` jittered points on a
   circle of radius r — the building block for topographic contour rings. */
function blobPath(
  cx: number,
  cy: number,
  r: number,
  points: number,
  jitter: number,
  rand: () => number
) {
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const ang = (i / points) * Math.PI * 2;
    const rr = r * (1 + (rand() - 0.5) * jitter);
    pts.push([cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr]);
  }
  // Catmull-Rom → cubic Bézier for a smooth closed curve
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % points];
    const p3 = pts[(i + 2) % points];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return d + "Z";
}

/* ----------------------------------------------------------------------- *
 * Contours — nested topographic rings. The signature backdrop piece.
 * ----------------------------------------------------------------------- */
export function Contours({
  className = "",
  rings = 9,
  seed = 7,
  accentRing = 3,
  spin = true,
}: {
  className?: string;
  rings?: number;
  seed?: number;
  accentRing?: number;
  spin?: boolean;
}) {
  const rand = rng(seed);
  const paths = Array.from({ length: rings }, (_, i) => {
    const r = 30 + i * (165 / rings);
    return blobPath(200, 200, r, 14, 0.22 - i * 0.012, rand);
  });
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <g className={spin ? "art-spin-slow" : ""} style={{ transformOrigin: "200px 200px" }}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={i === accentRing ? "var(--color-accent)" : "var(--color-ink)"}
            strokeWidth={i === accentRing ? 1.4 : 1}
            strokeOpacity={i === accentRing ? 0.5 : 0.12 + (i / rings) * 0.06}
          />
        ))}
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------- *
 * CropMarks — four print crop marks framing a region (editorial proof look).
 * ----------------------------------------------------------------------- */
export function CropMarks({
  className = "",
  size = 16,
  inset = 0,
  color = "var(--color-ink)",
  opacity = 0.4,
}: {
  className?: string;
  size?: number;
  inset?: number;
  color?: string;
  opacity?: number;
}) {
  // Each corner is an L-shape made of two 1px borders, pinned to the box edges.
  const border = `1px solid ${color}`;
  const corners: React.CSSProperties[] = [
    { top: inset, left: inset, borderTop: border, borderLeft: border },
    { top: inset, right: inset, borderTop: border, borderRight: border },
    { bottom: inset, left: inset, borderBottom: border, borderLeft: border },
    { bottom: inset, right: inset, borderBottom: border, borderRight: border },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" style={{ opacity }}>
      {corners.map((c, i) => (
        <span key={i} style={{ position: "absolute", width: size, height: size, ...c }} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------- *
 * RegistrationMark — the classic printer's target (circle + crosshair).
 * ----------------------------------------------------------------------- */
export function RegistrationMark({
  className = "",
  size = 26,
  color = "var(--color-accent)",
  spin = true,
}: {
  className?: string;
  size?: number;
  color?: string;
  spin?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      fill="none"
    >
      <g className={spin ? "art-spin-slow" : ""} style={{ transformOrigin: "16px 16px" }}>
        <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.2" />
        <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.2" />
        <line x1="16" y1="0" x2="16" y2="32" stroke={color} strokeWidth="1" />
        <line x1="0" y1="16" x2="32" y2="16" stroke={color} strokeWidth="1" />
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------- *
 * ColorBar — a process-color proof strip in the palette.
 * ----------------------------------------------------------------------- */
export function ColorBar({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  const swatches = [
    "var(--color-ink)",
    "var(--color-ink-soft)",
    "var(--color-accent)",
    "var(--color-muted)",
    "var(--color-paper-soft)",
  ];
  return (
    <div
      className={`pointer-events-none flex ${vertical ? "flex-col" : "flex-row"} ${className}`}
      aria-hidden="true"
    >
      {swatches.map((c, i) => (
        <span
          key={i}
          className={vertical ? "h-3 w-3" : "h-3 w-3"}
          style={{ background: c, border: "1px solid var(--color-line)" }}
        />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------- *
 * Asterisk — a sharp editorial ornament (rays from a center).
 * ----------------------------------------------------------------------- */
export function Asterisk({
  className = "",
  size = 24,
  rays = 8,
  color = "var(--color-accent)",
  spin = false,
}: {
  className?: string;
  size?: number;
  rays?: number;
  color?: string;
  spin?: boolean;
}) {
  const lines = Array.from({ length: rays }, (_, i) => {
    const a = (i / rays) * Math.PI * 2;
    return [16 + Math.cos(a) * 14, 16 + Math.sin(a) * 14];
  });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <g className={spin ? "art-spin-rev" : ""} style={{ transformOrigin: "16px 16px" }}>
        {lines.map(([x, y], i) => (
          <line key={i} x1="16" y1="16" x2={x} y2={y} stroke={color} strokeWidth="1.4" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

/* ----------------------------------------------------------------------- *
 * HalftoneArc — a big risograph arc filled with a halftone dot gradient.
 * Pure decoration for hero / large empty corners.
 * ----------------------------------------------------------------------- */
export function HalftoneArc({ className = "", seed = 3 }: { className?: string; seed?: number }) {
  const id = `halftone-${seed}`;
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="1" />
          <stop offset="70%" stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="400" height="400" fill={`url(#${id}-fade)`} />
        </mask>
        <pattern id={`${id}-dots`} width="11" height="11" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2.1" fill="var(--color-accent)" />
        </pattern>
      </defs>
      <g mask={`url(#${id}-mask)`} opacity="0.5">
        <circle cx="200" cy="200" r="190" fill={`url(#${id}-dots)`} />
      </g>
    </svg>
  );
}
