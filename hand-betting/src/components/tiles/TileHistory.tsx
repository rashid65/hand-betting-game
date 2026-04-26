import { TileCard } from './TileCard';
import type { Tile } from '../../types/types';

export interface TileHistoryItem {
  id: string;
  tiles: Tile[];
  total: number;
}

interface TileHistoryProps {
  items: TileHistoryItem[];
}

export function TileHistory({ items }: TileHistoryProps) {
  // Shows previous hands as compact cards so players can compare recent totals quickly.
  if (items.length === 0) {
    return <p className="panel__subtle">No previous hands yet.</p>;
  }

  return (
    <div className="history-bar" role="list" aria-label="Previous hands">
      {items.map((item, index) => (
        <article className="history-bar__item" key={item.id} role="listitem">
          <header className="history-bar__head">
            <p className="history-bar__title">Hand {index + 1}</p>
            <p className="history-bar__total">Total {item.total}</p>
          </header>

          <div className="tile-grid tile-grid--compact">
            {item.tiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} compact />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
