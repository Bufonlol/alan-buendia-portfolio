export default function Signature({
  className = "",
  size = "text-4xl",
  shadowColor = "var(--color-ink)",
}: {
  className?: string;
  size?: string;
  shadowColor?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`display pointer-events-none select-none ${size} ${className}`}
      style={{ filter: `drop-shadow(4px 4px 0 ${shadowColor})` }}
    >
      AB<span className="text-accent">◆</span>
    </span>
  );
}
