import type { ReactNode } from "react";

export function VerticalText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`u-label inline-block [writing-mode:vertical-rl] ${className}`}>
      {children}
    </span>
  );
}

