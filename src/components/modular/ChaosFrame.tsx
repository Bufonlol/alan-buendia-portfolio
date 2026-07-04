import type { ReactNode } from "react";

type ChaosFrameProps = {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "ink" | "clear";
};

export function ChaosFrame({
  children,
  className = "",
  tone = "paper",
}: ChaosFrameProps) {
  const toneClass = {
    paper: "bg-paper text-ink",
    ink: "bg-ink text-paper",
    clear: "bg-transparent text-current",
  }[tone];

  return (
    <div className={`chaos-frame relative overflow-hidden border border-current ${toneClass} ${className}`}>
      {children}
    </div>
  );
}

