import type { ReactNode } from "react";

export function ModularCanvas({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`modular-canvas ${className}`}>{children}</div>;
}

