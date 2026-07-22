type Props = {
  id: string;
  className?: string;
};

/**
 * Abstract geometric marks derived from the visual system — used for
 * capabilities and principles instead of official tech logos.
 * All shapes draw from the same primitives: squares, circles,
 * halves, quarters, bars and diagonals. Ink is currentColor,
 * the acid accent is explicit.
 */
export default function GeometricSymbol({ id, className }: Props) {
  const acid = "#C7F000";
  const common = {
    className,
    viewBox: "0 0 48 48",
    "aria-hidden": true as const,
    fill: "none",
  };

  switch (id) {
    case "square-notch": // TypeScript — solid square, notched corner
      return (
        <svg {...common}>
          <path d="M4 4h40v40H24V24H4V4Z" fill="currentColor" />
          <rect x="8" y="30" width="10" height="10" fill={acid} />
        </svg>
      );
    case "ring": // React — heavy ring
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="10" />
          <circle cx="24" cy="24" r="3" fill={acid} />
        </svg>
      );
    case "quarter": // Next.js — square with quarter-circle cut
      return (
        <svg {...common}>
          <path d="M4 4h40v40H4V4Z" fill="currentColor" />
          <path d="M44 44A40 40 0 0 0 4 4v40h40Z" fill={acid} fillOpacity="0" />
          <path d="M44 44A28 28 0 0 0 16 16v28h28Z" fill="#E8E4DA" className="geo-alt" />
        </svg>
      );
    case "wave": // GSAP — arc segment (motion path)
      return (
        <svg {...common}>
          <path d="M4 40a20 20 0 0 1 40 0" stroke="currentColor" strokeWidth="9" />
          <rect x="40" y="34" width="6" height="6" fill={acid} />
        </svg>
      );
    case "triangles": // Supabase — two opposed triangles
      return (
        <svg {...common}>
          <path d="M4 22 26 4v18H4Z" fill="currentColor" />
          <path d="M44 26 22 44V26h22Z" fill="currentColor" />
          <path d="M22 26h6v6h-6Z" fill={acid} />
        </svg>
      );
    case "hex": // Node.js — solid hexagon
      return (
        <svg {...common}>
          <path d="M24 3 42 13.5v21L24 45 6 34.5v-21L24 3Z" fill="currentColor" />
        </svg>
      );
    case "bars": // Tailwind — horizontal bars
      return (
        <svg {...common}>
          <rect x="4" y="8" width="40" height="7" fill="currentColor" />
          <rect x="12" y="20" width="32" height="7" fill="currentColor" />
          <rect x="4" y="32" width="24" height="7" fill="currentColor" />
          <rect x="32" y="32" width="7" height="7" fill={acid} />
        </svg>
      );
    case "half-moon": // PostgreSQL — split disc
      return (
        <svg {...common}>
          <path d="M24 4a20 20 0 0 1 0 40V4Z" fill="currentColor" />
          <path d="M24 4a20 20 0 0 0 0 40V4Z" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    case "focus": // principle — square within square, acid core
      return (
        <svg {...common}>
          <rect x="6" y="6" width="36" height="36" stroke="currentColor" strokeWidth="2" />
          <rect x="18" y="18" width="12" height="12" fill={acid} />
        </svg>
      );
    case "quality": // principle — diagonal arrow
      return (
        <svg {...common}>
          <path d="M10 38 38 10M38 10H18M38 10v20" stroke="currentColor" strokeWidth="3" />
        </svg>
      );
    case "purpose": // principle — three vertical strokes
      return (
        <svg {...common}>
          <rect x="8" y="10" width="6" height="28" fill="currentColor" />
          <rect x="21" y="10" width="6" height="28" fill="currentColor" />
          <rect x="34" y="10" width="6" height="28" fill={acid} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="8" y="8" width="32" height="32" fill="currentColor" />
        </svg>
      );
  }
}
