import { Link } from 'react-router-dom';
import { useLeaderboard } from '../../hooks/useLeaderboard';

export function LandingScreen() {
  // Provides the main entry point with game goal summary and top score preview.
  const { topFive } = useLeaderboard();

  return (
    <main className="screen screen--landing">
      <section className="panel landing-hero">
        <p className="screen__kicker">Mahjong Hand Betting</p>
        <h1 className="screen__title">Hand Betting Game</h1>
        <p className="screen__subtitle">
          Predict whether the next hand total will be higher or lower than the current hand.
        </p>
        <div className="button-row">
          <Link className="app-link-button app-link-button--primary" to="/game">
            New Game
          </Link>
          <Link className="app-link-button app-link-button--secondary" to="/leaderboard">
            Full Leaderboard
          </Link>
        </div>
      </section>

      <div className="landing-grid">
        <section className="panel landing-panel">
          <h2 className="panel__title">Goal</h2>
          <p className="panel__subtle">
            Build score streaks by calling each next hand correctly before a non-number tile
            reaches 0 or 10, or before the draw pile depletes for the third time.
          </p>
          <ul className="rules-list">
            <li>Bet Higher or Bet Lower every round.</li>
            <li>Number tiles keep face value. Winds and dragons scale dynamically.</li>
            <li>Watch draw and discard counters to anticipate reshuffles.</li>
          </ul>
        </section>

        <section className="panel landing-panel">
          <h2 className="panel__title">Top 5 Scores</h2>
          {topFive.length === 0 ? (
            <p className="panel__subtle">No scores yet. Play a game to claim the first spot.</p>
          ) : (
            <ol className="leaderboard-list leaderboard-list--landing">
              {topFive.map((entry, index) => (
                <li
                  className="leaderboard-list__item"
                  key={`${entry.playerName}-${entry.achievedAt}`}
                >
                  <span className="leaderboard-list__rank">#{index + 1}</span>
                  <span className="leaderboard-list__name">{entry.playerName}</span>
                  <strong className="leaderboard-list__score">{entry.score}</strong>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </main>
  );
}
