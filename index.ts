import onePng from "./assets/1.png";
import twoPng from "./assets/2.png";
import fourPng from "./assets/4.png";
import { cleanMap, drawGuide, renderHover, renderMap, setBorder } from "./src/render";
import { editorRatio, tileSize } from "./src/state";
import { getLoc, newGrid, rotationSet, setLoc } from "./src/utils";

const penElement = document.getElementById("pen") as HTMLInputElement;
const eraserElement = document.getElementById("eraser") as HTMLInputElement;
const symmetryElement = document.getElementById("symmetry") as HTMLInputElement;
const undoElement = document.getElementById("undo") as HTMLInputElement;
const scaleElement = document.getElementById("scale") as HTMLInputElement;
const colorPicker = document.getElementById("color") as HTMLInputElement;

const frame = document.getElementById("editor-frame") as HTMLInputElement;
const canvas = document.getElementById("editor") as HTMLInputElement;
const guideCanvas = document.getElementById("guide") as HTMLInputElement;
const renderCanvas = document.getElementById("render") as HTMLInputElement;

canvas.width = tileSize * editorRatio * 3;
canvas.height = tileSize * editorRatio * 3;
guideCanvas.width = tileSize * editorRatio * 3;
guideCanvas.height = tileSize * editorRatio * 3;

let sizeIndex = 2;
const sizeList = [1, 2, 4];
const pngList = [onePng, twoPng, fourPng];
let pixelRatio = sizeList[sizeIndex];
let lastTouchEnd = 0;

renderCanvas.width = tileSize * pixelRatio * 3;
renderCanvas.height = tileSize * pixelRatio * 3;

scaleElement.addEventListener("click", () => {
  sizeIndex = (sizeIndex + 1) % sizeList.length;
  scaleElement.src = pngList[sizeIndex];
  pixelRatio = sizeList[sizeIndex];
  renderCanvas.width = tileSize * pixelRatio * 3;
  renderCanvas.height = tileSize * pixelRatio * 3;
  renderMap(map, pixelRatio);
  setBorder(map, pixelRatio);
  updateFrameHeight();
});

export const appState = {
  paintColor: "#000000",
};

if (colorPicker) {
  colorPicker.addEventListener("input", (e) => {
    const input = e.target as HTMLInputElement;
    appState.paintColor = input.value;
    renderMap(map, pixelRatio);
    setBorder(map, pixelRatio);
  });
} else {
  console.error("Color picker element not found");
}

function updateFrameHeight() {
  frame.style.height = `${canvas.getBoundingClientRect().width}px`;
}

document.addEventListener("DOMContentLoaded", updateFrameHeight);
window.addEventListener("resize", updateFrameHeight);

let isDown = false;
let isErasing = false;
let rotationalSymmetry = true;

symmetryElement.addEventListener("click", () => {
  rotationalSymmetry = !rotationalSymmetry;
  symmetryElement.classList.toggle("selected");
});

eraserElement.addEventListener("click", () => {
  isErasing = true;
  eraserElement.classList.add("selected");
  penElement.classList.remove("selected");
});

penElement.addEventListener("click", () => {
  isErasing = false;
  penElement.classList.add("selected");
  eraserElement.classList.remove("selected");
});

let map = newGrid();
let undoStack = [JSON.stringify(map)];

function pushUndo() {
  const candidate = JSON.stringify(map);
  const top = undoStack[undoStack.length - 1];
  if (candidate === top) return;

  undoStack.push(candidate);
  if (undoStack.length > 50) undoStack.shift();
  undoElement.classList.add("selected");
}

function popUndo() {
  undoStack.pop();
  const old = undoStack[undoStack.length - 1];
  if (old) {
    map = JSON.parse(old);
    cleanMap();
    renderMap(map, pixelRatio);
    setBorder(map, pixelRatio);
  }
}

undoElement.addEventListener("click", (event) => {
  popUndo();
  if (undoStack.length < 2) undoElement.classList.remove("selected");
  event.preventDefault();
});

drawGuide();
renderMap(map, pixelRatio);
setBorder(map, pixelRatio);

function draw(loc, v) {
  if (isDown) setLoc(map, loc, 1 - v);
}

function handleEvent(event, isClick = false, isHover = false) {
  const { left, top, width, height } = canvas.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;
  const canvasX = (x / width) * canvas.width;
  const canvasY = (y / height) * canvas.height;
  const gridX = Math.floor(canvasX / editorRatio);
  const gridY = Math.floor(canvasY / editorRatio);

  const rotatePairs = rotationalSymmetry ? rotationSet([gridX, gridY]) : [[gridX, gridY]];

  cleanMap();

  rotatePairs.forEach(([gX, gY]) => {
    const sx = Math.floor(gX / tileSize);
    const sy = Math.floor(gY / tileSize);
    const cx = gX % tileSize;
    const cy = gY % tileSize;
    const loc = [sx, sy, cx, cy];

    if (sx < 0 || sx > 2 || sy < 0 || sy > 2) return;
    if (isHover) renderHover(map, loc);
    let v = getLoc(map, loc);

    if (!isClick) v = 0;
    if (isErasing) v = 1;
    draw(loc, v);
  });
  renderMap(map, pixelRatio);
  setTimeout(() => setBorder(map, pixelRatio), 0);
}

canvas.addEventListener("mousedown", (event) => {
  isDown = true;
  handleEvent(event, true);
});
canvas.addEventListener("mousemove", (event) => {
  handleEvent(event, false, true);
});
canvas.addEventListener("mouseout", () => {
  cleanMap();
  renderMap(map, pixelRatio);
});
window.addEventListener("mousedown", () => {
  isDown = true;
});
window.addEventListener("mouseup", () => {
  isDown = false;
  pushUndo();
});
canvas.addEventListener("touchend", () => {
  isDown = false;
  pushUndo();
});
canvas.addEventListener("touchstart", (event) => {
  isDown = true;
  event.preventDefault();
  [...event.targetTouches].forEach((touch) => {
    handleEvent({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
  });
});
canvas.addEventListener("touchmove", (event) => {
  event.preventDefault();
  isDown = true;
  [...event.targetTouches].forEach((touch) => {
    handleEvent({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
  });
});
window.addEventListener("touchend", (event) => {
  if (event.timeStamp - lastTouchEnd <= 500) {
    event.preventDefault();
    const targetElement = event.target as HTMLElement;
    targetElement.click();
  }
  isDown = false;
  lastTouchEnd = event.timeStamp;
});
