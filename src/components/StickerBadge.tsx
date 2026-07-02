export default function StickerBadge({
  children,
  className = "",
  rotate = -3,
  color = "var(--color-accent)",
  textColor = "var(--color-paper)",
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  color?: string;
  textColor?: string;
}) {
  return (
    <span
      className={`u-label card-notched-sm inline-flex items-center gap-1.5 px-3 py-1.5 ${className}`}
      style={{
        background: color,
        color: textColor,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(3px 3px 0 var(--color-ink))",
      }}
    >
      {children}
    </span>
  );
}
