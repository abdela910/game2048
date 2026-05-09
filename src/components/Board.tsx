import type { Direction, Grid } from "@/lib/game-2048";

const tileClass = (v: number) => {
  const map: Record<number, string> = {
    2: "bg-tile-2 text-tile-dark",
    4: "bg-tile-4 text-tile-dark",
    8: "bg-tile-8 text-tile-dark",
    16: "bg-tile-16 text-tile-dark",
    32: "bg-tile-32 text-tile-dark",
    64: "bg-tile-64 text-tile-dark",
    128: "bg-tile-128 text-tile-dark",
    256: "bg-tile-256 text-tile-dark",
    512: "bg-tile-512 text-tile-dark",
    1024: "bg-tile-1024 text-tile-dark",
    2048: "bg-tile-2048 text-tile-dark",
  };
  return map[v] ?? "bg-tile-2048 text-tile-dark";
};

const fontSize = (v: number) =>
  v < 100 ? "text-4xl sm:text-5xl" : v < 1000 ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl";

const slideClass = (dir: Direction | null | undefined) => {
  switch (dir) {
    case "up": return "slide-up";
    case "down": return "slide-down";
    case "left": return "slide-left";
    case "right": return "slide-right";
    default: return "tile-pop";
  }
};

export function Board({ grid, animateDir }: { grid: Grid; animateDir?: Direction | null }) {
  return (
    <div className="bg-board p-3 rounded-xl shadow-lg w-full max-w-md mx-auto aspect-square">
      <div className="grid grid-cols-4 grid-rows-4 gap-3 h-full">
        {grid.flatMap((row, r) =>
          row.map((v, c) => (
            <div
              key={`${r}-${c}`}
              className={`flex items-center justify-center rounded-lg font-bold transition-all ${
                v === 0 ? "bg-cell" : `${tileClass(v)} ${fontSize(v)} ${slideClass(animateDir)}`
              }`}
            >
              {v !== 0 ? v : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
