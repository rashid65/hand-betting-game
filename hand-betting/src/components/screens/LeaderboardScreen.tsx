import { Link } from 'react-router-dom';
import { useLeaderboard } from '../../hooks/useLeaderboard';

const formatDate = (isoDate: string): string =>
  // Converts stored ISO timestamps into short, readable dates for leaderboard rows.
  new Date(isoDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export function LeaderboardScreen() {
  // Renders the top five saved scores so players can see current rankings.
  const { topFive } = useLeaderboard();

  return (
    <main className="screen screen--center">
      <section className="panel leaderboard-panel">
        <h1 className="screen__title">Leaderboard</h1>
        <p className="screen__subtitle">Top 5 highest scores</p>

        {topFive.length === 0 ? (
          <p className="panel__subtle">No scores yet. Finish a game to add one.</p>
        ) : (
          <ol className="leaderboard-list">
            {topFive.map((entry, index) => (
              <li className="leaderboard-list__item" key={`${entry.playerName}-${entry.achievedAt}`}>
                <span className="leaderboard-list__rank">#{index + 1}</span>
                <span className="leaderboard-list__meta">
                  <span className="leaderboard-list__name">{entry.playerName}</span>
                  <span className="leaderboard-list__date">{formatDate(entry.achievedAt)}</span>
                </span>
                <strong className="leaderboard-list__score">{entry.score}</strong>
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="button-row button-row--center">
        <Link className="app-link-button app-link-button--secondary" to="/">
          Back To Home
        </Link>
      </div>
    </main>
  );
}
