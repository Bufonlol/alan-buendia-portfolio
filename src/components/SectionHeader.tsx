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
    <Reveal className={`relative ${className}`}>
      {/* oversized ghost index — editorial poster device */}
      <span
        aria-hidden="true"
        className={`display pointer-events-none absolute -top-[0.35em] right-0 select-none text-[clamp(6rem,20vw,15rem)] leading-none ${
          dark ? "text-outline-paper opacity-[0.14]" : "text-outline opacity-[0.10]"
        }`}
      >
        {index}
      </span>
      <div className="relative flex items-baseline gap-4">
        <span className="u-label text-accent">{index}</span>
        <span className={`u-label ${dark ? "text-paper/50" : "text-muted"}`}>
          {label}
        </span>
        <span className={`h-px flex-1 ${dark ? "bg-line-paper" : "bg-line"}`} />
      </div>
      <h2
        ref={h2Ref}
        className={`display relative mt-5 text-[clamp(2.6rem,8vw,6.5rem)]${sweep ? " heading-sweep" : ""}`}
      >
        {title}
      </h2>
    </Reveal>
  );
}
