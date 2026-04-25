import type { Tile } from '../../types/types';

import dragon01 from '../../assets/dragon/01.svg';
import dragon02 from '../../assets/dragon/02.svg';
import dragon03 from '../../assets/dragon/03.svg';
import number01 from '../../assets/number/dot/01.svg';
import number02 from '../../assets/number/dot/02.svg';
import number03 from '../../assets/number/dot/03.svg';
import number04 from '../../assets/number/dot/04.svg';
import number05 from '../../assets/number/dot/05.svg';
import number06 from '../../assets/number/dot/06.svg';
import number07 from '../../assets/number/dot/07.svg';
import number08 from '../../assets/number/dot/08.svg';
import number09 from '../../assets/number/dot/09.svg';
import wind01 from '../../assets/wind/01.svg';
import wind02 from '../../assets/wind/02.svg';
import wind03 from '../../assets/wind/03.svg';
import wind04 from '../../assets/wind/04.svg';

interface TileCardProps {
  tile: Tile;
  compact?: boolean;
}

const TYPE_LABELS: Record<Tile['type'], string> = {
  number: 'Number',
  wind: 'Wind',
  dragon: 'Dragon',
};

const NUMBER_FACE_IMAGES: Record<number, string> = {
  1: number01,
  2: number02,
  3: number03,
  4: number04,
  5: number05,
  6: number06,
  7: number07,
  8: number08,
  9: number09,
};

const WIND_FACE_IMAGES: Record<'east' | 'south' | 'west' | 'north', string> = {
  east: wind01,
  south: wind02,
  west: wind03,
  north: wind04,
};

const DRAGON_FACE_IMAGES: Record<'red' | 'green' | 'white', string> = {
  red: dragon01,
  green: dragon02,
  white: dragon03,
};

const isWindFace = (face: Tile['face']): face is 'east' | 'south' | 'west' | 'north' =>
  face === 'east' || face === 'south' || face === 'west' || face === 'north';

const isDragonFace = (face: Tile['face']): face is 'red' | 'green' | 'white' =>
  face === 'red' || face === 'green' || face === 'white';

const toFaceLabel = (face: Tile['face']): string => {
  if (typeof face === 'number') {
    return String(face);
  }

  return `${face.charAt(0).toUpperCase()}${face.slice(1)}`;
};

const getTileImageSource = (tile: Tile): string | null => {
  if (tile.type === 'number' && typeof tile.face === 'number') {
    return NUMBER_FACE_IMAGES[tile.face] ?? null;
  }

  if (tile.type === 'wind' && isWindFace(tile.face)) {
    return WIND_FACE_IMAGES[tile.face];
  }

  if (tile.type === 'dragon' && isDragonFace(tile.face)) {
    return DRAGON_FACE_IMAGES[tile.face];
  }

  return null;
};

export function TileCard({ tile, compact = false }: TileCardProps) {
  const imageSource = getTileImageSource(tile);
  const faceLabel = toFaceLabel(tile.face);

  return (
    <article className={`tile-card${compact ? ' tile-card--compact' : ''}`}>
      <div className="tile-card__frame">
        {imageSource ? (
          <img
            className="tile-card__image"
            src={imageSource}
            alt={`${faceLabel} ${TYPE_LABELS[tile.type]} tile`}
            loading="lazy"
          />
        ) : (
          <p className="tile-card__fallback">{faceLabel}</p>
        )}
      </div>
      <p className="tile-card__face">{faceLabel}</p>
      <p className="tile-card__meta">{TYPE_LABELS[tile.type]}</p>
      <p className="tile-card__value">Value {tile.value}</p>
    </article>
  );
}
