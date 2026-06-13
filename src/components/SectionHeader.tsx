"use client";

import Reveal from "@/components/Reveal";

export default function SectionHeader({
  index,
  label,
  title,
  className = "",
  dark = false,
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-baseline gap-4">
        <span className="u-label text-accent">{index}</span>
        <span className={`u-label ${dark ? "text-paper/50" : "text-muted"}`}>
          {label}
        </span>
        <span className={`h-px flex-1 ${dark ? "bg-line-paper" : "bg-line"}`} />
      </div>
      <h2 className="display mt-5 text-[clamp(2.6rem,8vw,6.5rem)]">{title}</h2>
    </Reveal>
  );
}
