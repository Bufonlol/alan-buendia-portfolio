const TAGS = ["REACT", "TYPESCRIPT", "GSAP", "THREE.JS", "NEXT.JS"];

export function TechTags({ className = "" }: { className?: string }) {
  return (
    <ul className={`hero-tags flex flex-wrap gap-1.5 ${className}`}>
      {TAGS.map((tag) => (
        <li key={tag} className="hero-tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}
