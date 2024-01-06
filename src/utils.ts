import { tileSize } from "./state";

function newCell(): number[][] {
  return Array.from({ length: tileSize }, () => new Array(tileSize).fill(0));
}

function newGrid(): number[][][][] {
  return Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => newCell()));
}

function randomInt(min: number, max?: number): number {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomLoc(): number[] {
  return [randomInt(3), randomInt(3), randomInt(tileSize), randomInt(tileSize)];
}

function rotatePair([x, y]: number[]): number[] {
  let gridSize = 3 * tileSize;
  return [gridSize - y, x];
}

function rotationSet([x, y]: number[], n: number = 1): number[][] {
  let gridSize = 3 * tileSize - 1;
  return [
    [x, y],
    [gridSize - y, x],
    [gridSize - x, gridSize - y],
    [y, gridSize - x],
  ];
}

function getLoc(map: number[][][][], loc: number[]): number {
  let result = loc.reduce((acc, val) => acc[val], map as any);
  return typeof result === "number" ? result : 0;
}

function setLoc(map: number[][][][], loc: number[], v: number = 1): void {
  let target: any = map;

  for (let i = 0; i < loc.length - 1; i++) {
    target = target[loc[i]];
  }

  if (Array.isArray(target) && typeof loc[loc.length - 1] === "number") {
    target[loc[loc.length - 1]] = v;
  } else {
    throw new Error("Invalid location or target array");
  }
}

export { newGrid, randomLoc, randomInt, getLoc, setLoc, rotatePair, rotationSet };
