/**
 * Persistent technical viewport frame: registration corner marks plus
 * two vertical edge labels. Rendered above the grain, below the header,
 * with mix-blend-difference so it stays legible over ink or paper slides
 * while pages transition inside it.
 */
export default function TechFrame() {
  return (
    <div className="tech-frame" aria-hidden="true">
      <span className="tech-frame__c tech-frame__c--tl" />
      <span className="tech-frame__c tech-frame__c--tr" />
      <span className="tech-frame__c tech-frame__c--bl" />
      <span className="tech-frame__c tech-frame__c--br" />
      <span className="tech-frame__edge tech-frame__edge--l">
        Frontend / 2026
      </span>
      <span className="tech-frame__edge tech-frame__edge--r">
        18.85°N / 97.10°W
      </span>
    </div>
  );
}
