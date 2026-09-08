type CurrentBuildingProps = {
  currentBuilding: string;
};

export function CurrentBuilding({ currentBuilding }: CurrentBuildingProps) {
  return (
    <section className="section" aria-labelledby="current-building-title">
      <div className="site-container split-grid">
        <div>
          <p className="eyebrow">Current / Building</p>
          <h2 className="section-title" id="current-building-title">
            The public foundation comes first.
          </h2>
        </div>
        <div className="info-panel">
          <h3>Reviewable slices, not speculative infrastructure.</h3>
          <p>{currentBuilding}</p>
        </div>
      </div>
    </section>
  );
}
