"use client";

import Reveal from "@/components/Reveal";

export default function LabCard({
  index,
  title,
  tech,
  note,
  children,
}: {
  index: string;
  title: string;
  tech: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-col border border-line">
      <div className="flex items-baseline gap-4 border-b border-line px-5 py-4">
        <span className="u-label text-accent">{index}</span>
        <h2 className="display text-xl md:text-2xl">{title}</h2>
        <span className="u-label ml-auto text-muted">{tech}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-soft [container-type:inline-size]">
        {children}
      </div>
      <p className="u-label border-t border-line px-5 py-3 text-muted">{note}</p>
    </Reveal>
  );
}
