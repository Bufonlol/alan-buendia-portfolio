"use client";

import { useRef } from "react";
import { gsap, isFinePointer } from "@/lib/gsap";

export default function TiltCard({
  children,
  className = "",
  intensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotateY: x * intensity,
      rotateX: -y * (intensity * 0.65),
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
