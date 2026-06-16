"use client";

import { useRef, useEffect } from "react";
import Reveal from "@/components/Reveal";

export default function SectionHeader({
  index,
  label,
  title,
  className = "",
  dark = false,
  sweep = false,
}: {
  index: string;
  label: string;
  title: string;
  className?: string;
  dark?: boolean;
  sweep?: boolean;
}) {
  const h2Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sweep || !h2Ref.current) return;
    const el = h2Ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [sweep]);

  return (
    <Reveal className={className}>
      <div className="flex items-baseline gap-4">
        <span className="u-label text-accent">{index}</span>
        <span className={`u-label ${dark ? "text-paper/50" : "text-muted"}`}>
          {label}
        </span>
        <span className={`h-px flex-1 ${dark ? "bg-line-paper" : "bg-line"}`} />
      </div>
      <h2
        ref={h2Ref}
        className={`display mt-5 text-[clamp(2.6rem,8vw,6.5rem)]${sweep ? " heading-sweep" : ""}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
