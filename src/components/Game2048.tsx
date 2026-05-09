import { useCallback, useEffect, useRef, useState } from "react";
import { Board } from "./Board";
import { hasWon, isGameOver, move, newGame, type Direction, type Grid } from "@/lib/game-2048";

const STORAGE_KEY = "2048:state";
const BEST_KEY = "2048:best";

interface SavedState {
  grid: Grid;
  score: number;
}

export function Game2048() {
  const [grid, setGrid] = useState<Grid>(() =>
    Array.from({ length: 4 }, () => Array(4).fill(0))
  );
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [won, setWon] = useState(false);
  const [over, setOver] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [lastDir, setLastDir] = useState<Direction | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Load saved state (client-only to avoid SSR hydration mismatch from Math.random)
  useEffect(() => {
    try {
      const b = Number(localStorage.getItem(BEST_KEY) || "0");
      setBest(b);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s: SavedState = JSON.parse(raw);
        if (s.grid?.length === 4) {
          setGrid(s.grid);
          setScore(s.score || 0);
          return;
        }
      }
      setGrid(newGame());
    } catch {
      setGrid(newGame());
    }
  }, []);

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ grid, score }));
    } catch { /* noop */ }
  }, [grid, score]);

  // Update best
  useEffect(() => {
    if (score > best) {
      setBest(score);
      try { localStorage.setItem(BEST_KEY, String(score)); } catch { /* noop */ }
    }
  }, [score, best]);

  const doMove = useCallback((dir: Direction) => {
    if (over || (won && !keepPlaying)) return;
    setGrid((g) => {
      const { grid: ng, gained, moved } = move(g, dir);
      if (!moved) return g;
      setScore((s) => s + gained);
      const withTile = addTile(ng);
      if (!keepPlaying && hasWon(withTile)) setWon(true);
      if (isGameOver(withTile)) setOver(true);
      setLastDir(dir);
      return withTile;
    });
  }, [over, won, keepPlaying]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const map: Record<string, Direction> = {
        ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
        w: "up", s: "down", a: "left", d: "right",
      };
      const dir = map[e.key];
      if (dir) { e.preventDefault(); doMove(dir); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [doMove]);

  const reset = () => {
    setGrid(newGame());
    setScore(0);
    setWon(false);
    setOver(false);
    setKeepPlaying(false);
  };

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const ax = Math.abs(dx), ay = Math.abs(dy);
    if (Math.max(ax, ay) < 24) return;
    if (ax > ay) doMove(dx > 0 ? "right" : "left");
    else doMove(dy > 0 ? "down" : "up");
    touchStart.current = null;
  };

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">2048</h1>
          <p className="text-sm text-muted-foreground">Join the tiles, get to <strong>2048</strong>!</p>
        </div>
        <div className="flex gap-2">
          <ScoreBox label="Score" value={score} />
          <ScoreBox label="Best" value={best} />
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90 px-4 h-10 text-sm font-medium transition"
        >
          New Game
        </button>
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative touch-none select-none"
      >
        <Board grid={grid} animateDir={lastDir} />


        {(over || (won && !keepPlaying)) && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
            <div className="text-center p-6">
              <h2 className="text-3xl font-extrabold mb-2">
                {won ? "You win! 🎉" : "Game over"}
              </h2>
              <p className="text-muted-foreground mb-4">Score: {score}</p>
              <div className="flex gap-2 justify-center">
                <button onClick={reset} className="rounded-md bg-primary text-primary-foreground px-4 h-10 text-sm font-medium">
                  Play again
                </button>
                {won && (
                  <button onClick={() => setKeepPlaying(true)} className="rounded-md border border-border px-4 h-10 text-sm font-medium hover:bg-accent">
                    Keep going
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="mt-8 prose prose-sm dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold mb-2">How to play</h2>
        <p className="text-sm text-muted-foreground">
          Use your <strong>arrow keys</strong> (or <strong>swipe</strong> on mobile) to move tiles. When two
          tiles with the same number touch, they <strong>merge into one</strong>. Reach the
          <strong> 2048 tile</strong> to win — but you can keep going for a higher score.
        </p>
        <h3 className="text-lg font-bold mt-4 mb-1">Tips</h3>
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          <li>Keep your highest tile in a corner.</li>
          <li>Build a sequence along one edge.</li>
          <li>Avoid swipes that scatter your big tiles.</li>
        </ul>
      </section>
    </section>
  );
}

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-card border border-border rounded-lg px-4 py-2 text-center min-w-[90px]">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

// Lazy import to avoid circular dep on game module-internal helper
import { addRandomTile } from "@/lib/game-2048";
const addTile = addRandomTile;
