type CurrentBuildingProps = {
  currentBuilding: string;
};

export function CurrentBuilding({ currentBuilding }: CurrentBuildingProps) {
  return (
    <section className="section section--current" aria-labelledby="current-building-title">
      <div className="site-container current-building">
        <p className="eyebrow">Current / Building</p>
        <h2 className="section-title section-title--wide" id="current-building-title">
          The public foundation comes first.
        </h2>
        <p className="current-building__statement">{currentBuilding}</p>
      </div>
    </section>
  );
}
