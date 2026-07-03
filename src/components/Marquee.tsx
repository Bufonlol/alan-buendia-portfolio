"use client";

import { useLang, type L } from "@/lib/i18n";

export default function Marquee({
  items,
  className = "",
  baseSeconds = 22,
}: {
  items: L[];
  className?: string;
  baseSeconds?: number;
}) {
  const { t } = useLang();
  const row = [...items, ...items];

  return (
    <div
      className={`overflow-hidden border-b border-ink bg-ink py-4 text-paper ${className}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex w-max items-center whitespace-nowrap"
        style={{ animationDuration: `${baseSeconds}s` }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {row.map((item, index) => (
              <span key={`${half}-${index}`} className="flex items-center">
                <span className="display px-6 text-[clamp(1.6rem,3.5vw,2.8rem)] tracking-[-0.04em]">
                  {t(item)}
                </span>
                <span className="u-label border border-paper/50 px-2 py-1">SYSTEM</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
