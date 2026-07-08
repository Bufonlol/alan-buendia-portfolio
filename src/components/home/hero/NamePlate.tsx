"use client";

import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";

export function NamePlate() {
  const { t } = useLang();

  return (
    <div className="hero-stage chaos-piece-word relative flex-1">
      <div className="hero-name-group hero-name-group--alan">
        <h1 className="hero-name hero-name-alan" aria-label={`${SITE.name}, ${t(SITE.role)}`}>
          ALAN
        </h1>
      </div>

      {/* BUENDÍA no longer splits into an ink half + a JS-measured cutout
          half sitting on a separately positioned backdrop plate — that
          mechanism (runtime pixel measurement, torn-paper clip-path, a skew
          that had to match the text exactly) broke in a new way on nearly
          every pass. A solid ink block wrapping the whole word, white text,
          is the same "block" idea with zero moving parts: no measurement,
          no alignment to drift out of sync, just a background-color. */}
      <div className="hero-name-group hero-name-group--buendia">
        <span className="hero-name hero-name-buendia chaos-piece-mass">BUENDÍA</span>
      </div>
    </div>
  );
}
