import { TileCard } from './TileCard';
import type { Tile } from '../../types/types';

interface TileGroupProps {
  tiles: Tile[];
  title?: string;
  totalValue?: number;
  compact?: boolean;
}

export function TileGroup({
  tiles,
  title,
  totalValue,
  compact = false,
}: TileGroupProps) {
  return (
    <section className="panel">
      {title ? <h3 className="panel__title">{title}</h3> : null}
      {typeof totalValue === 'number' ? (
        <p className="panel__subtle">Total Value: {totalValue}</p>
      ) : null}

      {tiles.length === 0 ? (
        <p className="panel__subtle">No tiles to display.</p>
      ) : (
        <div className={`tile-grid${compact ? ' tile-grid--compact' : ''}`}>
          {tiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} compact={compact} />
          ))}
        </div>
      )}
    </section>
  );
}
