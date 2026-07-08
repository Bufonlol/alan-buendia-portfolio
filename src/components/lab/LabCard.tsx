"use client";

import Reveal from "@/components/Reveal";
import { WinTitleBar } from "@/components/system/WinTitleBar";

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
    <Reveal className="win-window win-window--ink">
      <WinTitleBar label={title} />
      <div className="win-body lab-card-body flex flex-1 flex-col">
        <div className="flex items-baseline gap-4 border-b border-ink px-5 py-4">
          <span className="u-label text-accent">{index}</span>
          <h2 className="display text-xl md:text-2xl">{title}</h2>
          <span className="u-label ml-auto text-muted">{tech}</span>
        </div>
        <div className="card-notched-sm relative aspect-[4/3] flex-1 overflow-hidden bg-paper-soft [container-type:inline-size]">
          {children}
        </div>
        <p className="u-label border-t border-ink px-5 py-3 text-muted">{note}</p>
      </div>
    </Reveal>
  );
}
