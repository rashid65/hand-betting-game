import type { Tile } from '../../types/types';
import { TileHistory } from '../tiles/TileHistory';

interface HandHistoryItem {
  id: string;
  tiles: Tile[];
  total: number;
}

interface HandHistoryProps {
  history: HandHistoryItem[];
}

export function HandHistory({ history }: HandHistoryProps) {
  // Wraps and labels recent hands so players can quickly compare past outcomes.
  return (
    <section className="panel panel--history-shell">
      <h3 className="panel__title">History Bar</h3>
      <p className="panel__subtle">Newest hand appears first.</p>
      <TileHistory items={history} />
    </section>
  );
}
