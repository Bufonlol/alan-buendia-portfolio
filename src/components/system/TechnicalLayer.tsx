import type { ReactNode } from "react";

export function TechnicalGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`technical-grid pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative block h-3 w-3 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  );
}

export function Barcode({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block h-5 w-20 bg-[repeating-linear-gradient(90deg,currentColor_0,currentColor_1px,transparent_1px,transparent_3px,currentColor_3px,currentColor_5px,transparent_5px,transparent_8px)] ${className}`}
    />
  );
}

export function SystemLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`u-label ${className}`}>{children}</span>;
}

export function SignalBars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-[2px] ${className}`} aria-hidden="true">
      {[7, 11, 15, 11, 8].map((h, i) => (
        <span
          key={i}
          className="w-[3px] bg-current"
          style={{ height: h, animation: `eq-bar 1.1s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </span>
  );
}

export function PulseDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-2 w-2 rounded-full bg-current ${className}`}
      style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }}
    />
  );
}
