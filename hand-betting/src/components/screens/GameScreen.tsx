import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BettingPanel } from '../game/BettingPanel';
import { DeckCounter } from '../game/DeckCounter';
import { HandHistory } from '../game/HandHistory';
import { ScoreBar } from '../game/ScoreBar';
import { TileGroup } from '../tiles/TileGroup';
import { useGame } from '../../hooks/useGame';

export function GameScreen() {
  const navigate = useNavigate();
  const {
    phase,
    score,
    round,
    currentHand,
    currentHandValue,
    historyHands,
    drawPileCount,
    discardPileCount,
    reshuffleCount,
    lastBetResult,
    startGame,
    bet,
    resetGame,
  } = useGame();

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (phase === 'gameOver') {
      navigate('/game-over');
    }
  }, [navigate, phase]);

  const handleExit = (): void => {
    resetGame();
    navigate('/');
  };

  return (
    <main className="screen screen--game">
      <header className="screen__header">
        <div>
          <h1 className="screen__title">Mahjong Table</h1>
          <p className="screen__subtitle">
            Call each next hand before a tile value limit or third depletion ends the run.
          </p>
        </div>
      </header>

      <div className="hud-grid">
        <ScoreBar score={score} round={round} lastBetResult={lastBetResult} />
        <DeckCounter
          drawPileCount={drawPileCount}
          discardPileCount={discardPileCount}
          reshuffleCount={reshuffleCount}
        />
      </div>

      <div className="game-layout">
        <section className="game-layout__main">
          <TileGroup
            title="Current Hand"
            tiles={currentHand}
            totalValue={currentHandValue}
          />
          <BettingPanel
            onBetHigher={() => bet('higher')}
            onBetLower={() => bet('lower')}
            onExit={handleExit}
            disabled={phase !== 'playing'}
          />
        </section>

        <aside className="game-layout__side">
          <HandHistory history={historyHands} />
        </aside>
      </div>
    </main>
  );
}
