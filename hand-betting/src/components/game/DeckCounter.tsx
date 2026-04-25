interface DeckCounterProps {
  drawPileCount: number;
  discardPileCount: number;
  reshuffleCount: number;
}

export function DeckCounter({
  drawPileCount,
  discardPileCount,
  reshuffleCount,
}: DeckCounterProps) {
  return (
    <section className="panel panel--metric">
      <h3 className="panel__title">Deck State</h3>
      <dl className="stat-grid">
        <div className="stat-card">
          <dt>Draw Pile</dt>
          <dd>{drawPileCount}</dd>
        </div>
        <div className="stat-card">
          <dt>Discard Pile</dt>
          <dd>{discardPileCount}</dd>
        </div>
        <div className="stat-card">
          <dt>Depletions</dt>
          <dd>{reshuffleCount} / 3</dd>
        </div>
      </dl>
    </section>
  );
}
