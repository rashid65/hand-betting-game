import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import { Button } from '../ui/Button';

const reasonTextByCode = {
  'tile-value-limit-reached': 'A wind or dragon tile reached the limit value (0 or 10).',
  'max-draw-pile-depletions-reached': 'The draw pile was depleted for the third time.',
} as const;

export function GameOverScreen() {
  const navigate = useNavigate();
  const { score, round, gameOverReason, resetGame } = useGame();
  const { saveScore } = useLeaderboard();
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);

  const reasonText = gameOverReason
    ? reasonTextByCode[gameOverReason]
    : 'The game session has ended.';

  const handleSaveAndViewLeaderboard = (): void => {
    if (saved) {
      navigate('/leaderboard');
      return;
    }

    if (playerName.trim()) {
      saveScore(playerName, score);
      setSaved(true);
    }

    navigate('/leaderboard');
  };

  const handlePlayAgain = (): void => {
    resetGame();
    navigate('/game');
  };

  const handleBackHome = (): void => {
    resetGame();
    navigate('/');
  };

  return (
    <main className="screen screen--center screen--game-over">
      <section className="panel game-over-hero">
        <p className="screen__kicker">Session Complete</p>
        <h1 className="screen__title">Game Over</h1>
        <p className="screen__subtitle">{reasonText}</p>
      </section>

      <div className="game-over-grid">
        <section className="panel panel--metric">
          <h3 className="panel__title">Score Summary</h3>
          <dl className="stat-grid stat-grid--two">
            <div className="stat-card">
              <dt>Final Score</dt>
              <dd>{score}</dd>
            </div>
            <div className="stat-card">
              <dt>Rounds Played</dt>
              <dd>{round}</dd>
            </div>
          </dl>
        </section>

        <section className="panel">
          <h3 className="panel__title">Save Score</h3>
          <input
            className="name-input"
            type="text"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            placeholder="Enter your name"
          />
          <div className="button-row button-row--dense">
            <Button onClick={handleSaveAndViewLeaderboard}>
              Save and View Leaderboard
            </Button>
            <Button onClick={handlePlayAgain} variant="secondary">
              Play Again
            </Button>
            <Button onClick={handleBackHome} variant="ghost">
              Back Home
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
