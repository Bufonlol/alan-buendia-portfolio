"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Magic UI-inspired meteor shower — subtle accent streaks falling
 * diagonally. Rendered only after mount to avoid SSR/CSR random
 * hydration mismatches; hidden on mobile + reduced-motion via CSS.
 */
export default function Meteors({ count = 14 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const meteors = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 35 - 15,
        delay: Math.random() * 7,
        duration: 4 + Math.random() * 5,
      })),
    [count]
  );

  if (!mounted) return null;

  return (
    <div
      className="meteors pointer-events-none absolute inset-0 overflow-hidden opacity-60"
      aria-hidden="true"
    >
      {meteors.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
