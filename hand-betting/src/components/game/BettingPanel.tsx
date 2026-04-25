import { Button } from '../ui/Button';

interface BettingPanelProps {
  onBetHigher: () => void;
  onBetLower: () => void;
  onExit: () => void;
  disabled?: boolean;
}

export function BettingPanel({
  onBetHigher,
  onBetLower,
  onExit,
  disabled = false,
}: BettingPanelProps) {
  return (
    <section className="panel panel--betting">
      <h3 className="panel__title">Place Your Bet</h3>
      <p className="panel__subtle">Choose whether the next hand total rises or falls.</p>
      <div className="button-row button-row--dense">
        <Button onClick={onBetHigher} disabled={disabled}>
          Bet Higher
        </Button>
        <Button onClick={onBetLower} disabled={disabled} variant="secondary">
          Bet Lower
        </Button>
        <Button onClick={onExit} variant="ghost">
          Exit Game
        </Button>
      </div>
    </section>
  );
}
