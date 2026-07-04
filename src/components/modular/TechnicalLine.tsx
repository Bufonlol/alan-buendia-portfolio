export function TechnicalLine({
  className = "",
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`${vertical ? "h-full w-px" : "h-px w-full"} block bg-current ${className}`}
    />
  );
}

