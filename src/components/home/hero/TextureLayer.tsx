/**
 * Print-degradation dressing for the poster: a few static scratch marks on
 * top of the sitewide grain (GrainOverlay). Purely decorative, static (no
 * animation cost), and kept low-opacity so it never competes with legibility.
 */
export function TextureLayer() {
  return (
    <div aria-hidden="true" className="hero-scratches pointer-events-none absolute inset-0 z-[2]">
      <span className="hero-scratch hero-scratch-a" />
      <span className="hero-scratch hero-scratch-b" />
      <span className="hero-scratch hero-scratch-c" />
      <span className="hero-scratch hero-scratch-d" />
      <span className="hero-scratch hero-scratch-e" />
      <span className="hero-blotch hero-blotch-a" />
      <span className="hero-blotch hero-blotch-b" />
      <span className="hero-blotch hero-blotch-c" />
    </div>
  );
}
