import copy from "copy-to-clipboard";
import { editorRatio, tileSize } from "./state";
import { getLoc } from "./utils";
import { appState } from "../index";

const target = document.getElementById("target") as HTMLElement;
const canvas = document.getElementById("editor") as HTMLCanvasElement;
const guideCanvas = document.getElementById("guide") as HTMLCanvasElement;
const renderCanvas = document.getElementById("render") as HTMLCanvasElement;

const ctx = canvas.getContext("2d")!;
const guideCtx = guideCanvas.getContext("2d")!;
const renderCtx = renderCanvas.getContext("2d")!;

if (!ctx || !renderCtx || !guideCtx) {
  throw new Error("Canvas context could not be retrieved");
}

renderCtx.imageSmoothingEnabled = false;

function cleanMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function renderMap(map: number[][][][], pixelRatio: number) {
  renderCtx.fill();

  for (let sx = 0; sx < 3; sx++) {
    for (let sy = 0; sy < 3; sy++) {
      for (let cx = 0; cx < tileSize; cx++) {
        for (let cy = 0; cy < tileSize; cy++) {
          const v = getLoc(map, [sx, sy, cx, cy]);
          const fillColor = v === 1 ? appState.paintColor : "#fff0";

          ctx.fillStyle = fillColor;
          renderCtx.fillStyle = fillColor;
          const gridX = (sx * tileSize + cx) * pixelRatio;
          const gridY = (sy * tileSize + cy) * pixelRatio;

          if (!(sx === 1 && sy === 1)) {
            renderCtx.clearRect(gridX, gridY, pixelRatio, pixelRatio);
            renderCtx.fillRect(gridX, gridY, pixelRatio, pixelRatio);
            const adjustedGridX = (gridX * editorRatio) / pixelRatio;
            const adjustedGridY = (gridY * editorRatio) / pixelRatio;
            ctx.fillRect(adjustedGridX + 1, adjustedGridY + 1, editorRatio - 1, editorRatio - 1);
          }
        }
      }
    }
  }
  renderVector(map, pixelRatio);
}
function drawGuide() {
  for (let index = 1; index < 3; index++) {
    guideCtx.strokeStyle = "#33f";
    guideCtx.lineWidth = 0.5;
    let x = (index * canvas.width) / 3;
    guideCtx.beginPath();
    guideCtx.moveTo(x, 0);
    guideCtx.lineTo(x, canvas.height);
    guideCtx.stroke();
    guideCtx.beginPath();
    guideCtx.moveTo(0, x);
    guideCtx.lineTo(canvas.height, x);
    guideCtx.stroke();
  }

  for (let index = 0.0; index < 3 * tileSize; index++) {
    guideCtx.strokeStyle = "#ccc";
    let x = (index * canvas.width) / (3 * tileSize);
    guideCtx.beginPath();
    guideCtx.moveTo(x, 0);
    guideCtx.lineTo(x, canvas.height);
    guideCtx.stroke();
    guideCtx.beginPath();
    guideCtx.moveTo(0, x);
    guideCtx.lineTo(canvas.height, x);
    guideCtx.stroke();
  }
  let third = canvas.width / 3;
  guideCtx.clearRect(third + 1, third + 1, third - 2, third - 2);
  guideCtx.beginPath();
  guideCtx.moveTo(third * 1, third * 2);
  guideCtx.lineTo(third * 2, third * 1);
  guideCtx.stroke();
  guideCtx.beginPath();
  guideCtx.moveTo(third * 1, third * 1);
  guideCtx.lineTo(third * 2, third * 2);
  guideCtx.stroke();
}

function setBorder(map: number[][][][], pixelRatio: number) {
  let dataURI = renderVector(map, pixelRatio);
  let style = <HTMLStyleElement>document.getElementById("border-style");
  if (style) style.remove();
  style = document.createElement("style");
  style.id = "border-style";
  document.head.appendChild(style);
  if (!style.sheet) {
    throw new Error("Style sheet could not be retrieved");
  }
  let viewsize = tileSize * pixelRatio;
  let css = `.bordy {
    border-image:  url("${dataURI}") ${viewsize} /  ${viewsize}px / 0 round;
    border-width:  ${viewsize}px;
    border-style:  solid;
}`;
  style.sheet.insertRule(css);
  44;
  target.textContent = css;
}
function svgToDataURL(svgStr: string): string {
  const encoded = encodeURIComponent(svgStr).replace(/'/g, "%27").replace(/"/g, "%22");
  const header = "data:image/svg+xml,";
  const dataUrl = header + encoded;
  return dataUrl;
}

function renderVector(map: number[][][][], pixelRatio: number): string {
  let content = `<svg 
      width="${tileSize * pixelRatio * 3}px"
      height="${tileSize * pixelRatio * 3}px"
      viewBox="0 0 ${tileSize * pixelRatio * 3} ${tileSize * pixelRatio * 3}" 
      fill="${appState.paintColor}"
      stroke="none"
      xmlns="http://www.w3.org/2000/svg"
      >`;
  for (let sx = 0; sx < 3; sx++) {
    for (let sy = 0; sy < 3; sy++) {
      for (let cx = 0; cx < tileSize; cx++) {
        for (let cy = 0; cy < tileSize; cy++) {
          let v = getLoc(map, [sx, sy, cx, cy]);

          let gridX = (sx * tileSize + cx) * pixelRatio;
          let gridY = (sy * tileSize + cy) * pixelRatio;

          if (sx == 1 && sy == 1) {
            continue;
          }

          if (v == 1) {
            content += `<rect x="${gridX}" y="${gridY}" width="${pixelRatio}px" height="${pixelRatio}px"/>`;
          }
        }
      }
    }
  }
  content += "</svg>";
  let dataURI = svgToDataURL(content);
  return dataURI;
}
function renderHover(map: any[][][][], loc: number[]) {
  let x = loc[0] * tileSize + loc[2];
  let y = loc[1] * tileSize + loc[3];
  ctx.fillStyle = getLoc(map, loc) == 1 ? "#dde" : "#dde";
  if (loc[0] == 1 && loc[1] == 1) {
    return;
  }
  ctx.fillRect(x * editorRatio + 0, y * editorRatio + 0, editorRatio - 0, editorRatio - 0);
}

target.addEventListener("click", copyTarget);
function resetCopy() {
  target.setAttribute("data-after", "[Click to copy]");
}

resetCopy();

function copyTarget() {
  const textToCopy = target.textContent || "";
  copy(textToCopy, { message: "Press #{key} to copy css" });
  target.setAttribute("data-after", "Copied to your clipboard!");
  target.classList.remove("flash");

  window.setTimeout(() => {
    target.classList.add("flash");
  }, 1);
  window.setTimeout(resetCopy, 2500);
}
export { renderMap, drawGuide, setBorder, renderHover, cleanMap };
