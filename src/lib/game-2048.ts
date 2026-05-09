// Pure 2048 game engine. Grid is 4x4, value 0 = empty.
export type Grid = number[][];
export type Direction = "up" | "down" | "left" | "right";

export const SIZE = 4;

export function emptyGrid(): Grid {
  return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

export function cloneGrid(g: Grid): Grid {
  return g.map((r) => [...r]);
}

export function addRandomTile(g: Grid): Grid {
  const empties: [number, number][] = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) if (g[r][c] === 0) empties.push([r, c]);
  if (!empties.length) return g;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const ng = cloneGrid(g);
  ng[r][c] = Math.random() < 0.9 ? 2 : 4;
  return ng;
}

export function newGame(): Grid {
  return addRandomTile(addRandomTile(emptyGrid()));
}

function slideRow(row: number[]): { row: number[]; gained: number } {
  const filtered = row.filter((v) => v !== 0);
  let gained = 0;
  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      gained += filtered[i];
      filtered.splice(i + 1, 1);
    }
  }
  while (filtered.length < SIZE) filtered.push(0);
  return { row: filtered, gained };
}

function slideLine(
  line: number[],
  toEnd: boolean
): { line: number[]; gained: number } {
  const input = toEnd ? line.slice().reverse() : line.slice();
  const { row, gained } = slideRow(input);
  return { line: toEnd ? row.slice().reverse() : row, gained };
}

export function move(
  g: Grid,
  dir: Direction
): { grid: Grid; gained: number; moved: boolean } {
  const result: Grid = emptyGrid();
  let gained = 0;

  if (dir === "left" || dir === "right") {
    for (let r = 0; r < SIZE; r++) {
      const { line, gained: gn } = slideLine(g[r], dir === "right");
      result[r] = line;
      gained += gn;
    }
  } else {
    for (let c = 0; c < SIZE; c++) {
      const col = g.map((row) => row[c]);
      const { line, gained: gn } = slideLine(col, dir === "down");
      for (let r = 0; r < SIZE; r++) result[r][c] = line[r];
      gained += gn;
    }
  }

  const moved = JSON.stringify(result) !== JSON.stringify(g);
  return { grid: result, gained, moved };
}

export function hasWon(g: Grid): boolean {
  return g.some((r) => r.some((v) => v >= 2048));
}

export function isGameOver(g: Grid): boolean {
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c] === 0) return false;
      if (c < SIZE - 1 && g[r][c] === g[r][c + 1]) return false;
      if (r < SIZE - 1 && g[r][c] === g[r + 1][c]) return false;
    }
  return true;
}
