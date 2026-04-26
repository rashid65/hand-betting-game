import type { BetResult } from '../../types/types';

interface ScoreBarProps {
  score: number;
  round: number;
  lastBetResult: BetResult | null;
}

export function ScoreBar({ score, round, lastBetResult }: ScoreBarProps) {
  // Summarizes current score progress and last bet result in a compact metric view.
  const lastBetLabel = lastBetResult ? (lastBetResult.isWin ? 'Win' : 'Loss') : 'None';
  const lastBetTone = lastBetResult
    ? lastBetResult.isWin
      ? ' stat-card__trend--win'
      : ' stat-card__trend--loss'
    : '';

  return (
    <section className="panel panel--metric">
      <h3 className="panel__title">Round Status</h3>
      <dl className="stat-grid">
        <div className="stat-card">
          <dt>Score</dt>
          <dd>{score}</dd>
        </div>
        <div className="stat-card">
          <dt>Round</dt>
          <dd>{round}</dd>
        </div>
        <div className="stat-card">
          <dt>Last Bet</dt>
          <dd className={`stat-card__trend${lastBetTone}`}>{lastBetLabel}</dd>
        </div>
      </dl>
    </section>
  );
}
