import { SITE } from "@/data/site";

const STATUS_ROWS: { label: string; tone?: "ink"; href?: string }[] = [
  { label: "BOOT / ACTIVE" },
  { label: "SIGNAL FOUND" },
  { label: "PORTFOLIO 2026", tone: "ink" },
  { label: "GITHUB / BUFONLOL", tone: "ink", href: SITE.github },
];

function toneClass(tone?: "ink") {
  return tone === "ink" ? "hero-panel-row--ink" : "";
}

export function InfoPanel({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-panel ${className}`}>
      {STATUS_ROWS.map((row) =>
        row.href ? (
          <a
            key={row.label}
            href={row.href}
            target="_blank"
            rel="noreferrer"
            className={`hero-panel-row ${toneClass(row.tone)}`}
          >
            <span>{row.label}</span>
          </a>
        ) : (
          <div key={row.label} className={`hero-panel-row ${toneClass(row.tone)}`}>
            <span>{row.label}</span>
          </div>
        )
      )}
    </div>
  );
}
